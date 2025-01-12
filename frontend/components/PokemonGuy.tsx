import { Image, StyleSheet, Platform, ImageSourcePropType } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PokeType, PyPokeType } from '@/types/poke';

// give type !
export const PokeHabit: React.FC<PokeType> = ({imgPath, info}) => {
    return (
        <ThemedView style={styles.habitContainer}>
            <PokemonGuy 
                info={{name: info.name, xp: info.xp, pokemon: info.pokemon, habit: info.habit, startDate: info.startDate, timesPer: info.timesPer, period: info.period}}  
                imgPath={imgPath}  />
            <ThemedText type="defaultSemiBold" style={styles.habitInfo}>
                {info.habit + "\n" + info.timesPer} time(s) per {info.period}
            </ThemedText>
        </ThemedView>
    )
}

const PokemonGuy: React.FC<PokeType> = ({imgPath, info}) => {
    return (
        <ThemedView style={styles.outerContainer}>
            <ThemedView style={styles.innerContainer}>
                <Image
                    source={imgPath}
                    style={styles.pokeman}
                />
                <ThemedText type="default" style={styles.name}>
                    {info.name}
                </ThemedText>
            </ThemedView>
            <ThemedText type="default" style={styles.xp}>
                {info.xp}
            </ThemedText>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        height: 110,
        width: '100%',
        padding: 2,
        flex: 1,
        position: 'relative',
        margin: 5,
        backgroundColor: 'transparent',
        borderRadius: 7,
        alignSelf: 'center'
    },
    innerContainer: {
        height: '100%',
        maxWidth: '80%',
        // flex: 1,
        position: 'relative',
        backgroundColor: '#b78727',
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#444444'
    },
    pokeman: {
      height: 60,
      width: 60,
      top: 10,
      alignSelf: 'center',
      position: 'absolute',
      borderRadius: 2
    },
    name: {
        bottom: 4,
        textAlign: 'center',
        alignSelf: 'center',
        position: 'absolute',
        width: '100%'
    },
    xp: {
        right: 20,
        top: 0,
        padding: 3,
        height: 35,
        width: 35,
        textAlign: 'center',
        position: 'absolute',
        backgroundColor: 'green',
        borderWidth: 3,
        borderColor: '#444444',
        borderRadius: 100
    },
    habitContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
        borderRadius: 10
    },
    habitInfo: {
        alignSelf: 'center',
        textAlign: 'left',
        right: 0,
        position: 'relative',
        width: '40%'
    }
  });