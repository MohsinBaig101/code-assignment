/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { memo, useState } from "react";

import { Button } from "@inf/ui/button";
import { Input } from "@inf/ui/input";
import { InputErrorMessage } from "@inf/ui/inputErrorMessage";
import Spinner from "@inf/ui/spinner";
import { Text } from "@inf/ui/text";
import { toast } from "@inf/ui/toast";

import { api } from "~/trpc/react";

const Comment = memo(function Comment({
  id,
  content,
  postId,
  repliesCount,
}: {
  id: string;
  content: string;
  postId: string;
  repliesCount: number | null;
}) {
  const utils = api.useUtils();
  // const inputRef = useRef<HTMLInputElement>(null);
  const [isReplying, setIsReplying] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [canLoadMore, setCanLoadMore] = useState(!!repliesCount);
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);
  const [replyText, setReplyText] = useState("");
  // Fetching replies
  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = api.comment.all.useInfiniteQuery(
    { id: postId, limit: 2, parentId: id },
    {
      enabled: isQueryEnabled,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    },
  );

  // Mutation for saving replies
  const createComment = api.comment.saveReply.useMutation({
    onSuccess: async () => {
      if (!isQueryEnabled) {
        setIsQueryEnabled(true);
      }
      await utils.comment.all.invalidate();
      toast.success("Reply saved successfully.");
    },
    onError: () => {
      toast.error("Failed to create comment. Please try again.");
    },
  });

  /** Handles fetching more replies */
  const handleFetchMoreReplies = async () => {
    const result = await fetchNextPage();
    setCanLoadMore(!!result.hasNextPage);
  };

  /** Handles reply submission */
  const handleSaveReply = async () => {
    if (replyText === "") {
      setFormError("Input is required");
      return;
    }
    setFormError(null);
    await createComment.mutateAsync({
      content: replyText,
      postId,
      parentId: id,
    });
    setReplyText("");
    setIsReplying(false);
  };

  return (
    <div className="w-full gap-1 rounded-lg border border-gray-200 p-2 shadow-sm">
      <div className="text-md mb-2 text-gray-700">{content}</div>

      {/* Replies List */}
      {commentsData?.pages?.flatMap((page) =>
        page.items?.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            postId={comment.postId}
            content={comment.content}
            repliesCount={comment?._count?.replies}
          />
        )),
      )}

      {/* Load More & Reply Actions */}
      <div className="mt-2 flex justify-between">
        {canLoadMore && (
          <Text
            size="sm"
            className="weight-200 text-blue-900 hover:cursor-pointer"
            onClick={handleFetchMoreReplies}
          >
            Load Replies
          </Text>
        )}
        {isFetchingNextPage && <Spinner />}
        {!isReplying && (
          <Text
            size="sm"
            className="text-blue-900 hover:cursor-pointer"
            onClick={() => setIsReplying(true)}
          >
            Reply
          </Text>
        )}
      </div>

      {/* Reply Input Field */}
      {isReplying && (
        <div className="mt-2 flex flex-nowrap">
          <div className="flex w-full flex-wrap">
            <Input
              onChange={(e) => {
                setReplyText(e.target.value);
                setFormError(null);
              }}
              value={replyText}
              type="text"
              placeholder="Write a reply..."
            />
            {formError && <InputErrorMessage message={formError} />}
          </div>
          <Button
            onClick={handleSaveReply}
            className="flex items-center space-x-1"
            disabled={createComment.isPending}
          >
            <span>Send</span>
            {createComment.isPending && <Spinner />}
          </Button>
        </div>
      )}
    </div>
  );
});

export default Comment;
