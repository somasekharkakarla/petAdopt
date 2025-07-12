import React, {useEffect} from "react";
import UIParent from "../HOC/UIParent.tsx";
import {Image, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {LOGIN_SCREEN} from "../../Routes.ts";
import {THEME} from "../../Theme.ts";

const SplashScreen = () => {

    const navigation:any = useNavigation()

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace(LOGIN_SCREEN)
        }, 3000) // show for 3 seconds

        return () => clearTimeout(timer)
    }, [navigation])

    return (
        <UIParent>
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Pet Adopt</Text>
        </View>
    </UIParent>)

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    title: {
        marginTop: THEME.spacing.md,
        fontSize: 28,
        fontWeight: '700',
        color: THEME.text.heading,
    },
})

export default SplashScreen;
