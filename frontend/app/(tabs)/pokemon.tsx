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

  import { useAppContext } from '../context/AppContext';
import { pokemens } from '@/constants/PokemenCatalog';
  
  const Stack = createStackNavigator();

  const inTargetTime = (xp: number, startDate: string, timesPer: number, period: string) => {
    const date1: any = new Date(startDate);
    const date2: any = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = date2 - date1;
    const maxTargetDifference = periodToTimeMap[period] / timesPer;

    return (differenceInMilliseconds / xp) < maxTargetDifference;

  }
  
  function PokemonScreen({ navigation }: { navigation: any }) {
    const { uid, setUid, clearUid } = useAppContext();
    const [pokemen, setPokeman] = useState<PyPokeType[]>([]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
    const [validationStatuses, setValidationStatuses] = useState<{ [key: string]: boolean }>({});
  
    const calculateRemainingDones = (pkmn: PyPokeType) => {
      return pkmn.timesPer - (pkmn.xp % (pkmn.timesPer + 1));
      // if (pkmn.lastDoneTime === "") {
      //   return pkmn.timesPer;
      // }
      // const currentTime = new Date;
      // const lastTime = new Date(pkmn.lastDoneTime);
      // const elapsed = lastTime.getTime() - currentTime.getTime();

      // const intervalInMs = pkmn.period === "Day" 
      //   ? pkmn.timesPer * 24 * 60 * 60 * 1000
      //   : pkmn.timesPer * 7 *  24 * 60 * 60 * 1000;

      // const elapsedIntervals = Math.floor(elapsed / intervalInMs);
      // const remainingDones = elapsedIntervals * pkmn.timesPer;

      // return remainingDones;
    };

    const fetchPokemen = async () => {
      try {
        const response = await fetch(uid ? "http://127.0.0.1:8000/api/get" : "http://127.0.0.1:8000/api_user2/get");
        console.log("response:", response)
        const data: PyPokeType[] = await response.json();
        setPokeman(data);
  
        // Initialize validation statuses for all Pokémon
        const initialStatuses: { [key: string]: boolean } = {};
        data.forEach((poke) => {
          initialStatuses[poke.name] = false; // Default to invalid initially
        });
        setValidationStatuses(initialStatuses);
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
  
    useEffect(() => {
      // Function to validate each Pokémon
      const validatePokemen = () => {
        const newStatuses: { [key: string]: boolean } = { ...validationStatuses };
        pokemen.forEach((poke) => {
          const isValid = inTargetTime(poke.xp, poke.startDate, poke.timesPer, poke.period);
          newStatuses[poke.name] = !isValid;
        });
        setValidationStatuses(newStatuses); // Update validation statuses
      };
  
      // Set an interval to call `validatePokemen` every second
      const intervalId = setInterval(validatePokemen, 100);
  
      // Cleanup interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [pokemen, validationStatuses]); // Re-run if pokemen or statuses change
  
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <Image
            source={require('@/assets/images/pokebanner.png')}
            style={styles.headerImage}
          />
        }
        noPadding={true}
      >
        <ThemedText style={styles.title}>My Pokeemamn</ThemedText>
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
                    imgPath={pokemens.find((p) => p.pokemonID === poke.pokemon)?.imgPath ?? pokemens[0].imgPath}
                    info={{ ...poke }}
                  />
                  <View style={{alignItems: 'center'}}>
                  <PostRequestUpdate
                    user={{uid: uid}}
                    buttonText="DONE!"
                    onPostSuccess={refreshData}
                    param={{
                      ...poke
                    }}
                    disabled={calculateRemainingDones(poke) === 0}
                  />
                  <ThemedText>x{calculateRemainingDones(poke)}</ThemedText>
                  </View>
                </View>
                {/* Display valid/invalid based on validationStatuses */}
                <View style={!validationStatuses[poke.name] ? styles.valid : styles.invalid}></View>
              </View>
            </TouchableHighlight>
          ))}
          <CreateHabit user={{uid: uid}} onPostSuccess={refreshData} />
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
          source={pokemens.find((p) => p.pokemonID === pokemon.pokemon)?.imgPath}
          style={styles.pokemonImage}
        />
        <ThemedText type="title">{pokemon.name}</ThemedText>
        <ThemedText>XP: {pokemon.xp}</ThemedText>
        <ThemedText>Habit: {pokemon.habit}</ThemedText>
        <ThemedText>Start date: {(new Date(pokemon.startDate).toDateString())}</ThemedText>
        <ThemedText>Goal: {pokemon.timesPer} time(s) per {pokemon.period}</ThemedText>
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
                    <Stack.Screen name="Pokemon Details" component={PokemonDetailsScreen} />
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
      margin:5,
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


  const periodToTimeMap: { [key: string]: number } = {
    Day: 24 * 60 * 60 * 1000,
    Week: 7 * 24 * 60 * 60 * 1000
  }