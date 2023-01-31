import { authModalState } from "@/src/atoms/authModalAtom";
import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
const AuthButtons = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  return (
    <>
      <Button
        variant={"outline"}
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => {
          setAuthModalState({ open: true, view: "login" });
        }}
      >
        Login
      </Button>
      <Button
        variant={"solid"}
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => {
          setAuthModalState({ open: true, view: "signUp" });
        }}
      >
        SignUp
      </Button>
    </>
  );
};
export default AuthButtons;
