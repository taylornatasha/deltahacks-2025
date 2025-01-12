import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Button, TextInput, Modal, Animated, Image, ImageSourcePropType } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Habit } from '../types/habit';
import { PostRequestComponent } from './PostRequestComponent';
import { pokemens } from '@/constants/PokemenCatalog';
import { PokeData } from '@/types/poke';

type CreateHabitProps = {
    onPostSuccess: () => void;

}

export const CreateHabit : React.FC<CreateHabitProps> = (param: CreateHabitProps) => {
    const [isFormVisible, setFormVisible] = useState(false);
    const [habitDesc, setHabitDesc] = useState('');
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
            <Button title="Add New Habit" onPress={toggleFormVisibility} />

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
                                <PostRequestComponent 
                                    onPostSuccess={refreshAndToggleVisibility} 
                                    param={{
                                        'name': nickname, 
                                        'xp': 2, 
                                        'pokemon': pkmnName, 
                                        'habit': habitDesc,
                                        'timesPer': timesPer,
                                        'period': period
                                    }} 
                                />
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
                            <Button title="Hatch!" onPress={handleHatch} disabled={hatchStarted} />
                    <ThemedView style={{height: 10}} />
                    <Button title="Cancel" onPress={toggleFormVisibility} disabled={hatchStarted} />
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
    },
    hatchModal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    innerContainer: {
        width: '90%',
        height: '80%',  
        //justifyContent: 'center',
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    egg: {
        width: '100%',
        height: '100%'
    },
    pkmn: {
        width: '100%',
        height: '100%',
        borderWidth: 2,
        borderColor: "#ccc",
        borderRadius: 10,
    },
    inlineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inlineInput: {
        width: '30%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
    },
    centered: {
        justifyContent: 'center', // vertically
        alignItems: 'center', // horizontally
    },
  });