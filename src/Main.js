import { useState } from 'react';
import planes from './planes.json';
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [list, setList] = useState(planes.reduce((acc, cur, ind) => {
    acc.push({ [ind]: true });
    return acc;
  }, []))
  const navigate = useNavigate();
  const [searchBoxValue, setSearchBoxValue] = useState("")

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value
    setSearchBoxValue(searchTerm)

    let newList = [...list]
    newList = planes.map((plane, i) => {
      let result = (plane.name.toLowerCase().includes(searchTerm.toLowerCase()) || plane.type_line.toLowerCase().includes(searchTerm.toLowerCase()) || plane.oracle_text.toLowerCase().includes(searchTerm.toLowerCase()) ? true : false);
      if (result) {
        return { [i]: true };
      } else {
        return { [i]: false };
      };
    })
    setList(newList);
  }

  const handleCardSelect = (e) => {
    e.preventDefault();
    navigate(`/card/${e.currentTarget.id}`)
    window.scrollTo(0, 0);
  }


  return (
    <div className="main_body">
      <input type="main_box" className='searchbox' onChange={handleSearchChange} value={searchBoxValue} />
      <div className='main_grid'>
        {list.map((plane, ind) => {
          if (plane[ind]) {
            return (
              <div key={ind} id={planes[Object.keys(plane)].tcgplayer_id} className='main_card' onClick={handleCardSelect}>
                <img src={planes[Object.keys(plane)].image_uris.normal} alt={planes[Object.keys(plane)].name} />
                <div className='main_card_name'>
                  {planes[Object.keys(plane)].name}
                </div>
              </div>
            )
          } else {
            return <div />
          }
        })}
      </div>
    </div>
  )
}

export default Main;