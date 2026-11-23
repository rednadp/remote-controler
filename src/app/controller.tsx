import { LinearGradient } from "expo-linear-gradient";
import { DeviceMotion } from "expo-sensors";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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

  const ws = useRef<WebSocket | null>(null)

  const sentToCar = (stateToSent: stateType) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN)
      ws.current.send(stateToSent)
  }

  const connectToCar = () => {
    if (ws.current) {
      ws.current.close()
    }

    ws.current = new WebSocket('ws://192.168.4.1:81')

    ws.current.onopen = () => {
      setConnected(true)
      console.log("Connected!")
    }
    
    ws.current.onclose = () => {
      setConnected(false)
      console.log("Disconnected")
    }

    ws.current.onerror = (err) => {
      setConnected(false)
      console.log("error", err)
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
      const angleDiff = zeroAngle.current - beta
      setInclination(angleDiff)
      const newPower = angleDiff * 100 / 30
      power.current = newPower
      
      
      const angleMargin = 8
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
      ws.current?.close()
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
            <LinearGradient colors={['rgba(95, 251, 241, 0.85)', 'rgba(139, 241, 234, 0)']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.upBorder}
            locations={[0, 0.01 * power.current, 1]}
            />
          )
        }
        
        
        {
          state === "Backwards" && (
            <LinearGradient colors={['rgba(251, 123, 95, 0.85)', 'rgba(139, 241, 234, 0)']}
            start={{x: 0.5, y: 1}}
            end={{x: 0.5, y: 0}}
            style={styles.downBorder}
            locations={[0, power.current * -0.01 ,1]}
            />
          )
        }
        
      
        <Text>Mantain the tap and rotate the phone</Text>
      
      </Pressable>
      <View style={styles.buttonBar}>
        <TouchableOpacity
        onPress={connectToCar}
        >
          <Text>
            {connected ? "Connecter" : "Click to connect"}
          </Text>
        </TouchableOpacity>
      </View>
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
    right: 20
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
