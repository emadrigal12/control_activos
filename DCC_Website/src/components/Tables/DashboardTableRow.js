import {
  Avatar,
  AvatarGroup,
  Flex,
  Icon,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import React from "react";

function DashboardTableRow(props) {
  const { logo, name, members, budget, progression, lastItem } = props;
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Tr>
      <Td
        minWidth={{ sm: "250px" }}
        ps="0px"
        borderBottomColor="#56577A"
        border={lastItem ? "none" : null}
      >
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Icon as={logo} h={"24px"} w={"24px"} me="18px" />
          <Text fontSize="sm" color="#fff" fontWeight="normal" minWidth="100%">
            {name}
          </Text>
        </Flex>
      </Td>

      <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
        <AvatarGroup size="xs" showBorder={false}>
          {members.map((member) => {
            return (
              <Avatar
                name="Ryan Florence"
                src={member}
                showBorder={false}
                border="none"
                _hover={{ zIndex: "3", cursor: "pointer" }}
              />
            );
          })}
        </AvatarGroup>
      </Td>
      <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
        <Text fontSize="sm" color="#fff" fontWeight="bold" pb=".5rem">
          {budget}
        </Text>
      </Td>
      <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
        <Flex direction="column">
          <Button
            p="0px"
            colorScheme="orange"
            size="sm"
            direction="row"
            align="center"
            maxW={"100px"}
            variant="outline"
            spacing={4}
            _hover={{ opacity: "0.8" }}
            _active={{ opacity: "0.9" }}
          >
            Seleccionar
          </Button>
        </Flex>
      </Td>
      <Td borderBottomColor="#56577A" border={lastItem ? "none" : null}>
        <Flex direction="column">
          <Button p="0px" bg="transparent" variant="no-hover">
            <Text
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              cursor="pointer"
            >
              Editar
            </Text>
          </Button>
        </Flex>
      </Td>
    </Tr>
  );
}

export default DashboardTableRow;
