import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class TodoShort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {tags: []};
    }

    componentDidMount() {
        let tags = [];
        if (this.props.item.tags) {
            this.props.item.tags.forEach(tag => {
                tags.push(tag.name);
            })
        }
        this.setState({tags: tags});
    }

    render() {
        const { navigate } = this.props.navigation;
        return(
            <TouchableHighlight  onPress={() => navigate('Todo', {item: this.props.item})}>
                <View style={styles.container}>
                    <Text style={styles.item}>{new Date(this.props.item.created_at).toLocaleDateString()}</Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.props.item.title}</Text>
                    <Text numberOfLines={1} style={styles.item}>{this.props.item.text}</Text>
                    <Text style={{fontSize: 20, fontStyle: 'italic'}}>Теги: {this.state.tags.join(', ')}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        minWidth: '90%',
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
