import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import PrayerCard from './PrayerCards';
import * as Location from "expo-location";
import moment from "moment-timezone";
import { getPrayerTimes } from './getPrayerTimes';

const date = new Date();

const Dashboard = ({ onLogout }) => {

    const [location, setLocation] = useState(null);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const [error, setError] = useState(null);

    //Getting location, lat, long
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setError('Permission to access location Denied');
                console.log(error);
                return;
            }
            setError('Got Location');
            console.log(error);
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setLat(location.coords.latitude);
            setLong(location.coords.longitude);
        })()
    }, []);


    const { prayerTimesToday, nextFivePrayers, current, currentTime } = getPrayerTimes(lat, long, date);


    //const coordinates = new Coordinates(23.7961049, 90.3995578); // Dhaka Coordinates
    const today = moment(date).format("DD MMMM, YYYY");
    const sunrise = moment(prayerTimesToday.sunrise).format("h:mm A - DD-MMM-YYYY");
    const sunset = moment(prayerTimesToday.sunset).format("h:mm A - DD-MMM-YYYY");

    return (
        <View style={styles.container}>

            <Text style={styles.messageTop}>Adhan Times ({today})</Text>

            <Text style={styles.message}>Sunrise : {sunrise}</Text>
            <Text style={styles.message}>Sunset : {sunset}</Text>

            <View style={styles.card}>
                <Text style={styles.importantMessage}>Current Prayer : </Text>
                <Text style={styles.importantMessage2}>{current} {currentTime}</Text>
            </View>

            <Text style={styles.messageTop}>Next 5 Prayer Times: </Text>

            <ScrollView>
                {nextFivePrayers.map((prayer, index) => (
                    <PrayerCard key={index} name={prayer.name} time={moment(prayer.time).format("h:mm A - DD-MMM-YYYY")} />
                ))}
            </ScrollView>

            <Pressable style={styles.logoutButton} onPress={onLogout}>
                <Text style={styles.btnText}>Logout</Text>
            </Pressable>

        </View>
    );
}

Dashboard.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#5b828e',
        padding: 15,
        marginVertical: 8,
        elevation: 3,
        borderRadius: 8,
    },
    root: {
    },
    container: {
        paddingTop: 10,
        margin: 50,
    },
    logoutButton: {
        alignItems: 'center',
        justifyContent: 'Center',
        marginLeft: 200,
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        borderRadius: 4,
        elevation: 2,
        //backgroundColor: '#461273',
        backgroundColor: '#90655a',
    },
    btnText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    messageTop: {
        fontSize: 20,
        fontWeight: "bold",
        paddingTop: 20,
        paddingBottom: 10,
    },
    message: {
        fontSize: 18,
        paddingBottom: 5,
    },
    importantMessage: {
        fontSize: 19,
        color: '#fff',
        fontWeight: 'bold'
    },
    importantMessage2: {
        fontSize: 19,
        color: '#fff',
    },
});


export default Dashboard;