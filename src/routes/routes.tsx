import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Home } from '../pages/Home/Home';
import { Login } from '../pages/Login/Login';

const StackNavigation = createNativeStackNavigator();

const Routes = () => {
    return(
        <NavigationContainer>
            <StackNavigation.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <StackNavigation.Screen name='Login' component={Login}/>
                <StackNavigation.Screen name='Home' component={Home}/>
            </StackNavigation.Navigator>
        </NavigationContainer>
    )   
}

export default Routes;