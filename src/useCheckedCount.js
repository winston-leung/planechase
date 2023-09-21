import { useContext } from "react";
import { PlanesContext } from "./PlanesContext";

// calcute the count of selected planes
const useCheckedCount = () => {
  const { state } = useContext(PlanesContext)
  const checkedCount = !state?.select ? 0 : state.select.reduce((acc, cur) => {
    if (cur.selected) acc++;
    return acc;
  }, 0);
  return checkedCount;
}

export default useCheckedCount;