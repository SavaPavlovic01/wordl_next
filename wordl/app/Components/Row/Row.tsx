import { useRef, useState } from "react"
import Box from "../Box/Box"
import "./Row.css"

function Row(props:any){

    // 0 niko
    // 1 opponent
    // 2 you
    const curWhoFirst = useRef(0);

    const getColor = (done:boolean, letter:string, index:number) => {
        if(!done && props.oppBoard[index] == props.word[index]){
            curWhoFirst.current = 1
            return 'red'
        }
        if(curWhoFirst.current == 1 && props.oppBoard[index] == props.word[index]) return 'red'
        if(!done) return "transparent"
        if(letter == props.word[index]) return "green"
    
        let sameCnt = 0;
        for(let i = 0; i < index; i++ ){
            if(props.letters[i] == letter && props.word[i] != props.letters[i] ) sameCnt++;
        }
        let occurance = 0;
        for(let i = 0; i < 5; i++){
            if(props.word[i] == letter && props.word[i] != props.letters[i] ) occurance++;
        }
        if(sameCnt < occurance) return "#b3970b"
        
        return "#636360"
    }

    return(
        <>
            <div className="parent-container">
                <Box second = {props.second} letter = {props.letters[0]} color={getColor(props.done, props.letters[0], 0)}></Box>
                <Box second = {props.second} letter = {props.letters[1]} color={getColor(props.done, props.letters[1], 1)}></Box>
                <Box second = {props.second} letter = {props.letters[2]} color={getColor(props.done, props.letters[2], 2)}></Box>
                <Box second = {props.second} letter = {props.letters[3]} color={getColor(props.done, props.letters[3], 3)}></Box>
                <Box second = {props.second} letter = {props.letters[4]} color={getColor(props.done, props.letters[4], 4)}></Box>
            </div>
        </>
    )
}

export default Row