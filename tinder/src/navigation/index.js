import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';

import { updateAuth, updateSettings } from '../redux/action';
import { store } from '../redux/store';
import InternalChatScreen from '../screens/chatScreen';
import ContactScreen from '../screens/contactScreen';
import loginScreen from '../screens/loginScreen';
import ProfileScreen from '../screens/profileScreen';
import registerScreen from '../screens/registerScreen';
import resetPasswordScreen from '../screens/resetPasswordScreen.js';
import settingsScreen from '../screens/settingsScreen';
import SwipeScreen from '../screens/swipeScreen';
import { accent, bgRootcolor, bgColor, black, defaultStyles } from '../styles'

const Chat = createStackNavigator();
const Root = createStackNavigator();
const Main = createBottomTabNavigator();
var realname = '';

const ChatScreen = () => {
    return (
        <Chat.Navigator screenOptions={{ headerShown: false }}>
            <Chat.Screen name='Contacts'>
            {props => <ContactScreen {...props} name={realname} />}
            </Chat.Screen>
            <Chat.Screen name='Chat'>
            {props => <InternalChatScreen {...props} name={realname} />}
            </Chat.Screen>
        </Chat.Navigator>
    )
}

const MainScreen =()=> {
    return (
        <Main.Navigator
            initialRouteName={'Chat'}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = ''
                    switch (route.name) {
                        case 'Profile':
                            iconName = focused ? 'account-circle' : 'account-circle-outline';
                            break;
                        case 'Swipe':
                            iconName = 'gesture-swipe'
                            break;
                        case 'Chat':
                            iconName = focused ? 'message-processing' : 'message-processing-outline';
                            break;    
                        case 'Settings':
                            iconName = focused ? 'dots-horizontal-circle' : 'dots-horizontal-circle-outline';
                            break;
                        default:
                            break;
                    }
                    return <Icon name={iconName} size={size} color={color} />
                }
            })}
            tabBarOptions={{
                activeTintColor: accent,
                inactiveTintColor: black,
                activeBackgroundColor: bgColor,
                inactiveBackgroundColor: bgColor,
                showLabel: false,
            }}
        >

            <Main.Screen name='Profile' >
            {props => <ProfileScreen {...props} name={realname} />}
            </Main.Screen>
            <Main.Screen name='Swipe' >
            {props => <SwipeScreen {...props} name={realname} />}
            </Main.Screen>
            <Main.Screen name='Chat' component={ChatScreen} />
            <Main.Screen name='Settings' component={settingsScreen} />
        </Main.Navigator>
    )
}

class AppNav extends React.Component {

    constructor(props) {
        super(props);
        if (props.auth === null || Object.keys(props.auth).length === 0) {
            const defaultAuth = {
                loggedin: false
            }
            store.dispatch(updateAuth(defaultAuth));
        }
        if (props.settings === null || Object.keys(props.settings).length === 0) {
            store.dispatch(updateSettings(defaultStyles));
        }
    }

    render() {
        realname = this.props.auth.name;
        return (
            <NavigationContainer>
                <Root.Navigator screenOptions={{ headerShown: false }}>
                    {
                        !this.props.auth.loggedin ? (
                            <>
                                
                                <Root.Screen name='Login' component={loginScreen} />
                                <Root.Screen name='Register' component={registerScreen} />
                                <Root.Screen name= 'ResetPassword' component={resetPasswordScreen} />
                                
                            </>
                        ) : (
                            <Root.Screen name= 'Main' component={MainScreen} />
                            )
                    }
                </Root.Navigator>
            </NavigationContainer>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    settings: state.settings,
})

export default connect(mapStateToProps)(AppNav);