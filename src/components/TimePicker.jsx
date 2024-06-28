import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../style';
const TimerPicker = ({ onSelectTime }) => {
    const handleTimeSelection = (time) => {
        onSelectTime(time);
    };

    return (
        <View  style={styles.timerSelectView}>
            <TouchableOpacity onPress={() => handleTimeSelection(1)} style={styles.option}>
                <Text style={styles.timeText}>3 min</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeSelection(5)} style={[styles.optionBorder,styles.option]}>
                <Text style={styles.timeText}>5 min</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTimeSelection(7)} style={styles.option}>
                <Text style={styles.timeText}>7 min</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TimerPicker;