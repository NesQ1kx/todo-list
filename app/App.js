import React from 'react';
import {StyleSheet, ScrollView, View, TouchableHighlight, Text} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import TodoShort from "./components/TodoShort";
import {mockShort} from "./mock";
import TagsListScreen from "./components/TagsListScreen";
import TodoScreen from "./components/TodoScreen";
import TagScreen from "./components/TagScreen";

class App extends React.Component {
    render() {
        const { navigation} = this.props;
        const todoesShort = mockShort.map((item, index) =>
            <TodoShort navigation={navigation} key={index} item={item}/>
        );
        return (
            <View>
                <ScrollView>
                    <View style={styles.container}>
                        {todoesShort}
                    </View>
                </ScrollView>
                <TouchableHighlight onPress={() => navigation.navigate('Todo', {name: ''})}>
                    <View style={styles.button}>
                        <Text style={{fontSize: 20, color: '#fff'}}>
                            НОВАЯ ЗАМЕТКА
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>

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

const TabNavigator = createMaterialTopTabNavigator({
    Заметки: App,
    Теги: TagsListScreen,
},{
    tabBarOptions: {
        labelStyle: {
            fontSize: 20,
        },
        style: {
            backgroundColor: '#3875d8',
        },
    }
});

const StackNavigator = createStackNavigator({
    Home: TabNavigator,
    Todo: TodoScreen,
    Tag: TagScreen
});

export default createAppContainer(StackNavigator);
