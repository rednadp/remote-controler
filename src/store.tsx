import { BleManager, Device } from "react-native-ble-plx"

export const bleManager = new BleManager()

export const settings = {
    maxAngle: 40,
    deadAngle: 4,
    device: null as Device | null
}