  import {
    StyleSheet,
    Image,
    Platform,
    ImageSourcePropType,
    TouchableHighlight,
    View,
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
  
  const Stack = createStackNavigator();

  const inTargetTime = (startDate: string, timesPer: number, period: string) => {
    const date1: any = new Date(startDate);
    const date2: any = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = date2 - date1;
    const maxTargetDifference = periodToTimeMap[period] / timesPer;

    return differenceInMilliseconds < maxTargetDifference;

  }
  
  //pokemon screen displaying all pokemon
  function PokemonScreen({ navigation }: { navigation: any }) {
    const [pokemen, setPokeman] = useState<PyPokeType[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
  
    const fetchPokemen = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/");
          const data: PyPokeType[] = await response.json();
          setPokeman(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
    useEffect(() => {
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
            source={require('@/assets/images/pokebanner.png')}
            style={styles.headerImage}
          />
        }
      >
        <View style={styles.pokemonContainer}>
          {pokemen.map((poke) => (
            <TouchableHighlight
              key={poke.name}
              onPress={() => navigation.navigate("Pokemon Details", { pokemon: poke })}
              underlayColor="#ddd"
            >
            <View style={styles.outerCard}>
                <View style={styles.pokemonCard}>
                    <PokeHabit
                    imgPath={pokemonToImageMap[poke.pokemon]}
                    info={{
                        name: poke.name,
                        xp: poke.xp,
                        habit: poke.habit,
                        pokemon: poke.pokemon,
                        startDate: poke.startDate,
                        timesPer: poke.timesPer,
                        period: poke.period
                    }}
                    />
                    <PostRequestUpdate buttonText="TRACK!" onPostSuccess={refreshData}
                        param={{'name': poke.name, 'xp': poke.xp, 'pokemon': poke.pokemon, 'habit': poke.habit, 'startDate': poke.startDate, 'timesPer': poke.timesPer, 'period': poke.period}} />
                </View>
                <View style={inTargetTime(poke.startDate, poke.timesPer, poke.period) ? styles.valid : styles.invalid}>
                </View>
              </View>
            </TouchableHighlight>
          ))}
          <CreateHabit onPostSuccess={refreshData} />
        </View>
      </ParallaxScrollView>
    );
  }
  
  // details screen displaying more information about habit
  function PokemonDetailsScreen({ route }: { route: any }) {
    const { pokemon } = route.params;
  
    return (
      <ThemedView style={styles.detailsContainer}>
        <Image
          source={pokemonToImageMap[pokemon.pokemon]}
          style={styles.pokemonImage}
        />
        <ThemedText type="title">{pokemon.name}</ThemedText>
        <ThemedText>XP: {pokemon.xp}</ThemedText>
        <ThemedText>Habit: {pokemon.habit}</ThemedText>
      </ThemedView>
    );
  }
  
  // app component with navigation setup
  export default function App() {
    return (
        <NavigationIndependentTree>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="MY POKEMANS" component={PokemonScreen}
                        options={{
                            headerStyle: {
                                backgroundColor: "#6200ee", // Header background color
                            },
                            headerTintColor: "#fff", // Header text and icons color
                            headerTitleStyle: {
                                fontWeight: "bold", // Style for the header title
                            },
                        }} />
                    <Stack.Screen name="PokemonDetails" component={PokemonDetailsScreen} />
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
      paddingVertical: 16,
      width: '100%',
      position: 'relative'
    },
    pokemonCard: {
        width: "100%",
        marginVertical: 8,
        marginHorizontal: 0,
        justifyContent: "space-between", // Distribute space vertically
        alignItems: "center", // Center elements horizontally
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        flex: 1,
        flexDirection: "row", // Stack elements vertically,
        flexWrap: "wrap",
        position: "relative",
        padding: 8, // Adjust padding for better spacing
    },
    detailsContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16
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
        marginBottom: 8,
        justifyContent: "center"
    }
  });

  const pokemonToImageMap: { [key: string]: ImageSourcePropType } = {
    Nicholasmon: require("@/assets/images/pkmn_santa.png"),
    Deermon: require("@/assets/images/pkmn_reindeer.png"),
    Jinglemon: require("@/assets/images/pkmn_elf.png")
  };

  const periodToTimeMap: { [key: string]: number } = {
    Day: 24 * 60 * 60 * 100,
    Week: 7 * 24 * 60 * 60 * 100
  }