// Import Dependencies
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

// Import Containers
import LoginPage from './Containers/LoginPage';
import HomePage from './Containers/HomePage';
import MapViewPage from './Containers/MapViewPage';

// Import Store
import { store } from './Redux/Store';

// Stack Navigation
const Stack = createNativeStackNavigator();

// Main Component for Navigating Screens
function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="LoginScreen"
                screenOptions={{
                    animation: 'slide_from_right',
                }}>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="LoginScreen"
                    component={LoginPage}
                />
                <Stack.Screen name="MapScreen" component={MapViewPage} />
                <Stack.Screen
                    options={{
                        headerBackVisible: false,
                    }}
                    name="HomeScreen"
                    component={HomePage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function MainApp() {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    );
}

export default MainApp;
