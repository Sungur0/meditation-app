import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing, AppState } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setIsPlaying, setProgress, resetAudio } from '../redux/audioSlice';
import { addListeningTime } from '../redux/UserSlice';
import { useAudio } from '../context/AudioContext';
import styles from '../style';
import { API_HASH } from '../constant'


const FloatingPlayer = () => {
    const dispatch = useDispatch();
    const { sound, unloadSound } = useAudio();
    const navigation = useNavigation();
    const { isPlaying, progress, duration, currentItem, selectedTime } = useSelector((state) => state.audio);
    const progressAnim = useRef(new Animated.Value(0)).current;
    const appState = useRef(AppState.currentState);
    const user = useSelector((state) => state.user);

    const togglePlayPause = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            dispatch(setIsPlaying(!isPlaying));
        }
    };

    const stopMeditation = async () => {
        if (sound) {
            try {
                const status = await sound.getStatusAsync();
                const listenedSeconds = Math.floor(status.positionMillis / 1000);
                dispatch(addListeningTime({ listeningTime: listenedSeconds }));
                
                await sound.stopAsync();
                await unloadSound();
                dispatch(resetAudio());

                try {
                    const updatedListeningTime = parseInt(user.userInfo.userdata_meditationstime, 10) + listenedSeconds

                    const listeningTimeRequestData = {
                        hash: API_HASH,
                        userdata_id: user.userInfo.userdata_id,
                        userdata_meditationstime: updatedListeningTime
                    };

                    const listeningTimeResponse = await fetch('https://lafagency.com/meditation/admin/Api/updatemeditationstimedata', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(listeningTimeRequestData)
                    });

                    if (!listeningTimeResponse.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const listeningTimeData = await listeningTimeResponse.json();
                    console.log(listeningTimeData);
                    console.log('Success:', listeningTimeData);
                } catch (error) {
                    console.error('Error updating listening time:', error);
                }
                
            } catch (error) {
                console.log('Error stopping sound: ', error);
            }
        }
    };

    useEffect(() => {
        const subscription = AppState.addEventListener("change", handleAppStateChange);

        return () => {
            subscription.remove();
        };
    }, []);

    const handleAppStateChange = async (nextAppState) => {
        if (appState.current.match(/inactive|background/) && nextAppState === "active") {
            console.log("App has come to the foreground!");
        } else if (nextAppState.match(/inactive|background/)) {
            console.log("App has gone to the background!");
            if (sound && isPlaying) {
                await sound.pauseAsync();
                dispatch(setIsPlaying(false));
            }
        }
        appState.current = nextAppState;
    };

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
    }, [sound, selectedTime, dispatch]);

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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.currentItemText}>
                        {formattedTime(progress * duration)}
                    </Text>
                </View>

                <View style={{ flex: 2, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('MeditationPlayer', { item: currentItem })}>
                        <Text style={styles.currentItemText}>{currentItem.name}</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={togglePlayPause}>
                        <FeatherIcon name={isPlaying ? 'pause' : 'play'} size={19} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={stopMeditation} style={{ marginLeft: 20 }}>
                        <FeatherIcon name='x' size={19} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.progressContainer}>
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
