import { Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from '../style';
// import { useData } from '../context/DataContext2';
// import DeviceInfo from 'react-native-device-info';
import FloatingPlayer from '../components/FloatingPlayer';
// import TrackPlayer from 'react-native-track-player';
import { useData } from '../context/DataContext1';
import getImageUrl from '../components/getImageUrl';


export default function HomeScreen({ navigation }) {
  // const uniqueId = DeviceInfo.getUniqueIdSync();
  // console.log(uniqueId)

  const { programs } = useData();


  const user = useSelector((state) => state.user);
  console.log(user)

  const goToMeditationProgram = (item) => {
    navigation.navigate('meditationProgram', { item });
  };
  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false}>
        <View style={styles.meditationHeader}>
          <Text style={styles.meditationHeaderText}>Choose your meditation program</Text>

        </View>
        <View style={styles.meditationCardContainer}>
          {programs.map((item, i) => {
            const img = getImageUrl(item.programs_image, 'programs', 0);
            return (
              <TouchableOpacity style={styles.meditationCard} key={i} activeOpacity={0.9} onPress={() => goToMeditationProgram(item)}>
                <Image source={{ uri: img }} style={styles.meditationCardImage} />
                <View style={{ position: 'absolute', height: '100%', left: 0, right: 0, width: '100%', backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1 }}>
                  <View style={styles.meditationCardTextContainer}>
                    <Text style={styles.meditationCardName}>{item.programs_title}</Text>
                    <Text style={styles.meditationCardDesc}>{item.programs_short_desc}</Text>
                  </View>
                </View>

              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
      <FloatingPlayer />
    </>
  )
}
