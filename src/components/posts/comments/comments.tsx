import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { useSetRecoilState } from "recoil";
import { Post, postState } from "@/src/atoms/postAtom";
import CommentItem, { Comment } from "./commentItem";
import CommentInput from "./commentInput";
import { authModalState } from "@/src/atoms/authModalAtom";
import { firestore } from "@/src/firebase/clientApp";

type commentsProps = {
  user: User;
  selectedPost: Post | null;
  communityId: string;
};

const Comments: React.FC<commentsProps> = ({
  user,
  selectedPost,
  communityId,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState("");
  const setAuthModalState = useSetRecoilState(authModalState);
  const setPostState = useSetRecoilState(postState);

  const onCreateComment = async () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }

    setCreateLoading(true);
    try {
      const batch = writeBatch(firestore);

      const commentDocRef = doc(collection(firestore, "comments"));

      const newComment: Comment = {
        id: commentDocRef.id,
        postId: selectedPost?.id!,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        // creatorPhotoURL: user.photoURL,
        communityId: communityId,
        text: commentText,
        postTitle: selectedPost?.title!,
        createdAt: serverTimestamp() as Timestamp,
      };

      batch.set(commentDocRef, newComment);

      const postDocRef = doc(firestore, "posts", selectedPost?.id!);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });
      await batch.commit();
      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      setCommentText("");
      setComments((prev) => [newComment, ...prev]);

      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
        postUpdateRequired: true,
      }));
    } catch (error: any) {
      console.log("onCreateComment error", error.message);
    }
    setCreateLoading(false);
  };

  // const onDeleteComment = useCallback(
  const onDeleteComment = async (comment: Comment) => {
    setDeleteLoading(comment.id as string);
    try {
      if (!comment.id) throw "Comment has no ID";
      const batch = writeBatch(firestore);
      const commentDocRef = doc(firestore, "comments", comment.id);
      batch.delete(commentDocRef);

      batch.update(doc(firestore, "posts", comment.postId), {
        numberOfComments: increment(-1),
      });

      await batch.commit();

      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! - 1,
        } as Post,
        // postUpdateRequired: true,
      }));

      setComments((prev) => prev.filter((item) => item.id !== comment.id));
    } catch (error: any) {
      console.log("Error deleting comment", error.message);
    }
    setDeleteLoading("");
  };
  //   [setComments, setPostState]
  // );

  const getPostComments = async () => {
    try {
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", selectedPost?.id),
        orderBy("createdAt", "desc")
      );
      const commentDocs = await getDocs(commentsQuery);
      const comments = commentDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments as Comment[]);
    } catch (error: any) {
      console.log("getPostComments error", error.message);
    }
    setFetchLoading(false);
  };

  useEffect(() => {
    console.log("HERE IS THE SELECTED POST", selectedPost?.id);
    if (!selectedPost) return;
    getPostComments();
  }, [selectedPost]);
  return (
    <Box bg="white" p={2} borderRadius="0px 0px 4px 4px">
      <Flex
        direction="column"
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width="100%"
      >
        {!fetchLoading && (
          <CommentInput
            comment={commentText}
            setComment={setCommentText}
            loading={createLoading}
            user={user}
            onCreateComment={onCreateComment}
          />
        )}
      </Flex>
      <Stack spacing={6} p={2}>
        {fetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding="6" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Box>
            ))}
          </>
        ) : (
          <>
            {!!comments.length ? (
              <>
                {comments.map((item: Comment) => (
                  <CommentItem
                    key={item.id}
                    comment={item}
                    onDeleteComment={onDeleteComment}
                    isLoading={deleteLoading === (item.id as string)}
                    userId={user?.uid}
                  />
                ))}
              </>
            ) : (
              <Flex
                direction="column"
                justify="center"
                align="center"
                borderTop="1px solid"
                borderColor="gray.100"
                p={20}
              >
                <Text fontWeight={700} opacity={0.3}>
                  No Comments Yet
                </Text>
              </Flex>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};
export default Comments;
