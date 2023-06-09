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

export interface FragmentProp {
  fragmentUrl: string
  filmId: string
  id: string
}
export function getFragmentList(filmId: string) {
  return useGetFetch<FragmentProp[]>({
    url: `/api/film/${filmId}/fragment`,
  })
}

interface GetFragmentRes {
  fragmentUrl: string
  id: string
}
export function getFragment(fragmentId: string) {
  return useGetFetch<GetFragmentRes>({
    url: `/api/film/fragment/${fragmentId}`,
  })
}

export interface CaptionProp {
  start: string
  end: string
  en: string
  cn: string
}
export function getCaption(fragmentId: string) {
  return useGetFetch<CaptionProp[]>({
    url: `/api/film/${fragmentId}/caption`,
  })
}