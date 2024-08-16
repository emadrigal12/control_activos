// Chakra imports
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Grid,
  Icon,
  Spacer,
  Stack,
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
  Select,
  useToast,
} from "@chakra-ui/react";

// Styles for the circular progressbar
import userCover from "assets/img/cardimgfree.png";

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";

// Icons
import { MdQueryStats } from "react-icons/md";
import { SearchIcon } from "@chakra-ui/icons";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { FaProjectDiagram } from "react-icons/fa";

import DashboardTableRow from "components/Tables/DashboardTableRow";
import TimelineRow from "components/Tables/TimelineRow";
import React, { useState, useEffect } from "react";

// Data
import {
  lineChartDataDashboard,
  lineChartOptionsDashboard,
} from "variables/charts";
import { dashboardTableData, timelineData } from "variables/general";

//Hooks
import useUserData from "hooks/useUserData";
import useFetchData from "hooks/useFetchData";
import { useCreateEntity } from "hooks/useCreateEntity";

export default function Dashboard() {
  const toast = useToast();
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

  const { mutate, isLoading } = useCreateEntity(resetForm);

  const handleSave = async () => {
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
    onClose();
  };

  // Maneja los cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Modals
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleEditProyectClick = () => {};

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", "2xl": "2fr 1.2fr 1.5fr" }}
        my="26px"
        gap="18px"
      >
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
        {/* Satisfaction Rate */}
        <Card gridArea={{ md: "2 / 1 / 3 / 2", "2xl": "auto" }}>
          <CardHeader mb="24px">
            <Flex direction="column">
              <Text color="#fff" fontSize="lg" fontWeight="bold" mb="4px">
                Tú Actividad
              </Text>
              <Text color="gray.400" fontSize="sm">
                Esta semana
              </Text>
            </Flex>
          </CardHeader>
          <Flex direction="column" justify="center" align="center">
            <Box zIndex="-1">
              <CircularProgress
                size={200}
                value={100}
                thickness={6}
                color="#CC6600"
                variant="vision"
                rounded
              >
                <CircularProgressLabel>
                  <IconBox
                    mb="20px"
                    mx="auto"
                    bg="brand.200"
                    borderRadius="50%"
                    w="48px"
                    h="48px"
                  >
                    <Icon as={MdQueryStats} color="#fff" w="30px" h="30px" />
                  </IconBox>
                </CircularProgressLabel>
              </CircularProgress>
            </Box>
            <Stack
              direction="row"
              spacing={{ sm: "42px", md: "68px" }}
              justify="center"
              maxW={{ sm: "270px", md: "300px", lg: "100%" }}
              mx={{ sm: "auto", md: "0px" }}
              p="18px 65px"
              bg="linear-gradient(126.97deg, rgba(61, 61, 61, 1) 28.26%, rgba(61, 61, 61, 1) 91.2%)"
              borderRadius="20px"
              position="absolute"
              bottom={{ sm: "2%", md: "20%" }}
            >
              <Flex direction="column" align="center" minW="80px">
                <Text color="#fff" fontSize="28px" fontWeight="bold">
                  62
                </Text>
                <Text fontSize="xs" color="white">
                  Activos agregados
                </Text>
              </Flex>
            </Stack>
          </Flex>
        </Card>
        {/* Historial de Activos */}
        <Card p="28px 0px 0px 0px">
          <CardHeader mb="20px" ps="22px">
            <Flex direction="column" alignSelf="flex-start">
              <Text fontSize="lg" color="#fff" fontWeight="bold" mb="6px">
                Historial de Activos
              </Text>
              <Text fontSize="md" fontWeight="medium" color="gray.400">
                Año{" "}
                <Text as="span" color="green.400" fontWeight="bold">
                  2024
                </Text>
              </Text>
            </Flex>
          </CardHeader>
          <Box w="100%" minH={{ sm: "300px" }}>
            <LineChart
              lineChartData={lineChartDataDashboard}
              lineChartOptions={lineChartOptionsDashboard}
            />
          </Box>
        </Card>
      </Grid>

      <Grid
        templateColumns={{ sm: "1fr", md: "1fr 1fr", lg: "2fr 1fr" }}
        gap="24px"
      >
        {/* Projects */}
        <Card p="16px" overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="12px 0px 28px 0px">
            <Flex
              direction="row"
              justify="space-between"
              align="center"
              minHeight="60px"
              w="100%"
            >
              <Flex direction="column">
                <Text fontSize="lg" color="#fff" fontWeight="bold" pb="8px">
                  Proyectos Recientes
                </Text>

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
                    />
                  </InputGroup>
                </Flex>
              </Flex>
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
            </Flex>
          </CardHeader>
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
                {projectsData.map((row, index, arr) => {
                  return (
                    <DashboardTableRow
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
                })}
              </Tbody>
            </Table>
          </Box>
        </Card>
        {/* Activos Recientes */}
        <Card>
          <CardHeader mb="32px">
            <Flex direction="column">
              <Text fontSize="lg" color="#fff" fontWeight="bold" mb="6px">
                Activos Recientes
              </Text>
              <Flex align="center">
                <Icon
                  as={AiFillCheckCircle}
                  color="green.500"
                  w="15px"
                  h="15px"
                  me="5px"
                />
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  <Text fontWeight="bold" as="span" color="gray.400">
                    +36
                  </Text>{" "}
                  este mes.
                </Text>
              </Flex>
            </Flex>
          </CardHeader>
          <CardBody>
            <Flex direction="column" lineHeight="21px">
              {timelineData.map((row, index, arr) => {
                return (
                  <TimelineRow
                    logo={row.logo}
                    title={row.title}
                    date={row.date}
                    color={row.color}
                    index={index}
                    arrLength={arr.length}
                  />
                );
              })}
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      {/* Crear Proyecto Modal */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
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
              <FormLabel>Descripción</FormLabel>
              <Input
                errorBorderColor="crimson"
                name="Descripcion"
                placeholder="Descripción o nombre del proyecto"
                onChange={handleInputChange}
                value={formData.Descripcion}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Fecha de Inicio</FormLabel>
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
              <FormLabel>Fecha de Finalización</FormLabel>
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
