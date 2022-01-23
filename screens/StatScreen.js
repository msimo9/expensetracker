import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'

import Chart from '../components/Chart';

import auth from '../firebase'

//git deluje


//git deluje #2

const StatScreen = ({navigation}) => {

    const handleSignout = () => {
        auth.signOut()
        .then(() => {
                navigation.navigate('Login');
            }
        )
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error code: ", errorCode)
            console.log("Error message: ", errorMessage)
        })
    }


    return(
    <View style={styles.container}>
        <Chart />

        <TouchableOpacity
                style={styles.signOutButton}
                onPress={handleSignout}
            >
                <Text style={styles.signOutText}>SIGN OUT</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#92A9BD"
    },
    signOutButton:{
        width: "40%",
        backgroundColor: "#7C99AC",
        marginTop: 10,
        marginBottom: 10,
        height: 40,
        borderRadius: 10,
        borderColor: "#D3DEDC",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    signOutText:{
        color: "#D3DEDC",
    },
})

export default StatScreen