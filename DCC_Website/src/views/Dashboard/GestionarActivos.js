import React from "react";

// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Input,
  IconButton,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// Icons
import { SearchIcon } from "@chakra-ui/icons";
import activoIco from "assets/img/ActivoIco.jpg";

// Table Components
import TablesTableRow from "components/Tables/TablesTableRow";

// Hooks
import useFetchData from "hooks/useFetchData";

function Tables() {
  const { data, loading, error, refetchData } = useFetchData(
    "http://localhost:4000/articulos"
  );

  const handleDeleteSuccess = (deletedId) => {
    refetchData();
  };

  const handleViewMoreClick = (id) => {
    console.log(`Clicked on item with ID: ${id}`);
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      {/* Authors Table */}
      <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="35px">
        <CardHeader p="6px 0px 22px 0px">
          <Text fontSize="lg" color="#fff" fontWeight="bold">
            Empresa: Banco Promerica
          </Text>
        </CardHeader>
        <Flex align="center" mb={3}>
          <InputGroup
            cursor="pointer"
            bg="#28020F"
            borderRadius="15px"
            borderColor="rgba(226, 232, 240, 0.3)"
            w={{
              sm: "128px",
              md: "200px",
            }}
            me={{ sm: "auto", md: "20px" }}
          >
            <InputLeftElement
              children={
                <IconButton
                  bg="inherit"
                  borderRadius="inherit"
                  _hover="none"
                  _active={{
                    bg: "inherit",
                    transform: "none",
                    borderColor: "transparent",
                  }}
                  _focus={{
                    boxShadow: "none",
                  }}
                  icon={<SearchIcon color="white" w="15px" h="15px" />}
                ></IconButton>
              }
            />
            <Input
              fontSize="xs"
              py="11px"
              color="gray.400"
              placeholder="Buscar activo..."
              borderRadius="inherit"
            />
          </InputGroup>
        </Flex>
        <CardBody overflow="auto" maxHeight="700px">
          <Table variant="simple" color="#fff">
            <Thead
              position="sticky"
              top="0"
              bg="linear-gradient(to right, #2b2628 0%,#2a2626 100%)"
              zIndex="1"
            >
              <Tr my=".8rem" ps="0px" color="gray.400">
                <Th
                  ps="0px"
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Activo
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Ubicación
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  En Uso
                </Th>
                <Th
                  color="gray.400"
                  fontFamily="Plus Jakarta Display"
                  borderBottomColor="#56577A"
                >
                  Estado
                </Th>
                <Th borderBottomColor="#56577A"></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((row, index, arr) => {
                return (
                  <TablesTableRow
                    key={row?.Id}
                    Id={row?.Id}
                    Descripcion={row?.Descripcion}
                    imagen={activoIco}
                    Ubicacion={row?.Ubicacion}
                    En_Uso={row.En_Uso === 1 ? "Ocupado" : "Disponible"}
                    Depreciado={
                      row?.Depreciado === 1 ? "Depreciado" : "Sin Depreciar"
                    }
                    Responsable={`${row?.Responsable} ${row?.Responsable_Apellido}`}
                    Activo_Num={row?.Activo_Num}
                    onViewMoreClick={() => handleViewMoreClick(row.Id)}
                    lastItem={index === arr.length - 1 ? true : false}
                    onDeleteSuccess={handleDeleteSuccess}
                  />
                );
              })}
            </Tbody>
          </Table>
        </CardBody>
      </Card>
    </Flex>
  );
}

export default Tables;
