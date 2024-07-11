import { Image } from 'react-native';
import { createStackNavigator, TransitionSpecs, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import MeditationProgram from '../screens/MeditationProgram';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import ProgramList from '../screens/ProgramList';
import MeditationPlayer from '../screens/MeditationPlayer';
import AuthScreen from '../screens/AuthScreen';
import MeditationArticles from '../screens/MeditationArticles';
import ArticleDetail from '../screens/ArticleDetail';
import AccountScreen from '../screens/AccountScreen';
import FavoritesScreen from '../screens/FavoritesScreen'
import React from 'react';
import FloatingPlayer from '../components/FloatingPlayer';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const DiscoverStackScreens = () => (
    <Stack.Navigator >
        <Stack.Screen name='Favorite' component={FavoritesScreen} options={{ headerShown: false, headerLeft: false }} />
        <Stack.Screen name='ArticleDetail' component={ArticleDetail} options={{ headerShown: false, headerLeft: false, gestureEnabled: false, }} />

    </Stack.Navigator>
);
const MeditationStackScreens = () => (
    <Stack.Navigator >
        <Stack.Screen name='Meditation ' component={HomeScreen} options={{ headerShown: false, headerLeft: false }} />
    </Stack.Navigator>
);
const MeditationArticleStackScreens = () => (
    <Stack.Navigator >
        <Stack.Screen name='Meditation Article' component={MeditationArticles} options={{ headerShown: false, headerLeft: false }} />
        <Stack.Screen name='ArticleDetail' component={ArticleDetail} options={{ headerShown: false, headerLeft: false, gestureEnabled: false, }} />

    </Stack.Navigator>
);
const UserStackScreens = () => (
    <Stack.Navigator >
        <Stack.Screen name='Account' component={AccountScreen} options={{ headerShown: false, headerLeft: false }} />
    </Stack.Navigator>
);

const TabNavigator = () => (
    <Tab.Navigator
        initialRouteName='Meditation'
        screenOptions={{
            tabBarInactiveTintColor: '#222',
            tabBarActiveTintColor: '#89051f',
            tabBarShowLabel: false
        }}>
        <Tab.Screen name="Favorites" component={DiscoverStackScreens} options={{
            headerShown: false, tabBarIcon: ({ color, focused }) => (
                <>
                    <Image
                        source={focused ? require('../assets/icons/heart.png') : require('../assets/icons/heart.png')}
                        style={{ width: 22, height: 22, tintColor: color }}
                    />
                </>
            ),
        }} />
        <Tab.Screen name="Meditation" component={MeditationStackScreens} options={{
            headerShown: false, tabBarIcon: ({ color, focused }) => (
                <>
                    <Image
                        source={focused ? require('../assets/icons/lotus.png') : require('../assets/icons/lotus.png')}
                        style={{ width: 25, height: 25, tintColor: color }}
                    />
                </>
            ),
        }} />
        <Tab.Screen name="MeditationArticle" component={MeditationArticleStackScreens} options={{
            headerShown: false, tabBarIcon: ({ color, focused }) => (
                <>
                    <Image
                        source={focused ? require('../assets/icons/edittext.png') : require('../assets/icons/edittext.png')}
                        style={{ width: 21, height: 21, tintColor: color }}
                    />
                </>
            ),
        }} />
        <Tab.Screen name="User" component={UserStackScreens} options={{
            headerShown: false, tabBarIcon: ({ color, focused }) => (
                <>
                    <Image
                        source={focused ? require('../assets/icons/people.png') : require('../assets/icons/people.png')}
                        style={{ width: 23, height: 23, tintColor: color }}
                    />
                </>
            ),
        }} />

    </Tab.Navigator>
);

export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Auth"
                    component={AuthScreen}
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                /> 
                <Stack.Screen
                    name="App"
                    component={TabNavigator}
                    options={{
                        headerShown: false,
                        gestureEnabled: false,
                    }}
                />
                <Stack.Screen name='meditationProgram' component={MeditationProgram} options={{ headerShown: false, headerLeft: false, gestureEnabled: false, }} />
                <Stack.Screen name='ProgramList' component={ProgramList} options={{ headerShown: false, headerLeft: false, gestureEnabled: false, }} />
                <Stack.Screen name='MeditationPlayer' component={MeditationPlayer} options={{
                    headerShown: false,
                    headerLeft: false,
                    gestureEnabled: false,
                    ...TransitionPresets.RevealFromBottomAndroid,
                }} />

            </Stack.Navigator>

        </NavigationContainer>
    );
}