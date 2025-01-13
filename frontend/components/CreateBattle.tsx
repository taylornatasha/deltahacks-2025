import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Button, TextInput, Modal, Animated, Image, ImageSourcePropType } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Habit } from '../types/habit';
import { PostRequestOverwriteBattle } from './PostRequestComponent';
import { pokemens } from '@/constants/PokemenCatalog';
import { PokeData } from '@/types/poke';
import { User } from '@/types/userdata'
import { Battle } from '@/types/battle';
import { PyPokeType } from '@/types/poke';
import { useAppContext } from '@/app/context/AppContext';
import { CreateGroupHabit } from './CreateHabit';
//import Confetti from 'react-native-simple-confetti';

type CreateBattleProps = {
    onPostSuccess: () => void;
}

export const CreateBattle : React.FC<CreateBattleProps> = (param: CreateBattleProps) => {
    const [isFormVisible, setFormVisible] = useState(false);

    const toggleFormVisibility = () => setFormVisible(!isFormVisible);

    const refreshAndToggleVisibility = () => {
        param.onPostSuccess();
        toggleFormVisibility();
    }

    const { uid, setUid, clearUid } = useAppContext();
      
        const calculateRemainingDones = (pkmn: PyPokeType) => {
          return pkmn.timesPer - (pkmn.xp % (pkmn.timesPer + 1));
          // if (pkmn.lastDoneTime === "") {
          //   return pkmn.timesPer;
          // }
          // const currentTime = new Date;
          // const lastTime = new Date(pkmn.lastDoneTime);
          // const elapsed = lastTime.getTime() - currentTime.getTime();
    
          // const intervalInMs = pkmn.period === "Day" 
          //   ? pkmn.timesPer * 24 * 60 * 60 * 1000
          //   : pkmn.timesPer * 7 *  24 * 60 * 60 * 1000;
    
          // const elapsedIntervals = Math.floor(elapsed / intervalInMs);
          // const remainingDones = elapsedIntervals * pkmn.timesPer;
    
          // return remainingDones;
        };

    return (
        <ThemedView style={styles.outerContainer}>
            <Button color="#6200ee" title="Start Battle" onPress={toggleFormVisibility} />

            <Modal 
                visible={isFormVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleFormVisibility}
            >
                <ThemedView style={styles.hatchModal}>
                <ThemedView style={styles.innerContainer}>
                    <ThemedText style={styles.hatchTitle}>Start Battle</ThemedText>
                    <CreateGroupHabit onPostSuccess={refreshAndToggleVisibility} user={{uid: uid}} />
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
