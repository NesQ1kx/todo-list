import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight, ScrollView, TextInput} from 'react-native';

export default class TagScreen extends React.Component {
    constructor(props) {
        super(props);
        this.navigation = this.props.navigation;
        this.state = {id: this.navigation.getParam('id')};
    }

    removeTag() {
        this.navigateToHomeScreen();
    }

    saveTag() {
        this.navigateToHomeScreen();
    }

    cancel() {
        this.navigateToHomeScreen();
    }

    navigateToHomeScreen() {
        this.navigation.navigate('Home');
    }
    render() {
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
                            <TextInput style={styles.input}/>
                        </View>
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
