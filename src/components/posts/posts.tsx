import { Post } from "@/src/atoms/postAtom";
import { auth, firestore } from "@/src/firebase/clientApp";
import usePosts from "@/src/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./postItem";
import PostLoader from "./postLoader";

type postsProps = {
  communityData: any;
};

const Posts: React.FC<postsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);

  const {
    postStateValue,
    setPostStateValue,
    onVote,
    onSelectPost,
    onDeletePost,
  } = usePosts();

  const getPosts = async () => {
    setLoading(true);
    const postQuery = query(
      collection(firestore, "posts"),
      where("communityId", "==", communityData.id),
      orderBy("createdAt", "desc")
    );
    const postDocs = await getDocs(postQuery);
    const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPostStateValue((prev) => ({ ...prev, posts: posts as Post[] }));
    setLoading(false);
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((item, index) => (
            <PostItem
              key={index}
              post={item}
              userIsCreator={user?.uid === item.creatorId}
              userVoteValue={undefined}
              onVote={onVote}
              onDeletePost={onDeletePost}
              onSelectPost={onSelectPost}
            />
          ))}
        </Stack>
      )}
    </>
  );
};
export default Posts;
