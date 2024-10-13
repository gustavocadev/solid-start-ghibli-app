import { useSubmission } from '@solidjs/router';
import { addComment, CommentEntry } from '~/api/comments';
import { TextField, TextFieldInput, TextFieldTextArea } from './ui/text-field';
import { Button } from './ui/button';

type CommentsListProps = {
  filmId: string;
  comments: CommentEntry[];
};

export default function CommentsList({ filmId, comments }: CommentsListProps) {
  const addingComment = useSubmission(addComment);

  const inputStyle = (fieldName: string) =>
    `border border-slate-400 rounded py-2 px-3 inline-block w-full ${
      addingComment.result?.errors[fieldName] ? 'border-red-500' : ''
    }`;

  return (
    <div>
      <h2 class="text-3xl mb-2">Community Comments</h2>

      <div class="flex flex-col space-y-4 my-3">
        {comments.map((comment) => (
          <div class="p-4 rounded border border-slate-400">
            <div class="text-gray-700 font-bold text-xl mb-2">
              {comment.name}
            </div>
            <p class="text-gray-700">{comment.message}</p>
          </div>
        ))}

        <div class="p-4 rounded border border-slate-400">
          <form method="post" action={addComment}>
            <input type="hidden" name="filmId" value={filmId} />
            <fieldset disabled={addingComment.pending}>
              <TextField>
                <label class="inline-block my-2">Name:</label>
                <TextFieldInput
                  name="name"
                  type="text"
                  class={inputStyle('name')}
                />
                {addingComment.result?.errors.name && (
                  <p class="text-red-500">
                    {addingComment.result?.errors.name}
                  </p>
                )}
              </TextField>
              <label class="inline-block my-2">Message:</label>
              <TextField>
                <TextFieldTextArea
                  name="message"
                  class={inputStyle('message')}
                />
                {addingComment.result?.errors.message && (
                  <p class="text-red-500">
                    {addingComment.result?.errors.message}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={addingComment.pending}
                  class="mt-4"
                >
                  {addingComment.pending ? 'Adding...' : 'Add comment'}
                </Button>
              </TextField>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
