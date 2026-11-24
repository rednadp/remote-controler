import { settings } from '@/store';
import { LinearGradient } from "expo-linear-gradient";
import { DeviceMotion } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type stateType = "Stop" | "Backwards" | "Forwards" | "ForceStop"

export default function Controller() {
  const [inclitation, setInclination] = useState(0)
  const [rawData, setRawData] = useState({alpha: 0, beta: 0, gamma: 0, timestamp: 0}) //for test
  const [state, setState] = useState<stateType>("Stop")
  const [push, setPush] = useState(false)
  const [connected, setConnected] = useState(false)

  const power = useRef(0)
  const zeroAngle = useRef<number | null>(null)
  const actualAnlge = useRef(0)
  const isPushing = useRef(false)
  const lastState = useRef<stateType>("Stop")

  const service_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
  const characteristic_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8"

  const sentToCar = async (stateToSent: stateType) => {
    if (!settings.device) return

    try {
      await settings.device.writeCharacteristicWithoutResponseForService(
        service_UUID,
        characteristic_UUID,
        btoa(stateToSent)
      )
    } catch (e) {
      console.log("Error ble:", e)
    }

  }


  useEffect(() => {
    DeviceMotion.setUpdateInterval(100)

    const subscription = DeviceMotion.addListener((data) => {
      if (!data.rotation) return
      setRawData(data.rotation)
      const beta = data.rotation.beta * 180 / Math.PI
      actualAnlge.current = beta

      if (!isPushing.current || zeroAngle.current === null) return

      const maxAngle = settings.maxAngle

      const angleDiff = zeroAngle.current - beta
      const newPower = Math.abs(angleDiff * 100 / maxAngle)
      setInclination(newPower)
      power.current = newPower
      
      
      const angleMargin = settings.deadAngle

      let newState: stateType = "Stop"
      if (angleDiff > angleMargin) {
        newState = "Forwards"
      } else if (angleDiff < -angleMargin) {
        newState = "Backwards"
      }

      if (newState !== lastState.current) {
        lastState.current = newState
        setState(newState)
        sentToCar(newState)
      }


    })

    return () => {
      subscription.remove()
      sentToCar("Stop")
    }
  }, [])


  const startPush = () => {
    zeroAngle.current = actualAnlge.current
    isPushing.current = true
    setPush(true)
    
  }

  const endPush = () => {
    isPushing.current = false
    zeroAngle.current = null
    setPush(false)
    setInclination(0)

    if (lastState.current !== "Stop") {
      lastState.current = "Stop"
      setState("Stop")
      sentToCar("Stop")
    }
  }


  return (
    <View style={styles.container}>
      <Pressable
      onPressIn={startPush}
      onPressOut={endPush}
      style={[styles.container]}
      >
        {
          state === "Forwards" && (
            <LinearGradient colors={[`rgba(95, 251, 241, ${inclitation * 0.01 * 0.85})`, 'rgba(139, 241, 234, 0)']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.upBorder}
            />
          )
        }
        
        
        {
          state === "Backwards" && (
            <LinearGradient colors={[`rgba(251, 123, 95, ${inclitation * 0.01 * 0.85})`, 'rgba(251, 123, 95, 0)']}
            start={{x: 0.5, y: 1}}
            end={{x: 0.5, y: 0}}
            style={styles.downBorder}
            />
          )
        }
        
      
        <Text>Mantain the tap and rotate the phone</Text>
      
      </Pressable>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonBar: {
    position: 'absolute',
    bottom: 55,
  },
  upBorder: {
    position: 'absolute',
    top: 0,
    height: 160,
    width: '100%'
  },
  downBorder: {
    position: 'absolute',
    bottom: 0,
    height: 160,
    width: '100%'
  }
});
