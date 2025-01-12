import {
  StyleSheet,
  Image,
  Platform,
  ImageSourcePropType,
  TouchableHighlight,
  View,
  InteractionManager,
  ImageBackground,
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
import { PokemonGuy } from '@/components/PokemonGuy';

const Stack = createStackNavigator();


function BattleScreen({ navigation }: { navigation: any }) {
  const sampleBattle: Battle = {
    id: 0,
    p1: 0,
    p2: 1,
    p1PkmnName: 'Jinglemon',
    p2PkmnName: 'Nicholasmon',
    p1Health: 3,
    p2Health: 3,
    startDate: ''
  }

  const renderHealthCircles = (health: number) => {
    const circles = [];
    for (let i = 0; i < 3; i++) {
      circles.push(
        <View
          key={i}
          style={[
            styles.healthCircle,
            { backgroundColor: i < health ? "green" : "red" },
          ]}
        />
      );
    }
    return circles;
  };

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
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBattles = async () => {
    try {
      const response = await fetch(uid ? "http://127.0.0.1:8000/api/get" : "http://127.0.0.1:8000/api_user2/get");
      console.log("response:", response)
      const data: Battle[] = await response.json();
      //setBattles(data);
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
        {battles.map((battle: Battle) => {
          console.log(battle);
          const pkmn1 = pokemen.find((p) => p.name === battle.p1PkmnName);
          const pkmn2 = pokemen.find((p) => p.name === battle.p2PkmnName);
          if (!pkmn1 || !pkmn2) {
            return null;
          }

          const p1path = pokemens.find((p) => p.pokemonID === pkmn1.pokemon)?.imgPath ?? pokemens[0].imgPath;
          const p2path = pokemens.find((p) => p.pokemonID === pkmn2.pokemon)?.imgPath ?? pokemens[0].imgPath;

          return (
            <TouchableHighlight
              key={battle.id}
              onPress={() => navigation.navigate("Battle Details", { battle })}
              underlayColor="#ddd"
            >
              <View style={styles.outerCard}>
                <ImageBackground
                  source={require('@/assets/images/fire_bg.png')}
                  style={styles.firebg}
                  imageStyle={styles.firebgimage}
                >
                </ImageBackground>
                <View style={styles.leftContainer}>
                  <ThemedView style={styles.pkmnInnerContainer}>
                    <ImageBackground
                      source={p1path}
                      style={{ flex: 1, width: "100%", height: "100%" }}
                      resizeMode="cover"
                    >
                    </ImageBackground>
                    {/* <Image
                    source={imgPath}
                    style={styles.pokeman}
                /> */}
                    <ThemedText type="default" style={styles.name}>
                      {pkmn1.name}
                    </ThemedText>
                  </ThemedView>
                  <View style={styles.healthContainer}>
                    {renderHealthCircles(battle.p1Health)}
                  </View>
                </View>
                <ThemedText style={styles.vsText}>VS.</ThemedText>
                <View style={styles.rightContainer}>
                  <ThemedView style={styles.pkmnInnerContainer}>
                    <ImageBackground
                      source={p2path}
                      style={{ flex: 1, width: "100%", height: "100%" }}
                      resizeMode="cover"
                    >
                    </ImageBackground>
                    {/* <Image
                    source={imgPath}
                    style={styles.pokeman}
                /> */}
                    <ThemedText type="default" style={styles.name}>
                      {pkmn2.name}
                    </ThemedText>
                  </ThemedView>
                  <View style={styles.healthContainer}>
                    {renderHealthCircles(battle.p2Health)}
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          );
        })}
        <CreateBattle user={{ uid }} onPostSuccess={() => { }} />
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
  outerCard: {
    borderWidth: 2,
    borderColor: "#444444",
    borderRadius: 8,
    paddingBottom: 8,
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  leftContainer: {
    flex: 1,
    height: 100,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "35%",
    flexDirection: "row"
  },
  rightContainer: {
    flex: 1,
    height: 100,
    justifyContent: "center",
    alignItems: "flex-end",
    width: "35%",
    flexDirection: "row"
  },
  vsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  healthContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginLeft: 10,
    height: 100
  },
  healthCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  name: {
    bottom: 4,
    textAlign: 'center',
    alignSelf: 'center',
    position: 'absolute',
    width: '100%',
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  pkmnInnerContainer: {
    height: '100%',
    width: 100,
    position: 'relative',
    backgroundColor: '#b78727',
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#444444',
    overflow: "hidden",
  },
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