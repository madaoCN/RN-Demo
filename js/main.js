/**
 * @flow
 */

'use strict';
import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    TextInput,
    View,
    ScrollView,
    Image,
    PanResponder,
    AsyncStorage
} from "react-native";
import Forecast from "./components/forecast"
import LocationButton from "./components/locationButton"
import Video from "react-native-video"

let ApiKey = "922f91180ee38347352d932c25fc0032";
let Api = "http://api.openweathermap.org/data/2.5/weather?"
let STORAGE_KEY = "@MAODAO:ZIP"

function setup() {

    class Root extends Component {
        constructor(props) {
            super(props);
            this.state = {
                zip: "",
                forecast:{
                    main:"",
                    conditions:"",
                    temperature:''
                }
            };
            this._handleTextChange = this._handleTextChange.bind(this)
        }

        _getForecastForZip = (zip)=>{
            this._getForecast(
                Api + "q=" + zip + "&units=imperial&APPID=" + ApiKey
            )

            AsyncStorage.setItem(STORAGE_KEY, zip)
                .then(()=>{
                    console.log("save: " + zip + "to disk success")
                })
                .catch((error)=>{
                    console.warn(error);
                })
                .done();
        }

        _gerForecastForCoords = (lat, lon)=>{
            this._getForecast(
                Api + "lat=" + lat + "&lon=" + lon + "&units=imperial&APPID=" + ApiKey
            )
        }

        _getForecast = (url)=>{

            fetch(url)
                .then((response)=>response.json())
                .then((responseJson)=>{
                    console.log(responseJson.weather[0])
                    this.setState({
                        forecast:{
                            main:responseJson.weather[0].main,
                            conditions:responseJson.weather[0].description,
                            temperature:responseJson.weather[0].icon
                        }
                    });
                })
                .catch((error)=>{
                    console.warn(error);
                });
        }

        _handleTextChange(event){

            var zip = event.nativeEvent.text;
            if(!(zip && zip.length)) return;

            this._getForecastForZip(zip)
        }

        componentWillMount(){
            
            this._panResponder = PanResponder.create({
                onStartShouldSetResponder:()=>{log("onStartShouldSetResponder")},
                onMoveShouldSetPanResponder:()=>{log("onMoveShouldSetPanResponder")},
                onStartShouldSetResponderCapture:()=>{log("onStartShouldSetResponderCapture")},
                onPanResponderGrant:()=>{log("onPanResponderGrant")},
                onPanResponderMove:()=>{log("onPanResponderMove")},
                onPanResponderRelease:()=>{log("onPanResponderRelease")},
                onPanResponderTerminationRequest:()=>{log("onPanResponderTerminationRequest")},
                onPanResponderTerminate:()=>{log("onPanResponderTerminate")},
            });

            AsyncStorage.getItem(STORAGE_KEY)
                .then((value)=>{
                    if (value != null){
                        this._getForecastForZip(value)
                        this.setState({
                            zip:value
                        })
                    }
                })
                .catch((error)=>{
                    log(error)
                })
                .done();

        }

        render() {
            return (
                <ScrollView
                    style = {styles.container}>
                    <View style={styles.overlayer}>
                        <View style={styles.row}>
                            <Text style={styles.mainText}>
                                Current Weather For
                            </Text>
                            <View style={styles.zipContainer}
                                  >
                                <TextInput
                                    style = {[styles.input, styles.mainText]}
                                    onSubmitEditing={this._handleTextChange}
                                    placeholder="请输入位置"
                                    placeholderTextColor="#ffffff"
                                    keyboardType="numeric"
                                    defaultValue={this.state.zip}
                                />
                            </View>

                        </View>
                    </View>
                    <LocationButton onGetCoords={this._gerForecastForCoords}/>
                    <Forecast
                        main={this.state.forecast.main}
                        conditions={this.state.forecast.conditions}
                        temperature={this.state.forecast.temperature}
                    />
                    <Image
                        source={require("../img/bg.png")}
                        resizeMode="cover"
                        style={styles.backDrop}
                    />
                    {/*<Video*/}
                        {/*source={{uri:"../video/moto.mp4"}}*/}
                        {/*resizeMode="cover"*/}
                        {/*rate={1}*/}

                    {/*/>*/}
                </ScrollView>
            );
        }
    }

    return Root;
}

global.log = (...args) => {
    console.log('------------------------------');
    console.log(...args);
    console.log('------------------------------');
    return args[args.length - 1];
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"#3f3f3f",
    },
    overlayer:{
        paddingTop:10,
        opacity:0.5,
        flexDirection:"column",
        alignItems:"center",
    },
    row:{
        flex:1,
        flexDirection:"row",
        flexWrap:"nowrap",
        alignItems:"flex-start",
        padding: 30
    },
    zipContainer:{
        flex:1,
        borderBottomColor:"#DDDDDD",
        borderBottomWidth:1,
        marginLeft:5,
        marginTop:3
    },
    input:{
        fontSize: 20,
        textAlign:"center",
        color: "#ffffff",
        flex:1
    },
    backDrop:{
        flex:1,
        flexDirection:"column",
        marginTop:10
    },
    mainText: {
        color: "#ffffff",
        fontSize: 16,
        flex:1
    },
});

module.exports = setup;