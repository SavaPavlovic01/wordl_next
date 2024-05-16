'use client'

import { useEffect, useRef, useState} from 'react'
import './App.css'
import Board from '../Components/Board/Board';


function App() {

  const [curLetter, setLetter] = useState('');
  const [changed, setChanged] = useState(false);
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

  return (
    <>
      <Board curLetter = {curLetter} changed = {changed} word = {word}></Board>
    </>
  )
}

export default App
