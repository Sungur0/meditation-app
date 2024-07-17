import { View, Text, Button, ImageBackground, TouchableOpacity, Alert, Animated, PanResponder } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import styles from '../style';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import TimerPicker from '../components/TimePicker';
import CircularProgress from '../components/CircularProgress';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { BlurView } from 'expo-blur';
import { addFavorite, removeFavorite, setCompletedSongs, addListeningTime } from '../redux/UserSlice';
import { useAudio } from '../context/AudioContext';
import {
    setSound,
    setIsPlaying,
    setProgress,
    setDuration,
    setSelectedTime,
    resetAudio,
    setCurrentItem
} from '../redux/audioSlice';
import { API_HASH } from '../constant'
import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function MeditationPlayer({ route, navigation }) {
    const { item } = route.params;
    const dispatch = useDispatch();
    const { isPlaying, progress, duration, selectedTime, currentItem } = useSelector((state) => state.audio);
    const { sound, loadSound, unloadSound } = useAudio();
    const intervalRef = useRef(null);
    const user = useSelector((state) => state.user);
    // const isFavorite = user.userInfo.favorites.programs.includes(item.id);
    const [isFavorited, setIsFavorited] = useState(false);
    const [bgMusic, setBgMusic] = useState(false)

    useEffect(() => {
        dispatch(setCurrentItem(item));
    }, [dispatch]);

    useEffect(() => {
        let favoritesArray = [];

        try {
            favoritesArray = JSON.parse(user.userInfo.userdata_favorites_meditation || '[]');
        } catch (e) {
            favoritesArray = [];
        }

        if (favoritesArray.includes(item.id.toString())) {
            setIsFavorited(true);
        }
    }, [user.userInfo.userdata_favorites_article, item.id]);

    const handleToggleFavorite = async () => {
        try {
            let jsonString = user.userInfo.userdata_favorites_meditation;

            if (jsonString == null || jsonString === '') {
                jsonString = '[]';
            }

            let favoritesArray = JSON.parse(jsonString);

            const apiUrl = 'https://lafagency.com/meditation/admin/Api/updatefavoritesmeditation';

            let updatedFavorites;

            if (isFavorited) {
                favoritesArray = favoritesArray.filter(id => id !== item.id.toString());
                updatedFavorites = favoritesArray;
                dispatch(removeFavorite({ id: item.id, type: 'program' }));
                setIsFavorited(false);
            } else {
                if (!favoritesArray.includes(item.id.toString())) {
                    updatedFavorites = [...favoritesArray, item.id.toString()];
                    favoritesArray.push(item.id.toString());
                    dispatch(addFavorite({ id: item.id, type: 'program' }));
                    setIsFavorited(true);
                }
            }

            const userData = {
                userdata_favorites_meditation: JSON.stringify(updatedFavorites),
                hash: API_HASH,
                userdata_id: user.userInfo.userdata_id,
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Failed to update favorites');
            }

            console.log('Favorites updated successfully');
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };
    const [translateY] = useState(new Animated.Value(0));

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dy > 0,
        onPanResponderMove: (evt, gestureState) => {
            if (gestureState.dy > 0) {
                translateY.setValue(gestureState.dy);
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (gestureState.dy > 100) {
                navigation.goBack();
            } else {
                Animated.spring(translateY, {
                    toValue: 0,
                    useNativeDriver: true,
                }).start();
            }
        },
    });

    const animatedStyle = {
        transform: [{ translateY: translateY }],
        height: '100%',
    };

    useEffect(() => {
        const handleNewItem = async () => {
            if (currentItem && currentItem.id !== item.id) {
                if (sound) {
                    const status = await sound.getStatusAsync();
                    const listenedSeconds = Math.floor(status.positionMillis / 1000);
                    dispatch(addListeningTime({ listeningTime: listenedSeconds }));
                    await stopMeditation();
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
                }
                dispatch(resetAudio());
            }
        };
        handleNewItem();
    }, [item]);

    useEffect(() => {
        if (sound) {
            const onPlaybackStatusUpdate = (status) => {
                if (status.isLoaded) {
                    const currentProgress = status.positionMillis / (selectedTime * 60000);
                    dispatch(setProgress(currentProgress));
                    if (status.didJustFinish) {
                        dispatch(setIsPlaying(false));
                        sound.setPositionAsync(0);
                    }
                }
            };
            sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

            return () => {
                sound.setOnPlaybackStatusUpdate(null);
            };
        }
    }, [sound, selectedTime]);

    useEffect(() => {
        if (isPlaying && selectedTime > 0) {
            intervalRef.current = setInterval(async () => {
                const status = await sound.getStatusAsync();
                if (status.positionMillis >= selectedTime * 60000) {
                    dispatch(setCompletedSongs());
                    dispatch(addListeningTime({ listeningTime: selectedTime * 60 }));
                    stopMeditation();

                    try {
                        const updatedMeditationCount = parseInt(user.userInfo.userdata_meditations, 10) + 1;

                        const meditationRequestData = {
                            hash: API_HASH,
                            userdata_id: user.userInfo.userdata_id,
                            userdata_meditations: updatedMeditationCount
                        };

                        const meditationResponse = await fetch('https://lafagency.com/meditation/admin/Api/updatemeditationdata', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(meditationRequestData)
                        });

                        if (!meditationResponse.ok) {
                            throw new Error('Network response was not ok');
                        }

                        const meditationData = await meditationResponse.json();
                        console.log(meditationData);
                        console.log('Success:', meditationData);
                    } catch (error) {
                        console.error('Error updating meditation data:', error);
                    }

                    try {
                        const updatedListeningTime = parseInt(user.userInfo.userdata_meditationstime, 10) + (selectedTime * 60);

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
                }
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }
    }, [isPlaying, selectedTime]);

    const toggleMeditation = async () => {
        try {
            if (!selectedTime) {
                Alert.alert('Uyarı', 'Lütfen bir süre seçiniz.');
                return;
            }
            if (sound) {
                const status = await sound.getStatusAsync();
                if (isPlaying) {
                    await sound.pauseAsync();
                } else {
                    if (status.positionMillis >= selectedTime * 60000) {
                        await sound.setPositionAsync(0);
                    }
                    await sound.playAsync();
                }
                dispatch(setIsPlaying(!isPlaying));
            } else {
                const newSound = await loadSound(item.sound);
                await newSound.playAsync();
                dispatch(setIsPlaying(true));
                dispatch(setDuration(selectedTime * 60000));
            }
        } catch (error) {
            console.log('Error toggling sound: ', error);
        }
    };

    const stopMeditation = async () => {
        if (sound) {
            try {
                await sound.stopAsync();
                await unloadSound();
                dispatch(resetAudio());
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            } catch (error) {
                console.log('Error stopping sound: ', error);
            }
        }
    };

    const toggleBackgroundMusic = async () => {
        if (bgMusic) {
            navigation.navigate('Meditation');
        } else {
            if (sound) {
                const status = await sound.getStatusAsync();
                const listenedSeconds = Math.floor(status.positionMillis / 1000);
                dispatch(addListeningTime({ listeningTime: listenedSeconds }));
            }
            await stopMeditation();
            navigation.navigate('Meditation');
        }
    };


    const handleBackPress = () => {
        if (isPlaying) {
            navigation.navigate('Meditation ')
        } else {
            navigation.goBack();

        }
    };

    const handleSelectTime = async (time) => {
        if (sound) {
            const status = await sound.getStatusAsync();
            const listenedSeconds = Math.floor(status.positionMillis / 1000);
            dispatch(addListeningTime({ listeningTime: listenedSeconds }));

            await sound.pauseAsync();
            await dispatch(setIsPlaying(false));
            await sound.setPositionAsync(0);
        }
        dispatch(setSelectedTime(time));
        dispatch(setDuration(time * 60000));
    };
    return (

        <View style={{ flex: 1 }}>
            <Animated.View style={[{ flex: 1 }, animatedStyle]} {...panResponder.panHandlers}>
                <ImageBackground
                    source={item.img}
                    style={styles.backgroundImage}
                >
                    <View style={styles.programListHeader}>
                        <TouchableOpacity onPress={handleBackPress} activeOpacity={0.9}>
                            <Icon name='arrow-back-outline' size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleToggleFavorite} activeOpacity={0.9}>
                        <Icon name={isFavorited ? 'heart-sharp' : 'heart-outline'} size={24} color="#fff" />
                        </TouchableOpacity >
                    </View>
                    <View style={styles.playView}>
                        <BlurView intensity={40} style={styles.playOverlay} />


                        {/* <View style={styles.playOverlay} ></View> */}
                        <TouchableOpacity activeOpacity={0.8} onPress={toggleMeditation} style={styles.playViewCon}>
                            <BlurView intensity={40} style={styles.absolute} />
                            <FeatherIcon name={isPlaying ? 'pause' : 'play'} size={50} color="#EC8222" />
                        </TouchableOpacity>
                        {isPlaying && (
                            <View style={{ position: 'absolute', top: -26, left: 0, right: 0, justifyContent: 'center', alignItems: 'center', zIndex: 0 }}>
                                <CircularProgress radius={100} strokeWidth={5} progress={progress * 100} />
                            </View>
                        )}
                    </View>
                    <View style={styles.progressTime}>
                        <Text style={styles.progressTimeText}>
                            {new Date(progress * duration).toISOString().substr(14, 5)} / {new Date(duration).toISOString().substr(14, 5)}
                        </Text>
                    </View>
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,1)']}
                        style={{ height: '40%', position: 'absolute', bottom: 0, zIndex: 0, left: 0, right: 0 }}
                    />
                    <View style={styles.meditationProgramName}>
                        <Text style={styles.meditationProgramNameText}>{item.name}</Text>
                    </View>

                    <View style={styles.programTimerView}>
                        <FeatherIcon name='clock' size={25} color="#fff" />
                        <TimerPicker onSelectTime={handleSelectTime} />
                    </View>

                </ImageBackground>
            </Animated.View>
        </View>
    )
}