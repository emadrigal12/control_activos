// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Spacer,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  useDisclosure,
  useToast,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "hooks/AuthContext";

// Styles for the circular progressbar
import userCover from "assets/img/cardimgfree.png";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
// Icons
import { SearchIcon } from "@chakra-ui/icons";
import { BsArrowRight } from "react-icons/bs";
import { FaProjectDiagram } from "react-icons/fa";

import DashboardTableRow from "components/Tables/DashboardTableRow";
import ProyectosProcesados from "components/Tables/ProyectosPocesados";

//Hooks
import useUserData from "hooks/useUserData";
import useFetchData from "hooks/useFetchData";
import { useCreateEntity } from "hooks/useCreateEntity";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast();
  const history = useHistory();

  // Manejo de los permisos de usuario
  const { userRole } = useContext(AuthContext);
  const allowedRoles = [1, 2];
  const isRoleAllowed = allowedRoles.includes(userRole);

  // USO DEL HOOK PARA OBTENER LOS DATOS DEL USUARIO
  const { userData } = useUserData();

  // USO DEL HOOK PARA OBTENER TODOS LOS PROYECTOS
  const { data: projectsData, refetchData } = useFetchData(
    "http://localhost:4000/proyectos"
  );

  const [formData, setFormData] = React.useState({
    Descripcion: "",
    Fecha_Inicio: "",
    Fecha_Fin: "",
  });

  const handleRefetchData = () => {
    refetchData();
  };

  // USO DEL HOOK PARA CREAR UN NUEVO PROYECTO
  const resetForm = () => {
    setFormData((prevData) => ({
      ...prevData,
      Descripcion: "",
      Fecha_Inicio: "",
      Fecha_Fin: "",
    }));
  };

  // Mutación para crear un nuevo proyecto
  const { mutate } = useCreateEntity(resetForm);

  const handleSave = async () => {
    onClose();
    const newProject = {
      ...formData,
      Estado: 1,
    };
    if (
      formData.Descripcion === "" ||
      formData.Fecha_Inicio === "" ||
      formData.Fecha_Fin === ""
    ) {
      toast({
        title: "Campos vacíos",
        description: "Por favor, llena todos los campos",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
      return;
    }
    mutate(
      { data: newProject, url: "http://localhost:4000/proyectos" },
      {
        onSuccess: () => {
          handleRefetchData();
        },
      }
    );
  };

  // Maneja los cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCloseCrearUsuario = () => {
    resetForm(); // Resetear el formulario
    onClose(); // Cerrar el modal
  };

  // Modals
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // Filtrar proyectos según el término de búsqueda
  const filteredProjects = projectsData.filter((project) =>
    project.Descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditProyectClick = () => {};

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Grid templateColumns={{ sm: "1fr" }} my="26px" gap="18px">
        {/* Welcome Card */}
        <Card
          p="0px"
          gridArea={{ md: "1 / 1 / 2 / 3", "2xl": "auto" }}
          bgImage={userCover}
          bgSize="cover"
          bgPosition="50%"
        >
          <CardBody w="100%" h="100%">
            <Flex flexDirection={{ sm: "column", lg: "row" }} w="100%" h="100%">
              <Flex
                flexDirection="column"
                h="100%"
                p="22px"
                minW="60%"
                lineHeight="1.6"
              >
                <Text fontSize="sm" color="gray.400" fontWeight="bold">
                  Bienvenido,
                </Text>
                <Text fontSize="28px" color="#fff" fontWeight="bold" mb="18px">
                  {userData?.Nombre} {userData?.Apellido}
                </Text>
                <Text
                  fontSize="md"
                  color="gray.400"
                  fontWeight="normal"
                  mb="auto"
                >
                  Es un gusto que estés de vuelta! <br />
                </Text>
                <Spacer />
                <Flex align="center">
                  <Button
                    p="0px"
                    variant="no-hover"
                    bg="transparent"
                    onClick={() => history.push("/admin/perfil")}
                    my={{ sm: "1.5rem", lg: "0px" }}
                  >
                    <Text
                      fontSize="sm"
                      color="#fff"
                      fontWeight="bold"
                      cursor="pointer"
                      transition="all .3s ease"
                      my={{ sm: "1.5rem", lg: "0px" }}
                      _hover={{ me: "4px" }}
                    >
                      Ir a tu perfil
                    </Text>
                    <Icon
                      as={BsArrowRight}
                      w="20px"
                      h="20px"
                      color="#fff"
                      fontSize="2xl"
                      transition="all .3s ease"
                      mx=".3rem"
                      cursor="pointer"
                      pt="4px"
                      _hover={{ transform: "translateX(20%)" }}
                    />
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Grid>

      <Grid templateColumns={{ sm: "1fr" }} gap="24px">
        {/* Projects */}
        <Card
          p="16px"
          overflowX={{ sm: "scroll", xl: "hidden" }}
          minHeight={{ sm: "45vh", xl: "55vh" }}
        >
          <CardHeader p="12px 0px 28px 0px">
            <Flex
              direction="row"
              justify="space-between"
              align="center"
              minHeight="60px"
              w="100%"
            >
              <Flex direction="column">
                <Text fontSize="xl" color="#fff" fontWeight="bold" pb="8px">
                  Proyectos
                </Text>

                {/* Input de búsqueda */}
                <Flex align="center" mt={3}>
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
                      placeholder="Buscar proyecto..."
                      borderRadius="inherit"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Flex>
              </Flex>
              {isRoleAllowed && (
                <Button
                  onClick={onOpen}
                  borderRadius="12px"
                  bg="brand.200"
                  _hover={{ opacity: "0.8" }}
                  _active={{ opacity: "0.9" }}
                  me={{ base: "none", lg: "20px" }}
                >
                  <Text fontSize="sm" color="#fff" fontWeight="bold">
                    Crear Proyecto
                  </Text>
                </Button>
              )}
            </Flex>
          </CardHeader>
          {/* Tabs--------------------------------------------------- */}
          <Tabs variant="soft-rounded" colorScheme="orange">
            <TabList>
              <Tab
                fontSize={"15px"}
                mr={"4px"}
                borderBottom={"4px solid #4f4f4f"}
                color={"gray.200"}
                _selected={{
                  bg: "none",
                  color: "brand.200",
                  borderBottom: "4px solid #E99037",
                }}
                _focus={{
                  boxShadow: "none", // Elimina el borde azul por defecto
                }}
              >
                Activos
              </Tab>
              <Tab
                fontSize={"15px"}
                mr={"4px"}
                color={"gray.200"}
                borderBottom={"4px solid #4f4f4f"}
                _selected={{
                  bg: "none",
                  color: "brand.200",
                  borderBottom: "4px solid #E99037",
                }}
                _focus={{
                  boxShadow: "none", // Elimina el borde azul por defecto
                }}
              >
                Finalizados
              </Tab>
              <Tab
                fontSize={"15px"}
                color={"gray.200"}
                borderBottom={"4px solid #4f4f4f"}
                _selected={{
                  bg: "none",
                  color: "brand.200",
                  borderBottom: "4px solid #E99037",
                }}
                _focus={{
                  boxShadow: "none", // Elimina el borde azul por defecto
                }}
              >
                Cancelados
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                {/* -----------------------PROYECTOS ACTIVOS---------------------------- */}
                <Box overflow="auto" maxHeight="450px">
                  <Table variant="simple" color="#fff">
                    <Thead
                      position="sticky"
                      top="0"
                      bg="linear-gradient(to right, #322528 0%,#2b2527 53%,#2b2628 100%)"
                      zIndex="1"
                    >
                      <Tr my=".8rem" ps="0px">
                        <Th
                          ps="0px"
                          color="gray.400"
                          fontFamily="Plus Jakarta Display"
                          borderBottomColor="#56577A"
                        >
                          Nombre
                        </Th>
                        <Th
                          color="gray.400"
                          fontFamily="Plus Jakarta Display"
                          borderBottomColor="#56577A"
                        >
                          Inicio
                        </Th>
                        <Th
                          color="gray.400"
                          fontFamily="Plus Jakarta Display"
                          borderBottomColor="#56577A"
                        >
                          Finalización
                        </Th>
                        <Th
                          color="gray.400"
                          fontFamily="Plus Jakarta Display"
                          borderBottomColor="#56577A"
                        ></Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredProjects.map((row, index, arr) => {
                        if (row.Estado === 1) {
                          return (
                            <DashboardTableRow
                              key={row.Id}
                              Id={row?.Id}
                              Descripcion={row?.Descripcion}
                              logo={FaProjectDiagram}
                              Fecha_Inicio={row.Fecha_Inicio}
                              Fecha_Fin={row.Fecha_Fin}
                              progression={row.progression}
                              lastItem={index === arr.length - 1 ? true : false}
                              onEditClick={() => handleEditProyectClick(row.Id)}
                              onDeleteSuccess={handleRefetchData}
                            />
                          );
                        }
                      })}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>
              <TabPanel>
                {/* -----------------------PROYECTOS FINALIZADOS---------------------------- */}
                <Box overflow="auto" maxHeight="450px">
                  <Table variant="simple" color="#fff">
                    <Thead
                      position="sticky"
                      top="0"
                      bg="linear-gradient(to right, #322528 0%,#2b2527 53%,#2b2628 100%)"
                      zIndex="1"
                    >
                      <Tr my=".8rem" ps="0px">
                        <Th
                          ps="0px"
                          color="gray.400"
                          fontFamily="Plus Jakarta Display"
                          borderBottomColor="#56577A"
                        >
                          Nombre
                        </Th>
                        <Th
                          color="gray.400"
                          fontFamily="Plus Jakarta Display"
                          borderBottomColor="#56577A"
                        >
                          Inicio
                        </Th>
                        <Th
                          color="gray.400"
                          fontFamily="Plus Jakarta Display"
                          borderBottomColor="#56577A"
                        >
                          Finalización
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredProjects.map((row, index, arr) => {
                        if (row.Estado === 2) {
                          return (
                            <ProyectosProcesados
                              key={row.Id}
                              Id={row?.Id}
                              Descripcion={row?.Descripcion}
                              logo={FaProjectDiagram}
                              Fecha_Inicio={row.Fecha_Inicio}
                              Fecha_Fin={row.Fecha_Fin}
                              progression={row.progression}
                              lastItem={index === arr.length - 1 ? true : false}
                              onEditClick={() => handleEditProyectClick(row.Id)}
                              onDeleteSuccess={handleRefetchData}
                            />
                          );
                        }
                      })}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>
              <TabPanel>
                {/* -----------------------PROYECTOS CANCELADOS---------------------------- */}
                <Box overflow="auto" maxHeight="450px">
                  <Table variant="simple" color="#fff">
                    <Thead
                      position="sticky"
                      top="0"
                      bg="linear-gradient(to right, #322528 0%,#2b2527 53%,#2b2628 100%)"
                      zIndex="1"
                    >
                      <Tr my=".8rem" ps="0px">
                        <Th
                          ps="0px"
                          color="gray.400"
                          fontFamily="Plus Jakarta Display"
                          borderBottomColor="#56577A"
                        >
                          Nombre
                        </Th>
                        <Th
                          color="gray.400"
                          fontFamily="Plus Jakarta Display"
                          borderBottomColor="#56577A"
                        >
                          Inicio
                        </Th>
                        <Th
                          color="gray.400"
                          fontFamily="Plus Jakarta Display"
                          borderBottomColor="#56577A"
                        >
                          Finalización
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {filteredProjects.map((row, index, arr) => {
                        if (row.Estado === 3) {
                          return (
                            <ProyectosProcesados
                              key={row.Id}
                              Id={row?.Id}
                              Descripcion={row?.Descripcion}
                              logo={FaProjectDiagram}
                              Fecha_Inicio={row.Fecha_Inicio}
                              Fecha_Fin={row.Fecha_Fin}
                              progression={row.progression}
                              lastItem={index === arr.length - 1 ? true : false}
                              onEditClick={() => handleEditProyectClick(row.Id)}
                              onDeleteSuccess={handleRefetchData}
                            />
                          );
                        }
                      })}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
          {/* Tabs--------------------------------------------------- */}
        </Card>
      </Grid>
      {/* Crear Proyecto Modal */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleCloseCrearUsuario}
      >
        <ModalOverlay />
        <ModalContent
          bg="linear-gradient(90deg, rgba(46,46,46) 42%, rgba(47,47,47) 71%)"
          color="white"
        >
          <ModalHeader>Nuevo Proyecto</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color={"orange.300"}>Descripción</FormLabel>
              <Input
                errorBorderColor="crimson"
                name="Descripcion"
                placeholder="Descripción o nombre del proyecto"
                onChange={handleInputChange}
                value={formData.Descripcion}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"orange.300"}>Fecha de Inicio</FormLabel>
              <Input
                name="Fecha_Inicio"
                size="md"
                type="date"
                textColor="white"
                onChange={handleInputChange}
                value={formData.Fecha_Inicio}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color={"orange.300"}>Fecha de Finalización</FormLabel>
              <Input
                name="Fecha_Fin"
                size="md"
                type="date"
                textColor="white"
                onChange={handleInputChange}
                value={formData.Fecha_Fin}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={handleSave}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
