import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TextInput, Button } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppContext } from "../context/AppContext";

const Stack = createStackNavigator();

const SignInScreen = ({ navigation }: { navigation: any }) => {
    const [profileName, setProfileName] = useState("");
    const { uid, setUid } = useAppContext();
    const [pendingUid, setPendingUid] = useState<number | null>(null);
  
    const handleSignIn = () => {
      const newUid = profileName.toLowerCase() === "thomas" ? 1 : 0;
      setUid(newUid); // Update the uid state
      setPendingUid(newUid); // Track the newUid for comparison
    };
  
    useEffect(() => {
      // React when `uid` is updated and matches the pendingUid
      if (uid === pendingUid && uid !== null) {
          navigation.navigate("Success", { user: profileName });
          console.log("isThomas:", uid);
        setPendingUid(null); // Clear pendingUid after handling
      }
    }, [uid, pendingUid, navigation]);

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
        <TextInput
          style={styles.input}
          placeholder="User"
          value={profileName}
          onChangeText={setProfileName}
        />
      </ThemedView>
      <Button title="Sign In" onPress={handleSignIn} />
    </ParallaxScrollView>
  );
};

const SuccessScreen = ({ route }: { route: any }) => {
    const { user } = route.params;
    const { uid, setUid } = useAppContext();
    return (
        <View style={styles.center}>
        <Text style={styles.message}>🎉 Sign-In Successful! 🎉</Text>
        <Text style={styles.submessage}>Welcome, {user}!</Text>
        </View>
    );
};

export default function App() {
  return (
    <NavigationIndependentTree>
        <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name="Success"
            component={SuccessScreen}
            options={{
                headerTitle: "Success",
                headerStyle: { backgroundColor: '#6200ee' },
                headerTintColor: '#fff',
            }}
            />
        </Stack.Navigator>
        </NavigationContainer>
    </NavigationIndependentTree>
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
        color: "#fff",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: "#151718",
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
        color: "#fff",
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
