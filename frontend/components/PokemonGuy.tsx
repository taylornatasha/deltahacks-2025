import { Image, StyleSheet, Platform, ImageSourcePropType } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// dumb place to define
type PokeType = {
    name: string,
    imgPath: ImageSourcePropType,
    xp: number
}

// give type !
export const PokeHabit: any = (pokemon: any) => {
    return (
        <ThemedView style={styles.habitContainer}>
            <PokemonGuy name={pokemon.name} imgPath={pokemon.imgPath} xp={pokemon.xp} />
            <ThemedText type="defaultSemiBold" style={styles.habitInfo}>
                {pokemon.habit} {"\n"}hi
            </ThemedText>
        </ThemedView>
    )
}

const PokemonGuy: React.FC<PokeType> = ({name, imgPath, xp}) => {
    return (
        <ThemedView style={styles.outerContainer}>
            <ThemedView style={styles.innerContainer}>
                <Image
                    source={imgPath}
                    style={styles.pokeman}
                />
                <ThemedText type="default" style={styles.name}>
                    {name}
                </ThemedText>
            </ThemedView>
            <ThemedText type="default" style={styles.xp}>
                {xp}
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        height: 110,
        width: 110,
        padding: 15,
        flex: 1,
        position: 'relative',
        margin: 20,
        backgroundColor: 'transparent',
        borderRadius: 7
    },
    innerContainer: {
        height: 80,
        width: 80,
        flex: 1,
        position: 'relative',
        backgroundColor: 'green',
        borderRadius: 7
    },
    pokeman: {
      height: 50,
      width: 50,
      top: 2,
      alignSelf: 'center',
      position: 'absolute'
    },
    name: {
        bottom: 4,
        textAlign: 'center',
        alignSelf: 'center',
        position: 'absolute',
        width: '100%'
    },
    xp: {
        left: 80,
        top: 0,
        padding: 3,
        height: 35,
        width: 35,
        textAlign: 'center',
        position: 'absolute',
        backgroundColor: 'green',
        borderWidth: 3,
        borderRadius: 100
    },
    habitContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 10,
        alignSelf: 'stretch'
    },
    habitInfo: {
        alignSelf: 'center',
        textAlign: 'left',
        right: 0,
        position: 'relative',
        width: 180
    }
  });