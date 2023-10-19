import useSeperateText from "./useSeperateText";
import { useContext, useState } from "react";
import { PlanesContext } from "./PlanesContext";


const SelectionLabel = ({ plane, clickEvent }) => {
  const { state } = useContext(PlanesContext);
  const { oracleText, chaosText } = useSeperateText(state.planes.find(g => g.id === plane.id).oracle_text);

  return (
    <li
      key={plane.name}
      className={`selection_item ${plane.selected ? 'selected' : ""}`}
      onClick={() => clickEvent(plane.id)}
      id={plane.id}
    >
      <label
        className='selection_label'
        htmlFor={plane.id}>
        {plane.name}
      </label>
      <div
        data-tooltip-id="my-tooltip"
        data-tooltip-variant="info"
        data-tooltip-html={`${oracleText} ${chaosText.length > 0 && `<hr /> ${chaosText}`}`}
        className={`selection_tooltip ${plane.selected ? 'selected' : ""}`}
        id="tooltip"
      >
        <p>
          ?
        </p>
      </div>
    </li>
  )
}

export default SelectionLabel;