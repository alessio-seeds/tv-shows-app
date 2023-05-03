import showsData from "../shows-data"

const defaultImg = {medium: " https://via.placeholder.com/210x295?text=:( "}

function transformShow (show) {
  const transformedShow = {...show, image:show.image || defaultImg}
  return transformedShow
}

export function getShowByID(id) {
  return showsData.find( show => show.id.toString() === id)
}

export function getHomeShows() {
  return showsData
}

export async function searchForShow (text) {
  const response = await fetch("https://api.tvmaze.com/search/shows?q=" + text)
  const jsonData = await response.json()
  const showResults = jsonData.map( element => transformShow(element.show))
  return showResults
}