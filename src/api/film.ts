import { usePostFetch, useGetFetch } from './fetch'

interface AddFilm {
  filmName: string
  filmCover: string
}
export function addFilm(data: AddFilm) {
  return usePostFetch({
    url: '/api/film',
    data
  })
}

interface FilmProp {
  id: string
  filmName: string
  filmCover: string
}
export function getFilmList() {
  return useGetFetch<FilmProp[]>({
    url: '/api/film/list',
  })
}
interface AddFragment{
  filmId: string
  fragmentUrl: string
}
export function addFragment({ filmId, fragmentUrl }: AddFragment) {
  return usePostFetch({
    url: `/api/film/${filmId}/fragment`,
    data: { fragmentUrl }
  })
}

export function getFragmentList(filmId: string) {
  return useGetFetch<FilmProp[]>({
    url: `/api/film/${filmId}/fragment`,
  })
}