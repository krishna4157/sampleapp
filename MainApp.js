// Import Dependencies
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { TouchableOpacity } from 'react-native';
// Import Containers
import LoginPage from './Containers/LoginPage';
import HomePage from './Containers/HomePage';
import MapViewPage from './Containers/MapViewPage';

// Import Components
import { CustomText } from './Components/CustomText';

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
                screenOptions={({ navigation, route }) => ({
                    animation: 'slide_from_right',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#27dd93',
                    },
                    headerLeft: () => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}>
                                <CustomText style={{ color: 'white' }}>{'Back'}</CustomText>
                            </TouchableOpacity>
                        );
                    },
                    headerTintColor: '#fff',
                })}>
                <Stack.Screen
                    options={{ headerShown: false }}
                    name="LoginScreen"
                    component={LoginPage}
                />
                <Stack.Screen name="MapScreen" component={MapViewPage} />
                <Stack.Screen
                    options={{
                        headerBackVisible: false,
                        headerLeft: () => <></>,
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
