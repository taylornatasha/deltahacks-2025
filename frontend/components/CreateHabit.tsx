import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Button, TextInput, Modal, Animated, Image, ImageSourcePropType } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Habit } from '../types/habit';
import { PostRequestOverwrite } from './PostRequestComponent';
import { pokemens } from '@/constants/PokemenCatalog';
import { PokeData } from '@/types/poke';
import { User } from '@/types/userdata'
//import Confetti from 'react-native-simple-confetti';

type CreateHabitProps = {
    onPostSuccess: () => void;
    user: User;
}

export const CreateHabit : React.FC<CreateHabitProps> = (param: CreateHabitProps) => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [habitDesc, setHabitDesc] = useState("Go to the gym");
    const [timesPer, setTimesPer] = useState("1");
    const [period, setPeriod] = useState("Day");

    const [hatchStarted, setHatchStart] = useState(false);
    const [pkmnName, setPkmnName] = useState("");
    const [pkmnImg, setPkmnImg] = useState<ImageSourcePropType>();
    const [nickname, setNickname] = useState("");

    const toggleFormVisibility = () => setFormVisible(!isFormVisible);

    const handleHatch = () => {
        setHatchStart(true);

        // select random pkmn
        const randIdx = Math.floor(Math.random() * pokemens.length);
        const pkmn = { ...pokemens[randIdx] };
        setPkmnName(pkmn.pokemonID);
        setPkmnImg(pkmn.imgPath);
        setNickname(pkmn.pokemonID);
    };

    const shakeAnim = useRef(new Animated.Value(0)).current;
    const shakeAmt = 7;

    useEffect(() => {
        // Create shaking animation
        const shake = Animated.loop(
          Animated.sequence([
            Animated.timing(shakeAnim, {
              toValue: shakeAmt, // Move right
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
              toValue: -shakeAmt, // Move left
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
              toValue: 0, // Back to center
              duration: 100,
              useNativeDriver: true,
            }),
          ])
        );
        shake.start(); // Start the animation
      }, [shakeAnim]);

      const refreshAndToggleVisibility = () => {
        param.onPostSuccess();
        setHatchStart(false);
        toggleFormVisibility();
      }

    return (
        <ThemedView style={styles.outerContainer}>
            <Button color="#6200ee" title="Add New Habit" onPress={toggleFormVisibility} />

            <Modal 
                visible={isFormVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleFormVisibility}
            >
                <ThemedView style={styles.hatchModal}>
                <ThemedView style={styles.innerContainer}>
                    <ThemedText style={styles.hatchTitle}>Add New Habit</ThemedText>
                    <ThemedView style={{height: "50%", margin: 20,}}>
                        <>{ hatchStarted ? (
                            <Image 
                                source={pkmnImg} 
                                style={styles.pkmn}
                            />
                        ) : (
                            <Animated.Image
                                source={require('@/assets/images/egg.png')}
                                style={[styles.egg, { transform: [{ translateX: shakeAnim }] }]}
                                resizeMode="contain"
                            />
                        )}</>
                    </ThemedView>
                    <ThemedView>{
                        hatchStarted ? (
                            <ThemedView style={styles.centered}>
                                <ThemedText>It's a <ThemedText style={{ fontWeight: 'bold' }}>{pkmnName}</ThemedText>!</ThemedText>
                                <ThemedText>Give it a name:</ThemedText>
                                <TextInput style={styles.input} 
                                    placeholder={pkmnName}
                                    placeholderTextColor="grey"
                                    value={nickname}
                                    onChangeText={setNickname}
                                />
                                <PostRequestOverwrite 
                                    user={param.user}
                                    onPostSuccess={refreshAndToggleVisibility} 
                                    buttonText="START TRACKING"
                                    param={{
                                        'name': nickname, 
                                        'xp': 0, 
                                        'pokemon': pkmnName, 
                                        'habit': habitDesc,
                                        'startDate' : (new Date).toISOString(),
                                        'timesPer': parseInt(timesPer),
                                        'period': period,
                                        'lastDoneTime': ''
                                    }} 
                                />
                                {/* <Confetti count={50}/> */}
                            </ThemedView>
                        ) : (
                            <ThemedView>
                            <TextInput style={styles.input}
                                placeholder="Go to the gym"
                                placeholderTextColor="grey"
                                value={habitDesc}
                                onChangeText={setHabitDesc}
                            />
                            <ThemedView style={styles.inlineContainer}>
                                <TextInput
                                    style={styles.inlineInput}
                                    keyboardType="numeric"
                                    value={timesPer}
                                    onChangeText={setTimesPer}
                                />
                                <ThemedText>     time(s) every     </ThemedText>
                                <Picker
                                    selectedValue={period}
                                    onValueChange={(itemValue: string) => setPeriod(itemValue)}
                                >
                                <Picker.Item label="Day" value="Day" />
                                <Picker.Item label="Week" value="Week" />
                                </Picker>
                            </ThemedView>
                            <Button color="#6200ee" title="Hatch!" onPress={handleHatch} disabled={hatchStarted} />
                    <ThemedView style={{height: 10}} />
                    <Button color="#6200ee" title="Cancel" onPress={toggleFormVisibility} disabled={hatchStarted} />
                            </ThemedView>
                        )
                    }</ThemedView>
                </ThemedView>
                </ThemedView>
            </Modal>
        </ThemedView>
    );
}

export const CreateGroupHabit : React.FC<CreateHabitProps> = (param: CreateHabitProps) => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [habitDesc, setHabitDesc] = useState("Go to the gym");
    const [timesPer, setTimesPer] = useState("1");
    const [period, setPeriod] = useState("Day");

    const [hatchStarted, setHatchStart] = useState(false);
    const [pkmnName, setPkmnName] = useState("");
    const [pkmnImg, setPkmnImg] = useState<ImageSourcePropType>();
    const [nickname, setNickname] = useState("");

    const toggleFormVisibility = () => setFormVisible(!isFormVisible);

    const handleHatch = () => {
        setHatchStart(true);

        // select random pkmn
        const randIdx = Math.floor(Math.random() * pokemens.length);
        const pkmn = { ...pokemens[randIdx] };
        setPkmnName(pkmn.pokemonID);
        setPkmnImg(pkmn.imgPath);
        setNickname(pkmn.pokemonID);
    };

    const shakeAnim = useRef(new Animated.Value(0)).current;
    const shakeAmt = 7;

    useEffect(() => {
        // Create shaking animation
        const shake = Animated.loop(
          Animated.sequence([
            Animated.timing(shakeAnim, {
              toValue: shakeAmt, // Move right
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
              toValue: -shakeAmt, // Move left
              duration: 100,
              useNativeDriver: true,
            }),
            Animated.timing(shakeAnim, {
              toValue: 0, // Back to center
              duration: 100,
              useNativeDriver: true,
            }),
          ])
        );
        shake.start(); // Start the animation
      }, [shakeAnim]);

      const refreshAndToggleVisibility = () => {
        param.onPostSuccess();
        setHatchStart(false);
        toggleFormVisibility();
      }

    return (
        <ThemedView style={styles.outerContainer}>
            <Button color="#6200ee" title="Add New Group Habit" onPress={toggleFormVisibility} />

            <Modal 
                visible={isFormVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleFormVisibility}
            >
                <ThemedView style={styles.hatchModal}>
                <ThemedView style={styles.innerContainer}>
                    <ThemedText style={styles.hatchTitle}>Add New Habit</ThemedText>
                    <ThemedView style={{height: "50%", margin: 20,}}>
                        <>{ hatchStarted ? (
                            <Image 
                                source={pkmnImg} 
                                style={styles.pkmn}
                            />
                        ) : (
                            <Animated.Image
                                source={require('@/assets/images/egg.png')}
                                style={[styles.egg, { transform: [{ translateX: shakeAnim }] }]}
                                resizeMode="contain"
                            />
                        )}</>
                    </ThemedView>
                    <ThemedView>{
                        hatchStarted ? (
                            <ThemedView style={styles.centered}>
                                <ThemedText>It's a <ThemedText style={{ fontWeight: 'bold' }}>{pkmnName}</ThemedText>!</ThemedText>
                                <ThemedText>Give it a name:</ThemedText>
                                <TextInput style={styles.input} 
                                    placeholder={pkmnName}
                                    placeholderTextColor="grey"
                                    value={nickname}
                                    onChangeText={setNickname}
                                />
                                <PostRequestOverwrite 
                                    onPostSuccess={refreshAndToggleVisibility} 
                                    buttonText="START TRACKING"
                                    user={param.user}
                                    param={{
                                        'name': nickname, 
                                        'xp': 0, 
                                        'pokemon': pkmnName, 
                                        'habit': habitDesc,
                                        'startDate' : (new Date).toISOString(),
                                        'timesPer': parseInt(timesPer),
                                        'period': period,
                                        'lastDoneTime': ""
                                    }} 
                                />
                                {/* <Confetti count={50}/> */}
                            </ThemedView>
                        ) : (
                            <ThemedView>
                            <TextInput style={styles.input}
                                placeholder="Go to the gym"
                                placeholderTextColor="grey"
                                value={habitDesc}
                                onChangeText={setHabitDesc}
                            />
                            <ThemedView style={styles.inlineContainer}>
                                <TextInput
                                    style={styles.inlineInput}
                                    keyboardType="numeric"
                                    value={timesPer}
                                    onChangeText={setTimesPer}
                                />
                                <ThemedText>     time(s) every     </ThemedText>
                                <Picker
                                    selectedValue={period}
                                    onValueChange={(itemValue: string) => setPeriod(itemValue)}
                                >
                                <Picker.Item label="Day" value="Day" />
                                <Picker.Item label="Week" value="Week" />
                                </Picker>
                            </ThemedView>
                            <Button color="#6200ee" title="Hatch!" onPress={handleHatch} disabled={hatchStarted} />
                    <ThemedView style={{height: 10}} />
                    <Button color="#6200ee" title="Cancel" onPress={toggleFormVisibility} disabled={hatchStarted} />
                            </ThemedView>
                        )
                    }</ThemedView>
                </ThemedView>
                </ThemedView>
            </Modal>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        // Uncomment and adjust if needed
        // height: 110,
        // width: 110,
        // padding: 15,
        // flex: 1,
        // position: 'relative',
        // margin: 20,
        // backgroundColor: 'transparent',
        // borderRadius: 7
    },
    hatchTitle: {
        fontSize: 30, 
        fontWeight: 'bold',
        marginBottom: 20, 
        alignSelf: 'center',
        color: '#ffffff', // Bright text color for dark mode
    },
    hatchModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark transparent overlay
    },
    innerContainer: {
        width: '90%',
        height: '80%',  
        backgroundColor: '#1f1f1f', // Dark background for container
        padding: 20,
        margin: 20,
        borderRadius: 10,
        shadowColor: '#000', // Optional: Shadow effect for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    input: {
        height: 40,
        borderColor: '#555', // Subtle border for inputs
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        backgroundColor: '#151718', // Dark input background
        color: '#fff', // Light text inside the input
    },
    egg: {
        width: '100%',
        height: '100%',
    },
    pkmn: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor: "#555", // Subtle border for images
        borderRadius: 10,
    },
    inlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inlineInput: {
        width: '30%',
        height: 40,
        borderColor: '#555', // Subtle border
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        backgroundColor: '#151718', // Dark background
        color: '#fff', // Light text color
    },
    centered: {
        justifyContent: 'center', // vertically
        alignItems: 'center', // horizontally
    },
});
