/**
 * @flow
 */

'use strict';
import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
} from "react-native"


type Props = {
    main:String,
    conditions:String,
    temperature:Number
};


export default class Forecast extends Component {


    constructor(props:Props) {
        super(props);
    }

    render(){
        return (
            <View>
                <Text
                    style={styles.bigText}>
                    {this.props.main}
                </Text>
                <Text
                    style={styles.mainText}>
                    Current conditions: {this
                    .props.conditions}
                </Text>
                <Text
                    style={styles.mainText}>
                    {this.props.temperature} icon
                </Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    bigText:{
        flex:2,
        fontSize:24,
        fontWeight:"bold",
        textAlign:"center",
        margin:10,
        color:"#ffffff"
    },
    mainText:{
        flex:1,
        fontSize:16,
        textAlign:"center",
        color:"#ffffff"
    }
});

// module.exports = Forecast;