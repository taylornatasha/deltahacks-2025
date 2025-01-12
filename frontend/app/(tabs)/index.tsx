import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAppContext } from '../context/AppContext';

export default function HomeScreen() {
    const { uid, setUid, clearUid } = useAppContext();
    setUid(0);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#FFFFFF' }}
      headerImage={
        <Image
          source={require('@/assets/images/festive_little_guys.png')}
          style={styles.banner}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">DeltaHabit Tracker</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Build Habits...</ThemedText>
        <ThemedText>
          Get reminders to keep up with your new habits and level up your Pokemen™.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">...Together!</ThemedText>
        <ThemedText>
          Add your friends and battle your Pokemen™. Set a group goal and keep up with your habits to win!
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">And Have Fun Doing So!</ThemedText>
        <ThemedText>
          Enjoy reaching your goals with the help of your Pokemen™! Play 
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="defaultSemiBold">
            <br />When you're ready, head over to the Pokemen™ tab to get set up!<br /><br />
        </ThemedText>
        <Image
          source={require('@/assets/images/arrow.png')}
          style={styles.arrow}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  banner: {
    height: '95%',
    width: '95%',
    margin: 10,
    left: 0,
    position: 'absolute',
  },
  arrow: {
    bottom: -65,
    right: 30,
    transform: [{scale: 0.6}, {scaleX: 0.8}, {rotate: '75deg'}],
    // borderWidth: 2,
    position: 'absolute'
  }
});
