import { View, TextInput, Text, Alert, Animated, TouchableWithoutFeedback, TouchableOpacity, Easing } from 'react-native';
import React, { useState, useRef } from 'react';
import { login, signUp } from '../redux/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../style';
import { MD5 } from 'crypto-js';
import PhoneInput from 'react-native-international-phone-number'



export default function AuthScreen({ route, navigation }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('')
    const [type, setType] = useState(route.params.type)
    const [tel, setTel] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    const [isLogin, setIsLogin] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordMatched, setIsPasswordMatched] = useState(false);
    const [criteria, setCriteria] = useState({
        lengthCriteria: false,
        upperCaseCriteria: false,
        lowerCaseCriteria: false,
        numberCriteria: false,
    });

    const dispatch = useDispatch();


    const handleSubmit = () => {
        if (!name || !email || !password || !tel) {
            Alert.alert('Error', 'All fields must be filled.');
            return;
        }

        if (!handleIsValidEmail(email)) {
            Alert.alert('Error', 'Enter a valid email address.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }
        const { lengthCriteria, upperCaseCriteria, lowerCaseCriteria, numberCriteria } = criteria;

        if (!lengthCriteria || !upperCaseCriteria || !lowerCaseCriteria || !numberCriteria) {
            Alert.alert('Error', 'Password does not meet the required criteria.');
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
                    tel,
                    country: selectedCountry
                }
            }));
            navigation.navigate('App');
        }
    };

    const handleIsValidPassword = (inputText) => {
        const lengthCriteria = inputText.length >= 8;
        const upperCaseCriteria = /[A-Z]/.test(inputText);
        const lowerCaseCriteria = /[a-z]/.test(inputText);
        const numberCriteria = /\d/.test(inputText);
        return {
            lengthCriteria,
            upperCaseCriteria,
            lowerCaseCriteria,
            numberCriteria,
        };
    };



    const handlePasswordChange = (inputText) => {
        const validationResults = handleIsValidPassword(inputText);
        const { lengthCriteria, upperCaseCriteria, lowerCaseCriteria, numberCriteria } = validationResults;

        setPassword(inputText);
        setCriteria(validationResults);

        setIsPasswordValid(lengthCriteria && upperCaseCriteria && lowerCaseCriteria && numberCriteria);
    };
    const handleConfirmPasswordChange = (inputText) => {
        setConfirmPassword(inputText);
        setIsPasswordMatched(inputText === password);
    };
    function handleInputValue(phoneNumber) {
        setTel(phoneNumber);
    }

    function handleSelectedCountry(country) {
        setSelectedCountry(country);
    }

    const handleFocus = () => {
        setIsFocused(true);
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    };

    const handleBlur = () => {
        setIsFocused(false);
        Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.ease,
        }).start();
    };


    const animatedStyle = {
        opacity: animation,
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0]
                })
            }
        ]
    };
    const handleIsValidEmail = (inputText) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
                        <>
                            <TextInput
                                placeholder="Name"
                                value={name}
                                onChangeText={setName}
                                style={styles.authInput}
                            />

                            <PhoneInput
                                value={tel}
                                onChangePhoneNumber={handleInputValue}
                                selectedCountry={selectedCountry}
                                onChangeSelectedCountry={handleSelectedCountry}
                                defaultCountry='US'
                                placeholder='Phone Number'
                                phoneInputStyles={{
                                    container: {
                                        height: 45,
                                        marginVertical: 5
                                    },
                                    input: {
                                        fontFamily: 'Montserrat-Regular',
                                        fontSize: 14
                                    }
                                }}
                            />
                        </>

                    )}
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.authInput}
                    />
                    <TouchableWithoutFeedback onPress={() => handleFocus()}>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={handlePasswordChange}
                            style={[styles.authInput, isPasswordValid && styles.validPassword]}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </TouchableWithoutFeedback>
                    {isFocused && type === 'register' && (
                        <Animated.View style={[styles.criteriaContainer, animatedStyle]}>
                            <Text style={criteria.lengthCriteria ? styles.valid : styles.invalid}>At least 8 characters</Text>
                            <Text style={criteria.upperCaseCriteria ? styles.valid : styles.invalid}>At least one uppercase letter</Text>
                            <Text style={criteria.lowerCaseCriteria ? styles.valid : styles.invalid}>At least one lowercase letter</Text>
                            <Text style={criteria.numberCriteria ? styles.valid : styles.invalid}>At least one number</Text>
                        </Animated.View>
                    )}
                    <TextInput
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                        style={[styles.authInput, ]}
                        onBlur={handleBlur}
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
