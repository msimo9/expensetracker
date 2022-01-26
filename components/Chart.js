import React from 'react';
import {View, Dimensions, Button, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { useSelector } from 'react-redux';

const populateSampleDates = (dateArray) => {
    const date = new Date().getDate();
    const month = new Date().getMonth()+1;
    const year = new Date().getFullYear();

    //const currentDate = date + ". "+month+". "+ year;

    for(let j=0; j<5; j++){
        dateArray[j]=date-j + ". "+month+". "
    }
    dateArray = dateArray.reverse();
    return dateArray;
}

const populateMonthNames = (numberOfMonths) => {
    const currentMonth = new Date().getMonth()+1;
    const monthsNames = ['NaMonth','Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
    const monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    let monthArray = [];
    let j=parseInt(currentMonth);
    for (let i=0; i<numberOfMonths; i++){
        monthArray.push(monthsNames[j])
        j-=1;
        if(j==0)j=12
    }
    return monthArray.reverse();
    
}
const populateMonthSums_new = (sumArray, numberOfMonths) => {
    const currentMonth = new Date().getMonth()+1;
    let monthSumArray = [];
    let j=parseInt(currentMonth);
    for (let i=0; i<numberOfMonths; i++){
        monthSumArray.push(sumArray[j])
        j-=1;
        if(j==0)j=12
    }
    return monthSumArray.reverse();
    
}

const populateMonthSums = (sumArray, numberOfMonths) => {
    //to je koda za testiranje
    //koda generira za prejšnje mesece (tj. numberOfMonths) naključne vrednosti, ki jih je uporabnik zapravil
    const currentMonth = new Date().getMonth()+1; //get current month
    let newTempSum = [] //declare temp array of monthly spendings
    newTempSum.push(sumArray[currentMonth]) //push actual spending of current month

    for (let i=1; i<numberOfMonths; i++){
        let randomValue = Math.floor(Math.random()*10)+1
        randomValue = randomValue*100
        newTempSum.push(randomValue) //push random value to the array (between 100 and 1000)
    }

    return newTempSum.reverse() //reverse so current month spending will be at the back of array
}

const Chart = () => {

    const listItems = useSelector(state => state.itemList)
    const priceTotal = useSelector(state => state.total)
    const sumByMonth = useSelector(state => state.sumByMonth)
    let newMonthSum = []
    let newMonthNames = []
    //code bellow works
    //let allDates = listItems.map(a => a.date);
    let allDates = [null]
    allDates = populateSampleDates(allDates)
    let gatheredDates = listItems.map(a => a.date);
    
    let allDatesUnique = allDates;

    for (let i=0; i<gatheredDates.length; i++){
        if(allDatesUnique.indexOf(gatheredDates[i]) == -1){
            allDatesUnique.push(gatheredDates[i]);
        }
    }

    newMonthNames = populateMonthNames(5);
    newMonthSum = populateMonthSums_new(sumByMonth, 5);

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Total spent chart</Text>
            <LineChart
                data={{
                labels: newMonthNames,
                datasets: [
                    {
                    data: newMonthSum
                    }
                ]
                }}
                //verticalLabelRotation={110}
                width={Dimensions.get("window").width} // from react-native
                height={Dimensions.get("window").height/2}
                yAxisSuffix="€"
                yAxisInterval={100} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#D3DEDC",
                backgroundGradientFrom: "#92A9BD",
                backgroundGradientTo: "#92A9BD",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "white"
                }
                }}
                bezier
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />
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
    title:{
        fontSize: 28,
        color: "white",
    },
})

export default Chart