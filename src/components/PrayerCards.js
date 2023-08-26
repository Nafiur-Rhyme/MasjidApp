import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const PrayerCard = ({ name, time }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.time}>{time}</Text>
        </View>
    );
};

PrayerCard.propTypes = {
    name: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f5f5dc',
        padding: 10,
        marginVertical: 8,
        elevation: 3,
        borderRadius: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 16,
        marginTop: 2,
    },
});

export default PrayerCard;
