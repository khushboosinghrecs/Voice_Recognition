import { useState, useEffect } from "react";
export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [randomNumber, setRandomNumber] = useState(randomNumberGenerator);

  window.SpeechRecognition =
    window.webkitSpeechRecognition || window.SpeechRecognition;
  let recognition = new window.SpeechRecognition();
  recognition.start();
  useEffect(() => {
    if (Number(text) === randomNumber) {
      setResult("Congo !");
      setRandomNumber(randomNumberGenerator());
      setScore(score + 10);
    }

    return () => setResult("");
  }, [randomNumber, text, score]);

  function randomNumberGenerator() {
    return Math.floor(Math.random() * 100);
  }

  recognition.addEventListener("result", (e) => {
    console.log({ event: e });
    setText(e.results[0][0].transcript);
  });
  return (
    <div className="App">
      <h1>Speech recognition app</h1>
      <h2> score : {score}</h2>
      <p>{text}</p>
      <div>Number: {randomNumber}</div>
      <button onClick={() => setRandomNumber(randomNumberGenerator)}>
        Change Number
      </button>
      <div>{result}</div>
    </div>
  );
}
