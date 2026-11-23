import { CustomSlicer } from "@/components/CustomSlicer"
import { useState } from "react"
import { StyleSheet, View } from "react-native"

export default function Config() {
    const [maxAngle, SetMaxAngle] = useState(30)
    const [deadAngle, setDeadAngle] = useState(4)
    
    const changeMaxAngle = (value: number) => {
        SetMaxAngle(value)
    }

    return (
        <View style={styles.container}>
            <View>
                <CustomSlicer min={20} max={60} text="Max angle:" onChange={(val) => changeMaxAngle(val)} value={maxAngle}></CustomSlicer>
                <CustomSlicer min={2} max={8} text="Dead angle:" onChange={(val) => setDeadAngle(val)} value={deadAngle}></CustomSlicer>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        paddingTop: 70,
        backgroundColor: '#fff'
    }
})