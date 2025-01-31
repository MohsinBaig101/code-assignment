import { useCallback, useMemo } from "react";
import { z } from "zod";
import { Button } from "@inf/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  useForm,
} from "@inf/ui/form";
import { Input } from "@inf/ui/input";
import Spinner from "@inf/ui/spinner";
import { TextArea } from "@inf/ui/textarea";
import { toast } from "@inf/ui/toast";

import { api } from "~/trpc/react";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z
    .string()
    .min(100, "Content is required and must be at least 100 characters"),
  author_id: z.string(),
});

interface CreatePostFormProps {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreatePostForm({ closeModal }: CreatePostFormProps) {
  const defaultValues = useMemo(
    () => ({
      title: "",
      content: "",
      author_id: "",
    }),
    [],
  );

  const form = useForm({ schema: postSchema, defaultValues });

  const utils = api.useUtils();
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      form.reset();
      await utils.post.invalidate();
      closeModal(false);
    },
    onError: (err) => {
      toast.error(
        err.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to post"
          : "Failed to create post",
      );
    },
  });

  const handleSubmit = useCallback(
    (data: z.infer<typeof postSchema>) => {
      createPost.mutate(data);
    },
    [createPost],
  );

  return (
    <Form {...form}>
      <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <form
          data-testid="post-form"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Create Post
            </h2>
            <p className="text-sm text-gray-500">
              Fill out the form below to create a new post.
            </p>
          </div>

          {/* Title Field */}
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} id="title" placeholder="Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Content Field */}
          <div className="mt-6">
            <label htmlFor="content" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
              Content
            </label>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TextArea {...field} id="content" rows={5} placeholder="Content" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Actions */}
          <div className="mt-5 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => closeModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createPost?.isPending}
              className="flex items-center gap-2"
            >
              Submit {createPost?.isPending && <Spinner />}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
