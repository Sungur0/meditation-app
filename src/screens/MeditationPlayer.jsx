import { View, Text, Button, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import styles from '../style';
import Icon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Audio } from 'expo-av';
import TimerPicker from '../components/TimePicker';
import CircularProgress from '../components/CircularProgress';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/UserSlice';
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

export default function MeditationPlayer({ route, navigation }) {
    const { item } = route.params;
    const dispatch = useDispatch();
    const { isPlaying, progress, duration, selectedTime,currentItem } = useSelector((state) => state.audio);
    const { sound, loadSound, unloadSound } = useAudio();
    const intervalRef = useRef(null);

    const user = useSelector((state) => state.user);
    const isFavorite = user.userInfo.favorites.programs.includes(item.id);
    const [isFavorited, setIsFavorited] = useState(isFavorite);


    console.log(item)

    useEffect(() => {
        dispatch(setCurrentItem(item));
    }, [dispatch]);

    useEffect(() => {
        setIsFavorited(isFavorite);
    }, [isFavorite]);

    const handleToggleFavorite = () => {
        if (isFavorited) {
            dispatch(removeFavorite({ id: item.id, type: 'program' }));
            setIsFavorited(false);
        } else {
            dispatch(addFavorite({ id: item.id, type: 'program' }));
            setIsFavorited(true);
        }
    };
    useEffect(() => {
        const handleNewItem = async () => {
            if (currentItem && currentItem.id !== item.id) {
                if (sound) {
                    await stopMeditation();
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
            intervalRef.current = setInterval(() => {
                sound.getStatusAsync().then((status) => {
                    if (status.positionMillis >= selectedTime * 60000) {
                        // COMPLETED MEDİTATİON +1  
                        stopMeditation();
                    }
                });
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
                if (isPlaying) {
                    await sound.pauseAsync();
                } else {
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

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleSelectTime = (time) => {
        dispatch(setSelectedTime(time));
        dispatch(setDuration(time * 60000));
    };

    return (
        <View style={{ flex: 1 }}>
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
                    <View style={styles.playOverlay} ></View>
                    <TouchableOpacity activeOpacity={0.8} onPress={toggleMeditation} style={styles.playViewCon}>
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
        </View>
    )
}