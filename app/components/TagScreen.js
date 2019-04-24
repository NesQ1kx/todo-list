import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight, ScrollView, TextInput} from 'react-native';
import {httpClient} from "../services/http-client";
import {ENDPOINTS} from "../constants/url.constants";
import TodoShort from "./TodoShort";

export default class TagScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = {id: this.navigation.getParam('item').id,
                      name: this.navigation.getParam('item').name,
                      notes: []
        };
    }

    componentWillMount() {
        httpClient.get(`${ENDPOINTS.GET_NOTES_BY_TAG}?tagId=${this.state.id}`)
            .then((data) => this.setState({notes: data.data.body}));
    }

    removeTag() {
        httpClient.get(`${ENDPOINTS.DELETE_TAG}?id=${this.state.id}`)
            .then(() => this.navigateToHomeScreen());
    }

    saveTag() {
        if(!this.state.id) {
            const data = {
                name: this.state.name
            };
            httpClient.post(ENDPOINTS.ADD_TAG, JSON.stringify(data))
                .then(response => this.navigateToHomeScreen())
        }

    }

    cancel() {
        this.navigateToHomeScreen();
    }

    navigateToHomeScreen() {
        this.navigation.navigate('Home');
    }
    render() {
        const notesShort = this.state.notes.map((item, index) =>
            <TodoShort navigation={this.navigation} key={index} item={item}/>
        );
        return(
            <View style={{flex: 1}}>
                <ScrollView>
                    <View style={styles.container}>
                        <TouchableHighlight onPress={this.removeTag.bind(this)} disabled={!this.state.id}>
                            <View style={this.state.id ? styles.removeBtn : styles.removeBtnDisabled}>
                                <Text style={{fontSize: 20, color: '#fff'}}>
                                    Удалить
                                </Text>
                            </View>
                        </TouchableHighlight>
                        <View style={styles.itemInput}>
                            <Text style={{fontSize: 20}}>Текст тега</Text>
                            <TextInput style={styles.input}
                                value={this.state.name}
                                onChangeText={(text) => this.setState({name: text})}
                            />
                        </View>
                        <Text>Заметки с тегом</Text>
                        {notesShort}
                    </View>
                </ScrollView>
                <View style={styles.btnContainer}>
                    <TouchableHighlight onPress={this.saveTag.bind(this)}>
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
        )
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
        marginTop: 60,
        marginBottom: 50
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
