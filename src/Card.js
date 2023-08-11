import { useParams } from "react-router-dom";
import planes from './planes.json'


const Card = () => {
  const cardId = useParams().id

  const cardSelected = planes.find(plane => plane.tcgplayer_id === Number(cardId)
  )
  return (
    <div className="card">
      <h1>
        {cardSelected.name}
      </h1>
      <img src={cardSelected.image_uris.normal} alt={cardSelected.name} />
      <h2>Type: {cardSelected.type_line}</h2>
      <p>{cardSelected.oracle_text}</p>
    </div>
  )
}


export default Card;