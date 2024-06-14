import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setIsPlaying, setProgress } from '../redux/audioSlice';
import { useAudio } from '../context/AudioContext';
import styles from '../style';
const FloatingPlayer = () => {
    const dispatch = useDispatch();
    const { sound } = useAudio();
    const navigation = useNavigation();
    const { isPlaying, progress, duration, currentItem, selectedTime } = useSelector((state) => state.audio);
    const progressAnim = useRef(new Animated.Value(0)).current;

    // const togglePlayPause = async () => {
    //     if (sound) {
    //         if (isPlaying) {
    //             await sound.pauseAsync();
    //         } else {
    //             await sound.playAsync();
    //         }
    //         dispatch(setIsPlaying(!isPlaying));
    //     }
    // };

    useEffect(() => {
        if (sound) {
            const interval = setInterval(async () => {
                const status = await sound.getStatusAsync();
                if (status.isLoaded) {
                    const currentProgress = status.positionMillis / (selectedTime * 60000);
                    dispatch(setProgress(currentProgress));

                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [sound,selectedTime, dispatch]);

    const formattedTime = (millis) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = Math.floor((millis % 60000) / 1000).toFixed(0);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: progress,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [progress]);

    if (!sound) return null;

    return (
        <View style={{ position: 'absolute', zIndex: 1, right: 0, left: 0, bottom: 0, backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.currentItemText}>
                    {formattedTime(progress * duration)}
                </Text>

                <Text style={styles.currentItemText}>{currentItem.name}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('MeditationPlayer', { item: currentItem })}>
                    <FeatherIcon name='maximize-2' size={19} color="#000" />
                </TouchableOpacity>
            </View>

            <View style={styles.progressContainer} >
                <Animated.View style={[styles.progressBar, {
                    width: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%']
                    })
                }]} />
            </View>

        </View>
    );
};

export default FloatingPlayer;