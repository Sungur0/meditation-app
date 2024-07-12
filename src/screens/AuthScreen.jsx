import { View, TextInput, Text, Alert, Animated, TouchableWithoutFeedback, TouchableOpacity, Easing } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { login, signUp } from '../redux/UserSlice';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../style';
import { MD5 } from 'crypto-js';
import PhoneInput from 'react-native-international-phone-number'
import { API_HASH } from '../constant'
import AsyncStorage from '@react-native-async-storage/async-storage';


// useEffect(() => {


//     const checkLoggedIn = async () => {
//         try {
//             const userData = await AsyncStorage.getItem('userData');

//             const updateUserData = JSON.parse(userData);

//             const response = await fetch('https://lafagency.com/cocktail/admin/Api/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(updateUserData),
//             });

//             const userDataResponse = await response.json();

//             if (userDataResponse.message == 1) {
//                 console.log('Üye giriş yaptı');
//                 dispatch(login({ userInfo: userDataResponse.data }));
//             } else {
//             }

//         } catch (error) {
//             console.log('Oturum bilgileri çekilirken bir hata oluştu:', error);
//         }
//     };

//     checkLoggedIn()
// }, [deviceId]);

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

    useEffect(() => {
        if (type === 'login') {
            setIsLogin(false);
        } else if (type === 'register') {
            setIsLogin(true);
        }
    }, [type]);


    const phoneNumber = `${selectedCountry?.callingCode} ${tel}`;

    const handleSubmit = async () => {
        // if (!name || !email || !password || !tel) {
        //     Alert.alert('Error', 'All fields must be filled.');
        //     return;
        // }

        if (!handleIsValidEmail(email)) {
            Alert.alert('Error', 'Enter a valid email address.');
            return;
        }
        const { lengthCriteria, upperCaseCriteria, lowerCaseCriteria, numberCriteria } = criteria;

        if (!lengthCriteria || !upperCaseCriteria || !lowerCaseCriteria || !numberCriteria) {
            Alert.alert('Error', 'Password does not meet the required criteria.');
            return;
        }

        // if (password !== confirmPassword) {
        //     Alert.alert('Error', 'Passwords do not match.');
        //     return;
        // }

        try {
            if (!isLogin) {
                const requestData = {
                    email,
                    password: MD5(password).toString(),
                };

                const response = await fetch('https://lafagency.com/meditation/admin/Api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });
                const responseData = await response.json();

                if (responseData.message == 1) {
                    await AsyncStorage.setItem('userData', JSON.stringify({ email, password: MD5(password).toString(), }));
                    console.log('Üye giriş yaptı');
                    dispatch(login({ userInfo: responseData.data }));
                    navigation.navigate('App');
                } else {
                    console.error(responseData.message);
                    Alert.alert('Error', responseData.message);
                }
            } else {
                const requestData = {
                    name,
                    email,
                    password: MD5(password).toString(),
                    tel: phoneNumber,
                    hash: API_HASH
                };

                const response = await fetch('https://lafagency.com/meditation/admin/Api/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                const responseData = await response.json();

                console.log(responseData);
                if (responseData.message == 1) {
                    console.log('Üye başarıyla oluşturuldu');

                    await AsyncStorage.setItem('userData', JSON.stringify({ email, password: MD5(password).toString(), hash: API_HASH }));

                    dispatch(signUp({ userInfo: responseData.data }));
                    navigation.navigate('App');
                } else {
                    console.log(responseData.message);
                    Alert.alert('Error', responseData.message);
                }
            }
        } catch (error) {
            console.log('İstek gönderilirken bir hata oluştu:', error);
            Alert.alert('Error', 'İstek gönderilirken bir hata oluştu.');
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

    const handleRegisterType = () => {
        setIsLogin(true)
        setType('register')
    }
    const handleLoginType = () => {
        setIsLogin(false)
        setType('login')
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', }}>
            <View style={styles.authScreenHeader}>
                <TouchableOpacity onPress={handleRegisterType}>
                    <Text style={type === 'register' ? styles.activeHeaderText : styles.inactiveHeaderText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLoginType}>
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

                    {type === 'register' && (
                        <>
                            
                            <TextInput
                                placeholder="Confirm Password"
                                secureTextEntry
                                value={confirmPassword}
                                onChangeText={handleConfirmPasswordChange}
                                style={[styles.authInput, , isPasswordMatched && styles.validPassword]}
                            />
                        </>

                    )}
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>{type === 'login' ? 'Login' : 'Register'}</Text>
                    </TouchableOpacity>
                </View>
                {/* {type === 'login' && (
                    <Text style={styles.passwordText}>Forgot your password?</Text>
                )} */}
            </View>
        </View>

    );
}
