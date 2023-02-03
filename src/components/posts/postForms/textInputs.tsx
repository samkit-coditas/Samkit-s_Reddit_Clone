import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import React from "react";

type textInputsProps = {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
};

const TextInputs: React.FC<textInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
        _placeholder={{ color: "gray.500" }}
        _focus={{ outline: "none", bg: "white", border: "1px solid black" }}
      />
      <Textarea
        name="body"
        value={textInputs.body}
        onChange={onChange}
        fontSize="10pt"
        height={"100px"}
        borderRadius={4}
        placeholder="Text(Optional)"
        _placeholder={{ color: "gray.500" }}
        _focus={{ outline: "none", bg: "white", border: "1px solid black" }}
      />
      <Flex justify="flex-end">
        <Button
          height="34px"
          padding="0px 30px"
          variant={!textInputs.title ? "unstyled" : "solid"}
          isLoading={loading}
          onClick={!textInputs.title ? () => {} : handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;
