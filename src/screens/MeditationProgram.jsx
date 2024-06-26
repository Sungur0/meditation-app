import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../style';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
export default function MeditationProgram({ route, navigation }) {
  const { item } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.headerLeftView} activeOpacity={0.5} onPress={() => navigation.goBack()} >
        <Icon name='close-outline' size={30} color='#fff' />
      </TouchableOpacity>
      <ImageBackground
        source={item.fullImg}
        style={styles.backgroundImage}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
          style={{ height: '70%', position: 'absolute', bottom: 0, zIndex: 1, left: 0, right: 0 }}
        ></LinearGradient>
        <View style={styles.programTextContainer}>
          <Text style={styles.programTextHeader}>{item.name}</Text>
          <Text style={styles.programText}>{item.desc}</Text>
        </View>
        <View style={styles.programBottomContainer}>
          <Text style={styles.programText} onPress={() => navigation.navigate('Meditation ')}>Change Program</Text>
          <Icon name='arrow-forward' size={24} color='#fff' onPress={() => navigation.navigate('ProgramList', { item })} />
        </View>
      </ImageBackground>
    </View>
  )
}