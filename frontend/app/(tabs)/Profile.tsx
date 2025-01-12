import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// App Component
export default function App() {
    const [profileName, setProfileName] = useState('');

    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#FFFFFF', dark: '#1f1f1f' }}
            headerImage={
                <Image
                    source={require('@/assets/images/festive_little_guys.png')}
                    style={styles.banner}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Profile</ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText>Name:</ThemedText>
                <TextInput style={styles.input}
                    placeholder="User"
                    value={profileName}
                    onChangeText={setProfileName}
                />
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    banner: {
        height: '95%',
        width: '95%',
        margin: 10,
        left: 0,
        position: 'absolute',
    },
    arrow: {
        bottom: -65,
        right: 30,
        transform: [{ scale: 0.6 }, { scaleX: 0.8 }, { rotate: '75deg' }],
        // borderWidth: 2,
        position: 'absolute'
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        backgroundColor: "#1f1f1f",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#fff",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        //color: "#fff",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        //backgroundColor: "#151718",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#151718",
    },
    message: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#6200ee",
        marginTop: 40
    },
    submessage: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 5,
        marginBottom: 20,
        color: "#fff",
    },
    buttons: {
        flex: 1,
        maxHeight: 35,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    button: {
        margin: 10,
        top: 0
    }
});
