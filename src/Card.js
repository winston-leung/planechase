import { useParams } from "react-router-dom";
import useFetch from "./useFetch";


const Card = () => {
  const cardId = useParams().id

  const { data, loading, error } = useFetch(`https://api.scryfall.com/cards/${cardId}`)
  console.log(error)



  if (loading) return <div>Loading ...</div>
  return (
    <div className="card">
      <h1>
        {data.name}
      </h1>
      <img loading="lazy" src={data.image_uris.normal} alt={data.name} />
      <h2>Type: {data.type_line}</h2>
      <p>{data.oracle_text}</p>
    </div>
  )
}


export default Card;