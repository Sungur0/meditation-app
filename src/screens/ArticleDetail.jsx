import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, AppState } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../style';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, addScreenTime, setCompletedArticle } from '../redux/UserSlice';
import FloatingPlayer from '../components/FloatingPlayer';

export default function ArticleDetail({ route, navigation }) {
    const { item } = route.params;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const startTimeRef = useRef(null);
    const appState = useRef(AppState.currentState);
    const [isFavorited, setIsFavorited] = useState(user.userInfo.favorites.articles.includes(item.id));
    const [hasCompletedArticle, setHasCompletedArticle] = useState(false);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", handleAppStateChange);
        startTimeRef.current = Date.now();

        return () => {
            subscription.remove();
            const endTime = Date.now();
            const timeSpent = endTime - startTimeRef.current;
            dispatch(addScreenTime(Math.floor(timeSpent / 1000)));
        };
    }, [dispatch]);

    const handleAppStateChange = (nextAppState) => {
        if (appState.current.match(/inactive|background/) && nextAppState === "active") {
            startTimeRef.current = Date.now();
        } else if (nextAppState.match(/inactive|background/)) {
            const endTime = Date.now();
            const timeSpent = endTime - startTimeRef.current;
            dispatch(addScreenTime(Math.floor(timeSpent / 1000)));
            console.log(Math.floor(timeSpent / 1000))
        }
        appState.current = nextAppState;
    };

    const handleToggleFavorite = () => {
        if (isFavorited) {
            dispatch(removeFavorite({ id: item.id, type: 'article' }));
            setIsFavorited(false);
        } else {
            dispatch(addFavorite({ id: item.id, type: 'article' }));
            setIsFavorited(true);
        }
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
        const isScrollingToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

        if (isScrollingToBottom && !hasCompletedArticle) {
            setHasCompletedArticle(true);
            dispatch(setCompletedArticle({ id: item.id, type: 'article' }));
        }

        setIsScrolledToBottom(isScrollingToBottom);
    };

    return (
        <>
            <ScrollView
                style={{ flex: 1, backgroundColor: '#fff' }}
                bounces={true}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16} 
            >
                <View style={{ height: '50%', width: '100%', position: 'absolute', }}>
                    <ImageBackground source={item.img} style={{ height: '100%', width: '100%', }}>
                    </ImageBackground>
                    <LinearGradient
                        colors={['transparent', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,1)',]}
                        style={{ height: '30%', position: 'absolute', bottom: 0, zIndex: 0, left: 0, right: 0 }}
                    />
                </View>

                <View style={styles.articleDetailHeader}>
                    <TouchableOpacity onPress={handleBackPress} activeOpacity={0.9}>
                        <Icon name='arrow-back-outline' size={24} color="#fff" />
                    </TouchableOpacity >
                    <TouchableOpacity onPress={handleToggleFavorite} activeOpacity={0.9}>
                        <Icon name={isFavorited ? 'heart-sharp' : 'heart-outline'} size={24} color="#fff" />
                    </TouchableOpacity >
                </View>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 170, paddingBottom: 60 }}>
                    <View style={styles.articleDescHeader}>
                        <Text style={styles.articleDescCardHeader}>{item.name}</Text>
                    </View>
                    <View style={styles.articleDescCardContainer}>
                        <Text style={styles.articleDescCardText}>{item.desc}</Text>
                    </View>
                </View>
            </ScrollView>
            <FloatingPlayer />
        </>
    );
}
