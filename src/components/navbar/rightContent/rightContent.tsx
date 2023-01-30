import { Flex } from "@chakra-ui/react";
import React from "react";
import AuthModal from "../../modal/auth/authModal";
import AuthButtons from "./authButtons";

type rightContentProps = {};

const RightContent: React.FC<rightContentProps> = () => {
  return (
    <>
      <AuthModal />
      <Flex justify={"center"} align={"center"}>
        <AuthButtons />
      </Flex>
    </>
  );
};
export default RightContent;
