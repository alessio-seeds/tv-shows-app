import { useEffect, useState } from "react";
import { getShowByID } from "../helpers/showsHelper";
import ShowList from "../components/ShowList";

function Favorites() {
  const favorites = JSON.parse(localStorage.getItem(`favorites`) || "[]");

  const [shows, setShows] = useState([]);
  useEffect(() => {
    const fetchShows = async () => {
      const promises = favorites.map((favorite) => getShowByID(favorite));
      const shows = await Promise.all(promises);
      setShows(shows);
    };

    fetchShows();
  }, []);

  return (
    <div>
      <h2>This is the Favorites page</h2>

      <ShowList shows={shows} />
    </div>
  );
}

export default Favorites;
