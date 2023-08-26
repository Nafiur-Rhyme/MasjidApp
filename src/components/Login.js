import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import usersData from './users.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';


const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        try {
            const user = usersData.find(user => user.username === username && user.password === password);
            if (user) {
                AsyncStorage.setItem("keepLoggedIn", JSON.stringify(true));
                setLoginStatus('');
                onLogin();
            } else {
                setLoginStatus('Invalid username or password');
            }
        } catch (error) {
            console.error('Error fetching JSON:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to the Masjid App </Text>
            <Text style={styles.infoText}> Please Log in</Text>

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Enter Username"
                placeholderTextColor="#808080"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Enter Password"
                secureTextEntry={!showPassword}
                placeholderTextColor="#808080"
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />
            <Pressable onPress={togglePasswordVisibility} style={styles.showHide}>
                <Text style={{ paddingLeft: 10 }}>{showPassword ? 'Hide Password' : 'Show Password'}</Text>
            </Pressable>



            <Pressable style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.btnText}>Login</Text>
            </Pressable>

            <Text style={{
                color: 'red',
                margin: 15,
                height: 40,
                padding: 10
            }}>{loginStatus}</Text>
        </View >
    )
}

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        margin: 50,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: '50%',
        marginBottom: 20,
    },
    infoText: {
        fontSize: 18,
        marginBottom: 30,
    },
    text: {
        fontSize: 18,
        paddingBottom: 5,
    },
    inputBox: {
        paddingTop: 20,
        paddingBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        padding: 10
    },
    loginButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'Center',
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#90655a',
    },
    btnText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default Login;
