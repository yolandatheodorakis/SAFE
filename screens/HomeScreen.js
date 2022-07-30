import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text, TouchableOpacity, Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Octicons} from '@expo/vector-icons';
import * as Location from 'expo-location';

import Colors from '../constants/Colors';
import ContactsStore from '../stores/ContactsStore';

export default function HomeScreen() {
    const navigation = useNavigation();
    const store = ContactsStore;

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    let coordinates;
    let message;
    let numbersList = [];

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
    
            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude);

            numbersList = store.numbers.map((item) => item.phone);
        })();
    }, []);

    if (errorMsg) {
        coordinates = errorMsg;
    } else if (latitude && longitude) {
        coordinates = `${JSON.stringify(latitude)}, ${JSON.stringify(longitude)}`;
        message = `Yolanda saattaa olla vaarassa sijainnissa: ${coordinates}`
    }

    const sendMessage = (phoneNumber, message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?';
        const url = `sms:${phoneNumber}${separator}body=${message}`;

        Linking.canOpenURL(url).then(supported => {
        if (!supported) {
            console.log('Unsupported url: ' + url)
        } else {
            return Linking.openURL(url)
        }
        }).catch(err => console.error('An error occurred', err))};

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SAFE</Text>

            <ScrollView>

                <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage(numbersList, message)}>
                    <Text style={styles.sendText}>LÄHETÄ SIJAINTITIEDOT</Text>
                </TouchableOpacity>

            </ScrollView>

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
        paddingVertical: 40
	},
    sendButton: {
        alignSelf: 'center',
        marginTop: 150,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderWidth: 1.5
    },
    sendText: {
        fontFamily: 'helvetica-nu',
        fontSize: 25,
        fontWeight: 'bold',
        color: Colors.black
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