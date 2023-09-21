import { useContext, useEffect, useState } from 'react';
import SmallPlane from './SmallPlane';
import { PlanesContext } from './PlanesContext';
import './cardsearch.css'

const CardSearch = () => {
  const { state, actions: { handleSearch } } = useContext(PlanesContext)
  const [searchBoxValue, setSearchBoxValue] = useState("")
  const [loadCount, setLoadCount] = useState(16)

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value
    setSearchBoxValue(searchTerm)

    const newSearch = state.planes.reduce((acc, plane, i) => {
      let result = Boolean(plane.name.toLowerCase().includes(searchTerm.toLowerCase()) || plane.type_line.toLowerCase().includes(searchTerm.toLowerCase()) || plane.oracle_text.toLowerCase().includes(searchTerm.toLowerCase()));
      return result ? acc.concat(i) : acc;
    }, [])
    handleSearch(newSearch);
  }

  // Add a scroll event listener to increase loadCount when scrolling to the bottom
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Check if the user has scrolled to the bottom
      if (windowHeight + scrollTop === documentHeight) {
        // Increase loadCount here (e.g., by 16 more items)
        setLoadCount((prevLoadCount) => prevLoadCount + 16);
      }
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (state.load === "load") return <div>Loading...</div>;
  return (
    <div className="main_body">
      <input type="main_box" className='main_searchbox' onChange={handleSearchChange} value={searchBoxValue} placeholder="Search" />
      <div className='main_grid'>
        {state.search.reduce((acc, cur, ind) => {
          if (ind < loadCount) {
            acc.push(<SmallPlane planeId={cur} key={cur} />)
          }
          return acc;
        }, [])}
      </div>
    </div >
  )
}

export default CardSearch;