/**
 * @flow
 */

'use strict';
import React, {Component} from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    Button
} from "react-native"


type Props = {
    coverURL: String,
    author: String,
    title: String
};



export default class LocationButton extends Component {

    constructor(props: Props) {
        super(props);

        this.state = {
            location:""
        };
    }

    _onPress = () => {

        navigator.geolocation.getCurrentPosition(
            (position)=>{
                log(position);
                this.props.onGetCoords(position.coords.latitude,
                    position.coords.longitude)
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
            <Button style={styles.item}
                    title="Use CurrentLocation"
                    onPress={this._onPress}
                    color="#ffffff"
            />);
    }
}

// 类型检查
LocationButton.PropTypes = {
    onGetCoords : React.PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        padding: 10,
    },
});

