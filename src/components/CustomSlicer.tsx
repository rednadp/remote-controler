import { StyleSheet, Text, View } from "react-native"


export function CustomSlicer() {
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Angle:</Text>
                <Text style={styles.titleValue}>54º</Text>
            </View>
            <View style={styles.touchArea}
            
            >
                <View style={styles.bar}></View>
                <View style={styles.block}></View>
            </View>
            <View style={styles.containerMinMax}>
                <Text style={styles.minMaxItem}>20º</Text>
                <Text style={styles.minMaxItem}>60º</Text>
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
        height: 44,
        width: 44,
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