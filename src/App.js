import './App.css';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaClipboardCheck } from 'react-icons/fa'
import { useState } from 'react'
import { COPY_SUCCESS } from './message';
import { numbers, upperCaseLetters, lowerCaseLetters, spacialCharacters } from './character'
function App() {
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState(20)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumber, setIncludeNumber] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const generatorPassword = () => {
    if (!includeUppercase && !includeLowercase && !includeNumber && !includeSymbols) {
      notification('You must select atleast one option',true)
    }

    let characterList = ''

    if (includeLowercase) {
      characterList = characterList + lowerCaseLetters
    }
    if (includeUppercase) {
      characterList = characterList + upperCaseLetters
    }

    if (includeNumber) {
      characterList = characterList + numbers
    }

    if (includeSymbols) {
      characterList = characterList + spacialCharacters
    }

    setPassword(createPassword(characterList))
  }

  const createPassword = (value) => {
    let password = ''
    const characterListLength = value.length
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + value.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notification = (message,hasError = false) => {
    if(hasError){
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else{
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleCopyPassword = (e) => {
    if(password === ''){
      notification('Nothing To Copy',true)
    }
    else{
      copyToClipboard()
      notification(COPY_SUCCESS)
    }
  }

  return (
    <div className="App h-screen bg-purple-500">
      <div className="container w-80 mx-auto pt-52">
        <div className="generator bg-purple-900 rounded-lg shadow-md p-5">
          <h2 className="generator__header mb-5 text-white text-center">
            Password Generator
          </h2>
          <div className="generator__password rounded-md bg-gray-900 py-2 px-2.5 h-10 flex relative mb-4 justify-between text-white">
            <h3>{password}</h3>
            <button onClick={handleCopyPassword} className="copy__btn cursor-pointer bg-purple-500 absolute top-1 right-1 py-2 px-2 block">
              <FaClipboardCheck />
            </button>
          </div>
          <div className="form-group flex justify-between items-center text-white mb-2.5">
            <label htmlFor="password">Password Strength</label>
            <input onChange={(e) => { setPasswordLength(e.target.value) }} defaultValue={passwordLength} type="number" id="password-strength" name="password-strength" max="20" min="10" className="text-black" />
          </div>
          <div className="form-group flex justify-between items-center text-white mb-2.5">
            <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
            <input onChange={(e) => setIncludeUppercase(e.target.checked)} checked={includeUppercase} type="checkbox" id="uppercase-letters" name="uppercase-letters" max="20" min="10" />
          </div>
          <div className="form-group flex justify-between items-center text-white mb-2.5">
            <label htmlFor="lowercase-letters">Include Lowercase Letters</label>
            <input onChange={(e) => setIncludeLowercase(e.target.checked)} checked={includeLowercase} type="checkbox" id="lowercase-letters" name="lowercase-letters" max="20" min="10" />
          </div>
          <div className="form-group flex justify-between items-center text-white mb-2.5">
            <label htmlFor="include-numbers">Include Numbers</label>
            <input onChange={(e) => setIncludeNumber(e.target.checked)} checked={includeNumber} type="checkbox" id="include-numbers" name="include-numbers" max="20" min="10" />
          </div>
          <div className="form-group flex justify-between items-center text-white mb-2.5 ">
            <label htmlFor="include-symbols">Include Symbols</label>
            <input onChange={(e) => setIncludeSymbols(e.target.checked)} checked={includeSymbols} type="checkbox" id="include-symbols" name="include-symbols" max="20" min="10" />
          </div>
          <button onClick={generatorPassword} className="generator__btn bg-purple-500 border-none block w-full py-2.5 text-white cursor-pointer mt-2.5">Generator</button>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default App;
