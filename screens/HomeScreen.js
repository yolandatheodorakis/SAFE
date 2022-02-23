import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Colors from '../constants/Colors';

export default function HomeScreen() {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SAFE</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30
    },
	title: {
		color: Colors.offWhite,
        fontFamily: 'prisma',
        fontSize: 50,
        alignSelf: 'center'
	}
});