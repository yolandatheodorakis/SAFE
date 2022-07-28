import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Octicons} from '@expo/vector-icons';
import axios from 'axios';

import Colors from '../constants/Colors';

export default function CreateNewUserScreen() {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);

    const handleRegister = () => {
        const configuration = {
            method: 'post',
            url: 'https://localhost:3000/register',
            data: {
                name,
                email,
                password
            },
        };
        // Make the API call
        axios(configuration)
        .then((result) => {
            setRegister(true);
        })
        .catch((error) => {
            error = new Error();
        });  
        // If registering was successful
        if (register) {
            navigation.navigate('LoginScreen');
            alert('Käyttäjän luonti onnistui! Voit nyt kirjautua ssään.');
        } 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SAFE</Text>

            <ScrollView>

                <View style={styles.textInputContainer}>
                    <Octicons name={'person'} size={20} color={Colors.black} />
                    <TextInput 
                        value={name}
                        onChange={(text) => setName(text)}
                        placeholder='Nimi'
                        placeholderTextColor='silver'
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.textInputContainer}>
                    <Octicons name={'mention'} size={20} color={Colors.black} />
                    <TextInput 
                        value={email}
                        onChange={(text) => setEmail(text)}
                        placeholder='Sähköposti'
                        placeholderTextColor='silver'
                        style={styles.textInput}
                    />
                </View>

                <View style={styles.textInputContainer}>
                    <Octicons name={'key'} size={20} color={Colors.black} />
                    <TextInput 
                        value={password}
                        onChange={(text) => setPassword(text)}
                        placeholder='Salasana'
                        placeholderTextColor='silver'
                        secureTextEntry={true}
                        style={styles.textInput}
                    />
                </View>

                <TouchableOpacity style={styles.loginButton} onPress={() => handleRegister()}>
                    <Text style={styles.loginButtonText}>Luo käyttäjä</Text>
                </TouchableOpacity>

            </ScrollView>

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
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 60,
        backgroundColor: Colors.offWhite
    }
});