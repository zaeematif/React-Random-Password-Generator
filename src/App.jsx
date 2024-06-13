import { useRef } from "react";
import { useEffect } from "react";
import { useState, useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pass, setPass] = useState("");

  //ref hook
  const passRef = useRef(null);

  const copyToClipBoard = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*(){}-_";

    let i = 0;

    while (i < length) {
      let char = Math.floor(Math.random() * str.length + 1);
      password += str.charAt(char);
      i++;
    }

    setPass(password);
  }, [length, numAllowed, charAllowed, setPass]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed]);

  return (
    <>
      <div
        className="w-1/3 p-4 mx-auto bg-slate-600 my-10 text-white rounded-xl text-center
      "
      >
        <p className="text-4xl">Password Generator</p>

        <div className="p-4 mx-auto flex justify-center align-middle">
          <input
            type="text"
            className="text-xl text-black rounded-xl mr-4 my-2 p-2 w-3/4"
            value={pass}
            readOnly
            ref={passRef}
          />
          <button
            className="text-xl h-fit self-center p-2 w-[5rem] rounded-xl bg-blue-500 hover:bg-blue-900"
            
            onClick={copyToClipBoard}
          >
            Copy
          </button>
        </div>

        <div className="p-2 mx-auto w-full">
          <input
            type="range"
            className="mr-2"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="mr-4">Length : {length} </label>

          <input
            type="checkbox"
            defaultChecked={numAllowed}
            className="mr-1"
            onChange={() => setNumAllowed((prev) => !prev)}
          />
          <label className="mr-4">Numbers</label>

          <input
            type="checkbox"
            className="mr-1"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label>Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
