import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  
  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password]);
  
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);
  return (
    <>
      <h1 className="text-4xl text-center text-white">Password Generator</h1>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500 bg-zinc-600">
        <div className="flex justify-center items-center gap-2">
          <input
            type="text"
            value={password}
            placeholder="password"
            readOnly
            ref={passwordRef}
            className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-zinc-800 bg-zinc-200"
          />
          <button
            className=" text-white bg-amber-700 rounded-lg px-4 py-2"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex justify-center items-center gap-4">
          <div className="flex justify-center items-center gap-2">
            <input
              type="range"
              className="cursor-pointer"
              min="8"
              max="20"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex justify-center items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex justify-center items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              id="characterInput"
              onChange={() => setCharacterAllowed((prev) => !prev)}
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
