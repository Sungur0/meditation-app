import React, { createContext, useState, useContext, useEffect } from 'react';
import { Audio } from 'expo-av';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const [sound, setSound] = useState(null);

    const loadSound = async (source) => {
        if (sound) {
            await sound.unloadAsync();
        }

        let newSound;
        if (typeof source === 'number') {
            const { sound: localSound } = await Audio.Sound.createAsync(source);
            newSound = localSound;
        } else {
            const { sound: remoteSound } = await Audio.Sound.createAsync({ uri: source });
            newSound = remoteSound;
        }

        setSound(newSound);
        return newSound;
    };

    const unloadSound = async () => {
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
        }
    };

    return (
        <AudioContext.Provider value={{ sound, loadSound, unloadSound }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    return useContext(AudioContext);
};