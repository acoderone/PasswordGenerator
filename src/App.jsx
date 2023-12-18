
import { useCallback, useEffect, useState } from 'react'
import './App.css'

function App() {
const [length,setLength]=useState(8);
const [numberAllowed,setNumberAllowed]=useState(false);
const [charAllowed,setCharAllowed]=useState(false);
const [password,setPassword]=useState();
const passwordGenerator=useCallback(()=>{
  let pass="";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(numberAllowed)str+="0123456789";
  if(charAllowed)str+="<,>./?:]}{[||";
  for(let i=0;i<length;i++){
    let ind=Math.floor(Math.random()*str.length+1);
    pass+=str.charAt(ind);
  }
  setPassword(pass);
},[length,numberAllowed,charAllowed,setPassword])

useEffect(()=>{
  passwordGenerator();
},[length,numberAllowed,charAllowed,passwordGenerator]);

const copyPassword=useCallback(()=>{
  window.navigator.clipboard.writeText(password);
},[password])
 

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8
    text-orange-500 bg-gray-700 gap-flex-2'>
    <h1 className='text-4xl text-center text-white'>Password Generator</h1>
    <div>
    <input type="text" value={password} className='outline-none w-full mt-4 py-1 px-3'
    placeholder='password' readOnly/>
    <button onClick={copyPassword} className='outline-none text-white-200 bg-blue-500 hover:bg-blue-700
     text-white font-bold py-0.5 px-3 
     rounded shrink-0'>Copy</button>
    </div>
    
    <div>
      <input type='range' min={8} max={100} value={length} className='cursor-pointer' onChange={(e)=>setLength(e.target.value)}/>
    
    <label>Length:{length}</label>
    <label>
    <input type='checkbox' defaultChecked={numberAllowed} onChange={()=>{
     setNumberAllowed((prev)=>!prev)
    }}/>
    Number
    </label>
    <label>
    <input type='checkbox' defaultChecked={charAllowed} onChange={()=>{
      setCharAllowed((prev)=>!prev)
    }}/>
    Chracters
    </label>
    </div>
    </div>
      
    </>
  )
}

export default App
