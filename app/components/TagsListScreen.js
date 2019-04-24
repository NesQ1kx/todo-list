import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableHighlight} from 'react-native';
import TagShort from "./TagShort";
import {httpClient} from "../services/http-client";
import {ENDPOINTS} from "../constants/url.constants";


export default class TagsListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = {tags: []};
        const willFocus = this.navigation.addListener('willFocus', () => this._fetchData());
    }

    _fetchData() {
        httpClient.get(ENDPOINTS.GET_ALL_TAGS).then(data => {
            this.setState({tags: data.data.body});
        });
    }

    render() {
        const tagsShort = this.state.tags.map((item, index) =>
            <TagShort navigation={this.navigation} key={index} item={item}/>
        );
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.container}>
                        {tagsShort}
                    </View>
                </ScrollView>
                <TouchableHighlight onPress={() => this.navigation.navigate('Tag', {item: {}})}>
                    <View style={styles.button}>
                        <Text style={{fontSize: 20, color: '#fff'}}>
                            НОВЫЙ ТЕГ
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   container: {
       padding: 10,
       flexDirection: 'row',
       flexWrap: 'wrap',
       justifyContent: 'space-between',
   },
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#3875d8',
    }
});
