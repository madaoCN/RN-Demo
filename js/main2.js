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
import Movie from "./components/movies"

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

        _renderRows = (rowData) => {
            console.log(rowData)
            return (<Movie style={styles.row}
                           coverURL={rowData.img}
                           author={rowData.author}
                           title={rowData.title}
            />);
        }

        _renderHeader = () => {
            return (
                <View style={styles.sectionDriver}>
                    <Text style={styles.headingText}>
                        Apple Itunes Tops
                    </Text>
                </View>);
        }

        _renderFooter = () => {
            return (
                <View style={styles.sectionDriver}>
                    <Text style={styles.headingText}>
                        Apple.Inc
                    </Text>
                </View>);
        }

        componentDidMount() {
            this._refreshData();
        }

        _refreshData = () => {

            var api = "https://itunes.apple.com/us/rss/topmovies/limit=50/json";
            fetch(api)
                .then((response) => response.json())
                .then((jsonResponse) => {

                    var entry = jsonResponse.feed.entry;
                    var list = [];
                    for(var index in entry){
                        let item = entry[index];
                        var img = item["im:image"].pop().label;
                        var title = item.title.label;
                        var author = item["im:artist"].label;
                        list.push({
                            "img":img,
                            "title":title,
                            "author":author
                        })
                    }

                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(list)
                    });
                });
        }

        render() {
            return (

                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRows}
                    renderFooter={this._renderFooter}
                    renderHeader={this._renderHeader}
                >
                </ListView>
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
    container: {
        flex: 1,
        backgroundColor: "#3f3f3f",
        paddingTop: 24
    },
    row: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "nowrap",
        alignItems: "flex-start",
        padding: 30,
        color: "#ffffff",
    },
    headingText: {
        flex: 1,
        fontSize: 24,
        alignSelf: "center",
        color: "#ffffff",
    },
    sectionDriver: {
        padding: 8,
        alignItems: "center",
    }
});

module.exports = setup;