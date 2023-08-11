import { useState } from 'react';
import planes from './planes.json';

const Main = () => {
  const [list, setList] = useState(planes.reduce((acc, cur, ind) => {
    acc.push({ [ind]: true });
    return acc;
  }, []))
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

  return (
    <div className="main_body">
      <input type="main_box" className='searchbox' onChange={handleSearchChange} value={searchBoxValue} />
      <div className='main_grid'>
        {list.map((plane, ind) => {
          if (plane[ind]) {
            return (
              <a key={ind} className='main_card' href={`/card/${planes[Object.keys(plane)].tcgplayer_id}`} >
                <img src={planes[Object.keys(plane)].image_uris.normal} alt={planes[Object.keys(plane)].name} />
                <div className='main_card_textbox'>
                  <p className='main_card_name move_up'>
                    {planes[Object.keys(plane)].name}
                  </p>
                  <p className='main_card_type move_up'>
                    Type: {planes[Object.keys(plane)].type_line}
                  </p>
                  <hr className='move_up' />
                  <p className='main_card_oracle move_up'>
                    {planes[Object.keys(plane)].oracle_text}
                  </p>
                </div>
              </a>
            )
          } else {
            return <div />
          }
        })}
      </div>
    </div >
  )
}

export default Main;