import { A } from '@solidjs/router';
import { FilmCharacter } from '~/api/films';
import { Button } from './ui/button';

type CharacterListProps = {
  characters?: FilmCharacter[];
};
export default function CharacterList({ characters }: CharacterListProps) {
  return (
    <div class="flex-1 max-w-md">
      <h3 class="text-3xl">Characters</h3>

      <ul class="flex flex-col space-y-3 my-3">
        {characters?.map((character) => (
          <li>
            <A
              href={'characters/' + character.id}
              activeClass="bg-slate-300 border-2"
              class="w-full p-2 rounded border border-slate-400 inline-block"
              noScroll
            >
              <Button variant="link">{character.name}</Button>
            </A>
          </li>
        ))}
      </ul>
    </div>
  );
}
