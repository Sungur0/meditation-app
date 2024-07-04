import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import styles from '../style'
import Icon from 'react-native-vector-icons/Feather';
import { logout } from '../redux/UserSlice';
import { LinearGradient } from 'expo-linear-gradient';
import FloatingPlayer from '../components/FloatingPlayer';
import { useDispatch, useSelector } from 'react-redux';

const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    let formattedTime = '';
    if (hours > 0) {
        formattedTime += `${hours} Hours `;
    }
    if (minutes > 0) {
        formattedTime += `${minutes} min `;
    }
    if (seconds > 0) {
        formattedTime += `${seconds} sec`;
    }

    return formattedTime.trim();
};



export default function AccountScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const completedMeditations = user.userInfo.musicStats.completedSongs;
    const completedArticles = user.userInfo.articleStats.completedArticles;
    const totalListeningTime = user.userInfo.musicStats.totalListeningTime;
    const totalArticleTime = user.userInfo.articleStats.timeSpent;
    const formattedListeningTime = formatTime(totalListeningTime);
    const formattedArticleTime = formatTime(totalArticleTime);

    const handleLogout = () => {
        dispatch(logout());
        navigation.navigate('Splash')
    };
    return (
        <>
            <ScrollView style={{ backgroundColor: '#fff', flex: 1, }} showsVerticalScrollIndicator={false} >

                <View style={styles.accountMeditationHeader}>
                    <View style={styles.meditationHeader}>
                        <Text style={styles.meditationHeaderText}>{user.userInfo.name}</Text>
                        <Text style={styles.accountText}>Health</Text>
                    </View>
                    <View style={styles.logoutButton}>
                        <TouchableOpacity activeOpacity={0.7} onPress={handleLogout}>
                            <Icon name='log-out' size={24} color="#000" style={styles.accountStatusCardHeaderIcon} />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.accountStatusContainer}>
                    <View style={styles.accountStatusHeader}>
                        <Text style={styles.accountStatusText}>Status</Text>
                    </View>

                    <View style={styles.accountStatusCard}>
                        <LinearGradient
                            colors={['transparent', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.7)',]}
                            style={{ height: '100%', position: 'absolute', bottom: 0, zIndex: 0, left: 0, right: 0, borderRadius: 15 }}
                        />
                        <View style={styles.accountStatusCardHeader}>
                            <Icon name='clock' size={24} color="#000" style={styles.accountStatusCardHeaderIcon} />
                            <Text style={styles.accountStatusCardHeaderText}>How long have you meditated?</Text>
                        </View>
                        <Text style={styles.accountStatusCardText}>
                            {formattedListeningTime ? (
                                formattedListeningTime.split(' ').map((text, index) => (
                                    index % 2 === 0 ? (
                                        <Text key={index} style={styles.accountStatusCardInfo}>{text} </Text>
                                    ) : (
                                        <Text key={index}>{text} </Text>
                                    )
                                ))
                            ) : (
                                <Text style={styles.accountStatusCardInfo}>0</Text>
                            )}
                        </Text>
                    </View>
                    <View style={styles.accountStatusCard}>
                        <LinearGradient
                            colors={['transparent', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.7)',]}
                            style={{ height: '100%', position: 'absolute', bottom: 0, zIndex: 0, left: 0, right: 0, borderRadius: 15 }}
                        />
                        <View style={styles.accountStatusCardHeader}>
                            <Icon name='play' size={24} color="#000" style={styles.accountStatusCardHeaderIcon} />
                            <Text style={styles.accountStatusCardHeaderText}>How many meditations have you completed?</Text>
                        </View>
                        <Text style={styles.accountStatusCardText}><Text style={styles.accountStatusCardInfo}>{completedMeditations} </Text> Meditations</Text>
                    </View>
                    <View style={styles.accountStatusCard}>
                        <LinearGradient
                            colors={['transparent', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.7)']}
                            style={{ height: '100%', position: 'absolute', bottom: 0, zIndex: 0, left: 0, right: 0, borderRadius: 15 }}
                        />
                        <View style={styles.accountStatusCardHeader}>
                            <Icon name='book' size={24} color="#000" style={styles.accountStatusCardHeaderIcon} />
                            <Text style={styles.accountStatusCardHeaderText}>How long have you read articles?</Text>
                        </View>
                        <Text style={styles.accountStatusCardText}>
                            {formattedArticleTime ? (
                                formattedArticleTime.split(' ').map((text, index) => (
                                    index % 2 === 0 ? (
                                        <Text key={index} style={styles.accountStatusCardInfo}>{text} </Text>
                                    ) : (
                                        <Text key={index}>{text} </Text>
                                    )
                                ))
                            ) : (
                                <Text style={styles.accountStatusCardInfo}>0</Text>
                            )}
                        </Text>
                    </View>

                    <View style={styles.accountStatusCard}>
                        <LinearGradient
                            colors={['transparent', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.7)',]}
                            style={{ height: '100%', position: 'absolute', bottom: 0, zIndex: 0, left: 0, right: 0, borderRadius: 15 }}
                        />
                        <View style={styles.accountStatusCardHeader}>
                            <Icon name='archive' size={24} color="#000" style={styles.accountStatusCardHeaderIcon} />
                            <Text style={styles.accountStatusCardHeaderText}>How many articles have you completed?</Text>
                        </View>
                        <Text style={styles.accountStatusCardText}><Text style={styles.accountStatusCardInfo}>{completedArticles} </Text> Articles</Text>
                    </View>
                </View>
            </ScrollView>
            <FloatingPlayer />

        </>

    )
}