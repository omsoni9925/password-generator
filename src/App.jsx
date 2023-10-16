import { useCallback, useEffect, useRef, useState } from 'react'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllower, setNumberAllower] = useState(false)
  const [symbolAllower, setSymbolAllower] = useState(false)
  const [password, setPassword] = useState('')

  //useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllower) str += "1234567890";
    if (symbolAllower) str += "!@#$%^&*()_+";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllower, symbolAllower, setPassword]);


  useEffect(() => {
    passwordGenerator();
  },
    [length, numberAllower, symbolAllower, passwordGenerator]);

  const copyPassword = useCallback(() => {
    passwordRef.current.select();
    window.navigator.clipboard.writeText(passwordRef.current.value)
  }, [password]);


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my- text-orange-600 bg-gray-900'>
        <h1 className=' text-2xl font-bold text-center text-white my-3'>
          Password Generator
        </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef} />

          <button
            className='center rounded-lg bg-emerald-600 py-3 px-6  text-sm text-white shadow-md'
            onClick={copyPassword}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value) }} />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllower}
              id="numberInput"
              onChange={() => {
                setNumberAllower((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={symbolAllower}
              id="symbolInput"
              onChange={() => {
                setSymbolAllower((prev) => !prev);
              }}
            />
            <label htmlFor="symbolInput">Symbols</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
