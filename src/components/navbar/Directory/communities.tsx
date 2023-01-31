import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import CreateCommunityModal from "../../modal/createCommunity/createCommunityModal";
import { GrAdd } from "react-icons/gr";
type communitiesProps = {};

const Communities: React.FC<communitiesProps> = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CreateCommunityModal open={open} handleClose={handleClose} />
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
    </>
  );
};
export default Communities;
