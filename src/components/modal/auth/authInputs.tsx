import { authModalState } from "@/src/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import Login from "./login";
import SignUp from "./signUp";

const AuthInputs = () => {
  const modalState = useRecoilValue(authModalState);
  return (
    <Flex direction={"column"} align="center" width={"100%"} mt={4}>
      {modalState.view === "login" && <Login />}
      {modalState.view === "signUp" && <SignUp />}
    </Flex>
  );
};
export default AuthInputs;
