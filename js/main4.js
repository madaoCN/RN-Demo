/**
 * @flow
 */

'use strict';
import React, {Component} from 'react';
import {
    ListView,
    StyleSheet,
    Text,
    ScrollView,
    View
} from "react-native";

function setup() {

    class Root extends Component {
        constructor(props) {
            super(props);


            this.state = {
                location:""
            };
        }

        componentDidMount(){
            navigator.geolocation.getCurrentPosition(
                (position)=>{
                    log(position);
                    this.setState({
                        location:position
                    })
                },
                (error)=>{
                    log(error);
                },
                {
                    enableHighAccuracy:true,
                    timeout:200000,
                    maximumAge:100
                }
            );
        }

        render() {
            return (

                <View
                    style={styles.parent}>
                    <Text style={styles.baseText}>
                        timeStamp : {this.state.location.timestamp}
                    </Text>

                    <Text style={styles.baseText}>
                        Info : {JSON.stringify(this.state.location.coords)}
                    </Text>
                </View>
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
    parent: {
        flexDirection: "column",
        position: "absolute",
        top: 30,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#3f3f3f",
    },
    baseText:{
        color:"#ffffff",
        fontSize:20,
        fontWeight:"bold",
        alignSelf:"center",
        textAlign:"center",
    },
});

module.exports = setup;