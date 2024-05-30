import { View, Text, Button, ImageBackground, TouchableOpacity, Animated } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Audio } from 'expo-av';
import styles from '../style';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function MeditationPlayer({ route, navigation }) {
    const { item } = route.params;
    const animationValue = new Animated.Value(0);


    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);


    const toggleMeditation = async () => {
        Animated.timing(animationValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
        try {
            if (sound) {
                if (isPlaying) {
                    await sound.pauseAsync();
                } else {
                    await sound.playAsync();
                }
                setIsPlaying(!isPlaying);
            } else {
                const { sound } = await Audio.Sound.createAsync(
                    require('../assets/sounds/audiomass.mp3')
                );
                setSound(sound);
                await sound.playAsync();
                setIsPlaying(true);
            }
        } catch (error) {
            console.log('Error toggling sound: ', error);
        }
    };

    const stopMeditation = async () => {
        if (sound) {
            try {
                await sound.stopAsync();
                await sound.unloadAsync();
                setSound(null);
                setIsPlaying(false);
            } catch (error) {
                console.log('Error stopping sound: ', error);
            }
        }
    };

    {/* <Button title="Stop Meditation" onPress={stopMeditation} /> */ }

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={item.img}
                style={styles.backgroundImage}
            >
                <View style={styles.programListHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.9}>
                        <Icon name='arrow-back-outline' size={24} color="#fff" />
                    </TouchableOpacity>
                    <Icon name='heart-outline' size={24} color="#fff" />


                </View>
                <View style={styles.playView}>
                    <TouchableOpacity activeOpacity={0.8} onPress={toggleMeditation} style={styles.playViewCon}>
                        <FeatherIcon name={isPlaying ? 'pause' : 'play'} size={50} color="#fff" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}