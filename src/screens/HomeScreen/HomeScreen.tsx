// src/screens/HomeScreen.js
import React from 'react'
import {
    FlatList,
    View,
    Text,
    Image,
    StyleSheet, TouchableOpacity,
} from 'react-native'
import UIParent from '../HOC/UIParent.tsx'
import { THEME } from '../../Theme.ts'
import PETS from '../../assets/data/pets.json'
import {useNavigation} from "@react-navigation/native";
import {DETAIL_SCREEN} from "../../Routes.ts";

const HomeScreen = () => {
    const navigation:any = useNavigation()

    const goToDetails = (item: any) => {
        navigation.navigate(DETAIL_SCREEN, { pet: item })
    }


    const renderItem = ({item}:any) =>{
       return <TouchableOpacity
            style={styles.card}
            onPress={() => goToDetails(item)}
        >
            <Image source={require('../../assets/images/sample_image.png')} style={styles.photo} />
            <View style={styles.info}>
                <Text style={styles.bread}>{item.bread}</Text>
                <Text style={styles.nickname}>{item.nickname}</Text>
                <Text style={styles.origin}>
                    {item.origin} {item.hasPassport ? '🌍' : ''}
                </Text>
                <Text style={styles.desc} numberOfLines={2}>
                    {item.description}
                </Text>
            </View>
        </TouchableOpacity>
    }

    return(
    <UIParent>
        <View  style={styles.container}>
        <FlatList
            data={PETS}
            keyExtractor={item => `${item.bread}-${item.nickname}`}
            contentContainerStyle={styles.list}
            renderItem={renderItem}
        />
        </View>
    </UIParent>
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.screen.background,
        padding: THEME.spacing.md,
    },
    list: {
        paddingBottom: THEME.spacing.lg,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: THEME.screen.surface,
        borderRadius: THEME.radii.md,
        marginBottom: THEME.spacing.md,
        overflow: 'hidden',
        elevation: 2,              // Android shadow
        shadowColor: THEME.color.shadow,  // iOS shadow
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    photo: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
    },
    info: {
        flex: 1,
        padding: THEME.spacing.sm,
    },
    bread: {
        fontSize: 16,
        fontWeight: '700',
        color: THEME.text.heading,
    },
    nickname: {
        fontSize: 14,
        color: THEME.text.body,
        marginTop: 4,
    },
    origin: {
        fontSize: 12,
        color: THEME.text.muted,
        marginTop: 2,
    },
    desc: {
        fontSize: 12,
        color: THEME.text.body,
        marginTop: 4,
    },
})

export default HomeScreen
