import React from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Octicons} from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function LoginScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SAFE</Text>

            <ScrollView>

                <View style={styles.textInputContainer}>
                    <Octicons name={'mention'} size={20} color={Colors.black} />
                    <TextInput 
                        placeholder='Sähköposti'
                        placeholderTextColor='silver'
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.textInputContainer}>
                    <Octicons name={'key'} size={20} color={Colors.black} />
                    <TextInput 
                        placeholder='Salasana'
                        placeholderTextColor='silver'
                        secureTextEntry={true}
                        style={styles.textInput}
                    />
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('HomeScreen')}>
                    <Text style={styles.loginButtonText}>Kirjaudu sisään</Text>
                </TouchableOpacity>

            </ScrollView>

            <Text style={styles.createNewText} onPress={() => navigation.navigate('CreateNewUserScreen')}>Luo uusi käyttäjä</Text>
            <View style={styles.navBar}></View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.sage
    },
	title: {
		color: Colors.offWhite,
        fontFamily: 'prisma',
        fontSize: 50,
        alignSelf: 'center',
        marginBottom: 100,
        paddingVertical: 40
	},
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%',
        height: 40,
        marginBottom: 20,
        paddingVertical: 5,
        borderBottomWidth: 1.5
    },
    textInput: {
        marginHorizontal: 10,
        fontFamily: 'helvetica-nu',
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black
    },
    loginButton: {
        alignSelf: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1.5
    },
    loginButtonText: {
        fontFamily: 'helvetica-nu',
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black
    },
    createNewText: {
        fontFamily: 'helvetica-nu',
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.black,
        alignSelf: 'center',
        marginBottom: 10
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 60,
        backgroundColor: Colors.offWhite
    }
});