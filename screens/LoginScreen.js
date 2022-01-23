import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import React, { useEffect, useState } from 'react';

import auth from '../firebase'

function LoginScreen({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                const uid = user.uid;
                navigation.replace('List');
            }
        })
        return unsubscribe;
    }, [])

    const handleSignup = () =>{
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("User signed up with: ")
            console.log("-email: ", user.email)
            navigation.replace('List')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error code: ", errorCode)
            console.log("Error message: ", errorMessage)
        });
    }


    const handleLogin = () =>{
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Successfully logged in with: ")
            console.log("-email: ", user.email);
            navigation.replace('List');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error code: ", errorCode);
            console.log("Error message: ", errorMessage);
        });
    }

    
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>LOGIN SCREEN</Text>

        <Text style={styles.subtitle}>Email</Text>
        <TextInput 
            style={styles.inputField}
            placeholder='email'
            value={email}
            onChangeText={(text) => setEmail(text)}
        />


        <Text style={styles.subtitle}>Password</Text>
        <TextInput 
            style={styles.inputField}
            placeholder='password'
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry = {true}
        />
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
                style={styles.button}
                onPress = {handleLogin}
            >
                <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.button}
                onPress={handleSignup}
            >
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#D3DEDC",
        justifyContent: "center",
        alignItems: "center",
    },
    title:{
        color: "#7C99AC",
        marginBottom: 40,
        fontSize: 24,
    },
    subtitle:{
        color: "#7C99AC",
        fontSize: 10,
    },
    inputField:{
        width: "60%",
        backgroundColor: "#7C99AC",
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        marginTop: 5,
        color: "#D3DEDC",
    },
    buttonContainer:{
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        width: "100%",
    },
    button:{
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
    buttonText:{
        color: "#D3DEDC",
    }
});


export default LoginScreen;