import { createAsync, RouteSectionProps } from '@solidjs/router';
import { Show } from 'solid-js';
import { getFilmById } from '~/api/films';
import CharacterList from '~/components/character-list';
import CommentsList from '~/components/comment-list';
import FilmBanner from '~/components/film-banner';

export default function Film({ children, params }: RouteSectionProps) {
  const film = createAsync(() => {
    if (!params.filmId) throw new Error('Film ID is required');
    return getFilmById(params.filmId);
  });

  return (
    <div>
      <FilmBanner film={film()} />
      <Show when={film()} keyed>
        {(film) => (
          <div class="p-10">
            <p>{film.description}</p>

            <div class="flex py-5 space-x-5">
              <CharacterList characters={film.characters} />

              <div class="flex-1 flex flex-col justify-between">
                {children}

                <CommentsList filmId={film.id} comments={film.comments || []} />
              </div>
            </div>
          </div>
        )}
      </Show>
    </div>
  );
}
