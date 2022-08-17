import React from "react";

import {
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    button: {
        fontSize: 40,
        height: screenWidth / 4,
        width: screenWidth / 4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center',
        borderWidth: 0.7,
        borderColor: '#cccccc',
        color: '#888',
    },
    operationButton: {
        backgroundColor: '#f0f0f0',
        color: '#2cb1cc',
    },
    buttonDouble: {
        width: (screenWidth / 4) * 2,
    },
    buttonTriple: {
        width: (screenWidth / 4) * 3,
    },
    deleteButton: {
        color: '#f22121',
    },
    result: {
        color: '#f0f0f0',
        backgroundColor: '#2cb1cc',
    }
});

export default ({ onClick, label, double = false, triple = false, operation = false, deleteButton = false, result = false }) => {
    const stylesButton = [styles.button];

    if (double) {
        stylesButton.push(styles.buttonDouble);
    }
    if (triple) {
        stylesButton.push(styles.buttonTriple);
    }
    if (operation) {
        stylesButton.push(styles.operationButton);
    }

    if (deleteButton) {
        stylesButton.push(styles.deleteButton);
    }

    if(result) {
        stylesButton.push(styles.result);
    }

    return (
        <TouchableHighlight
            onPress={onClick}
        >
            <Text style={stylesButton}>{label}</Text>
        </TouchableHighlight>
    )
}