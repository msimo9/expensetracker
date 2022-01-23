import React, {useState} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, TextInput, Picker, ScrollView} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

import { useDispatch } from 'react-redux'
import {addItem} from '../redux/reducer'

const ModalScreen = ({navigation}) => {
    
    const [value, setValue] = useState('');
    const [value_price, setPrice] = useState('');
    const [selectedValue, setSelectedValue] = useState("FOOD");

    const date = new Date().getDate();
    const month = new Date().getMonth()+1;
    const year = new Date().getFullYear();

    const currentDate = date + ". "+month+". ";

    const dispatch = useDispatch()

    const onSaveNote = (value,value_price, selectedValue, date, month) => {
        dispatch(addItem(value, value_price, selectedValue, date, month))
        navigation.navigate("List")
    }
    return(
        <View style={styles.container}>
            <View style={styles.innerContainer}>    
                <View style={styles.closeButtonContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="ios-close" color="#7C99AC" size={40} />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    style={styles.modalContainer}
                    contentContainerStyle={{flexGrow: 1, alignItems: "center"}}
                >

                    <Text style={styles.modalText}>
                        Expense Info
                    </Text>

                    <TextInput
                        style={styles.modalInput}
                        numberOfLines={1}
                        value={value}
                        onChangeText={value => setValue(value)}
                        clearButtonMode="while-editing"
                    />

                    <Text style={styles.modalText}>
                        Expense Price
                    </Text>

                    <TextInput
                        style={styles.modalInput}
                        numberOfLines={1}
                        keyboardType='numeric'
                        value={value_price}
                        onChangeText={value_price => setPrice(value_price)}
                        clearButtonMode="while-editing"
                    />

                    <Text style={styles.modalText}>
                        Expense Type
                    </Text>

                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Food or drink" value="FOOD" />
                        <Picker.Item label="Technology" value="TECH" />
                        <Picker.Item label="Bills" value="BILL" />
                        <Picker.Item label="Other" value="OTHR" />
                    </Picker>

                    <TouchableOpacity
                        style={styles.modalConfirm}
                        onPress={() => onSaveNote(value, value_price, selectedValue, currentDate, month)}
                    >
                        <Ionicons name="ios-arrow-forward-circle" size={40} color="#7C99AC"/>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    innerContainer:{
        flex: 1,
        borderRadius: 10,
        justifyContent: "flex-end",
        flexDirection: "row",
        height: "70%",
        width: "80%",
        position: "absolute",
        top: 25,
        //right: 0,
        backgroundColor: "#FFEFEF",
    },
    closeButtonContainer:{
        position: "absolute",
        alignItems: "flex-end",
        right: 20,
        zIndex: 99,
        
    },
    closeButton:{
        backgroundColor: "#FFEFEF",
        borderRadius: 20,
        width: "10%",
        height: 40,
        top: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    modalContainer:{
        width: "100%",
        marginTop: 10,
    },
    modalInput:{
        height: 50,
        width: "70%",
        padding: 5,
        borderColor: "#7C99AC",
        borderWidth: 1,
        marginTop: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    typePicker:{
        height: 50,
        width: "70%",
        borderColor: "#7C99AC",
        borderWidth: 1,
        marginTop: 5,
        fontSize: 12,
        borderRadius: 5,
    },
    modalConfirm:{
        marginTop: 10,
        backgroundColor: "#FFEFEF",
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        position: "absolute",
        bottom: 20,
        right: 5,
    },
    modalText:{
        color: "#7C99AC",
        fontSize: 12,
        marginTop: 5,
    },
})

export default ModalScreen;