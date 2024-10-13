import { createAsync, RouteSectionProps } from '@solidjs/router';
import { Show } from 'solid-js';
import { getFilmCharacter } from '~/api/films';

export default function Character({ params }: RouteSectionProps) {
  const characterDetails = createAsync(() =>
    getFilmCharacter(params.characterId)
  );
  return (
    <div class="mb-3">
      <div class="text-3xl mb-2">Character Details</div>
      <div class="p-4 rounded shadow-lg border">
        <div class="text-gray-700 font-bold text-xl mb-2">
          {characterDetails.name}
        </div>
        <Show when={characterDetails()} keyed fallback={<div>Loading...</div>}>
          {(characterDetails) => (
            <ul class="py-2">
              <li>Gender: {characterDetails.gender}</li>
              <li>Age: {characterDetails.age}</li>
              <li>Eye Color: {characterDetails.eye_color}</li>
              <li>Hair Color: {characterDetails.hair_color}</li>
            </ul>
          )}
        </Show>
      </div>
    </div>
  );
}
