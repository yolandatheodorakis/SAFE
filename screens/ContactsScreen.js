import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Octicons} from '@expo/vector-icons';

import Colors from '../constants/Colors';
import ContactsStore from '../stores/ContactsStore';

export default function ContactsScreen() {
    const navigation = useNavigation();
    const store = ContactsStore;

    const [number, setNumber] = useState('');
    const [trigger, setTrigger] = useState('');

    const addContactHandler = () => {
        const newContact = {phone: `+358${number}`};
        store.addNumber(newContact);
        setTrigger('added');
    };

    const deleteContactHandler = (contact) => {
        store.deleteNumber(contact);
        setTrigger('deleted');
    };

    const logout = () => {
        navigation.navigate('LoginScreen');
    };   
    
    useEffect(() => {
        setNumber('');
        setTrigger('');
    }, [trigger])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SAFE</Text>

            <ScrollView>
                
                {
                    store.numbers.map((item, index) => 
                        <View key={index} style={styles.numberContainer}>
                            <Text style={styles.numberText}>{item.phone}</Text>
                            <Octicons name={'trash'} size={20} color={Colors.black} onPress={() => deleteContactHandler(item)} />
                        </View>
                        
                    )
                }

                <View style={styles.textInputContainer}>
                    <Text style={styles.areaCodeText}>+358</Text>
                    <TextInput 
                        defaultValue={number}
                        onChangeText={(text) => setNumber(text)}
                        placeholder='Lisää numero'
                        placeholderTextColor='silver'
                        style={styles.textInput}
                    />
                    <Octicons name={'check-circle'} size={20} color={Colors.black} onPress={() => addContactHandler()} />
                </View>

            </ScrollView>

            <Text style={styles.logOutText} onPress={() => logout()}>Kirjaudu ulos</Text>
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
        marginBottom: 30,
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