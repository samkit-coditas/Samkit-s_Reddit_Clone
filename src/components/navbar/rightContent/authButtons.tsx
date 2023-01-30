import { Button } from "@chakra-ui/react";

const AuthButtons = () => {
  return (
    <>
      <Button
        variant={"outline"}
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => {}}
      >
        Login
      </Button>
      <Button
        variant={"solid"}
        height="28px"
        display={{ base: "none", sm: "flex" }}
        width={{ base: "70px", md: "110px" }}
        mr={2}
        onClick={() => {}}
      >
        SignUp
      </Button>
    </>
  );
};
export default AuthButtons;
