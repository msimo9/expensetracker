import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet, StatusBar} from 'react-native'
import {useSelector} from 'react-redux'

function Header (props){
    const {title} = props
    const listItems = useSelector (state => state.itemList)
    const priceTotal = useSelector(state => state.total)

    return(
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.subtitle}>Total items: {listItems.length}</Text>
            <Text style={styles.subtitle}>Price total: {priceTotal} €</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D3DEDC",
        height: 125,
        paddingTop: 20
    },
    text:{
        color: "#7C99AC",
        fontSize: 24,
        fontWeight: "500"
    },
    subtitle:{
        paddingTop: 5,
        fontSize: 12,
        color: "#7C99AC",
    },
})

export default Header