import { CustomSlicer } from "@/components/CustomSlicer"
import { settings } from '@/store'
import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

export default function Config() {
    const [maxAngle, SetMaxAngle] = useState(settings.maxAngle)
    const [deadAngle, setDeadAngle] = useState(settings.deadAngle)
    
    const changeMaxAngle = (value: number) => {
        SetMaxAngle(value)
        settings.maxAngle = value
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View>
                <CustomSlicer min={20} max={60} text="Max angle:" onChange={(val) => changeMaxAngle(val)} value={maxAngle}></CustomSlicer>
                <CustomSlicer min={2} max={8} text="Dead angle:" onChange={(val) => {setDeadAngle(val); settings.deadAngle = val}} value={deadAngle}></CustomSlicer>
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
    },
    title: {
        fontFamily: 'Jost_600SemiBold',
        fontSize: 38
    }
})