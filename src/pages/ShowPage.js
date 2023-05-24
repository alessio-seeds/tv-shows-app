import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getShowByID } from "../helpers/showsHelper"
import NotFound from "./NotFound"

function ShowPage() {
  const {showID} = useParams()
  const [show,setShow] = useState(undefined) 

  useEffect( (() => {
    const fetchShow = async () => {
      const showData = await getShowByID(showID)
      console.log(showData)
      setShow(showData)
    }
    fetchShow()
  }), [showID])

  if(!show) return <NotFound />

  return (
        <div className="ShowPage">
          <h1>{show.name}</h1>
          <img src={show.image.medium} />
          <h2>Language: {show.language}</h2>
          <h3>Rating: {show.rating.average}</h3>
          <h3>Genres: {show.genres.join(', ')}</h3>
          {!!show._embedded.cast && show._embedded.cast.map((member)=><div>{member.person.name + ' as ' + member.character.name}</div>)}
        </div>
 
  )
}
export default ShowPage


