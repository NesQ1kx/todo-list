import React from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableHighlight} from 'react-native';
import {mockTags} from "../mock";
import TagShort from "./TagShort";


export default class TagsListScreen extends React.Component {
    render() {
        const { navigation} = this.props;
        const tagsShort = mockTags.map((item, index) =>
            <TagShort navigation={navigation} key={index} item={item}/>
        );
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.container}>
                        {tagsShort}
                    </View>
                </ScrollView>
                <TouchableHighlight onPress={() => navigation.navigate('Tag', {id: ''})}>
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
