import './selectiongame.css';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PlanesContext } from "./PlanesContext";
import useCheckedCount from "./useCheckedCount";
import useSequence from "./useSequence";
import useEventListener from './useEventListener';


const SelectionGame = () => {
  const { path, card } = useParams();
  const { state } = useContext(PlanesContext);
  const navigate = useNavigate();
  const [nextImageIndex, setNextImageIndex] = useState(Number(card) + 1);
  const checkedCount = useCheckedCount();
  const sequence = useSequence(path);

  // handle button clicks for navigation
  const handleButton = (e) => {
    if (e.target.id === 'next' && Number(card) <= checkedCount) {
      setNextImageIndex((prevIndex) => prevIndex + 1);
      navigate(`/game/${path}/${Number(card) + 1}`)
    }
    if (e.target.id === 'back' && Number(card) > 0) {
      navigate(`/game/${path}/${Number(card) - 1}`)
    }
  }
  // handle key clicks for navigation
  const handleKeyPress = (e) => {
    if (e.key === 'ArrowRight' && Number(card) === checkedCount) return;
    if (e.key === 'ArrowLeft' && Number(card) === 1) return;
    switch (e.key) {
      case 'ArrowRight':
        setNextImageIndex((prevIndex) => prevIndex + 1);
        navigate(`/game/${path}/${Number(card) + 1}`);
        break;
      case 'ArrowLeft':
        navigate(`/game/${path}/${Number(card) - 1}`);
        break;
      default:
        console.log("error")
        break;
    }

  }
  useEventListener('keydown', handleKeyPress);


  // preload the next image when the component loads
  useEffect(() => {
    if (nextImageIndex < checkedCount.length) {
      const preloadImage = new Image();
      preloadImage.src = state.planes[nextImageIndex].image_uris.large; // Preload the next image
      preloadImage.onload = () => {
        // do nothing on load   
      };
    }
  }, [nextImageIndex, checkedCount, state.planes]);


  if (sequence.length === 0) return <div>Loading...</div>
  return (
    <div className="game_wrapper">
      <div className="game_image_wrapper">
        <img
          src={state.planes[sequence[Number(card) - 1] - 1].image_uris.large}
          alt={state.planes[sequence[Number(card) - 1] - 1].name}
        />
      </div>
      <div className="game_button_wrapper">
        <button disabled={Number(card) === 1} id='back' onClick={handleButton}>Back</button>
        <button disabled={Number(card) === checkedCount.length} id='next' onClick={handleButton}>Next</button>
      </div>
    </div>
  )
}

export default SelectionGame;