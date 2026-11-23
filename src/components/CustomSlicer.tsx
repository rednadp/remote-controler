import { useState } from "react"
import { StyleSheet, Text, View } from "react-native"

type Props = {
    text: string,
    min: number,
    max: number,
    value: number,
    onChange: (value: number) => void
}

export function CustomSlicer({text, min, max, value, onChange}: Props) {
    const [barWidth, setBarWidth] = useState(0)

    const blockSize = 44

    const progress = Math.max(0, Math.min((value - min) / (max - min), 1))
    
    const onTouch = (x: number) => {
        if (barWidth === 0) return
        
        const realBarSize = barWidth - blockSize
        const filterX = Math.max(0, Math.min(x - blockSize / 2, realBarSize))
        const roundedX = Math.round(min + (filterX / realBarSize) * (max - min))
        onChange(roundedX)
    }

    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>{text}</Text>
                <Text style={styles.titleValue}>{value}º</Text>
            </View>
            <View style={styles.touchArea}
            onLayout={(e) => {setBarWidth(e.nativeEvent.layout.width)}}
            onStartShouldSetResponder={() => true}
            onResponderGrant={(e) => {onTouch(e.nativeEvent.locationX)}}
            onResponderMove={(e) => {onTouch(e.nativeEvent.locationX)}}
            >
                <View style={styles.bar} pointerEvents="none"></View>
                <View style={[styles.block,
                    {
                        height: blockSize,
                        width: blockSize,
                        left: barWidth > 0 ? progress * (barWidth - blockSize) : 0
                    }
                ]} pointerEvents="none"></View>
            </View>
            <View pointerEvents="none" style={styles.containerMinMax}>
                <Text style={styles.minMaxItem}>{min}º</Text>
                <Text pointerEvents="none" style={styles.minMaxItem}>{max}º</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 36
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 14
    },
    titleText: {
        fontSize: 22,
        fontFamily: 'Jost_600SemiBold',
        color: '#000'
    },
    titleValue: {
        fontSize: 20,
        fontFamily: 'Jost_600SemiBold',
        color: '#FF9E9D'
    },
    bar: {
        height: 12,
        backgroundColor: '#D9D9D9',
        width: '100%'
    },
    touchArea: {
        height: 48,
        justifyContent: 'center'
    },
    block: {
        position: 'absolute',
        backgroundColor: '#FF9E9E'
    },
    containerMinMax: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 6
    },
    minMaxItem: {
        fontSize: 16,
        fontFamily: 'Jost_600SemiBold'
    }
})