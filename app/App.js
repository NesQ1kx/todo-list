import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation';
import TodoShort from "./components/TodoShort";
import {mockShort} from "./mock";
import TagsListScreen from "./components/TagsListScreen";

class App extends React.Component {
    render() {
        const todoesShort = mockShort.map((item, index) =>
            <TodoShort key={index} item={item}/>
        );
        return (
            <ScrollView>
                <View style={styles.container}>
                    {todoesShort}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

const TabNavigator = createMaterialTopTabNavigator({
    Заметки: App,
    Теги: TagsListScreen,
},{
    tabBarOptions: {
        labelStyle: {
            fontSize: 20,
        },
    }
});

export default createStackNavigator( { TabNavigator });
