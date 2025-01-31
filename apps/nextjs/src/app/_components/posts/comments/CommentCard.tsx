/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { memo, useState } from "react";
import { Button } from "@inf/ui/button";
import { Input } from "@inf/ui/input";
import { InputErrorMessage } from "@inf/ui/inputErrorMessage";
import Spinner from "@inf/ui/spinner";
import { Text } from "@inf/ui/text";
import { toast } from "@inf/ui/toast";

import { api } from "~/trpc/react";

// The Comment component allows users to view and interact with individual comments and their replies.
const Comment = memo(function Comment({
  id,             // Unique identifier for the comment
  content,        // Content of the comment
  postId,         // ID of the post to which the comment belongs
  repliesCount,   // Total number of replies to the comment
}: {
  id: string;
  content: string;
  postId: string;
  repliesCount: number | null;
}) {
  const utils = api.useUtils();

  // State variables to handle comment reply functionality
  const [isReplying, setIsReplying] = useState(false);   // Toggles reply input visibility
  const [formError, setFormError] = useState<string | null>(null); // Handles input validation errors
  const [canLoadMore, setCanLoadMore] = useState(!!repliesCount);  // Determines if more replies can be loaded
  const [isQueryEnabled, setIsQueryEnabled] = useState(false); // Controls the enabling of the query for fetching replies
  const [replyText, setReplyText] = useState("");  // Stores the text of the reply being written

  // Fetching replies for the current comment, with pagination support
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

  // Mutation for saving a new reply to the comment
  const createComment = api.comment.saveReply.useMutation({
    onSuccess: async () => {
      if (!isQueryEnabled) {
        setIsQueryEnabled(true);  // Enables query to load replies if it's the first reply
      }
      await utils.comment.all.invalidate();  // Invalidates the cache to reflect the new comment
      toast.success("Reply saved successfully.");
    },
    onError: () => {
      toast.error("Failed to create comment. Please try again.");
    },
  });

  /** Handles fetching more replies when the "Load Replies" button is clicked */
  const handleFetchMoreReplies = async () => {
    const result = await fetchNextPage();
    setCanLoadMore(!!result.hasNextPage); // Update the state if there are more replies to load
  };

  /** Handles saving the reply after form submission */
  const handleSaveReply = async () => {
    if (replyText === "") {
      setFormError("Input is required");  // Display an error if the input field is empty
      return;
    }
    setFormError(null);  // Clear any previous errors
    await createComment.mutateAsync({
      content: replyText,
      postId,
      parentId: id,
    });
    setReplyText("");  // Clear the reply input after successful submission
    setIsReplying(false); // Hide the reply input field
  };

  return (
    <div className="w-full gap-1 rounded-lg border border-gray-200 p-2 shadow-sm">
      <div className="text-md mb-2 text-gray-700">{content}</div>

      {/* Render the replies */}
      {commentsData?.pages?.flatMap((page) =>
        page.items?.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            postId={comment.postId}
            content={comment.content}
            repliesCount={comment?._count?.replies}
          />
        )))
      }

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
        {isFetchingNextPage && <Spinner />}  {/* Show a spinner when loading more replies */}
        {!isReplying && (
          <Text
            size="sm"
            className="text-blue-900 hover:cursor-pointer"
            onClick={() => setIsReplying(true)}  // Show the reply input when clicked
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
                setReplyText(e.target.value);  // Update the reply text as user types
                setFormError(null); // Clear form error when user starts typing
              }}
              value={replyText}
              type="text"
              placeholder="Write a reply..."
            />
            {formError && <InputErrorMessage message={formError} />}  {/* Display form error if exists */}
          </div>
          <Button
            onClick={handleSaveReply}
            className="flex items-center space-x-1"
            disabled={createComment.isPending}  // Disable the button while mutation is pending
          >
            <span>Send</span>
            {createComment.isPending && <Spinner />}  {/* Show spinner while replying */}
          </Button>
        </div>
      )}
    </div>
  );
});

export default Comment;
