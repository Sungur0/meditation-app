import { View, Text, Image, TouchableOpacity, ImageBackground, ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../style';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ArticleDetail({ route, navigation }) {
    const { item } = route.params;
    console.log(item)

    const handleBackPress = () => {
        navigation.goBack();
    };
    return (
        <ScrollView style={{ flex: 1, backgroundColor:'#fff' }} bounces={true} showsVerticalScrollIndicator={false}>
            <View style={{ height: '50%', width: '100%', position: 'absolute', }}>
                <ImageBackground source={item.img} style={{ height: '100%', width: '100%', }}>
                </ImageBackground>
                <LinearGradient
                    colors={['transparent', 'rgba(255,255,255,0.7)', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,1)',]}
                    style={{ height: '30%', position: 'absolute', bottom: 0, zIndex: 0, left: 0, right: 0 }}
                />
            </View>

            <View style={styles.programListHeader}>
                <TouchableOpacity onPress={handleBackPress} activeOpacity={0.9}>
                    <Icon name='arrow-back-outline' size={24} color="#fff" />
                </TouchableOpacity>
                <Icon name='heart-outline' size={24} color="#fff" />
            </View>


            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 170 ,paddingBottom:60}}>
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