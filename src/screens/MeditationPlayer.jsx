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

export default function MeditationPlayer({ route, navigation }) {
    const { item } = route.params;
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [selectedTime, setSelectedTime] = useState(0);
    const intervalRef = useRef(null);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const handleBackPress = () => {
        stopMeditation();
        navigation.goBack();
    };

    const isFavorite = user.favorites?.includes(item.id);
    const [isFavorited, setIsFavorited] = useState(isFavorite);


    useEffect(() => {
        const isFavorite = user.userInfo.favorites.programs.includes(item.id);
        console.log(isFavorite)
        setIsFavorited(isFavorite);
    }, []);

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
        if (sound) {
            const onPlaybackStatusUpdate = (status) => {
                if (status.isLoaded) {
                    setProgress(status.positionMillis / duration);
                }
            };
            sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

            return () => {
                sound.setOnPlaybackStatusUpdate(null);
            };
        }
    }, [sound, duration]);

    useEffect(() => {
        if (isPlaying && selectedTime > 0) {
            intervalRef.current = setInterval(() => {
                sound.getStatusAsync().then((status) => {
                    if (status.positionMillis >= selectedTime * 60000) {
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
                setIsPlaying(!isPlaying);
            } else {
                const { sound: newSound } = await Audio.Sound.createAsync(
                    require('../assets/sounds/audiomass.mp3')
                );
                setSound(newSound);
                await newSound.playAsync();
                setIsPlaying(true);
                setDuration(selectedTime * 60000);
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
                setProgress(0); 
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            } catch (error) {
                console.log('Error stopping sound: ', error);
            }
        }
    };


    const handleSelectTime = (time) => {
        setSelectedTime(time);
        setDuration(time * 60000);
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