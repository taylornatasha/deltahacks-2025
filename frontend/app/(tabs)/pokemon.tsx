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
  
  import { Collapsible } from '@/components/Collapsible';
  import { ExternalLink } from '@/components/ExternalLink';
  import ParallaxScrollView from '@/components/ParallaxScrollView';
  import { ThemedText } from '@/components/ThemedText';
  import { ThemedView } from '@/components/ThemedView';
  import { IconSymbol } from '@/components/ui/IconSymbol';
  import { PokemonGuy } from '@/components/PokemonGuy';
  
  type PyPokeType = {
    name: string;
    xp: number;
    pokemon: string;
    habit: string;
  };
  
  const Stack = createStackNavigator();
  
  // Main screen displaying the Pokémon list
  function PokemonScreen({ navigation }: { navigation: any }) {
    const [pokemen, setPokeman] = useState<PyPokeType[]>([]);
  
    useEffect(() => {
      const fetchPokemen = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/");
          const data: PyPokeType[] = await response.json();
          setPokeman(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchPokemen();
    }, []);
  
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
        {/* <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">My Pokemen</ThemedText>
        </ThemedView> */}
        <View style={styles.pokemonContainer}>
          {pokemen.map((poke) => (
            <TouchableHighlight
              key={poke.name}
              onPress={() => navigation.navigate("PokemonDetails", { pokemon: poke })}
              underlayColor="#ddd"
            >
              <View style={styles.pokemonCard}>
                <PokemonGuy
                  name={poke.name}
                  imgPath={pokemonToImageMap[poke.pokemon]}
                  xp={poke.xp}
                />
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </ParallaxScrollView>
    );
  }
  
  // Details screen displaying more information about a Pokémon
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
  
  // App component with navigation setup
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
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around"
    },
    pokemonCard: {
      width: 150,
      height: 150,
      margin: 8,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      elevation: 3,
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
  