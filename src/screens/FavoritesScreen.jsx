import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../style'
import { useSelector } from 'react-redux';
import { useData } from '../context/DataContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function FavoritesScreen({ navigation }) {
  const favorites = useSelector((state) => state.user.userInfo.favorites);
  const { data } = useData();

  const favoriteArticles = data.articles.filter(article => favorites.articles.includes(article.id));
  const favoritePrograms = data.programs.filter(program => favorites.programs.includes(program.id));


  return (
    <View>
      <View style={styles.meditationHeader}>
        <Text style={styles.meditationHeaderText}>Favorites</Text>
      </View>

      <View style={styles.favoritesViewContainer}>
        <View>
          <Text style={styles.favoritesHeaderText}>Programs</Text>
          {favoritePrograms.map(program => (
            <TouchableOpacity key={program.id} style={styles.favoritesCardContainer}  onPress={() => navigation.navigate('MeditationPlayer', { item: program })} activeOpacity={0.6}>
              <Text style={styles.favoritesCardText}>{program.name}</Text>
              <Icon name='play-outline' size={24} color="#000" />

            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.favoritesViewContainer}>
        <View>
          <Text style={styles.favoritesHeaderText}>Articles</Text>
          {favoriteArticles.map(article => (
            <TouchableOpacity key={article.id} style={styles.favoritesCardContainer} onPress={() => navigation.navigate('ArticleDetail', { item: article })} activeOpacity={0.6}>
              <Text style={styles.favoritesCardText}>{article.name}</Text>
              <Icon name='document-text-outline' size={24} color="#000" />

            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )
}