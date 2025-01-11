import { Image, StyleSheet, Platform, ImageSourcePropType } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Habit } from '../types/habit';

type HabitListItemProps = {
    habit : Habit;
    onPress: () => void;
}

export const HabitListItem : React.FC<HabitListItemProps> = ({ habit, onPress } : HabitListItemProps) => {
    return (
        <ThemedView style={styles.outerContainer}>
            <ThemedView style={styles.innerContainer}>
                {/* <Image
                    source={imgPath}
                    style={styles.pokeman}
                /> */}
                <ThemedText type="default">
                    {habit.habit}
                </ThemedText>
            </ThemedView>
            {/* <ThemedText type="default" style={styles.xp}>
                {xp}
            </ThemedText> */}
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        // height: 110,
        // width: 110,
        // padding: 15,
        // flex: 1,
        // position: 'relative',
        // margin: 20,
        // backgroundColor: 'transparent',
        // borderRadius: 7
    },
    innerContainer: {
        // height: 80,
        // width: 80,
        // flex: 1,
        // position: 'relative',
        // backgroundColor: 'green',
        // borderRadius: 7
    },
  });