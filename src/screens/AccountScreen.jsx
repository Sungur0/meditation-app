import { View, Text } from 'react-native'
import React from 'react'
import styles from '../style'
import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

export default function AccountScreen() {
    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={styles.meditationHeader}>
                <Text style={styles.meditationHeaderText}>Yunus Sungur</Text>
                <Text style={styles.accountText}>Health</Text>
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
                    <Text style={styles.accountStatusCardText}><Text style={styles.accountStatusCardInfo}>27</Text> Hours</Text>
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
                    <Text style={styles.accountStatusCardText}><Text style={styles.accountStatusCardInfo}>34</Text> Meditations</Text>
                </View>
                <View style={styles.accountStatusCard}>
                    <LinearGradient
                        colors={['transparent', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.7)',]}
                        style={{ height: '100%', position: 'absolute', bottom: 0, zIndex: 0, left: 0, right: 0, borderRadius: 15 }}
                    />
                    <View style={styles.accountStatusCardHeader}>
                        <Icon name='clock' size={24} color="#000" style={styles.accountStatusCardHeaderIcon} />
                        <Text style={styles.accountStatusCardHeaderText}>How many categories have you completed?</Text>
                    </View>
                    <Text style={styles.accountStatusCardText}><Text style={styles.accountStatusCardInfo}>3</Text> Categories</Text>
                </View>
            </View>
        </View>
    )
}