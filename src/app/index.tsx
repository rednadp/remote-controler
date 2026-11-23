import { Button } from "@/components/Button"
import { CustomSlicer } from "@/components/CustomSlicer"
import Logo from '@/components/logo'
import { router } from "expo-router"
import { StyleSheet, View } from "react-native"

export default function Index () {
    return (
        <View style={styles.container}>
            <CustomSlicer></CustomSlicer>
            <Logo style={{marginBottom: 30}}/>
            <Button text="Select device" onPress={() => {router.push('/controller')}}></Button>
            <Button text="Settings" onPress={() => {router.push('/config')}}></Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },

})