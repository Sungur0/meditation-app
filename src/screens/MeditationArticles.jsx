import { View, Text, ScrollView, TouchableOpacity, Image, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from '../style'
import FloatingPlayer from '../components/FloatingPlayer';
import { API_HASH } from '../constant'
import { useData } from '../context/DataContext1';
import getImageUrl from '../components/getImageUrl';


export default function MeditationArticles({ navigation }) {
    const { width } = useWindowDimensions();
    // const topLocationArticles = data.articles.filter(article => article.topLocation === 1);
    // console.log(articles)

    const { articles } = useData();
    console.log(articles)

    return (
        <>
            <FloatingPlayer />

            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={styles.meditationArticlesHeader}>
                    <Text style={styles.meditationHeaderText}>Meditaton Articles</Text>
                </View>
                {/* <ScrollView horizontal style={styles.meditationArticlesCardContainer} showsHorizontalScrollIndicator={false}>
                    {topLocationArticles.map((product, index) => {
                        return (
                            <TouchableOpacity style={styles.categoryCardCon} key={product.id} onPress={() => navigation.navigate('ArticleDetail', { item: product })} activeOpacity={0.9}>
                                <View style={styles.card}>
                                    <Image source={product.img} style={styles.categoryImg}></Image>
                                    <Text style={styles.cardText}>{product.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView> */}
                <View style={styles.meditationSubArticlesHeader}>
                    <Text style={styles.meditationSubHeaderText}>More Articles</Text>
                </View>
                <View style={styles.verticalArticleContainer}>
                    {articles.map((article, index) => {
                        const img = getImageUrl(article.articles_image, 'articles', 0);

                        return (
                            <TouchableOpacity style={styles.articleContainer} key={article.articles_id} onPress={() => navigation.navigate('ArticleDetail', { item: article })} activeOpacity={0.9}>
                                <Image source={{ uri: img }}style={styles.categoryImg}></Image>
                                <Text style={styles.articleTitle}>{article.articles_title}</Text>

                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>

        </>

    )
}