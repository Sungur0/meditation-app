import { Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from '../style';
import { useData } from '../context/DataContext';

export default function HomeScreen({ navigation }) {
  const { data } = useData();

  const goToMeditationProgram = (item) => {
    navigation.navigate('meditationProgram', { item });
  };
  return (

    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={styles.meditationHeader}>
        <Text style={styles.meditationHeaderText}>Choose your meditation program</Text>
      </View>

      <View style={styles.meditationCardContainer}>
        {data.map((item, i) => (
          <TouchableOpacity style={styles.meditationCard} key={i} activeOpacity={0.9} onPress={() => goToMeditationProgram(item)}>
            <Image source={item.image} style={styles.meditationCardImage} />
            <View style={{ position: 'absolute', height: '100%', left: 0, right: 0, width: '100%',backgroundColor:"rgba(0,0,0,0.3)",zIndex:1 }}>
              <View style={styles.meditationCardTextContainer}>
                <Text style={styles.meditationCardName}>{item.name}</Text>
                <Text style={styles.meditationCardDesc}>{item.desc}</Text>
              </View>
            </View>

          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>

  )
}
