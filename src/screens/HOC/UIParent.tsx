import {SafeAreaView, StyleSheet, View} from "react-native";
import React from "react";
import {THEME} from "../../Theme.ts";

const UIParent = (props:any) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
            {props.children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container :{
        flex:1,
        backgroundColor:THEME.screen.background
    }
})

export default UIParent
