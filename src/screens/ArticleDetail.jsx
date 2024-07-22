import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView, AppState, useWindowDimensions } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../style';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, addScreenTime, setCompletedArticle } from '../redux/UserSlice';
import FloatingPlayer from '../components/FloatingPlayer';
import { API_HASH } from '../constant'
import RenderHtml from 'react-native-render-html';
import getImageUrl from '../components/getImageUrl';

export default function ArticleDetail({ route, navigation }) {
    const { item } = route.params;
    const dispatch = useDispatch();
    console.log(item)
    const user = useSelector((state) => state.user);
    const startTimeRef = useRef(null);
    const appState = useRef(AppState.currentState);
    const [isFavorited, setIsFavorited] = useState(false);
    const [hasCompletedArticle, setHasCompletedArticle] = useState(false);
    // const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", handleAppStateChange);
        startTimeRef.current = Date.now();

        return () => {
            subscription.remove();
            const endTime = Date.now();
            const timeSpent = endTime - startTimeRef.current;
            dispatch(addScreenTime(Math.floor(timeSpent / 1000)));
            console.log('Time spent in seconds (on unmount):', Math.floor(timeSpent / 1000));

            const updatedArticleTime = parseInt(user.userInfo.userdata_articlestime, 10) + Math.floor(timeSpent / 1000);
            const requestData = {
                hash: API_HASH,
                userdata_id: user.userInfo.userdata_id,
                userdata_articlestime: updatedArticleTime
            };

            fetch('https://lafagency.com/meditation/admin/Api/updatearticlestimedata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    // console.log('Success:', data);
                })
                .catch(error => {
                    console.error('Error updating article time:', error);
                });
        };
    }, [dispatch, user.userInfo.userdata_articlestime, user.userInfo.userdata_id]);

    const handleAppStateChange = async (nextAppState) => {
        try {
            if (appState.current.match(/inactive|background/) && nextAppState === "active") {
                startTimeRef.current = Date.now();
            } else if (nextAppState.match(/inactive|background/)) {
                const endTime = Date.now();
                const timeSpent = endTime - startTimeRef.current;
                dispatch(addScreenTime(Math.floor(timeSpent / 1000)));
                console.log('Time spent in seconds:', Math.floor(timeSpent / 1000));

                const updatedArticleTime = parseInt(user.userInfo.userdata_articlestime, 10) + Math.floor(timeSpent / 1000);

                console.log('Updated article time:', updatedArticleTime);

                const requestData = {
                    hash: API_HASH,
                    userdata_id: user.userInfo.userdata_id,
                    userdata_articlestime: updatedArticleTime
                };

                const response = await fetch('https://lafagency.com/meditation/admin/Api/updatearticlestimedata', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // console.log('Success:', data);
            }
            appState.current = nextAppState;
        } catch (error) {
            console.error('Error updating article time:', error);
        }
    };
    useEffect(() => {
        let favoritesArray = [];

        try {
            favoritesArray = JSON.parse(user.userInfo.userdata_favorites_article || '[]');
        } catch (e) {
            favoritesArray = [];
        }

        if (favoritesArray.includes(item.articles_id)) {
            setIsFavorited(true);
        }
    }, [user.userInfo.userdata_favorites_article, item.articles_id]);

    const handleToggleFavorite = async () => {
        try {
            let jsonString = user.userInfo.userdata_favorites_article;

            if (jsonString == null || jsonString === '') {
                jsonString = '[]';
            }

            let favoritesArray = JSON.parse(jsonString);

            const apiUrl = 'https://lafagency.com/meditation/admin/Api/updatefavoritesarticle';

            let updatedFavorites;

            if (isFavorited) {
                favoritesArray = favoritesArray.filter(id => id !== item.articles_id);
                updatedFavorites = favoritesArray;
                dispatch(removeFavorite({ id: item.articles_id, type: 'article' }));
                setIsFavorited(false);
            } else {
                if (!favoritesArray.includes(item.articles_id)) {
                    updatedFavorites = [...favoritesArray, item.articles_id];
                    favoritesArray.push(item.articles_id);
                    dispatch(addFavorite({ id: item.articles_id, type: 'article' }));
                    setIsFavorited(true);
                }
            }

            const userData = {
                userdata_favorites_article: JSON.stringify(updatedFavorites),
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
    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleScroll = async (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
        const isScrollingToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

        if (isScrollingToBottom && !hasCompletedArticle) {
            setHasCompletedArticle(true);
            dispatch(setCompletedArticle({ id: item.articles_id, type: 'article' }));

            try {
                const updatedArticleCount = parseInt(user.userInfo.userdata_articles, 10) + 1;

                const requestData = {
                    hash: API_HASH,
                    userdata_id: user.userInfo.userdata_id,
                    userdata_articles: updatedArticleCount
                };

                const response = await fetch('https://lafagency.com/meditation/admin/Api/updatearticledata', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer YOUR_API_HASH`
                    },
                    body: JSON.stringify(requestData)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                // console.log('Success:', data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        // setIsScrolledToBottom(isScrollingToBottom);
    };
    const { width } = useWindowDimensions();
    const img = getImageUrl(item.articles_image, 'articles', 0);
    console.log(img);
    const source = {
        html: item.articles_desc,
    };
    const tagsStyles = {
        p: {
            fontFamily: 'Montserrat-Regular',
            fontWeight: 300,
            lineHeight: 25,
            fontSize: 16
        },
        strong: {
            fontFamily: 'Montserrat-Bold',
        },
        ol: {
            fontFamily: 'Montserrat-Regular',
            padding: 0,
            paddingLeft: 15,
        },
        ul: {
            padding: 0,
            paddingLeft: 15,
        },
        li: {
            marginTop: -17.5
        },

    };
    const systemFonts = ['Montserrat-Regular', 'Montserrat-Bold','Montserrat-Medium'];


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
                    <ImageBackground source={{ uri: img }} style={{ height: '100%', width: '100%', }}>
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
                        <Text style={styles.articleDescCardHeader}>{item.articles_title}</Text>
                    </View>
                    <View style={styles.articleDescCardContainer}>
                        {/* <Text style={styles.articleDescCardText}>{item.articles_desc}</Text> */}
                        <RenderHtml
                            tagsStyles={tagsStyles}
                            contentWidth={width}
                            source={source}
                            systemFonts={systemFonts}
                        />
                    </View>
                </View>
            </ScrollView>
            <FloatingPlayer />
        </>
    );
}
