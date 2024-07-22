import { View, Text, ScrollView, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import styles from '../style';
import { useData } from '../context/DataContext2';
import Icon from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av';

export default function ProgramList({ route, navigation }) {
    const { data } = useData();
    const { item } = route.params;

   
    const filteredSubcategories = data.subcategory.filter(sub => sub.mainId === item.id);

    const filteredPrograms = data.programs.filter(program => {
        return filteredSubcategories.some(subcategory => subcategory.id === program.subId);
    });


    return (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.programListHeader}>
                <Text style={styles.meditationHeaderText}>{item.name}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.9}>
                    <Icon name='arrow-back-outline' size={24} color="rgba(0,0,0,1)" />
                </TouchableOpacity>
            </View>
       
            <View style={styles.programList}>
                {filteredSubcategories.map(subcategory => (
                    <View key={subcategory.id} style={styles.programMainList}>
                        <Text style={styles.programSubHeader}>{subcategory.name}</Text>
                        <View>
                            {filteredPrograms.filter(program => program.subId === subcategory.id).map(program => (
                                <TouchableOpacity style={styles.programListTextView} key={program.id} onPress={() => navigation.navigate('MeditationPlayer', { item: program })} activeOpacity={0.7}>
                                    <Text style={styles.programListText}>{program.name}</Text>
                                    <Icon name='caret-forward-circle-outline' size={24} color="rgba(0,0,0,0.8)" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}
            </View>

        </ScrollView>
    )
}