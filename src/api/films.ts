import { cache } from '@solidjs/router';
import { CommentEntry, getComments } from './comments';

export type FilmCharacter = {
  id: string;
  name: string;
  gender?: string;
  age?: string;
  eye_color?: string;
  hair_color?: string;
};

export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  image: string;
  movie_banner: string;
  people: string[];
  characters?: FilmCharacter[];
  comments?: CommentEntry[];
};

export const getFilms = cache(async (title?: string | null) => {
  const response = await fetch('https://ghibliapi.vercel.app/films');

  const films: Film[] = await response.json();

  return films.filter((film) =>
    title ? film.title.toLowerCase().includes(title.toLowerCase()) : true
  );
}, 'getFilms');

export const getFilmById = cache(async (filmId: string) => {
  const response = await fetch(`https://ghibliapi.vercel.app/films/${filmId}`);

  const film: Film = await response.json();

  if (!response.ok) throw response;

  const comments = await getComments(filmId);

  const characters = await Promise.all(
    film.people
      .filter((url) => url !== 'https://ghibliapi.vercel.app/people/')
      .map((url) => fetch(url).then((res) => res.json()))
  );

  return { ...film, characters, comments };
}, 'getFilmById');

export const getFilmCharacter = cache(
  async (characterId: string): Promise<FilmCharacter> => {
    const response = await fetch(
      `https://ghibliapi.vercel.app/people/${characterId}`
    );

    if (!response.ok) throw response;

    return response.json();
  },
  'getFilmCharacter'
);
