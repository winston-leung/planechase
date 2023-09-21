import { useContext, useState } from 'react';
import { PlanesContext } from './PlanesContext';
import { useNavigate } from "react-router-dom";
import useCheckedCount from './useCheckedCount';

const Selection = () => {
  const { state, actions: { handleSelect } } = useContext(PlanesContext)
  const count = state.planes.length;
  const checkedCount = useCheckedCount();
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  // handle hover over a plane to display its image
  const handleHover = (e) => {
    const sel = state.planes.find(plane => plane.id === e.currentTarget.id)

    if (sel) setImage({ img: sel.image_uris.large, name: sel.name });
  }

  // handle checkbox selection for planes
  const handleCheck = (e) => {
    const newList = [...state.select];
    const checkboxId = e.currentTarget.id;
    newList.forEach(line => {
      if (line.id === checkboxId) line.selected = e.currentTarget.checked;
    })
    handleSelect(newList);
  }

  // handle selecting all planes
  const handleSelectAll = (e) => {
    e.preventDefault();
    const newList = [...state.select];
    newList.forEach(line => {
      line.selected = true;
    })
    handleSelect(newList);
  }

  // handle starting the game by generation a seed
  const handleStart = (e) => {
    e.preventDefault();
    const randNum = Math.floor(Math.random() * 1000000000000000);
    navigate(`/game/${randNum}/1`);
  }

  return (
    <div className='selection_main'>
      <div className='selection_sidebar'>
        <form className='selection_form'>
          <div className='selection_buttons'>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleSelectAll}>Select All</button>
          </div>
          <p>
            Selected: {checkedCount} of {count}
          </p>
          <ul>

            {state?.select && state.select.map(plane => {
              return (
                <li
                  onMouseOver={handleHover}
                  id={plane.id}
                  key={plane.name}
                >
                  <input
                    type='checkbox'
                    className='selection_checkbox'
                    checked={plane.selected}
                    onChange={handleCheck}
                    id={plane.id} />
                  <label
                    className='selection_plane'
                    htmlFor={plane.id}
                  >
                    {plane.name}
                  </label>
                </li>
              )
            })}
          </ul>
        </form>
      </div >
      <div className='selection_maindiv'>
        <div className='selection_imgdiv'>
          {image ? <img className='selection_preview' src={image.img} alt={image.name} /> : ""}
        </div>
      </div>
    </div >
  );
}

export default Selection;