import { Button } from "@/components/Button"
import Logo from '@/components/logo2'
import { StyleSheet, View } from "react-native"

export default function Index () {
    return (
        <View style={styles.container}>
            <Logo style={{marginBottom: 30}}/>
            <Button text="Select device" onPress={() => {}}></Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

})