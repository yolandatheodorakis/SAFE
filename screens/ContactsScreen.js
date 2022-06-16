import React from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Octicons} from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function ContactsScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SAFE</Text>

            <ScrollView>

                

                <View style={styles.numberContainer}>
                    <Text style={styles.numberText}>+358401234567</Text>
                    <Octicons name={'trash'} size={20} color={Colors.black} />
                </View>

                <View style={styles.numberContainer}>
                    <Text style={styles.numberText}>+358409873210</Text>
                    <Octicons name={'trash'} size={20} color={Colors.black} />
                </View>

                <View style={styles.textInputContainer}>
                    <Text style={styles.areaCodeText}>+358</Text>
                    <TextInput 
                        placeholder='Lisää numero'
                        placeholderTextColor='silver'
                        style={styles.textInput}
                    />
                    <Octicons name={'check-circle'} size={20} color={Colors.black} />
                </View>

            </ScrollView>

            <Text style={styles.logOutText} onPress={() => navigation.navigate('LoginScreen')}>Kirjaudu ulos</Text>
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomeScreen')}>
                    <Octicons name={'home'} size={25} color={Colors.sage} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ContactsScreen')}>
                    <Octicons name={'person'} size={25} color={Colors.sage} />
                </TouchableOpacity>
            </View>

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
    numberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
        height: 40
    },
    numberText: {
        fontFamily: 'helvetica-nu',
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black,
        borderWidth: 1.5,
        borderColor: Colors.black,
        width: '40%',
        marginRight: 15,
        paddingLeft: 5,
        paddingVertical: 5
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 47,
        marginBottom: 20,
        paddingBottom: 5
    },
    areaCodeText: {
        fontFamily: 'helvetica-nu',
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black
    },
    textInput: {
        fontFamily: 'helvetica-nu',
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black,
        borderBottomWidth: 1.5,
        borderBottomColor: Colors.black,
        width: '46%',
        height: 40,
        marginHorizontal: 10
    },
    logOutText: {
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
    },
    navButton: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});