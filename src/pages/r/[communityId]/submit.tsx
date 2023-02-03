import { communityState } from "@/src/atoms/communitiesAtom";
import PageContent from "@/src/components/layout/pageContent";
import NewPostForm from "@/src/components/posts/newPostForm";
import { auth } from "@/src/firebase/clientApp";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

const SubmitPostPage = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilValue(communityState);
  console.log("communityStateValue", communityStateValue);
  return (
    <PageContent>
      <>
        <Box padding={"14px 0px"} borderBottom={"1px solid white"}>
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <></>
    </PageContent>
  );
};
export default SubmitPostPage;
