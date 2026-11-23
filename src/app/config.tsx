import { CustomSlicer } from "@/components/CustomSlicer"
import { StyleSheet, Text, View } from "react-native"

export default function Config() {
    return (
        <View style={styles.container}>
            <View>
                <Text>Max Angle</Text>
                <CustomSlicer></CustomSlicer>
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