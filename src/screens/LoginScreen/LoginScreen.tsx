import UIParent from "../HOC/UIParent.tsx";
import React, {useState} from "react";
import {Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {THEME} from "../../Theme.ts";
import {useNavigation} from "@react-navigation/native";
import {HOME_SCREEN} from "../../Routes.ts";
const LoginScreen = () => {
    const navigation:any = useNavigation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const registration = () =>{
        Alert.alert('Registration', 'coming soon')
    }

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert(
                'Error',
                'Please enter both email and password.',
                [
                    { text: 'OK', onPress: () => console.log('🔔 OK pressed') }
                ],
                { cancelable: false }
            )
            return
        }
        setLoading(true)
        // TODO: replace with real auth
        setTimeout(() => {
            setLoading(false)
            navigation.replace(HOME_SCREEN)
        }, 1500)
    }

    return (
        <UIParent style={styles.container}>
            <View style={{justifyContent:'center', margin:16}}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.heading}>Welcome Back!</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={THEME.text.muted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={THEME.text.muted}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Logging in...' : 'Log In'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={registration}>
                <Text style={styles.linkText}>
                    Don’t have an account? Sign up
                </Text>
            </TouchableOpacity>
            </View>
        </UIParent>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.screen.background,
        padding: THEME.spacing.lg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        fontSize: 32,
        fontWeight: '700',
        color: THEME.text.heading,
        marginBottom: THEME.spacing.md,
        textAlign: 'center',
    },
    input: {
        height: 50,
        backgroundColor: THEME.screen.surface,
        borderRadius: THEME.radii.md,
        paddingHorizontal: THEME.spacing.md,
        marginBottom: THEME.spacing.sm,
        borderWidth: 1,
        borderColor: THEME.color.border,
        color: THEME.text.body,
    },
    button: {
        height: 50,
        backgroundColor: THEME.color.primary,
        borderRadius: THEME.radii.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: THEME.spacing.md,
    },
    buttonDisabled: {
        backgroundColor: THEME.color.border,
    },
    buttonText: {
        color: THEME.text.inverse,
        fontSize: 18,
        fontWeight: '600',
    },
    linkText: {
        color: THEME.color.accent,
        textAlign: 'center',
        fontSize: 16,
    },
    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: THEME.spacing.md,
    }
})
export default LoginScreen;
