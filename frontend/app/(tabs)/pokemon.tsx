import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { PokemonGuy } from '@/components/PokemonGuy';

export default function PokemonScreen() {
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
        <PokemonGuy name="bob" imgPath={require('@/assets/images/pikachu.png')} xp={1} />
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
