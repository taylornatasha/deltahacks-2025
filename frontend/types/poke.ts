import { ImageSourcePropType } from "react-native"

export type PokeType = {
    name: string,
    imgPath: ImageSourcePropType,
    xp: number
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