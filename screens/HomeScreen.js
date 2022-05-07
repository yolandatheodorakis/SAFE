import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Linking, Platform} from 'react-native';

import Colors from '../constants/Colors';

export default function HomeScreen() {
    const sendMessage = () => {
    const url = (Platform.OS === 'android')
    ? 'sms:+358403503325?body=your message'
    : 'sms:919999999999'
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Unsupported url: ' + url)
      } else {
        return Linking.openURL(url)
      }
    }).catch(err => console.error('An error occurred', err))}

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SAFE</Text>
            <TouchableOpacity onPress={sendMessage}>
                <Text>SEND</Text>
            </TouchableOpacity>
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