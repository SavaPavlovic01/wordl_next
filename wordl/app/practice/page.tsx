'use client'

import { useEffect, useRef, useState} from 'react'
import './App.css'
import Board from '../Components/Board/Board';
import { Manager, io } from 'socket.io-client';


function App() {

  const socket = io('http://localhost:5000');

  const [curLetter, setLetter] = useState('');
  const [changed, setChanged] = useState(false);
  const [msg, setMsg] = useState('')
  const repeated = useRef(false)
  const word:string = "AMASS";
  
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

    return ()=>{
      document.removeEventListener('keydown', (e:KeyboardEvent) => updateKey(e));
      document.removeEventListener('keyup', () => {repeated.current = false})
    }
  }, [])

  const findMatch = (id:number) => {
    socket.emit('findMatch', {id:id, rating:3000});
  }

  const [oppId, setOppId] = useState(-1)

  const onFoundMatch = (data:any) => {
    console.log('Found match!');
    setOppId(data.oppId)
    console.log(data)
  }

  useEffect(() => {
    
    socket.on('foundMatch', onFoundMatch)
    
    return () => {
      socket.removeListener('foundMatch', onFoundMatch);
    }
  }, [])

  return (
    <>
      <Board curLetter = {curLetter} changed = {changed} word = {word}></Board>
      <button onClick={() => findMatch(1)}>Find Match</button>
      <button onClick={() => {console.log(socket.id)}}>Is Conntected</button>
      {oppId}
    </>
  )
}

export default App
