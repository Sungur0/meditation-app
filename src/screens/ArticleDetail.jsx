import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import React, { useState,useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../style';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/UserSlice';


export default function ArticleDetail({ route, navigation }) {
    const { item } = route.params;
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const isFavorite = user.favorites?.includes(item.id);
    const [isFavorited, setIsFavorited] = useState(isFavorite);


    useEffect(() => {
        const isFavorite = user.userInfo.favorites.articles.includes(item.id);
        console.log(isFavorite)
        setIsFavorited(isFavorite);
      }, []);

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
    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} bounces={true} showsVerticalScrollIndicator={false}>
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
    )
}