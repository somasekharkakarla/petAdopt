import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
    ADDRESS_SCREEN,
    DETAIL_SCREEN,
    HOME_SCREEN,
    LOGIN_SCREEN,
    PAYMENT_SCREEN,
    SPLASH_SCREEN,
} from "./src/Routes.ts";
import HomeScreen from "./src/screens/HomeScreen/HomeScreen.tsx";
import SplashScreen from "./src/screens/SplashScreen/SplashScreen.tsx";
import LoginScreen from "./src/screens/LoginScreen/LoginScreen.tsx";
import DetailScreen from "./src/screens/DetailScreen/DetailScreen.tsx";
import AddressScreen from "./src/screens/AddressScreen/AddressScreen.tsx";
import PaymentScreen from "./src/screens/PaymentScreen/PaymentScreen.tsx";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                headerShown: false
                }}
                initialRouteName={SPLASH_SCREEN} >
                <Stack.Screen
                    name={SPLASH_SCREEN}
                    component={SplashScreen}
                />
                <Stack.Screen
                    name={LOGIN_SCREEN}
                    component={LoginScreen}
                />
                <Stack.Screen
                    name={HOME_SCREEN}
                    component={HomeScreen}
                />
                <Stack.Screen
                    name={DETAIL_SCREEN}
                    component={DetailScreen}
                />
                <Stack.Screen
                    name={ADDRESS_SCREEN}
                    component={AddressScreen}
                />
                <Stack.Screen
                    name={PAYMENT_SCREEN}
                    component={PaymentScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

