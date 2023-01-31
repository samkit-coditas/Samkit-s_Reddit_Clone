import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/src/firebase/clientApp";
const OAuthButtons = () => {
  const [signInWithGoogle, user, loading, userError] =
    useSignInWithGoogle(auth);
  return (
    <Flex direction={"column"} width={"100%"} mb={4}>
      <Button
        variant={"oauth"}
        mb={2}
        isLoading={loading}
        onClick={() => {
          signInWithGoogle();
        }}
      >
        <Image src={"/images/googlelogo.png"} height={"20px"} mr={4} />
        Continue With Google
      </Button>
      <Text textAlign={"center"} color={"red"} fontSize={"10pt"}>
        {userError?.message}
      </Text>
    </Flex>
  );
};
export default OAuthButtons;
