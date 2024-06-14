import { View, TextInput, Text, Button, Keyboard, Alert, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { login, signUp } from '../redux/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../style';

export default function AuthScreen({ route, navigation }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [type, setType] = useState(route.params.type)
    const dispatch = useDispatch();

    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = () => {
        if (!handleIsValidEmail(email)) {
            Alert.alert('Hata', 'Geçerli bir e-posta adresi giriniz.');
            return;
        }
        if (!isLogin) {
            dispatch(login({ userInfo: { email, password } }));
            navigation.navigate('App');
        } else {
            dispatch(signUp({
                userInfo: {
                    email,
                    name,
                    password,
                }
            }));
            navigation.navigate('App');
        }
    };

    const handleIsValidEmail = (inputText) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(inputText);
        setEmail(inputText);
        return isValid;
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
            <View style={styles.authScreenHeader}>
                <TouchableOpacity onPress={() => setType('register')}>
                    <Text style={type === 'register' ? styles.activeHeaderText : styles.inactiveHeaderText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setType('login')}>
                    <Text style={type === 'login' ? styles.activeHeaderText : styles.inactiveHeaderText}>Log In</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.inputView}>
                    {type === 'register' && (
                        <TextInput
                            placeholder="Name"
                            value={name}
                            onChangeText={setName}
                            style={styles.authInput}
                        />
                    )}
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.authInput}
                    />
                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        style={styles.authInput}
                    />


                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>{type === 'login' ? 'Login' : 'Register'}</Text>
                    </TouchableOpacity>
                </View>
                {type === 'login' && (
                    <Text style={styles.passwordText}>Forgot your password?</Text>
                )}
            </View>
        </View>

    );
}
