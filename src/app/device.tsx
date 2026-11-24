import { bleManager, settings } from "@/store"
import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { PermissionsAndroid, Pressable, StyleSheet, Text, View } from "react-native"
import { Device } from "react-native-ble-plx"

export default function Config() {
    const [devices, setDevices] = useState<Device[]>([])

    const router = useRouter()
    
    useEffect(() => {
        let active = true;

        (async () => {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ])

            if (!active) return

            bleManager.startDeviceScan(null, null, (err, dev) => {
                if (dev?.name) {
                    setDevices((prev) => prev.some((device) => device.id === dev.id) ? prev : [...prev, dev])
                }
            })
        })()
        return () => {
            active = false
            bleManager.stopDeviceScan()
        }

    }, [])

    const handleConnect = async (dev: Device) => {
        bleManager.stopDeviceScan()
        const connect = await dev.connect()
        await connect.discoverAllServicesAndCharacteristics()

        settings.device = connect
        router.navigate('/controller')
    }


    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Search your device:</Text>
            
            {devices.map((dev) => (
                <Pressable key={dev.id} style={styles.item} onPress={() => handleConnect(dev)}>
                    <Text style={styles.itemText}>{dev.name}</Text>
                </Pressable>
            ))}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        paddingTop: 70,
        backgroundColor: '#fff'
    },
    title: {
        fontFamily: 'Jost_600SemiBold',
        fontSize: 34,
        marginBottom: 30,
    },
    item: {
        backgroundColor: '#D9D9D9',
        padding: 18,
        marginBottom: 14,
    },
    itemText: {
        fontSize: 20,
        fontFamily: 'Jost_600SemiBold',
    },
    scanning: {
        fontSize: 18,
        fontFamily: 'Jost_600SemiBold',
        color: '#888',
    },
})