import { action, cache } from '@solidjs/router';

export type CommentEntry = {
  name: string;
  message: string;
  filmId: string;
};

export const getComments = cache(async (filmId: string) => {
  const response = await fetch(
    `http://localhost:3001/comments?filmId=${filmId}`
  );

  return response.json();
}, 'getComments');

export const addComment = action(async (formData: FormData) => {
  const name = formData.get('name') as string;
  const message = formData.get('message') as string;
  const filmId = formData.get('filmId') as string;

  const comment: CommentEntry = { name, message, filmId };

  const errors = {
    name: '',
    message: '',
  };

  if (!name) errors.name = 'Name is required';
  if (!message) errors.message = 'Message is required';

  if (errors.name || errors.message) {
    return { errors };
  }

  const response = await fetch('http://localhost:3001/comments', {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();

  return result;
}, 'addComment');
