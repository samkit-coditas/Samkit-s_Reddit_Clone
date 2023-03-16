import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateCommunityModal from "../../modal/createCommunity/createCommunityModal";
import { GrAdd } from "react-icons/gr";
import { useRecoilValue } from "recoil";
import { communityState } from "@/src/atoms/communitiesAtom";
import MenuListItem from "./menuListItem";
import { FaReddit } from "react-icons/fa";
type communitiesProps = {};

const Communities: React.FC<communitiesProps> = () => {
  const [open, setOpen] = useState(false);

  const mySnippets = useRecoilValue(communityState).mySnippets;

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CreateCommunityModal open={open} handleClose={handleClose} />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize={"7pt"} fontWeight={500} color="gray.500">
          MODERATING
        </Text>
        {mySnippets
          .filter((snippet) => snippet.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              icon={FaReddit}
              displayText={`r/${snippet.communityId}`}
              link={`/r/${snippet.communityId}`}
              iconColor="brand.100"
              imageURL={snippet.imageURL}
            />
          ))}
      </Box>
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize={"7pt"} fontWeight={500} color="gray.500">
          MY COMMUNITIES
        </Text>
        <MenuItem
          fontSize={"10pt"}
          width="100%"
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpen(true)}
        >
          <Flex align={"center"}>
            <Icon as={GrAdd} fontSize={20} mr={2} />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={FaReddit}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
};
export default Communities;
