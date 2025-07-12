import React from 'react'
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import UIParent from '../HOC/UIParent'
import { THEME } from '../../Theme.ts'
import {PAYMENT_SCREEN} from "../../Routes.ts";

const DetailScreen = () => {
    const navigation = useNavigation()
    const { params }:any = useRoute()
    const pet = params.pet

    const adopt = () =>{
        navigation.navigate(PAYMENT_SCREEN, { pet })
    }

    return (
        <UIParent style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Text style={styles.backText}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{pet.bread}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <Image source={require('../../assets/images/sample_image.png')} style={styles.photo} />

                <View style={styles.details}>
                    <DetailRow label="Nickname" value={pet.nickname} />
                    <DetailRow label="Origin" value={pet.origin} />
                    <DetailRow label="Actual Origin" value={pet.actualOrigin} />
                    <DetailRow
                        label="Passport"
                        value={pet.hasPassport ? 'Yes' : 'No'}
                    />
                    <DetailRow
                        label="Vaccinated"
                        value={pet.vaccianted ? 'Yes' : 'No'}
                    />
                    <DetailRow label="Category" value={pet.category} />
                    <DetailRow
                        label="Description"
                        value={pet.description}
                        isMultiline
                    />
                </View>
                <TouchableOpacity style={styles.adoptButton} onPress={adopt}>
                    <Text style={styles.adoptButtonText}>Adopt {pet.bread}</Text>
                </TouchableOpacity>
                <Text style={styles.feeText}>Standard charge: 25 AED</Text>
            </ScrollView>
        </UIParent>
    )
}

const DetailRow = ({ label, value, isMultiline = false }:any) => (
    <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text
            style={[styles.rowValue, isMultiline && { flexWrap: 'wrap' }]}
            numberOfLines={isMultiline ? 0 : 1}
        >
            {value}
        </Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.screen.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: THEME.spacing.md,
        paddingVertical: THEME.spacing.sm,
        borderBottomWidth: 1,
        borderColor: THEME.color.border,
        backgroundColor: THEME.screen.surface,
    },
    backButton: {
        padding: THEME.spacing.sm,
    },
    backText: {
        color: THEME.color.primary,
        fontSize: 16,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: THEME.text.heading,
        marginRight: THEME.spacing.md,
    },
    content: {
        padding: THEME.spacing.md,
        alignItems: 'center',
    },
    photo: {
        width: '100%',
        height: 240,
        borderRadius: THEME.radii.lg,
        marginBottom: THEME.spacing.lg,
    },
    details: {
        width: '100%',
        marginBottom: THEME.spacing.lg,
    },
    row: {
        flexDirection: 'row',
        marginBottom: THEME.spacing.sm,
    },
    rowLabel: {
        width: 120,
        fontWeight: '600',
        color: THEME.text.heading,
    },
    rowValue: {
        flex: 1,
        color: THEME.text.body,
    },
    adoptButton: {
        width: '100%',
        paddingVertical: THEME.spacing.md,
        backgroundColor: THEME.color.accent,
        borderRadius: THEME.radii.md,
        alignItems: 'center',
        marginBottom: THEME.spacing.lg,
    },
    adoptButtonText: {
        color: THEME.text.inverse,
        fontSize: 18,
        fontWeight: '600',
    },
    feeText: {
        fontSize: 14,
        color: THEME.text.body,
        textAlign: 'center',
        marginBottom: THEME.spacing.lg,
    },
})

export default DetailScreen
