import React, { useState } from 'react';

import {View, StyleSheet, FlatList, Text, TouchableOpacity, StatusBar} from 'react-native';

import {Ionicons} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import Header from '../components/Header';
import ListView from '../components/ListView';

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';

import { setFilter } from '../redux/reducer';

function ListScreen({navigation}) {


    const currentFilter = useSelector(state => state.filter)

    const dispatch = useDispatch()

    const filterByCategory = (type) => {
        dispatch(setFilter(type))
    }

    const changeColor = () => {

    }

    return(
        <>
            <StatusBar barStyle='light-content' />
            <View style={styles.container}>
                <Header title={"Expense Tracker"} />
                <View style={styles.filterContainer}>

                    <TouchableOpacity
                        onPress={() => filterByCategory("FOOD")}
                        style={currentFilter === "FOOD" ? styles.categoryFilterActive : styles.categoryFilter}
                    >
                        <Text style={currentFilter === "FOOD" ? styles.categoryTextActive : styles.categoryText}>Food</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => filterByCategory("TECH")}
                        style={currentFilter === "TECH" ? styles.categoryFilterActive : styles.categoryFilter}
                    >
                        <Text style={currentFilter === "TECH" ? styles.categoryTextActive : styles.categoryText}>Tech</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => filterByCategory("BILL")}
                        style={currentFilter === "BILL" ? styles.categoryFilterActive : styles.categoryFilter}
                    >
                        <Text style={currentFilter === "BILL" ? styles.categoryTextActive : styles.categoryText}>Bills</Text>
                    </TouchableOpacity>



                    <TouchableOpacity
                        onPress={() => filterByCategory("OTHR")}
                        style={currentFilter === "OTHR" ? styles.categoryFilterActive : styles.categoryFilter}
                    >
                        <Text style={currentFilter === "OTHR" ? styles.categoryTextActive : styles.categoryText}>Other</Text>
                    </TouchableOpacity>
                </View>
                <ListView />
                <View style={styles.fabContainer}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Modal')}
                        style={styles.fabButton}>

                        <Ionicons name="ios-add" color="#7C99AC" size={70} />

                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#D3DEDC",
    },
    fabContainer:{
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        color: "#7C99AC",
        right: 10,
        bottom: 20
    },
    fabButton:{
        backgroundColor: '#D3DEDC',
        borderRadius: 35,
        width: 70,
        height: 70,
        alignItems: "center",
        justifyContent: "center"
    },
    filterContainer:{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10,
    },
    categoryFilter:{
        backgroundColor: '#7C99AC',
        flexDirection: "row",
        borderRadius: 20,
        width: 60,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
        marginLeft: 5,
    },
    categoryText:{
        fontSize: 10,
        color: '#D3DEDC',
    },
    categoryFilterActive:{
        backgroundColor: '#D3DEDC',
        flexDirection: "row",
        borderRadius: 20,
        width: 60,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
        marginLeft: 5,
        borderWidth: 1,
        borderColor: "#7C99AC",
    },
    categoryTextActive:{
        fontSize: 10,
        color: '#7C99AC',
    },
})

export default ListScreen;