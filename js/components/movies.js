/**
 * @flow
 */

'use strict';
import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image
} from "react-native"


type Props = {
    coverURL: String,
    author: String,
    title: String
};


export default class Movies extends Component {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.movieItem}>
                <Image
                    style={styles.cover}
                    source={{uri: this.props.coverURL}}/>
                <View style={styles.info}>
                    <Text style={styles.title}>
                        {this.props.title}
                    </Text>
                    <Text style={styles.author}>
                        {this.props.author}
                    </Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    movieItem: {
        flex: 1,
        flexDirection: "row",
        borderBottomColor: "#ffffff",
        borderBottomWidth:0.5,
        padding: 10,
    },
    cover: {
        flex: 1,
        height:150,
        resizeMode:"contain"
    },
    info:{
        flex:3,
        alignItems:"flex-end",
        flexDirection:"column",
        alignSelf:"center",
        padding:20

    },
    author:{
      color:"#ffffff",
        fontSize:18
    },
    title:{
        color:"#ffffff",
        fontSize:20,
        fontWeight:"bold"
    },

});

