import { Film } from '~/api/films';
import { A } from '@solidjs/router';

type FilmBannerProps = {
  film?: Film;
};

export default function FilmBanner(props: FilmBannerProps) {
  const film = () => props.film;
  return (
    <div>
      <div class="w-full h-96 overflow-hidden relative">
        <div class="w-full h-full flex flex-col absolute justify-between items-start">
          <A href="/films" class="text-white p-5 text-2xl hover:underline">
            Go Back
          </A>
          <div class="bg-slate-700/60 p-5">
            <div class="text-6xl font-bold text-white">{film()?.title}</div>
          </div>
        </div>

        <img
          src={film()?.movie_banner}
          class="w-full h-auto"
          style={{ 'margin-top': '-100' }}
        />
      </div>
    </div>
  );
}
