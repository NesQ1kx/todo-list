import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class TodoShort extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return(
            <TouchableHighlight  onPress={() => navigate('Todo', {id: this.props.item.id})}>
                <View style={styles.container}>
                    <Text style={styles.item}>{this.props.item.date}</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.props.item.title}</Text>
                    <Text numberOfLines={1} style={styles.item}>{this.props.item.text}</Text>
                    <Text style={{fontSize: 20, fontStyle: 'italic'}}>Теги: {this.props.item.tags.join(', ')}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        width: '90%',
        borderRadius: 4,
        borderWidth: 1,
        flexDirection: 'column',
        padding: 5,
        alignItems: 'flex-start',
    },
    item: {
        fontSize: 20,
    }
});
