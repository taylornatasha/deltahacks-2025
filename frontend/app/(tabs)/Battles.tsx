import {
  StyleSheet,
  Image,
  Platform,
  ImageSourcePropType,
  TouchableHighlight,
  View,
  InteractionManager,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PokeHabit } from '@/components/PokemonGuy';
import { PostRequestUpdate } from '@/components/PostRequestComponent';
import { CreateHabit } from '@/components/CreateHabit';
import { PyPokeType } from '@/types/poke';
import { Battle } from '@/types/battle';
import { CreateBattle } from '@/components/CreateBattle';

import { useAppContext } from '../context/AppContext';
import { pokemens } from '@/constants/PokemenCatalog';

const Stack = createStackNavigator();


function BattleScreen({ navigation }: { navigation: any }) {
  const sampleBattle: Battle = {
    id: 0,
    p1: 0,
    p2: 1,
    p1PkmnName: 'khskdjfd',
    p2PkmnName: 'dsflkjsdf',
    p1Health: 3,
    p2Health: 3,
    startDate: ''
  }

  const { uid, setUid, clearUid } = useAppContext();
  const [pokemen, setPokeman] = useState<PyPokeType[]>([]);
  const [battles, setBattles] = useState<Battle[]>([sampleBattle]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const fetchPokemen = async () => {
    try {
      const response = await fetch(uid ? "http://127.0.0.1:8000/api/get" : "http://127.0.0.1:8000/api_user2/get");
      console.log("response:", response)
      const data: PyPokeType[] = await response.json();
      setPokeman(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBattles = async () => {
    try {
      const response = await fetch(uid ? "http://127.0.0.1:8000/api/get" : "http://127.0.0.1:8000/api_user2/get");
      console.log("response:", response)
      const data: Battle[] = await response.json();
      setBattles(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBattles();
    fetchPokemen();
  }, [refreshTrigger]);

  const refreshData = () => {
    setRefreshTrigger((prev) => !prev); // Toggle the trigger
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require('@/assets/images/battle.png')}
          style={styles.headerImage}
        />
      }
      noPadding={true}
    >
      <ThemedText style={styles.title}>My Battles</ThemedText>
      <View style={styles.pokemonContainer}>
        {battles.map((battle: Battle) => (
          <TouchableHighlight
            key={battle.id}
            onPress={() => navigation.navigate("Battle Details", { battle })}
            underlayColor="#ddd"
          >
            <ThemedText>Hi</ThemedText>
          </TouchableHighlight>
        ))}
        <ThemedText>{pokemen.length}</ThemedText>
        {<CreateBattle user={{ uid }} onPostSuccess={() => { }} />}
      </View>
    </ParallaxScrollView>
  );
}

function BattleDetailScreen({ route }: { route: any }) {
  const { battle } = route.params;

  return (
    <ThemedView style={styles.detailsContainer}>
      <ThemedText type="title">Battle</ThemedText>
    </ThemedView>
  );
}

// app component with navigation setup
export default function App() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="BATTLES" component={BattleScreen}
            options={{
              headerStyle: {
                backgroundColor: "#6200ee", // Header background color
              },
              headerTintColor: "#fff", // Header text and icons color
              headerTitleStyle: {
                fontWeight: "bold", // Style for the header title
              },
            }} />
          <Stack.Screen name="Battle Details" component={BattleDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    alignSelf: "center",
    top: -36,
    left: 0,
    position: "relative",
    transform: [{ scale: 0.8 }],
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    padding: 16,
  },
  pokemonContainer: {
    flex: 1,
    flexDirection: "column", // Ensure cards are stacked vertically
    justifyContent: "flex-start", // Align cards to the top of the container
    paddingBottom: 16,
    width: '100%',
    position: 'relative',
  },
  pokemonCard: {
    width: "100%",
    //marginVertical: 8,
    marginHorizontal: 0,
    justifyContent: "space-between", // Distribute space vertically
    alignItems: "center", // Center elements horizontally
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    position: "relative",
    padding: 8,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 5,
  },
  pokemonImage: {
    width: '100%',
    height: 150,
    marginBottom: 16
  },
  valid: {
    height: 4,
    backgroundColor: "green",
    width: "98%", // Same as valid for consistency
    textAlign: "center",
    paddingVertical: 4,
    color: "white",
    alignSelf: "center",
    marginTop: "auto"
  },
  invalid: {
    height: 4,
    backgroundColor: "red",
    width: "98%", // Same as valid for consistency
    textAlign: "center",
    paddingVertical: 4,
    color: "white",
    alignSelf: "center",
    marginTop: "auto"
  },
  outerCard: {
    borderWidth: 2,
    borderColor: "#444444",
    borderRadius: 8,
    paddingBottom: 8,
    justifyContent: "center"
  }
});

const pokemonToImageMap: { [key: string]: ImageSourcePropType } = {
  Nicholasmon: require("@/assets/images/pkmn_santa.png"),
  Deermon: require("@/assets/images/pkmn_reindeer.png"),
  Jinglemon: require("@/assets/images/pkmn_elf.png"),

};

const periodToTimeMap: { [key: string]: number } = {
  Day: 24 * 60 * 60 * 1000,
  Week: 7 * 24 * 60 * 60 * 1000
}