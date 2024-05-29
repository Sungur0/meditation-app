import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, TouchableOpacity, Text } from 'react-native';


const SplashScreen = ({ navigation }) => {
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoPosition = useRef(new Animated.Value(0)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(logoPosition, {
                toValue: -100,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(buttonOpacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ]).start();
    }, []);
    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('../assets/icons/lotus.png')}
                style={[
                    styles.logo,
                    { opacity: logoOpacity, transform: [{ translateY: logoPosition }] }
                ]}
            />
            <Animated.View style={{ opacity: buttonOpacity }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Auth', { type: 'login' })}
                    style={[styles.button, styles.loginButton]}>
                    <Text style={[styles.buttonText, styles.buttonText2]}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Auth', { type: 'register' })}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 150,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#262C40',
        padding: 10,
        marginVertical: 5,
        borderRadius: 12,
        width: 270,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#262C40'
    },
    buttonText2: {
        color: '#222',
    }
});


export default SplashScreen;
