import React from 'react';
import {StyleSheet, ScrollView, View, TouchableHighlight, Text, ActivityIndicator} from 'react-native';
import {createMaterialTopTabNavigator, createAppContainer, createStackNavigator} from 'react-navigation';
import TodoShort from "./components/TodoShort";
import TagsListScreen from "./components/TagsListScreen";
import TodoScreen from "./components/TodoScreen";
import TagScreen from "./components/TagScreen";
import {httpClient} from "./services/http-client";
import {ENDPOINTS} from "./constants/url.constants";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {notes: [], isDataLoaded: false, tags: []};
        this.navigation = this.props.navigation;
        const willFocus = this.navigation.addListener('willFocus', () => this._fetchData());
    }

    _fetchData() {
        httpClient.get(ENDPOINTS.GET_NOTES).then(data => {
            this.setState({notes: data.data.body, isDataLoaded: true});
        });

    }

    render() {
        const notesShort = this.state.notes.map((item, index) =>
            <TodoShort navigation={this.navigation} key={index} item={item}/>
        );
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    {!this.state.isDataLoaded && <View style={{marginTop: 10}}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>}
                    {this.state.notes && <View style={styles.container}>
                        {notesShort}
                    </View>}
                </ScrollView>
                <TouchableHighlight onPress={() => this.navigation.navigate('Todo', {item: {}})}>
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
