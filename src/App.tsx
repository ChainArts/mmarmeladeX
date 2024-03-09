import { useState } from "react";
import { Game } from "./Game";
import StartScreen from "./ui-components/StartScreen/StartScreen";

function App() {
  const [start, setStart] = useState(false);
  return start ? <Game /> : <StartScreen setStart={setStart} />;
}

export default App;
