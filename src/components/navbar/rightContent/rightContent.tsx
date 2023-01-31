import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import React from "react";
import AuthModal from "../../modal/auth/authModal";
import AuthButtons from "./authButtons";
import Icons from "./icons";
import UserMenu from "./userMenu";

type rightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<rightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify={"center"} align={"center"}>
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};
export default RightContent;
