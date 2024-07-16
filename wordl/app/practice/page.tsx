'use client'

import { useEffect, useRef, useState} from 'react'
import './App.css'
import Board from '../Components/Board/Board';
import { Manager, io } from 'socket.io-client';
import { v4 as uuid} from 'uuid'

function App() {

  const socket = io('http://localhost:5000');

  
  const [curLetter, setLetter] = useState('');
  const [changed, setChanged] = useState(false);
  const [msg, setMsg] = useState('')
  const repeated = useRef(false)
  const id = useRef('AAAAAAAa')
  const word:string = "AMASS";

  const [firstBoardData, setFirstBoard] = useState('')
  const [secondBoardData, setSecondBoard] = useState('')

  const updateFirstBoardData = (data:any) => {
    if(data == '9'){
      setFirstBoard(firstBoardData.substring(0, firstBoardData.length - 1))
      return
    }
    setFirstBoard(firstBoardData => firstBoardData + data)
  }

  const updateSecondBoardData = (data:any) => {
    setSecondBoard(secondBoardData => secondBoardData + data)
  }
  
  const isLetter = (letter:string) =>{
    if(letter.length > 1) return false
    return letter.match(/[a-z]/i);
  }
 
  const updateKey = (e:KeyboardEvent) =>{
    
    if(repeated.current) return
    
    repeated.current = true
    setChanged(changed => !changed)
    if(isLetter(e.key)){
      setLetter(e.key.toUpperCase())
    } else{
      if(e.key == "Enter"){
        setLetter("enter");
      }
      if(e.key == "Backspace"){
        setLetter("backspace")
      }
    }
    
  }
  
  useEffect(()=>{
    document.addEventListener('keyup', () => {repeated.current = false})
    document.addEventListener('keydown', (e:KeyboardEvent) => updateKey(e));
    if(!window.sessionStorage.getItem('id')) window.sessionStorage.setItem('id', uuid());
    id.current = (window.sessionStorage.getItem('id') || '')
    console.log(id.current)
    return ()=>{
      document.removeEventListener('keydown', (e:KeyboardEvent) => updateKey(e));
      document.removeEventListener('keyup', () => {repeated.current = false})
    }
  }, [])

  const findMatch = (id:string|null) => {
    socket.emit('findMatch', {id:id, rating:3000});
  }

  const oppId = useRef('aaaaa');

  const onFoundMatch = (data:any) => {
    console.log('Found match!');
    oppId.current = data
    console.log('Opponent')
    console.log(oppId.current)
  }

  const receiveWord = (data:any) =>{
    console.log(data)
  }

  useEffect(() => {
    
    socket.on('foundMatch', onFoundMatch)
    socket.on('sendWord', receiveWord)
    return () => {
      socket.removeListener('foundMatch', onFoundMatch);
      socket.removeListener('sendWord', receiveWord);
    }
  }, [])

  return (
    <>
      <div style={{display:'flex',justifyContent:'center'}}>
        <div style={{paddingRight:'10%'}}>
          <Board oppBoard = {secondBoardData} sendBack = {updateFirstBoardData} secondBoard = {false} curLetter = {curLetter} changed = {changed} word = {word} socket = {socket} id = {id.current} opponent = {oppId.current}></Board>
        </div>
        <div>
          <Board oppBoard = {firstBoardData} sendBack = {updateSecondBoardData} secondBoard = {true} socket = {socket} word = {word}></Board>
        </div>
        
      </div>
      <button onClick={() => findMatch(id.current)}>Find Match</button>
      
    </>
  )
}

export default App
