import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from "react-native"

type props = {
    text: string,
    onPress: () => void
}

export function Button ({text, onPress}: props) {

    const [push, setPush] = useState(false)




    return (
        <Pressable
        onPress={onPress}
        onPressIn={() => setPush(true)}
        onPressOut={() => setPush(false)}
        style={styles.containter}
        >
            <View style= {styles.shadow}/>
            <View style={[styles.front, push && {transform: [{translateX: 8}, {translateY: 8}]}]}>
                <Text style={styles.text}>
                    {text}
                </Text>
            </View>
            
        </Pressable>
    )
}


const styles = StyleSheet.create({
    containter: {
        marginHorizontal: '15%',
        paddingRight: 8,
        paddingBottom: 8,
    },
    front: {
        backgroundColor: '#D9D9D9',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
    },
    shadow: {
        position: 'absolute',
        top: 8,
        left: 8,
        bottom: 0,
        right: 0,
        backgroundColor: '#9B9B9B',
        borderRadius: 3,
    },
    text: {
        fontSize: 32,
        fontFamily: 'Jost_600SemiBold'
    }
})