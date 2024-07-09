import React, { useRef, useEffect } from 'react';
import { View, Animated, Easing } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularProgress = ({ radius, strokeWidth, progress }) => {
    const circumference = radius * 2 * Math.PI;
    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedCircleRef = useRef(null);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: progress,
            duration: 500, // Increase duration for smoother animation
            easing: Easing.linear, // Use linear easing function
            useNativeDriver: false, 
        }).start();
    }, [progress]);
    useEffect(() => {
        const listener = animatedValue.addListener((v) => {
            const strokeDashoffset = circumference - (circumference * v.value) / 100;

            if (animatedCircleRef.current) {
                animatedCircleRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }
        });

        return () => {
            animatedValue.removeListener(listener);
        };
    }, [circumference]);

    return (
        <View>
            <Svg width={radius * 2} height={radius * 2}>
                <Circle
                    stroke="rgba(255,255,255,.3)"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth}
                />
                <Circle
                    ref={animatedCircleRef}
                    stroke="#F5840C"
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth}
                    transform={`rotate(-90 ${radius} ${radius})`}
                />
            </Svg>
        </View>
    );
};

export default CircularProgress;
