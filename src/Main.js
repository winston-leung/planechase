import { useState } from 'react';
import './Main.css';
import planes from './planes.json';

const Main = () => {
  const [list, setList] = useState(planes.reduce((acc, cur, ind) => {
    acc.push({ [ind]: true });
    return acc;
  }, []))


  const handleSearcChange = {}




  return (
    <div className="mainbody">
      <input type="box" className='searchbox' onChange={null} />
      <div className='grid'>
        {list.map((plane, ind) => {
          console.log(plane)
          if (plane) {
            return (
              <div key={ind} className='card'>{planes[Object.keys(plane)].name}</div>
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