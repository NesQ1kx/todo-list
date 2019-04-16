import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class TagShort extends React.Component {
    render() {
        const { navigation } = this.props;
        return(
            <TouchableHighlight onPress={() => navigation.navigate('Tag', {id: this.props.item.id})}>
                <View style={styles.container}>
                    <Text style={{fontSize: 20, color: '#fff'}}>{this.props.item.title}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
   container: {
       marginBottom: 10,
       borderRadius: 20,
       backgroundColor: '#3875d8',
       justifyContent: 'center',
       alignItems: 'center',
       height: 50,
       width: '100%',
       padding: 5
   }
});

