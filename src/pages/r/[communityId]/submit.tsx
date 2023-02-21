import About from "@/src/components/community/about";
import PageContent from "@/src/components/layout/pageContent";
import NewPostForm from "@/src/components/posts/newPostForm";
import { auth } from "@/src/firebase/clientApp";
import useCommunityData from "@/src/hooks/useCommunityData";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const SubmitPostPage = () => {
  const [user] = useAuthState(auth);
  const { communityStateValue } = useCommunityData();
  console.log("communityStateValue", communityStateValue);
  return (
    <PageContent>
      <>
        <Box padding={"14px 0px"} borderBottom={"1px solid white"}>
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <>
        {communityStateValue.currentCommunity && (
          <About communityData={communityStateValue.currentCommunity} />
        )}
      </>
    </PageContent>
  );
};
export default SubmitPostPage;
