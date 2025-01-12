import { ImageSourcePropType } from "react-native"
import { User } from '@/types/userdata'
import { Battle } from "./battle"

export type PokeType = {
    imgPath: ImageSourcePropType,
    info: PyPokeType
}

export type PyPokeType = {
    name: string,
    xp: number,
    pokemon: string,
    habit: string,
    startDate: string,
    timesPer: number,
    period: string,
    lastDoneTime: string
  };

export type PokeData = {
    pokemonID: string,
    imgPath: ImageSourcePropType,
    description?: string
}

export type PostRequestTypes = {
    onPostSuccess: () => void;
    param: PyPokeType; // Define the expected structure of param
    buttonText: string;
    user: User;
    disabled?: boolean;
  };

  export type PostRequestBattleType = {
    onPostSuccess: () => void;
    param: Battle; // Define the expected structure of param
    buttonText: string;
  };