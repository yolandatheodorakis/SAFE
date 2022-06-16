import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateNewUserScreen from '../screens/CreateNewUserScreen';
import ContactsScreen from '../screens/ContactsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerMode: 'screen',
                    headerTransparent: true
                }}
            >

                <Stack.Screen name='LoginScreen' options={{headerShown: false}} component={LoginScreen} />
                <Stack.Screen name='HomeScreen' options={{headerShown: false}} component={HomeScreen} />
                <Stack.Screen name='CreateNewUserScreen' options={{title: false}} component={CreateNewUserScreen} />
                <Stack.Screen name='ContactsScreen' options={{headerShown: false}} component={ContactsScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}