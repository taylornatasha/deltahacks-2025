import {
    StyleSheet,
    Image,
    View,
    ImageBackground,
    TouchableHighlight,
  } from 'react-native';
  import React, { useState, useEffect } from 'react';
  import { createStackNavigator } from '@react-navigation/stack';
  import { NavigationContainer } from '@react-navigation/native';
  
  import ParallaxScrollView from '@/components/ParallaxScrollView';
  import { ThemedText } from '@/components/ThemedText';
  import { ThemedView } from '@/components/ThemedView';
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
      p1PkmnName: 'Jinglemon',
      p2PkmnName: 'Nicholasmon',
      p1Health: 3,
      p2Health: 3,
      startDate: '',
    };
  
    const renderHealthCircles = (health: number) => {
      const circles = [];
      for (let i = 0; i < 3; i++) {
        circles.push(
          <View
            key={i}
            style={[
              styles.healthCircle,
              { backgroundColor: i < health ? 'green' : 'red' },
            ]}
          />
        );
      }
      return circles;
    };
  
    const { uid } = useAppContext();
    const [pokemen, setPokeman] = useState<PyPokeType[]>([]);
    const [battles, setBattles] = useState<Battle[]>([sampleBattle]);
    const [refreshTrigger, setRefreshTrigger] = useState(false);
  
    const fetchPokemen = async () => {
      try {
        const response = await fetch(
          uid
            ? 'http://127.0.0.1:8000/api/get'
            : 'http://127.0.0.1:8000/api_user2/get'
        );
        const data: PyPokeType[] = await response.json();
        setPokeman(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    const fetchBattles = async () => {
      try {
        const response = await fetch(
          uid
            ? 'http://127.0.0.1:8000/api/get'
            : 'http://127.0.0.1:8000/api_user2/get'
        );
        const data: Battle[] = await response.json();
        setBattles(data);
      } catch (error) {
        console.error('Error fetching battles:', error);
      }
    };
  
    useEffect(() => {
      fetchBattles();
      fetchPokemen();
    }, [refreshTrigger]);
  
    const refreshData = () => {
      setRefreshTrigger((prev) => !prev);
    };
  
    return (
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
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
            const pkmn1 = pokemen.find((p) => p.name === battle.p1PkmnName);
            const pkmn2 = pokemen.find((p) => p.name === battle.p2PkmnName);
            if (!pkmn1 || !pkmn2) return null;
  
            const p1path =
              pokemens.find((p) => p.pokemonID === pkmn1.pokemon)?.imgPath ??
              pokemens[0].imgPath;
            const p2path =
              pokemens.find((p) => p.pokemonID === pkmn2.pokemon)?.imgPath ??
              pokemens[0].imgPath;
  
            return (
              <TouchableHighlight
                key={battle.id}
                onPress={() => navigation.navigate('Battle Details', { battle })}
                underlayColor="#ddd"
              >
                <View style={styles.outerCard}>
                  <View style={styles.leftContainer}>
                    <ThemedView style={styles.pkmnInnerContainer}>
                      <ImageBackground
                        source={p1path}
                        style={{ flex: 1, width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
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
                        style={{ flex: 1, width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
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
          <CreateBattle
            user={{ uid }}
            onPostSuccess={refreshData}
            battle={sampleBattle}
          />
        </View>
      </ParallaxScrollView>
    );
  }
  
  function BattleDetailScreen({ route }: { route: any }) {
    const { battle } = route.params;
  
    return (
      <ThemedView style={styles.detailsContainer}>
        <ThemedText type="title">Battle Details</ThemedText>
        <ThemedText>{`Battle ID: ${battle.id}`}</ThemedText>
        <ThemedText>{`Player 1 Pokémon: ${battle.p1PkmnName} (Health: ${battle.p1Health})`}</ThemedText>
        <ThemedText>{`Player 2 Pokémon: ${battle.p2PkmnName} (Health: ${battle.p2Health})`}</ThemedText>
        <ThemedText>{`Start Date: ${battle.startDate}`}</ThemedText>
      </ThemedView>
    );
  }
  
  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="BATTLES"
            component={BattleScreen}
            options={{
              headerStyle: { backgroundColor: '#6200ee' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          />
          <Stack.Screen name="Battle Details" component={BattleDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  const styles = StyleSheet.create({
    headerImage: { color: '#808080', alignSelf: 'center', top: -36 },
    title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', margin: 5 },
    pokemonContainer: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingBottom: 16,
      width: '100%',
    },
    outerCard: {
      borderWidth: 2,
      borderColor: '#444444',
      borderRadius: 8,
      padding: 8,
      marginBottom: 8,
    },
    leftContainer: { flex: 1, flexDirection: 'row' },
    rightContainer: { flex: 1, flexDirection: 'row' },
    vsText: { fontSize: 24, fontWeight: 'bold', color: 'black' },
    healthContainer: { flexDirection: 'column', justifyContent: 'center' },
    healthCircle: { width: 10, height: 10, borderRadius: 5 },
    name: { textAlign: 'center', fontWeight: 'bold', color: 'white' },
    pkmnInnerContainer: {
      backgroundColor: '#b78727',
      borderRadius: 7,
      borderWidth: 2,
      borderColor: '#444444',
      overflow: 'hidden',
    },
    detailsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  });
  