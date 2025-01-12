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
  import { PostRequestComponent } from '@/components/PostRequestComponent';
  import { CreateHabit } from '@/components/CreateHabit';
  import { PyPokeType } from '@/types/poke';
  
  const Stack = createStackNavigator();
  
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
              <View style={styles.pokemonCard}>
                <PokeHabit
                  name={poke.name}
                  imgPath={pokemonToImageMap[poke.pokemon]}
                  xp={poke.xp}
                  habit={poke.habit}
                />
                <PostRequestComponent buttonText="TRACK!" onPostSuccess={refreshData} param={{'name': poke.name, 'xp': +poke.xp + 1, 'pokemon': poke.pokemon, 'habit': poke.habit}} />
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
                    <Stack.Screen name="My Pokemen" component={PokemonScreen} />
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
      alignItems: "center", // Center cards horizontally
      paddingVertical: 16,
    },
    pokemonCard: {
      width: "90%", // Make the card width proportional to the screen width
      height: 130,
      marginVertical: 8, // Add vertical spacing between cards
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f0f0f0", // Add background color for visibility
      borderRadius: 8,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    detailsContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    pokemonImage: {
      width: 150,
      height: 150,
      marginBottom: 16,
    },
  });
  
  
  const pokemonToImageMap: { [key: string]: ImageSourcePropType } = {
    pikachu: require('@/assets/images/pikachu.png'),
    slowbro: require('@/assets/images/slowbro.png'),
  };
  