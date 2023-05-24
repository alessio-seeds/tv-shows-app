import ShowList from '../components/ShowList';
import { useEffect, useState } from "react"
import { getHomeShows } from '../helpers/showsHelper';

function Home() {
  const [shows, setShows] = useState(undefined)

  useEffect((() => {
    const fetchShows = async () => {
      const showsData = await getHomeShows()
      setShows(showsData)
    }
    fetchShows()
  }), [])

  if (!shows) {
    return <h1>Couldn't load shows</h1>
  }

  return (
    <div className="HomePage">
      <h1>The Best TV Shows App</h1>
      <ShowList shows={shows} />
    </div>
  )
}
export default Home