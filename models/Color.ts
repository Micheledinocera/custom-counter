export enum COLORS{
    black="#000",
    darkPurple="#3614f8",
    lightBlue="#146ff8",
    purple="#f814c7",
    red="#f81427",
    blue="#1814f8",
    darkBlue="#001b3a",
    darkGreen="#003a03",
    green="#009e0b",
    yellow="#918303",
    darkYellow="#3a3600",
}

export const useColors=()=>{
    const getRandomColor=()=>{
        const colorsArray=Object.values(COLORS) as unknown as (keyof typeof COLORS)[];
        return colorsArray[Math.floor(Math.random()*colorsArray.length)] as keyof typeof COLORS
    }
    const getNextColor=(color:keyof typeof COLORS)=>{
        const colorsArray=Object.values(COLORS) as unknown as (keyof typeof COLORS)[];
        const colorIndex=colorsArray.indexOf(color);
        const nextIndex=(colorIndex+1+colorsArray.length)%colorsArray.length;
        debugger;
        return colorsArray[nextIndex]
    }
    return {getRandomColor,getNextColor}
}