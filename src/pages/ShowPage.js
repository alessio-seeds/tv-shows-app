import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShowByID } from "../helpers/showsHelper";
import NotFound from "./NotFound";

function ShowPage() {
  const { showID } = useParams();
  const [show, setShow] = useState(undefined);

  const existingFavorites = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  const [isFavorited, setIsFavorited] = useState(existingFavorites.includes(showID));

  useEffect(() => {
    const fetchShow = async () => {
      const showData = await getShowByID(showID);
      console.log(showData);
      setShow(showData);
    };
    fetchShow();
  }, [showID]);

  if (!show) return <NotFound />;

  const toggleFavorite = () => {
    const existingFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    let newFavorites = []

    if (existingFavorites.includes(showID)) {
      newFavorites = existingFavorites.filter( id => id !== showID )
      setIsFavorited(false)
    } else {
      newFavorites = [showID, ...existingFavorites]
      setIsFavorited(true)
    }

    const favorites = JSON.stringify(newFavorites);
    localStorage.setItem("favorites", favorites);
  };

  return (
    <div className="ShowPage">
      <h1>{show.name}</h1>
      <img src={show.image.medium} alt={show.name}/>
      <h2>Language: {show.language}</h2>
      <h3>Rating: {show.rating.average}</h3>
      <h3>Genres: {show.genres.join(", ")}</h3>
      {!!show._embedded && !!show._embedded.cast &&
        show._embedded.cast.map((member) => (
          <div>{member.person.name + " as " + member.character.name}</div>
        ))}

      <button onClick={toggleFavorite}>
        {isFavorited ? 'Remove Favorite' : 'Add Favorite'}
      </button>
    </div>
  );
}
export default ShowPage;
