import { StyleSheet, Image, Platform, FlatList } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { HabitListItem } from '@/components/HabitListItem';
import { Habit } from '../../types/habit'

const tempHabits : Habit[] = [
    {
      id: '1',
      habit: 'Drink water',
      startDate: new Date('2025-01-01'),
      interval: { hours: 1, days: 1, weeks: 1 }
    },
    {
      id: '2',
      habit: 'Go to the gym',
      startDate: new Date('2025-01-02'),
      interval: { hours: 2, days: 1, weeks: 1 }
    },
    {
        id: '3',
        habit: 'Floss',
        startDate: new Date('2025-01-02'),
        interval: { hours: 2, days: 1, weeks: 1 }
    }
  ];

export default function HabitScreen() {
  return (
    <div>
        <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
            <Image source={require('@/assets/images/pikachu.png')} style={styles.headerImage} />
        }>
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">My Habits</ThemedText>
        </ThemedView>
        </ParallaxScrollView>

        <FlatList
            data={tempHabits}
            renderItem={({ item }) => <HabitListItem habit={item} onPress={() => {}}/>}
            keyExtractor={(item) => item.id}
        />
        
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
