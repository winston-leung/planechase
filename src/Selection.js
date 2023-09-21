import { useContext, useState } from 'react';
import { PlanesContext } from './PlanesContext';
import { useNavigate } from "react-router-dom";

const Selection = () => {
  const { state, actions: { handleSelect } } = useContext(PlanesContext)
  const count = state.planes.length;
  const checkedCount = !state?.select ? 0 : state.select.reduce((acc, cur) => {
    if (cur.selected) acc++;
    return acc;
  }, 0);
  const [image, setImage] = useState("");
  const [mount, reMount] = useState(true);
  const navigate = useNavigate();

  const handleHover = (e) => {
    const sel = state.planes.find(plane => plane.id === e.currentTarget.id)

    if (sel) setImage({ img: sel.image_uris.large, name: sel.name });
  }
  const handleCheck = (e) => {
    e.preventDefault();
    console.log(e.currentTarget)
    const newList = [...state.select];
    newList.forEach(line => {
      if (line.id === e.currentTarget.id) line.selected = e.currentTarget.checked;
    })
    handleSelect(newList);
    reMount(!mount)
  }

  const handleSelectAll = (e) => {
    e.preventDefault();
    const newList = [...state.select];
    newList.forEach(line => {
      line.selected = true;
    })
    handleSelect(newList);
  }

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
          Selected: {checkedCount} of {count}
          {state?.select && state.select.map(list => {
            return (
              <div onMouseOver={handleHover} id={list.id} key={list.name}>
                <input type='checkbox' className='selection_checkbox' checked={list.selected} onChange={handleCheck} id={list.id} />
                <label className='selection_plane'>{list.name}</label>
              </div>
            )
          })}
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