import { Button } from "@/components/Button"
import Logo from '@/components/logo'
import { router } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

export default function Index () {
    return (
        <View style={styles.container}>
            <Logo style={{marginBottom: 30}}/>
            <Button text="Select device" onPress={() => {router.push('/controller')}}></Button>
            <Text style={{}}>Settings</Text>
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