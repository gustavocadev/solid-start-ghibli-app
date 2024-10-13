import { A } from '@solidjs/router';

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello World!
      </h1>

      <p class="">
        <A href="/films" class="text-sky-600 hover:underline">
          View Films
        </A>
      </p>
    </main>
  );
}
