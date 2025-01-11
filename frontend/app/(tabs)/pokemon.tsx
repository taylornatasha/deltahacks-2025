import { StyleSheet, Image, Platform, ImageSourcePropType } from 'react-native';
import React, {useState, useEffect} from 'react';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { PokemonGuy } from '@/components/PokemonGuy';

type PyPokeType = {
    name: string,
    xp: number,
    pokemon: string,
    habit: string
} 

export default function PokemonScreen() {

    const [pokemen, setPokeman] = useState<PyPokeType[]>([]);

    useEffect(() => {
        const fetchPokemen = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/");
                const data : PyPokeType[] = await response.json();
                setPokeman(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPokemen();
    }, []);

  return (
    <div>
        <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
            <Image source={require('@/assets/images/pikachu.png')} style={styles.headerImage} />
        }>
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">My Pokemen</ThemedText>
        </ThemedView>
        </ParallaxScrollView>
        {pokemen.map((poke) => (
            <PokemonGuy name={poke.name} imgPath={pokemonToImageMap[poke.pokemon]} xp={poke.xp} />
        ))}
        
        <PokemonGuy name="fred" imgPath={require('@/assets/images/slowbro.png')} xp={1} />
    </div>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    alignSelf: 'center',
    verticalAlign: 'middle',
    top: 0,
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  }
});

const pokemonToImageMap: { [key: string] : ImageSourcePropType } = {
    pikachu: require('@/assets/images/pikachu.png'),
    slowbro: require('@/assets/images/slowbro.png')
}