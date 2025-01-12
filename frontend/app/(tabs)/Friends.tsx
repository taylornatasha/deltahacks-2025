import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { CreateHabit } from "@/components/CreateHabit";

const Stack = createStackNavigator();

// "Find Friend" Form Screen
const FindFriendForm = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState("");

  const handleFindFriend = () => {
    if (!name) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    navigation.navigate("FriendAdded"); // Navigate to the "Friend Added" screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a Friend</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <Button title="Find Friend" onPress={handleFindFriend} color="#6200ee" />
    </View>
  );
};

// "Friend Added" Screen
const FriendAddedScreen = () => {
  return (
    <View style={styles.center}>
      <Text style={styles.message}>Friend added!</Text>
      <ThemedText>
        Set up a challenge with your friend!
      </ThemedText>
      <CreateHabit onPostSuccess={() => {}} />
    </View>
  );
};

// App Component with Navigation
export default function App() {
  return (
    <NavigationIndependentTree>
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
            name="FindFriend"
            component={FindFriendForm}
            options={{
                title: "Find Friends",
                headerStyle: {
                backgroundColor: "#6200ee", // Header background color
                },
                headerTintColor: "#fff", // Header text and icons color
                headerTitleStyle: {
                fontWeight: "bold", // Style for the header title
                },
            }}
            />
            <Stack.Screen
            name="FriendAdded"
            component={FriendAddedScreen}
            options={{
                title: "Friend Added",
                headerStyle: {
                backgroundColor: "#6200ee", // Header background color
                },
                headerTintColor: "#fff", // Header text and icons color
                headerTitleStyle: {
                fontWeight: "bold", // Style for the header title
                },
            }}
            />
        </Stack.Navigator>
        </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
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
    color: "#6200ee",
  },
});
