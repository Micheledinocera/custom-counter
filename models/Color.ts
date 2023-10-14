export interface Color {
    label:string,
    value:COLORS
}

export enum COLORS{
    black="#000",
    darkPurple="#3614f8",
    lightBlue="#146ff8",
    purple="#f814c7",
    red="#f81427",
    blue="#1814f8",
    darkBlue="#001b3a",
    darkGreen="#003a03",
    darkYellow="#3a3600",
}

export const useColors=()=>{
    const getRandomColor=()=>{
        const colorsArray=Object.values(COLORS);
        return colorsArray[Math.floor(Math.random()*colorsArray.length)]
    }

    return getRandomColor
}