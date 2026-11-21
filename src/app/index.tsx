import { DeviceMotion } from "expo-sensors";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [inclitation, setInclination] = useState({beta: 0, gamma: 0})
  const [rawData, setRawData] = useState({alpha: 0, beta: 0, gamma: 0, timestamp: 0}) //for test
  
  const [push, setPush] = useState(false)

  useEffect(() => {
    DeviceMotion.setUpdateInterval(100)

    const subscription = DeviceMotion.addListener((data) => {
      if (!data.rotation) return
      setRawData(data.rotation)
      const beta = data.rotation.beta * 180 / Math.PI
      const gamma = data.rotation.gamma * 180 / Math.PI
      setInclination({beta, gamma})



    })
    // Gamma: x axe
    // Beta: y axe

    return () => subscription.remove()
  }, [])


  return (
    <View style={styles.container}>

      <Text>This will show info from the acelerometer</Text>
      <Text>Beta (adelante/adetras) {inclitation.beta} rad</Text>
      <Text>Gama (Izquierda/derecha) {inclitation.gamma}</Text>
      <Text>{rawData.alpha} alpha, {rawData.beta} beta, {rawData.gamma} gamma, {rawData.timestamp} timeStamp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOf: {
    backgroundColor: '#fff',
    textAlign: "center"
  }
});
