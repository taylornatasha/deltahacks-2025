import { Image, StyleSheet, Platform, ImageSourcePropType } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type PokeProps = {
    name: string,
    imgPath: ImageSourcePropType,
    xp: number
}

export const PokemonGuy: React.FC<PokeProps> = ({name, imgPath, xp}) => {
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
        right: 0,
        top: 0,
        padding: 3,
        height: 35,
        width: 35,
        textAlign: 'center',
        position: 'absolute',
        backgroundColor: 'green',
        borderWidth: 3,
        borderRadius: 100
    }
  });