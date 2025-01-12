import { ImageSourcePropType } from "react-native"

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
    period: string
  };

export type PokeData = {
    pokemonID: string,
    imgPath: ImageSourcePropType
}

export type PostRequestTypes = {
    onPostSuccess: () => void;
    param: PyPokeType; // Define the expected structure of param
    buttonText: string;
  };