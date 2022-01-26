import React from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity, StatusBar} from 'react-native';
import { useSelector } from 'react-redux';
import {Ionicons} from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import {removeItem} from '../redux/reducer'
import { populateArray } from '../redux/reducer';



function ListView(){

    const listItems = useSelector(state => state.itemList)
    const priceTotal = useSelector(state => state.total)
    const filter = useSelector(state => state.filter)

    const dispatch = useDispatch()
    const onRemoveNote = (id, price, month) => {
        dispatch(removeItem(id, price, month))
    }

    const filteredListItems = listItems.filter((item)=>{
        return item.type == filter || filter == "all";
    })

    return(
        <View
            style={styles.listview}
        >
            {listItems.length !== 0 ? (
                <View>
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalPrice}>Total: {priceTotal} €</Text>
                    </View>
                    <FlatList
                        data={filteredListItems}
                        extraData={filter}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item})=> (
                            <View style={styles.listItemContainer}>
                                <View style={styles.listItemMetaContainer}>
                                    <Text style={styles.itemPrice} numberOfLines={2}>
                                        {}
                                        {item.price} €
                                    </Text>

                                    <Text style={styles.itemTitle} numberOfLines={2}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.itemMetaData} numberOfLines={2}>
                                        {item.date}
                                    </Text>
                                    <Text style={styles.itemMetaData} numberOfLines={2}>
                                        {item.type}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => onRemoveNote(item.id, item.price, item.month)}
                                        style={styles.removeItem}
                                    >
                                        <Ionicons name="ios-trash-bin-outline" color="#7C99AC" size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                        }
                    />
                </View>
            ):(
                <Text>Your list is empty :(</Text>
            )
            }
            
        </View>
    )
}


const styles = StyleSheet.create({
    listview:{
        backgroundColor: "white",
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    itemTitle:{
        margin: 10,
        fontSize: 8,
        width: "15%",
    },
    itemPrice:{
        margin: 10,
        fontSize: 8,
        width: "12%"
    },
    itemMetaData:{
        margin: 10,
        fontSize: 8,
        width: "10%",
    },
    listItemMetaContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor:"#D3DEDC",
    },
    totalContainer:{
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        borderBottomWidth: 1,
        borderColor:"#D3DEDC",
    },
    totalPrice:{
        fontSize: 20,
    },
    removeItem:{
        position: "absolute",
        alignItems: "flex-end",
        right: 20,
    },
})

export default ListView;