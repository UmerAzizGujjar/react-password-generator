import { useState,useCallback,useEffect ,useRef} from 'react'


function App() {
  let [lenght, setlenght] = useState(8)
  let [numberAllowed,setNumberAllowed]= useState(false)
  let [charAllowed,setCharAllowed]=useState(false)
  let [password,setPassword]=useState("")

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWSYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="123456789"
    if(charAllowed) str+="~!@#$%^&*()-_{}|[]?.,<>+="

    for (let index = 0; index < lenght; index++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }

    setPassword(pass)
  },[lenght,numberAllowed,charAllowed,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[lenght,numberAllowed,charAllowed,passwordGenerator])

  const passRefrence=useRef(null)

  let copyPassword=useCallback(()=>{
    passRefrence.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
      <div className='min-h-screen w-full bg-black flex justify-center items-center p-4'>
       <div className='w-full max-w-md'>
        <h1 className='text-white text-xl sm:text-2xl lg:text-3xl text-center mb-6'>Password Generator</h1>
        <div className='bg-gray-800 p-4 sm:p-6 rounded-xl shadow-2xl space-y-4'>
          {/* Password Input and Copy Button */}
          <div className='flex flex-col sm:flex-row gap-3'>
            <input 
              className='bg-gray-700 text-white rounded-lg px-3 py-2 sm:px-4 sm:py-2 flex-1 outline-none border border-gray-600 focus:border-blue-500 transition-colors text-sm sm:text-base'
              type='text'
              readOnly
              value={password}
              placeholder="Generated password will appear here"
              ref={passRefrence}
            />
            <button 
              type="button" 
              className="text-white bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-linear-to-br hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2 sm:px-6 sm:py-2.5 text-center transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl whitespace-nowrap"
              onClick={copyPassword}
            >
              📋 Copy
            </button>
          </div>

          {/* Controls Section */}
          <div className='space-y-4'>
            {/* Length Slider */}
            <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3'>
              <input
                type='range'
                min={8}
                max={20}
                value={lenght}
                onChange={(e)=>setlenght(e.target.value)}
                className='cursor-pointer flex-1 min-w-0'
              />
              <label className='text-blue-500 text-sm sm:text-base whitespace-nowrap'>Length: {lenght}</label>
            </div>

            {/* Checkboxes */}
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-6'>
              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  defaultChecked={numberAllowed}
                  onChange={()=>setNumberAllowed((prev)=>!prev)}
                  className='cursor-pointer'
                />
                <label className='text-blue-500 text-sm sm:text-base'>Numbers</label>
              </div>

              <div className='flex items-center gap-2'>
                <input
                  type='checkbox'
                  defaultChecked={charAllowed}
                  onChange={()=>setCharAllowed((prev)=>!prev)}
                  className='cursor-pointer'
                />
                <label className='text-blue-500 text-sm sm:text-base'>Special Characters</label>
              </div>
            </div>
          </div>
        </div>
       </div>
      </div>
      
    </>
  )
}

export default App
