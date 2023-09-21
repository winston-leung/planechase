import { createContext, useReducer, useEffect } from "react";
import useFetch from './useFetch';

export const PlanesContext = createContext(null);

const initialState = {
  load: "load",
  planes: [],
  search: [],
  select: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "receive-planes":
      return {
        ...state,
        planes: action.planes,
        load: "done"
      };
    case "receive-search":
      return {
        ...state,
        search: action.search,
      };
    case "receive-select":
      return {
        ...state,
        select: action.select,
      };
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  };
}

export const PlanesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, loading, error } = useFetch("https://api.scryfall.com/cards/search?q=%28type%3Aphenomenon+OR+type%3Aplane%29");

  const handleSearch = (value) => {
    dispatch({
      type: "receive-search",
      search: value
    })
  }

  const handleSelect = (list) => {
    dispatch({
      type: "receive-select",
      select: list
    })
  }

  useEffect(() => {
    if (error !== null) console.log(error)
    if (!loading && data) {
      const planesData = data.data.map((cur) => ({
        id: cur.id,
        name: cur.name,
        image_uris: cur.image_uris,
        type_line: cur.type_line,
        oracle_text: cur.oracle_text,
      }));
      handleSearch([...data.data.map((plane, i) => i)]);
      handleSelect(data.data.reduce((acc, cur) => {
        acc.push({ name: cur.name, selected: true, id: cur.id });
        acc.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        return acc;
      }, []))
      dispatch({
        type: 'receive-planes',
        planes: planesData
      });
    }
  }, [data, loading, error]);



  return (
    <PlanesContext.Provider
      value={{
        state,
        actions: {
          handleSearch,
          handleSelect,
        }
      }}>
      {children}
    </PlanesContext.Provider >
  )


}