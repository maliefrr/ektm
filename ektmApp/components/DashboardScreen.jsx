import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';

const DashboardScreen = ({route}) => {
    const {name,nim,prodi,image} = route.params;
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#4569e8', '#43cacb']} style={styles.gradient} />
        <View style={styles.profileContainer}>
            <Image style={styles.profileImage} source={{ uri: `${image}` }} />
            <Text style={styles.profileName}>{name}</Text>
        </View>
        <View style={styles.biodataContainer}>
            <Text style={styles.biodataText}>NIM: {nim}</Text>
            <Text style={styles.biodataText}>Program Studi: {prodi}</Text>
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
        borderWidth: 1,
        backgroundColor: "white"
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
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    }
});

export default DashboardScreen;
