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
  Button,
  Grid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";

// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

// Icons
import { SearchIcon } from "@chakra-ui/icons";
import activoIco from "assets/img/ActivoIco.jpg";
import { FaProjectDiagram } from "react-icons/fa";

// Table Components
import TablesTableRow from "components/Tables/TablesTableRow";
import TableActivosProyecto from "components/Tables/TableActivosProyecto";

// Hooks
import useFetchData from "hooks/useFetchData";

function Tables() {
  const [selectedProject, setSelectedProject] = React.useState(null);
  const [showTable, setShowTable] = React.useState(true);

  const {
    isOpen: isOpenProyectos,
    onOpen: onOpenProyectos,
    onClose: onCloseProyectos,
  } = useDisclosure();

  // Fetch data de todos los artículos
  const { data, loading, refetchData } = useFetchData(
    "http://localhost:4000/articulos"
  );

  // Fetch data de los artículos de un proyecto
  const {
    data: activosProyectoData,
    loading: loadingActivosProyecto,
    refetchData: refetchActivosProyecto,
  } = useFetchData(
    `http://localhost:4000/proyectos/obtener-activos/${selectedProject?.Id}`
  );

  const { data: dataProyectos, loading: loadingProyectos } = useFetchData(
    "http://localhost:4000/proyectos"
  );

  const handleDeleteSuccess = () => {
    refetchData();
    refetchActivosProyecto();
  };

  const handleViewMoreClick = () => {};

  const handleModificarClick = () => {};

  const handleVolver = () => {
    setShowTable(true);
  };

  const handleItemClick = (item) => {
    setSelectedProject(item);
    setShowTable(false);
    onCloseProyectos();
  };

  return (
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      {/* Authors Table */}
      {showTable ? (
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="35px">
          <CardHeader p="6px 0px 22px 0px">
            <Grid
              templateColumns={{
                sm: "1fr",
                md: "1fr 1fr",
              }}
              gap={{ sm: "0px", md: "20px" }}
              alignItems="center"
            >
              <Button
                onClick={onOpenProyectos}
                size="md"
                borderRadius="12px"
                bg="brand.200"
                _hover={{ opacity: "0.8" }}
                _active={{ opacity: "0.9" }}
                me={"50px"}
                mt={{ sm: "10px", md: "0px" }}
              >
                <Text fontSize="md" color="#fff" fontWeight="bold">
                  Seleccionar Proyecto
                </Text>
              </Button>
            </Grid>
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
                    Uso
                  </Th>
                  <Th
                    color="gray.400"
                    fontFamily="Plus Jakarta Display"
                    borderBottomColor="#56577A"
                  >
                    Estado
                  </Th>
                  <Th
                    color="gray.400"
                    fontFamily="Plus Jakarta Display"
                    borderBottomColor="#56577A"
                  >
                    Cantidad
                  </Th>
                  <Th borderBottomColor="#56577A"></Th>
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
                      Cantidad_Total={row?.Cantidad_Total}
                      Depreciado={
                        row?.Depreciado === 1 ? "Depreciado" : "Sin Depreciar"
                      }
                      Responsable={`Responsable: ${row?.Responsable} ${row?.Responsable_Apellido}`}
                      Activo_Num={`Activo #: ${row?.Activo_Num}`}
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
      ) : (
        //OTRA TABLA---------------------------------------------------
        <Card overflowX={{ sm: "scroll", xl: "hidden" }} pb="35px">
          <CardHeader p="6px 0px 22px 0px">
            <Flex
              direction={{ base: "column", md: "row" }} // Alineación en columna en pantallas pequeñas y fila en pantallas grandes
              justifyContent="space-between" // Espacia el contenido a los extremos
              alignItems="center" // Alinea el contenido verticalmente al centro
              w="100%" // Asegura que el Flex ocupe el ancho completo del contenedor
            >
              <Text fontSize="xl" color="#fff" fontWeight="bold">
                Proyecto:{" "}
                <span style={{ color: "#F68A1F" }}>
                  {selectedProject?.Descripcion || "Sin Seleccionar"}
                </span>
              </Text>
              <Button
                onClick={handleVolver}
                size="sm"
                borderRadius="12px"
                colorScheme="orange"
                variant="outline"
                _hover={{ opacity: "0.8" }}
                _active={{ opacity: "0.9" }}
                mt={{ sm: "10px", md: "0px" }}
              >
                <Text fontSize="md" color="#F68A1F" fontWeight="bold">
                  Volver
                </Text>
              </Button>
            </Flex>
          </CardHeader>
          <Flex align="center" mb={3}>
            <Button
              onClick={handleVolver}
              size="md"
              borderRadius="12px"
              bg="brand.300"
              _hover={{ opacity: "0.8" }}
              _active={{ opacity: "0.9" }}
              mt={{ sm: "10px", md: "0px" }}
            >
              <Text fontSize="md" color="white" fontWeight="bold">
                Asignar Activo
              </Text>
            </Button>
          </Flex>
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
                    Uso
                  </Th>
                  <Th
                    color="gray.400"
                    fontFamily="Plus Jakarta Display"
                    borderBottomColor="#56577A"
                  >
                    Estado
                  </Th>
                  <Th
                    color="gray.400"
                    fontFamily="Plus Jakarta Display"
                    borderBottomColor="#56577A"
                  >
                    Cantidad
                  </Th>
                  <Th borderBottomColor="#56577A"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {activosProyectoData.map((row, index, arr) => {
                  return (
                    <TableActivosProyecto
                      key={row?.Id}
                      Id={row?.Id}
                      Descripcion={row?.Descripcion}
                      imagen={activoIco}
                      Ubicacion={row?.Ubicacion}
                      En_Uso={row.En_Uso === 1 ? "Ocupado" : "Disponible"}
                      Cantidad={row?.Cantidad}
                      Depreciado={
                        row?.Depreciado === 1 ? "Depreciado" : "Sin Depreciar"
                      }
                      Responsable={`Responsable: ${row?.Responsable} ${row?.Responsable_Apellido}`}
                      Activo_Num={`Activo #: ${row?.Activo_Num}`}
                      onModificarClick={() =>
                        handleModificarClick(row.Id, row.Cantidad)
                      }
                      lastItem={index === arr.length - 1 ? true : false}
                      onDeleteSuccess={handleDeleteSuccess}
                      selectedProjectId={selectedProject?.Id}
                    />
                  );
                })}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
        //-------------------------------------------------------------
      )}
      {/* Modal para mostrar los proyectos disponibles */}
      <Modal isOpen={isOpenProyectos} onClose={onCloseProyectos}>
        <ModalOverlay />
        <ModalContent
          bg="linear-gradient(90deg, rgba(46,46,46) 42%, rgba(47,47,47) 71%)"
          color="white"
        >
          <ModalHeader>Proyectos Disponibles</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List spacing={3}>
              {dataProyectos.map((project) => (
                <ListItem
                  key={project.id}
                  onClick={() => handleItemClick(project)}
                  cursor="pointer"
                  textColor="white"
                  bg="blackAlpha.500"
                  p={5}
                  borderRadius="md"
                  _hover={{ bg: "blackAlpha.600" }}
                >
                  <ListIcon as={FaProjectDiagram} color="brand.300" />
                  {project.Descripcion}
                </ListItem>
              ))}
            </List>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}

export default Tables;
