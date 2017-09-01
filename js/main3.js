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

            var ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                }
            );
            this.state = {
                dataSource: ds.cloneWithRows([])
            };
        }


        render() {
            return (

                <View
                    style={styles.parent}>
                    <View
                        style={styles.topBlock}>
                        <View
                            style={styles.leftCol}>
                            <View
                                style={styles.cellOne}>
                                <Text style={styles.baseText}>
                                    1
                                </Text>
                            </View>
                            <View
                                style={styles.cellTwo}>
                                <Text style={styles.baseText}>
                                    2
                                </Text>
                            </View>
                        </View>
                        <View
                            style={[styles.cellTree]}>
                            <Text style={styles.baseText}>
                                3
                            </Text>
                        </View>
                    </View>

                    <View
                        style={styles.bottomBlock}>
                        <View
                            style={[styles.cellFour]}>
                            <Text style={styles.baseText}>
                                4
                            </Text>
                        </View>
                        <View
                            style={[styles.rightBottomCol]}>

                            <View
                                style={[styles.cellFifth]}>
                                <Text style={styles.baseText}>
                                    5
                                </Text>
                            </View>
                            <View
                                style={styles.cellSixAndSeven}>
                                <View
                                    style={[styles.cellSix]}>
                                    <Text style={styles.baseText}>
                                        6
                                    </Text>
                                </View>
                                <View
                                    style={[styles.cellSeven]}>
                                    <Text style={styles.baseText}>
                                        7
                                    </Text>
                                </View>
                            </View>

                        </View>

                    </View>
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
    base:{
        borderColor:"#ffffff",
        borderWidth:5,
    },
    baseText:{
        color:"#ffffff",
        fontSize:45,
        fontWeight:"bold",
        alignSelf:"center",
        flex:1,
        textAlign:"center",
    },
    parent: {
        flexDirection: "column",
        position: "absolute",
        top: 30,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#3f3f3f",
    },
    topBlock: {
        flexDirection:"row",
        flex:6,
        backgroundColor: "#FFD05C"
    },
    bottomBlock: {
        flexDirection:"row",
        flex:4,
        backgroundColor: "#73E8FF",

    },
    leftCol: {
        flex: 2
    },
    cellOne:{
        flex:1,
        flexDirection:"row",
        backgroundColor: "#FFC1DA",

    },
    cellTwo:{
        flex:2,
        flexDirection:"row",
    },
    cellTree:{
        flex:5,
        backgroundColor:"#32cdff",
        flexDirection:"row",
    },
    cellFour:{
        flex:2,
        flexDirection:"row",
    },
    cellFifth:{
        flexDirection:"row",
        backgroundColor:"#FFC1DA",
        flex:3
    },
    cellSix:{
        flexDirection:"row",
        backgroundColor:"#9CB14F",
        flex:1
    },
    cellSeven:{
        flexDirection:"row",
        backgroundColor:"#72FFE5",
        flex:1

    },
    cellSixAndSeven:{
        flexDirection:"column",
        flex:1
    },
    rightBottomCol:{
        flex:5,
        backgroundColor:"#FFE2C1",
        flexDirection:"row",
    }
});

module.exports = setup;