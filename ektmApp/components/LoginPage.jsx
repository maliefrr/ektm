import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
const LoginPage = (props,{route}) => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = async () => {
        try {
            const response = await axios.post("https://44b9-180-251-155-166.ap.ngrok.io/api/users/login",{
                username,password
            })
            console.log(response.data.data)
            console.log(response.data.message)
            props.navigation.navigate("Dashboard")
        } catch (error) {
            console.log(error.message)
        }
    };

    return (
    <View style={styles.container}>
        <LinearGradient colors={['#4569e8', '#43cacb']} style={styles.gradient} />
        <Image style={styles.logo} source={require("../assets/logo-uho.png")} />
        <Text style={styles.title}>Kartu Tanda Mahasiswa Elektronik</Text>
        <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#cccccc"
            onChangeText={(text) => setUsername(text)}
            value={username}
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#cccccc"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonTitle}>Login</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    input: {
        width: '80%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#000000',
        backgroundColor: "#ffffff",
        color: "#000000",
        marginBottom: 20,
        borderRadius: 25,
    },
    button: {
        width: '80%',
        backgroundColor: '#ec8213',
        borderRadius: 25,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    buttonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#ffffff',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
});

export default LoginPage
