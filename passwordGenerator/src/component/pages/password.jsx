import React from 'react'
import { useCallback, useState ,useEffect ,useRef } from 'react'

export default function Password() {

  const [length, setlength] = useState(8)
  const [number, setnumber] = useState(true)
  const [character, setcharacter] = useState(true)
  const [Passsword, setPasssword] = useState("")

  const passRef=useRef(null)

    const passwordGenerator= useCallback(()=>{
        let pass=""
        let str= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        if(number) str += "0123456789"
        if(character) str +="!@#$%^&*()-_=+[]{}\\|;:\'"
       
        for (let i = 1; i <= length; i++) {
          let char=Math.floor(Math.random()*str.length+1)
          console.log('char', char)
           pass += str.charAt(char)
          
        }
        setPasssword(pass)
      }
      
      ,[length,number,character,setPasssword])

      const copyPasswordToClipboard = useCallback(() => {
        passRef.current?.select();
        passRef.current?.setSelectionRange(0, 999);
        window.navigator.clipboard.writeText(Password)
      }, [Password])

      useEffect(() => {
        passwordGenerator()
      }, [length, number, character, passwordGenerator])
    


    return (
        <div>
            <div className="col-12">
                <h2 className='text-center'>Password Generator</h2>
            </div>

            <div className="container  ">
                <div className="row bg-secondary">

                    <div class="row row-custom">
                        <div class="col-12 mt-2 d-flex">
                            <input class="form-control" type="text" placeholder="Generated Password" aria-label="Generated Password"
                             value={Passsword} 
                             ref={passRef}
                             readonly />
                            <button 
                            class="btn btn-info  ms-2"
                            
                            onClick={copyPasswordToClipboard}
                            >Copy</button>
                        </div>

                        {/* <div className="col-lg-12 mt-2">

                        <input class="form-control" type="text" placeholder="Default input" aria-label="default input example" />
                        <button className='btn btn-info'>Copy</button>

                    </div> */}
                        <div className="col-lg-8 col-sm-12 ">


                    <div className=" center ">
                        <label for="customRange1" class="form-label me-1">Length({length})
                        </label>
                        <input 
                        type="range" 
                        class="form-range" 
                        id="customRange"
                        min={8}
                        max={16}
                        value={length}
                        onChange={(e) => {setlength(e.target.value)}}
                    />
                                <div class="form-check ms-2">
                                    <input 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    value="" 
                                    id="flexCheckDefault"
                                    defaultChecked={number}
                                    onChange={() => {
                                        setnumber((prev) => !prev);
                                    }}
                                    />
                                    <label class="form-check-label" for="flexCheckDefault">
                                       Number
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input 
                                    class="form-check-input" 
                                    type="checkbox" 
                                    value="" 
                                    id="flexCheckChecked" 
                                    defaultChecked={character}
                                    
                                    onChange={() => {
                                        setcharacter((prev) => !prev )
                                    }}
                                     />
                                    <label class="form-check-label" for="flexCheckChecked">
                                       Character
                                    </label>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </div>





        </div>
    )
}
