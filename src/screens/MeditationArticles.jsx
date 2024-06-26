import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import styles from '../style'
import { useData } from '../context/DataContext';
import FloatingPlayer from '../components/FloatingPlayer';

export default function MeditationArticles({ navigation }) {
    const { data } = useData();


    const topLocationArticles = data.articles.filter(article => article.topLocation === 1);


    return (
        <>
            <FloatingPlayer />

            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View style={styles.meditationArticlesHeader}>
                    <Text style={styles.meditationHeaderText}>Meditaton Articles</Text>
                </View>
                <ScrollView horizontal style={styles.meditationArticlesCardContainer} showsHorizontalScrollIndicator={false}>
                    {topLocationArticles.map((product, index) => {
                        return (
                            <TouchableOpacity style={styles.categoryCardCon} key={product.id} onPress={() => navigation.navigate('ArticleDetail', { item: product })}>
                                <View style={styles.card}>
                                    <Image source={product.img} style={styles.categoryImg}></Image>
                                    <Text style={styles.cardText}>{product.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
                <View style={styles.meditationSubArticlesHeader}>
                    <Text style={styles.meditationSubHeaderText}>More Articles</Text>
                </View>
                <View style={styles.verticalArticleContainer}>
                    {data.articles.map((article, index) => {
                        return (
                            <TouchableOpacity style={styles.articleContainer} key={article.id} onPress={() => navigation.navigate('ArticleDetail', { item: article })}>
                                <Image source={article.img} style={styles.categoryImg}></Image>
                                <Text style={styles.articleTitle}>{article.name}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView>

        </>

    )
}