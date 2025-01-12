import React, { useState, createContext, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";
import { CreateHabit } from "@/components/CreateHabit";

const Stack = createStackNavigator();
const FriendContext = createContext<any>(null);

const FriendProvider = ({ children }: { children: React.ReactNode }) => {
  const [friends, setFriends] = useState<{ name: string }[]>([]);

  return (
    <FriendContext.Provider value={{ friends, setFriends }}>
      {children}
    </FriendContext.Provider>
  );
};

// "Find Friend" Form Screen
const FindFriendForm = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState("");
  const { friends, setFriends } = useContext(FriendContext);

  const handleFindFriend = () => {
    if (!name) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // Add the new friend to the context
    setFriends([...friends, { name }]);

    // Navigate to the "Friend Added" screen
    navigation.navigate("FriendAdded");
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
const FriendAddedScreen = ({ navigation }: { navigation: any }) => {
  const { friends } = useContext(FriendContext);

  // Get the latest friend's name
  const latestFriend = friends[friends.length - 1]?.name || "No Friend";

  return (
    <View style={styles.center}>
      <Text style={styles.message}>Friend {latestFriend} added!</Text>
      <ThemedText style={styles.submessage}>
        Set up a challenge with your friend!
      </ThemedText>
      <CreateHabit onPostSuccess={() => {}} />
      <Button
        title="Find Friend"
        onPress={() => {
          navigation.navigate("FindFriend");
        }}
        color="#6200ee"
      />
    </View>
  );
};

// App Component with Navigation
export default function App() {
  return (
    <FriendProvider>
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="FindFriend"
            component={FindFriendForm}
            options={{
              title: "Find Friends",
              headerStyle: {
                backgroundColor: "#6200ee",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen
            name="FriendAdded"
            component={FriendAddedScreen}
            options={{
              title: "Friend Added",
              headerStyle: {
                backgroundColor: "#6200ee",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </NavigationIndependentTree>
    </FriendProvider>
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
  submessage: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 5,
    marginBottom: 20,
    color: "#fff",
  },
});
