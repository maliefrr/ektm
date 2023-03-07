import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const DashboardScreen = () => {

    return (
        <View style={styles.container}>
        <View style={styles.profileContainer}>
            <Image style={styles.profileImage} source={{ uri: "https://cdn.discordapp.com/attachments/930164742067195934/933812193718321192/20210626_012927.jpg" }} />
            <Text style={styles.profileName}>Test</Text>
        </View>
        <View style={styles.biodataContainer}>
            <Text style={styles.biodataText}>Age: 21</Text>
            <Text style={styles.biodataText}>Address: Jl Raya Kambu</Text>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    biodataContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    biodataText: {
        fontSize: 16,
        marginVertical: 5,
    },
});

export default DashboardScreen;
