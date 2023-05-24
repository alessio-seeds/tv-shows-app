import showsData from "../shows-data"

const defaultImg = {medium: " https://via.placeholder.com/210x295?text=:( "}

function transformShow (show) {
  const transformedShow = {...show, image:show.image || defaultImg}
  return transformedShow
}

export async function getShowByID(id) {
  const response = await fetch("https://api.tvmaze.com/shows/" + id + "?embed[]=cast&embed[]=seasons")
  const showData = await response.json()
  return transformShow(showData)
}


export async function getHomeShows() {
  const response = await fetch("https://api.tvmaze.com/schedule")
  const jsonData = await response.json()
  const homeShows = jsonData.map(episode=> transformShow(episode.show))
  return homeShows
}

export async function searchForShow (text) {
  const response = await fetch("https://api.tvmaze.com/search/shows?q=" + text)
  const jsonData = await response.json()
  const showResults = jsonData.map( element => transformShow(element.show))
  return showResults
}