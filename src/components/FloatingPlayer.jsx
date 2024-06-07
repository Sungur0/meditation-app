import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { setPlaying } from '../redux/musicSlice';

const FloatingPlayer = ({ navigation }) => {
    const dispatch = useDispatch();
    const { item, isPlaying, sound } = useSelector(state => state.music);

    const togglePlayPause = async () => {
        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
        dispatch(setPlaying(!isPlaying));
    };

    return (
        <TouchableOpacity
            style={{
                // position: 'absolute',
                // bottom: 0,
                // left: 20,
                // right: 20,
                zIndex:1,
                backgroundColor: '#333',
                padding: 10,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
            onPress={() => navigation.navigate('MeditationPlayer', { item })}
        >
            <Text style={{ color: '#fff' }}>{item.name}</Text>
            <TouchableOpacity onPress={togglePlayPause}>
                <FeatherIcon name={isPlaying ? 'pause' : 'play'} size={25} color="#fff" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

export default FloatingPlayer;