import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListScreen from '../screens/ListScreen';
import ModalScreen from '../screens/ModalScreen';
import StatScreen from '../screens/StatScreen';
import LoginScreen from '../screens/LoginScreen';

import {Ionicons} from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStackNavigator(){
    return(
        <NavigationContainer>
        <Stack.Navigator
            presentation='modal'
            headerMode='none'
            screenOptions={{
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: true,
                cardStyleInterpolator: ({ current: { progress } }) => ({
                    cardStyle: {
                        opacity: progress.interpolate({
                            inputRange: [0, 0.5, 0.9, 1],
                            outputRange: [0, 0.25, 0.7, 1]
                        })
                    },
                    overlayStyle: {
                        opacity: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.5],
                            extrapolate: 'clamp'
                        })
                    }
                })
        }}>

            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="List" component={MainTabNavigator}/>
            <Stack.Screen name="Modal" component={ModalScreen} />
            <Stack.Screen name="Stat" component={StatScreen} />


        </Stack.Navigator>
        </NavigationContainer>
    )
}


function MainTabNavigator () {
    return(
        

            <Tab.Navigator
                headerMode='none'
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;

                        if (route.name === 'ListSc'){
                            iconName = focused
                                ? 'card'
                                : 'card-outline';
                        }else if (route.name === 'Stat'){
                            iconName = focused
                                ? 'stats-chart'
                                : 'stats-chart-outline'

                        }

                        return <Ionicons name={iconName} size={size} color={color} />
                    },
                    tabBarActiveTintColor: '#7C99AC',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false,
                })}
            >

                <Tab.Screen name="ListSc" component={ListScreen}/>
                <Tab.Screen name="Stat" component={StatScreen} />

            </Tab.Navigator>

        
    )
}

export default MainStackNavigator;