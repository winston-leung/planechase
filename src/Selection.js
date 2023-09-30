import { useContext, useState } from 'react';
import { PlanesContext } from './PlanesContext';
import { useNavigate } from "react-router-dom";
import useCheckedCount from './useCheckedCount';
import './selection.css';

const Selection = () => {
  const { state, actions: { handlePlaneSelect, handleSetSelect } } = useContext(PlanesContext)
  const count = state.planes.length;
  const checkedCount = useCheckedCount();
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  // handle hover over a plane to display its image
  const handleHover = (e) => {
    const sel = state.planes.find(plane => plane.id === e.currentTarget.id)

    if (sel) setImage({ img: sel.image_uris.large, name: sel.name });
  }

  // handle selecting all planes
  const handleSelectAll = (e) => {
    const newList = [...state.select];
    newList.forEach(line => {
      line.selected = true;
    })
    handlePlaneSelect(newList);
  }

  // handle starting the game by generation a seed
  const handleStart = (e) => {
    e.preventDefault();
    const randNum = Math.floor(Math.random() * 1000000000000000);
    navigate(`/game/${randNum}/1`);
  }

  // handle checkbox selection for planes
  const handlePlaneCheckbox = (e) => {
    const newList = [...state.select];
    const checkboxId = e.currentTarget.id;
    newList.forEach(plane => {
      if (plane.id === checkboxId) plane.selected = e.currentTarget.checked;
    })
    handlePlaneSelect(newList);
  }

  // handle checkbox selection for sets
  const handleSetCheckbox = (e) => {
    const newSetsList = [...state.sets];
    const newPlanesList = [...state.select];
    const setId = e.currentTarget.id;
    newSetsList.forEach(set => {
      if (set.set === setId) set.selected = e.currentTarget.checked;
    })
    state.planes.forEach((plane, i) => {
      if (plane.set === setId) newPlanesList[i].selected = e.currentTarget.checked
    })
    handlePlaneSelect(newPlanesList);
    handleSetSelect(newSetsList);
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
          <p>Sets:</p>
          <ul className='selection_list sets'>
            {state?.sets && state.sets.map(set => {
              return (
                <li
                  key={set.set}
                  className='selection_item'
                >
                  <input
                    type='checkbox'
                    className='selection_checkbox'
                    checked={set.selected}
                    onChange={handleSetCheckbox}
                    id={set.set}
                  />
                  <label
                    className='selection_label'
                    htmlFor={set.set}
                  >
                    {set.set_name}
                  </label>
                </li>
              )
            })}
          </ul >
          <p>Planes:</p>
          <ul className='selection_list planes'>
            {state?.select && state.select.map(plane => {
              return (
                <li
                  onMouseOver={handleHover}
                  id={plane.id}
                  key={plane.name}
                  className='selection_item'
                >
                  <input
                    type='checkbox'
                    className='selection_checkbox'
                    checked={plane.selected}
                    onChange={handlePlaneCheckbox}
                    id={plane.id} />
                  <label
                    className='selection_label'
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
      {/* <div className='selection_maindiv'>
        <div className='selection_imgdiv'>
          {image ? <img className='selection_preview' src={image.img} alt={image.name} /> : ""}
        </div>
      </div> */}
    </div >
  );
}

export default Selection;