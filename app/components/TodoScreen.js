import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, ScrollView } from 'react-native';
import {httpClient} from "../services/http-client";
import {ENDPOINTS} from "../constants/url.constants";

export default class TodoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = {id: this.navigation.getParam('item').id,
                      title: this.navigation.getParam('item').title,
                      text: this.navigation.getParam('item').text,
                      tagsIds: this.navigation.getParam('item').tags,
                      created_at: this.navigation.getParam('item').created_at
        }
    }

    removeTodo() {
        httpClient.get(`${ENDPOINTS.DELETE_NOTE}?id=${this.state.item.id}`)
            .then(response => this.navigateToHomeScreen());
    }

    saveTodo() {
        if (!this.state.id) {
            const data = {
                tagsIds: this.state.tags,
                text: this.state.text,
                title: this.state.title
            };
            httpClient.post(ENDPOINTS.ADD_NOTE, JSON.stringify(data))
                .then(response => this.navigateToHomeScreen());
        } else {
            const data = {
                id: this.state.id,
                tagsIds: this.state.tags,
                text: this.state.text,
                title: this.state.title
            };
            httpClient.post(ENDPOINTS.EDIT_NOTE, JSON.stringify(data))
                .then(response => this.navigateToHomeScreen());
        }
    }

    cancel() {
        this.navigateToHomeScreen();
    }

    navigateToHomeScreen() {
        this.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.container}>
                        <TouchableHighlight onPress={this.removeTodo.bind(this)} disabled={!this.state.id}>
                            <View style={this.state.id ? styles.removeBtn : styles.removeBtnDisabled}>
                                <Text style={{fontSize: 20, color: '#fff'}}>
                                    Удалить
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <View style={styles.itemInput}>
                            <Text style={{fontSize: 20}}>Дата</Text>
                            <TextInput style={styles.input}
                                        value={this.state.created_at ?
                                            new Date(this.state.created_at).toLocaleDateString() :
                                            ''}
                                        onTextChange={(text) => this.setState({created_at: text})}/>
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={{fontSize: 20}}>Заголовок</Text>
                            <TextInput style={styles.input}
                                        value={this.state.title}
                                        onChangeText={(text) =>this.setState({title: text})}/>
                        </View>
                        <View style={styles.itemInput}>
                            <Text style={{fontSize: 20}}>Текст заметки</Text>
                            <TextInput style={{borderWidth: 1, height: 150}}
                                       multiline={true}
                                       value={this.state.text}
                                       numberOfLines={5}
                                       onChangeText={(text) => this.setState({text: text})}/>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.btnContainer}>
                    <TouchableHighlight onPress={this.saveTodo.bind(this)}>
                        <View style={styles.button}>
                            <Text style={{fontSize: 20, color: '#fff'}}>
                                Сохранить
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.cancel.bind(this)}>
                        <View style={styles.button}>
                            <Text style={{fontSize: 20, color: '#fff'}}>
                                Отмена
                            </Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1
    },
    removeBtn: {
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#3875d8',
    },
    removeBtnDisabled: {
        position: 'absolute',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#98999b',
    },
    itemInput: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 60
    },
    input: {
        borderWidth: 1,
        height: 40,
    },
    btnContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#3875d8',
        borderBottomWidth: 1
    }

});
