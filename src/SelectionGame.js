import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { PlanesContext } from "./PlanesContext";
import seedrandom from 'seedrandom'
import { useNavigate } from "react-router-dom";
import './selectiongame.css';


const SelectionGame = () => {
  const { path, card } = useParams();
  const { state } = useContext(PlanesContext);
  const navigate = useNavigate();
  const [load, setLoad] = useState(true)

  const generateSequence = (value) => {
    const length = !state?.select ? 0 : state.select.reduce((acc, cur) => {
      if (cur.selected) acc++;
      return acc;
    }, 0);
    const sequence = Array.from({ length: length }, (_, i) => i + 1);
    const seededRandom = seedrandom(value.toString())
    for (let i = sequence.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom() * (i + 1));
      [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
    };
    return sequence;
  }

  const sequence = generateSequence(path);


  const handleButton = (e) => {
    e.preventDefault();
    if (e.target.id === 'next') {
      setLoad(!load);
      navigate(`/game/${path}/${Number(card) + 1}`)
    }
    if (e.target.id === 'back') {
      setLoad(!load);
      navigate(`/game/${path}/${Number(card) - 1}`)
    }
  }
  if (sequence.length === 0) return <div>Loading...</div>
  return (
    <div className="game_wrapper">
      <div className="game_image_wrapper">
        <img src={state.planes[sequence[Number(card) - 1] - 1].image_uris.large} alt={state.planes[sequence[Number(card) - 1] - 1].name}></img>
      </div>
      <div className="game_button_wrapper">
        <button disabled={Number(card) === 1} id='back' onClick={handleButton}>Back</button>
        <button disabled={Number(card) === state.select.length} id='next' onClick={handleButton}>Next</button>
      </div>
    </div>
  )
}

export default SelectionGame;