import { useContext, useState } from 'react';
import { PlanesContext } from './PlanesContext';
import { useNavigate } from "react-router-dom";
import useCheckedCount from './useCheckedCount';
import './selection.css';
import SelectionLabel from './SelectionLabel';
import { Tooltip } from 'react-tooltip';

const Selection = () => {
  const { state, actions: { handlePlaneSelect, handleSetSelect } } = useContext(PlanesContext)
  const count = state.planes.length;
  const checkedCount = useCheckedCount();
  // const [image, setImage] = useState("");
  const navigate = useNavigate();

  // handle hover over a plane to display its image
  // const handleHover = (e) => {
  //   const sel = state.planes.find(plane => plane.id === e.currentTarget.id)

  //   if (sel) setImage({ img: sel.image_uris.large, name: sel.name });
  // }

  // handle selecting all planes
  const handleSelectAll = (e) => {
    // const newList = [...state.select];
    // newList.forEach(line => {
    //   line.selected = true;
    // })
    // handlePlaneSelect(newList);
    e.preventDefault();

    const newSetsList = [...state.sets];
    const newPlanesList = [...state.select];
    newSetsList.forEach(set => {
      set.selected = true;
    });
    newPlanesList.forEach(plane => {
      plane.selected = true
    })
    handlePlaneSelect(newPlanesList);
    handleSetSelect(newSetsList);
  }

  // handle starting the game by generation a seed
  const handleStart = (e) => {
    e.preventDefault();
    const randNum = Math.floor(Math.random() * 1000000000000000);
    navigate(`/game/${randNum}/1`);
  }

  // handle checkbox selection for planes
  const handlePlaneClick = (planeId) => {
    const newList = [...state.select];
    newList.map(plane => {
      if (plane.id === planeId) {
        plane.selected = !plane.selected;
      }
      return plane;
    })
    handlePlaneSelect(newList);
  }

  // handle checkbox selection for sets
  const handleSetClick = (setId) => {
    const newSetsList = [...state.sets];
    const newPlanesList = [...state.select];
    const newSelected = !state.sets.filter(set => set.set === setId).some(set => set.selected);
    newSetsList.forEach(set => {
      if (set.set === setId) set.selected = newSelected;
    });
    state.planes.forEach((plane, i) => {
      if (plane.set === setId) newPlanesList[i].selected = newSelected;
    });
    handlePlaneSelect(newPlanesList);
    handleSetSelect(newSetsList);
  }

  return (
    <div className='selection_main'>
      <div className='selection_sidebar'>
        <form className='selection_form'>
          <div className='selection_button_wrapper'>
            <button onClick={handleStart} className='selection_button'>Start</button>
            <button onClick={handleSelectAll} className='selection_button'>Select All</button>
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
                  className={`selection_item ${set.selected ? 'selected' : ""}`}
                  onClick={() => handleSetClick(set.set)}
                  id={set.set}
                >
                  <label
                    className='selection_label'
                    htmlFor={set.set}
                  >
                    {set.set_name}
                  </label>
                </li>
              )
            })}
            <div>
              <div />
            </div>
          </ul >
          <p>Planes:</p>
          <ul className='selection_list planes'>
            {state?.select && state.select.map(plane => {
              return (
                <SelectionLabel plane={plane} clickEvent={handlePlaneClick} key={plane.name} />
              )
            })}
            <Tooltip className="selection_tooltip_popup" id="my-tooltip" />
          </ul>
        </form>
      </div >
    </div >
  );
}

export default Selection;