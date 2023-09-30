import { createContext, useReducer, useEffect } from "react";
import useFetch from './useFetch';

export const PlanesContext = createContext(null);

const initialState = {
  planes: [],
  search: [],
  select: [],
  sets: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "receive-planes":
      return {
        ...state,
        planes: action.planes,
        sets: action.sets,
      };
    case "receive-search":
      return {
        ...state,
        search: action.search,
      };
    case "receive-plane-select":
      return {
        ...state,
        select: action.select,
      };
    case "receive-set-select":
      return {
        ...state,
        sets: action.sets,
      }
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  };
}

export const PlanesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // fetch all planes from scryfall
  const { data, loading, error } = useFetch("https://api.scryfall.com/cards/search?q=%28type%3Aphenomenon+OR+type%3Aplane%29");

  // handle search updates in the state
  const handleSearch = (value) => {
    dispatch({
      type: "receive-search",
      search: value
    })
  }
  // handle plane selection updates in the state
  const handlePlaneSelect = (list) => {
    dispatch({
      type: "receive-plane-select",
      select: list
    })
  }

  // handle set selection updates in the state
  const handleSetSelect = (list) => {
    dispatch({
      type: 'receive-set-select',
      sets: list,
    })
  }

  useEffect(() => {
    if (error !== null) console.log(error)
    if (!loading && data) {
      // transform fetched data into a format suitable for context
      const planesData = data.data.map((cur) => ({
        id: cur.id,
        name: cur.name,
        image_uris: cur.image_uris,
        type_line: cur.type_line,
        oracle_text: cur.oracle_text,
        set: cur.set,
        set_name: cur.set_name,
      }));

      // for unique sets
      const uniqueSets = [...new Set(data.data.map(plane => `${plane.set}-${plane.set_name}`))];
      const setsData = uniqueSets.reduce((acc, cur) => {
        acc.push({
          set: cur.split('-')[0],
          set_name: cur.split('-')[1],
          selected: true,
        })
        acc.sort((a, b) => {
          const nameA = a.set_name.toUpperCase();
          const nameB = b.set_name.toUpperCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        return acc;
      }, []);

      // initialize the search and selected planes state
      handleSearch([...data.data.map((plane, i) => i)]);
      handlePlaneSelect(data.data.reduce((acc, cur) => {
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
        planes: planesData,
        sets: setsData,
      });
    }
  }, [data, loading, error]);



  return (
    <PlanesContext.Provider
      value={{
        state,
        loading,
        actions: {
          handleSearch,
          handlePlaneSelect,
          handleSetSelect,
        }
      }}>
      {children}
    </PlanesContext.Provider >
  )


}