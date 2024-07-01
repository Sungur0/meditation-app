import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import styles from '../style'
import { useSelector } from 'react-redux';
import { useData } from '../context/DataContext';
import Icon from 'react-native-vector-icons/Ionicons';
import FloatingPlayer from '../components/FloatingPlayer';

export default function FavoritesScreen({ navigation }) {
  const favorites = useSelector((state) => state.user.userInfo.favorites);
  const { data } = useData();
  const favoriteArticles = data.articles.filter(article => favorites.articles.includes(article.id));
  const favoritePrograms = data.programs.filter(program => favorites.programs.includes(program.id));

  console.log(favoriteArticles)

  const goToMeditationProgram = (item) => {
    navigation.navigate('MeditationPlayer', { item });
  };

  const gotToMeditationArticle = (item) => {
    navigation.navigate('ArticleDetail', { item });

  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.meditationHeader}>
          <Text style={styles.meditationHeaderText}>Favorites</Text>
        </View>

        <View style={styles.favoritesViewContainer}>
          <View>
            <Text style={styles.favoritesHeaderText}>Programs</Text>
            <View style={styles.favoritesVerticalContainer}>
              {favoritePrograms.length > 0 ? (
                favoritePrograms.map((program, i) => (
                  <TouchableOpacity style={styles.articleContainer} key={program.id} onPress={() => goToMeditationProgram(program)}>
                    <Image source={program.img} style={styles.categoryImg}></Image>
                    <Text style={styles.favoritesCardName}>{program.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <>
                  <Text style={styles.noFavoritesText}>No programs in your favorites at the moment.</Text>
                  <Text style={styles.discoverText} onPress={() => navigation.navigate('Meditation ')}>Discover: Programs</Text>
                </>
              )}
            </View>
          </View>
        </View>

        <View style={styles.favoritesViewContainer}>
          <View>
            <Text style={styles.favoritesHeaderText}>Articles</Text>
            <View style={styles.favoritesVerticalContainer}>

              {favoriteArticles.length > 0 ? (
                favoriteArticles.map((article, i) => (
                  <TouchableOpacity style={styles.articleContainer} key={article.id} onPress={() => gotToMeditationArticle(article)}>
                    <Image source={article.img} style={styles.categoryImg}></Image>
                    <Text style={styles.favoritesCardName}>{article.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <>
                  <Text style={styles.noFavoritesText}>No articles in your favorites at the moment.</Text>
                  <Text style={styles.discoverText} onPress={() => navigation.navigate('Meditation Article')}>Discover: Articles</Text>
                </>
              )}
            </View>
          </View>
        </View>

      </ScrollView>
      <FloatingPlayer />

    </>

  )
}