import { auth } from "@/src/firebase/clientApp";
import { Button, Flex } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React from "react";
import AuthModal from "../../modal/auth/authModal";
import AuthButtons from "./authButtons";

type rightContentProps = {
  user: any;
};

const RightContent: React.FC<rightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify={"center"} align={"center"}>
        {user ? (
          <Button onClick={() => signOut(auth)}>Logout</Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};
export default RightContent;
