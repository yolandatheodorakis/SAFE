import React, {useState, useEffect} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {RootSiblingParent} from 'react-native-root-siblings';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Colors from './constants/Colors';
import HomeScreen from './screens/HomeScreen';

export default function App(props) {

	const [isLoadingComplete, setLoadingComplete] = useState(false);

	// Load any resources or data that is needed prior to rendering the app
	useEffect(() => {
	  async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHideAsync();

				// Load fonts
				await Font.loadAsync({
					'helvetica-nu': require('./assets/fonts/Helvetica-Neue-UltraLight.ttf'),
					'prisma': require('./assets/fonts/Prisma.ttf'),
				});
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			} finally {
				setLoadingComplete(true);
				SplashScreen.hideAsync();
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	if (!isLoadingComplete && !props.skipLoadingScreen) {
		return null;
	} else {
		return (
            <RootSiblingParent>
				<SafeAreaProvider>
					<View style={styles.container}>
						{Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                        <HomeScreen />
					</View>
				</SafeAreaProvider>
            </RootSiblingParent>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.sage
	}
});