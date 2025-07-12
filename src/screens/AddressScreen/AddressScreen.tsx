import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import UIParent from '../HOC/UIParent'
import { THEME } from '../../Theme.ts'
import {useNavigation} from "@react-navigation/native";
import {HOME_SCREEN} from "../../Routes.ts";

const AddressScreen = () => {
  const navigation:any = useNavigation()
  const [coords, setCoords] = useState({
    latitude: 24.4667,    // fallback Dubai
    longitude: 54.3667,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  })
  const [address1, setAddress1] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postal, setPostal] = useState('')
  const [country, setCountry] = useState('')

  useEffect(() => {
    async function requestLocation() {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        )
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) return
      }
      Geolocation.getCurrentPosition(
        ({ coords: c }) => {
          setCoords({
            latitude: c.latitude,
            longitude: c.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          })
        },
        err => console.warn(err),
        { enableHighAccuracy: true }
      )
    }
    requestLocation()
  }, [])

  const onMapPress = (e:any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate
    setCoords(prev => ({
      ...prev,
      latitude,
      longitude,
    }))
  }

  const handleSubmit = () => {
    const message =
      `Address Line 1: ${address1}\n` +
      `City: ${city}\n` +
      `State/Emirate: ${state}\n` +
      `Postal Code: ${postal}\n` +
      `Country: ${country}\n` +
      `Coordinates: ${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`
    Alert.alert(
      'Address Confirmed',
      message,
      [
        { text: 'OK', onPress: () =>  navigation.replace(HOME_SCREEN) }
      ],
      { cancelable: false }
    )
  }

  return (
    <UIParent style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={THEME.screen.background} />

      <Text style={styles.heading}>Your Address</Text>

      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          region={coords}
          onPress={onMapPress}
        >
          <Marker coordinate={{ latitude: coords.latitude, longitude: coords.longitude }} />
        </MapView>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Address Line 1"
          placeholderTextColor={THEME.text.muted}
          value={address1}
          onChangeText={setAddress1}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          placeholderTextColor={THEME.text.muted}
          value={city}
          onChangeText={setCity}
        />
        <TextInput
          style={styles.input}
          placeholder="State/Emirate"
          placeholderTextColor={THEME.text.muted}
          value={state}
          onChangeText={setState}
        />
        <TextInput
          style={styles.input}
          placeholder="Postal Code"
          placeholderTextColor={THEME.text.muted}
          keyboardType="numeric"
          value={postal}
          onChangeText={setPostal}
        />
        <TextInput
          style={styles.input}
          placeholder="Country"
          placeholderTextColor={THEME.text.muted}
          value={country}
          onChangeText={setCountry}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitText}>Confirm Address</Text>
        </TouchableOpacity>
      </View>
    </UIParent>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.screen.background,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.text.heading,
    textAlign: 'center',
    marginVertical: THEME.spacing.md,
  },
  mapContainer: {
    height: 200,
    width: '100%',
    borderRadius: THEME.radii.md,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  form: {
    flex: 1,
    padding: THEME.spacing.md,
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
  submitButton: {
    marginTop: THEME.spacing.md,
    backgroundColor: THEME.color.primary,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.radii.md,
    alignItems: 'center',
  },
  submitText: {
    color: THEME.text.inverse,
    fontSize: 16,
    fontWeight: '600',
  },
})

export default AddressScreen
