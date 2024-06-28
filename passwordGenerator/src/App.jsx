import { useCallback, useState } from 'react'

import './App.css'
import Header from './component/Header'
import Footer from './component/Footer'
import Password from './component/pages/password'

function App() {
  
  const [length, setlength] = useState(8)
  const [number, setnumber] = useState(true)
  const [character, setcharacter] = useState(true)
  const [Passsword, setPasssword] = useState(8)

  const passwordGenerator= useCallback(()=>{

    let str= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if(number) str += "0123456789"
    if(character) str +="!@#$%^&*()-_=+[]{}\\|;:\'"
   
    for (let i = 1; i <= array.length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      console.log('char', char)
      let pass =str.charAt(char)
      
    }
    setPasssword(pass)
  }
  
  ,[length,number,character,setPasssword])
 
  return (







    <>
    <Header/>
    

    <main className='d-flex align-items-center justify-content-center '>
      
      <Password/>
      </main>
    
      <Footer/>
    </>
  )
}

export default App
