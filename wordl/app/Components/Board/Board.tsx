import { useEffect, useRef, useState } from "react";
import Row from "../Row/Row";


function Board(props:any){
    const [board, setBoard] = useState('');
    const boardRef = useRef('')
    const [curRow, setCurRow] = useState(0);
    const curRowRef = useRef(0);

    useEffect(()=>{
        curRowRef.current = curRow;
        boardRef.current = board;
    }, [board, curRow])

    useEffect(()=>{
        if(props.secondBoard){
            props.socket.on("sendWord", (data:any)=>{
                console.log("EO ME")
                setBoard(board =>  board + data)
                setCurRow(curRow => curRow + 1)
            })
        }

        return () => {
            props.socket.removeListener('sendWord')
        }

    }, [])

    useEffect(()=>{
        if(props.secondBoard){
            return
        }
        if(props.curLetter == 'backspace'){
            if(boardRef.current.length == curRowRef.current * 5) return
            setBoard(boardRef.current.substring(0, boardRef.current.length - 1));
        } else if (props.curLetter == 'enter'){
            if(boardRef.current.length != (curRowRef.current + 1) * 5) return
            
            props.socket.emit('sendWord', {id:props.id, 
                word:board.substring(5 * curRowRef.current, 5 * curRowRef.current + 5),
                opponent:props.opponent}
            )
            setCurRow(curRow => curRow + 1);
            
        } else {
            if(boardRef.current.length == (curRowRef.current + 1) * 5 || curRowRef.current == 6) return
            setBoard(board => board + props.curLetter)
        }
    }, [props.curLetter, props.changed])

    return(
        <>
            <Row letters = {board.substring(0,5)} word = {props.word} done={curRow>0}></Row>
            <Row letters = {board.substring(5,10)} word = {props.word} done={curRow>1}></Row>
            <Row letters = {board.substring(10,15)} word = {props.word} done={curRow>2}></Row>
            <Row letters = {board.substring(15,20)} word = {props.word} done={curRow>3}></Row>
            <Row letters = {board.substring(20,25)} word = {props.word} done={curRow>4}></Row>
            <Row letters = {board.substring(25,30)} word = {props.word} done={curRow>5}></Row>
            
        </>
    )
}

export default Board;