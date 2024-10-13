import { A, createAsync, RouteSectionProps } from '@solidjs/router';
import { For } from 'solid-js';
import { getFilms } from '~/api/films';
import { Button } from '~/components/ui/button';
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from '~/components/ui/text-field';

export default function FilmsIndex(props: RouteSectionProps) {
  const films = createAsync(() => getFilms(props.location.query.title), {
    initialValue: [],
  });
  return (
    <div class="p-16 font-sans">
      <h1 class="text-5xl font-bold text-center">Studio Ghibli Films</h1>

      <form class="space-y-2 pb-12">
        <TextField class="">
          <TextFieldLabel for="title">Search</TextFieldLabel>
          <TextFieldInput
            type="text"
            name="title"
            placeholder="Type a title..."
            class="w-full"
          />
        </TextField>

        <Button type="submit">Search</Button>
      </form>

      <div class="grid grid-cols-4 gap-4">
        <For each={films()} fallback={<div>Loading...</div>}>
          {(film) => (
            <A
              title={film.title}
              href={film.id}
              class="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer"
            >
              <div>{film.title}</div>
              <img src={film.image} alt={film.title} />
            </A>
          )}
        </For>
      </div>
    </div>
  );
}
