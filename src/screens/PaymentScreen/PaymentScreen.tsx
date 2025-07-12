import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import UIParent from '../HOC/UIParent'
import { THEME } from '../../Theme.ts'
import {ADDRESS_SCREEN} from "../../Routes.ts";

const PaymentScreen = () => {
    const navigation:any = useNavigation()
    const { params }:any = useRoute()
    const pet = params.pet

    const [cardNumber, setCardNumber] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvc, setCvc] = useState('')
    const [loading, setLoading] = useState(false)

    const handlePay = () => {
        if (!cardNumber || !expiry || !cvc) {
            Alert.alert('Error', 'Please fill all card fields.')
            return
        }
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            Alert.alert(
                'Payment Successful',
                `You have adopted ${pet.bread}!`,
                [{ text: 'Awesome', onPress: () => navigation.replace(ADDRESS_SCREEN, { pet }) }],
                { cancelable: false }
            )
        }, 2000)
    }

    return (
        <UIParent>
            <View style={styles.container}>
            <Text style={styles.heading}>Complete Payment</Text>
            <Text style={styles.subhead}>Adopt {pet.bread} — 25 AED</Text>

            <TextInput
                style={styles.input}
                placeholder="Card Number"
                placeholderTextColor={THEME.text.muted}
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
            />
            <View style={styles.row}>
                <TextInput
                    style={[styles.input, styles.half]}
                    placeholder="MM/YY"
                    placeholderTextColor={THEME.text.muted}
                    value={expiry}
                    onChangeText={setExpiry}
                />
                <TextInput
                    style={[styles.input, styles.half]}
                    placeholder="CVC"
                    placeholderTextColor={THEME.text.muted}
                    keyboardType="numeric"
                    secureTextEntry
                    value={cvc}
                    onChangeText={setCvc}
                />
            </View>

            <TouchableOpacity
                style={[styles.payButton, loading && styles.buttonDisabled]}
                onPress={handlePay}
                disabled={loading}
            >
                {loading
                    ? <ActivityIndicator color={THEME.text.inverse} />
                    : <Text style={styles.payButtonText}>Pay 25 AED</Text>
                }
            </TouchableOpacity>
            </View>
        </UIParent>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:16,
        backgroundColor: THEME.screen.background,
        padding: THEME.spacing.lg,
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
        color: THEME.text.heading,
        textAlign: 'center',
        marginBottom: THEME.spacing.sm,
    },
    subhead: {
        fontSize: 16,
        color: THEME.text.body,
        textAlign: 'center',
        marginBottom: THEME.spacing.lg,
    },
    input: {
        height: 50,
        backgroundColor: THEME.screen.surface,
        borderRadius: THEME.radii.md,
        paddingHorizontal: THEME.spacing.md,
        marginBottom: THEME.spacing.md,
        borderWidth: 1,
        borderColor: THEME.color.border,
        color: THEME.text.body,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    half: {
        width: '48%',
    },
    payButton: {
        height: 50,
        backgroundColor: THEME.color.primary,
        borderRadius: THEME.radii.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: THEME.spacing.lg,
    },
    buttonDisabled: {
        backgroundColor: THEME.color.border,
    },
    payButtonText: {
        color: THEME.text.inverse,
        fontSize: 18,
        fontWeight: '600',
    },
})

export default PaymentScreen
