// Chakra imports
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  DarkMode,
  Flex,
  Grid,
  Icon,
  Image,
  Link,
  Switch,
  Text,
} from "@chakra-ui/react";
import avatar11 from "assets/img/avatars/avatar11.png";
// Images
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import bgProfile from "assets/img/bgProfile.jpg";
import ProjectImage1 from "assets/img/ProjectImage1.png";
import ProjectImage2 from "assets/img/ProjectImage2.png";
import ProjectImage3 from "assets/img/ProjectImage3.png";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
import { CarIcon, FulgerIcon, FulgerWhiteIcon } from "components/Icons/Icons";
import { Separator } from "components/Separator/Separator";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import {
  FaCube,
  FaFacebook,
  FaInstagram,
  FaPencilAlt,
  FaPenFancy,
  FaTwitter,
} from "react-icons/fa";
// Icons
import { IoDocumentsSharp } from "react-icons/io5";
// Data
import {
  lineChartDataProfile1,
  lineChartDataProfile2,
  lineChartOptionsProfile1,
  lineChartOptionsProfile2,
} from "variables/charts";

//Hooks
import useUserData from "hooks/useUserData";

function Profile() {
  const { userData } = useUserData();
  return (
    <Flex direction="column" mt={{ sm: "25px", md: "0px" }}>
      <Box
        mb={{ sm: "24px", md: "50px", xl: "20px" }}
        borderRadius="15px"
        px="0px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        align="center"
      >
        {/* Header */}
        <Card
          direction={{ sm: "column", md: "row" }}
          mx="auto"
          maxH="330px"
          w={{ sm: "90%", xl: "100%" }}
          justifyContent={{ sm: "center", md: "space-between" }}
          align="center"
          p="24px"
          borderRadius="20px"
          mt="100px"
        >
          <Flex align="center" direction={{ sm: "column", md: "row" }}>
            <Flex
              align="center"
              mb={{ sm: "10px", md: "0px" }}
              direction={{ sm: "column", md: "row" }}
              w={{ sm: "100%" }}
              textAlign={{ sm: "center", md: "start" }}
            >
              <Avatar
                me={{ md: "22px" }}
                src={avatar11}
                w="80px"
                h="80px"
                borderRadius="15px"
              >
                <AvatarBadge
                  cursor="pointer"
                  borderRadius="8px"
                  border="transparent"
                  bg="linear-gradient(138.78deg, rgba(6, 11, 40, 0.94) 17.44%, rgba(10, 14, 35, 0.49) 93.55%, rgba(10, 14, 35, 0.69) 93.55%)"
                  boxSize="26px"
                  backdropFilter="blur(120px)"
                >
                  <Icon h="12px" w="12px" color="#fff" as={FaPencilAlt} />
                </AvatarBadge>
              </Avatar>
              <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
                <Text
                  fontSize={{ sm: "lg", lg: "xl" }}
                  color="#fff"
                  fontWeight="bold"
                  ms={{ sm: "8px", md: "0px" }}
                >
                  {userData?.Nombre} {userData?.Apellido}
                </Text>
                <Text fontSize={{ sm: "sm", md: "md" }} color="gray.400">
                  {userData?.Username}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Box>
      <Grid
        templateColumns={{
          sm: "1fr",
          xl: "repeat(2, 1fr)",
          "2xl": "1fr 2fr 1.2fr",
        }}
        gap="22px"
        mb="24px"
      >
        {/* Welcome Card */}
        <Card
          bgImage={bgProfile}
          bgSize="cover"
          maxW={{ sm: "325px", md: "725px", lg: "980px" }}
          h={{ sm: "270px", lg: "350px", xl: "410px" }}
          gridArea={{ xl: "1 / 1 / 2 / 2", "2xl": "auto" }}
        >
          <Flex
            direction="column"
            h="100%"
            bg="rgba(45, 45, 45, 0.5)" // Fondo con efecto frost (blurred)
            backdropFilter="blur(6px)" // Efecto de desenfoque en el fondo
            borderRadius="lg" // Bordes redondeados
            p={4}
          >
            <Text color="#fff" fontSize="30px" fontWeight="bold" mb="3px">
              Transformando desafíos en oportunidades
            </Text>
            <Text color="#fff" fontSize="sm" mb="auto">
              DCC Contabilidad, Activos & Consultoría
            </Text>
            <Link href="https://dcccr.com/" target="_blank">
              <Button
                alignSelf="flex-start"
                variant="no-hover"
                bg="transparent"
                p="0px"
              >
                <Text
                  fontSize="xs"
                  color="#fff"
                  me="5px"
                  cursor="pointer"
                  transition="all .3s ease"
                  _hover={{ me: "6px" }}
                >
                  Visitar sitio web
                </Text>

                <Icon
                  as={BsArrowRight}
                  w="13px"
                  h="13px"
                  color="#fff"
                  transition="all .3s ease"
                  cursor="pointer"
                  _hover={{ transform: "translateX(20%)" }}
                />
              </Button>
            </Link>
          </Flex>
        </Card>

        {/* Profile Information */}
        <Card
          p="16px"
          maxH={{ md: "410px" }}
          maxW={{ sm: "325px", md: "725px", lg: "980px" }}
          gridArea={{ xl: "1 / 2 / 2 / 3", "2xl": "auto" }}
        >
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color="#fff" fontWeight="bold">
              Información del Perfil
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              <Separator mb="30px" />
              <Flex align="center" mb="18px">
                <Text fontSize="sm" color={"gray.400"} me="10px">
                  Nombre:{" "}
                </Text>
                <Text fontSize="sm" color="#fff" fontWeight="400">
                  {userData?.Nombre}
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text fontSize="sm" color={"gray.400"} me="10px">
                  Apellido:{" "}
                </Text>
                <Text fontSize="sm" color="#fff" fontWeight="400">
                  {userData?.Apellido}
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text fontSize="sm" color={"gray.400"} me="10px">
                  Teléfono:{" "}
                </Text>
                <Text fontSize="sm" color="#fff" fontWeight="400">
                  (+506) 4567-8901
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text fontSize="sm" color={"gray.400"} me="10px">
                  Email:{" "}
                </Text>
                <Text fontSize="sm" color="#fff" fontWeight="400">
                  {userData?.Username}
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text fontSize="sm" color={"gray.400"} me="10px">
                  Provincia:{" "}
                </Text>
                <Text fontSize="sm" color="#fff" fontWeight="400">
                  San José
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <DarkMode>
          {/* Platform Settings */}
          <Card p="16px">
            <CardHeader p="12px 5px" mb="12px">
              <Text fontSize="lg" color="#fff" fontWeight="bold">
                Mis Preferencias
              </Text>
            </CardHeader>
            <CardBody px="5px">
              <Flex direction="column">
                <Text fontSize="10px" color={"gray.400"} mb="15px">
                  CUENTA
                </Text>

                <Flex align="center" mb="20px">
                  <Switch colorScheme="brand" me="10px" />
                  <Text
                    noOfLines={1}
                    fontSize="sm"
                    color={"gray.400"}
                    fontWeight="400"
                  >
                    Recibir un correo electrónico cuando alguien me mencione
                  </Text>
                </Flex>
                <Flex align="center" mb="20px">
                  <Switch colorScheme="brand" me="10px" defaultChecked />
                  <Text
                    noOfLines={1}
                    fontSize="sm"
                    color={"gray.400"}
                    fontWeight="400"
                  >
                    Recibir un correo electrónico sobre mis actividades
                  </Text>
                </Flex>
                <Text fontSize="10px" color={"gray.400"} m="6px 0px 20px 0px">
                  APLICACIÓN
                </Text>
                <Flex align="center" mb="20px">
                  <Switch colorScheme="brand" me="10px" />
                  <Text
                    noOfLines={1}
                    fontSize="sm"
                    color={"gray.400"}
                    fontWeight="400"
                  >
                    Nuevos proyectos creados
                  </Text>
                </Flex>
                <Flex align="center" mb="20px">
                  <Switch colorScheme="brand" me="10px" defaultChecked />
                  <Text
                    noOfLines={1}
                    fontSize="sm"
                    color={"gray.400"}
                    fontWeight="400"
                  >
                    Cambios en la aplicación
                  </Text>
                </Flex>
                <Flex align="center" mb="20px">
                  <Switch colorScheme="brand" me="10px" />
                  <Text
                    noOfLines={1}
                    fontSize="sm"
                    color={"gray.400"}
                    fontWeight="400"
                  >
                    Subscribirse al boletín informativo
                  </Text>
                </Flex>
                <Flex align="center" mb="20px">
                  <Switch colorScheme="brand" me="10px" defaultChecked />
                  <Text
                    noOfLines={1}
                    fontSize="sm"
                    color={"gray.400"}
                    fontWeight="400"
                  >
                    Recibir correos semanales
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>
        </DarkMode>
      </Grid>
      <Grid templateColumns={{ sm: "1fr", xl: "0fr 0fr" }} gap="0px">
        {/* Projects */}
        <Card gridArea={{ xl: "1 /2 /2/ 5" }} p="16px">
          <CardHeader p="12px 5px" mb="12px">
            <Flex direction="column">
              <Text fontSize="lg" color="#fff" fontWeight="bold">
                Tus Proyectos Recientes
              </Text>
              <Text fontSize="sm" color={"gray.400"} fontWeight="400">
                Proyectos en los que has trabajado
              </Text>
            </Flex>
          </CardHeader>
          <CardBody px="5px">
            <Grid
              templateColumns={{
                sm: "1fr",
                md: "1fr 1fr",
                xl: "repeat(3, 1fr)",
              }}
              templateRows={{
                sm: "1fr 1fr 1fr auto",
                md: "1fr 1fr",
                xl: "1fr",
              }}
              gap="50px"
            >
              <Flex direction="column">
                <Box mb="20px" position="relative" borderRadius="20px">
                  <Image
                    src={ProjectImage1}
                    borderRadius="20px"
                    w={450}
                    h={250}
                    objectFit="cover"
                  />
                </Box>
                <Flex direction="column">
                  <Text fontSize="10px" color={"gray.400"} mb="10px">
                    Proyecto #1
                  </Text>
                  <Text fontSize="xl" color="#fff" fontWeight="bold" mb="10px">
                    Microsoft
                  </Text>
                  <Flex justifyContent="space-between" mt="auto" pt={2}>
                    <Button
                      variant="outlineWhite"
                      minW="110px"
                      h="36px"
                      fontSize="10px"
                      px="1.5rem"
                    >
                      VER TODOS
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
              <Flex direction="column">
                <Box mb="20px" position="relative" borderRadius="20px">
                  <Image
                    src={ProjectImage2}
                    borderRadius="20px"
                    w={450}
                    h={250}
                    objectFit="cover"
                  />
                </Box>
                <Flex direction="column">
                  <Text fontSize="10px" color={"gray.400"} mb="10px">
                    Project #2
                  </Text>
                  <Text fontSize="xl" color="#fff" fontWeight="bold" mb="10px">
                    BRIDGESTONE
                  </Text>
                </Flex>
              </Flex>
              <Flex direction="column" h="100%">
                <Box mb="20px" position="relative" borderRadius="20px">
                  <Image
                    src={ProjectImage3}
                    borderRadius="20px"
                    w={450}
                    h={250}
                    objectFit="cover"
                  />
                </Box>
                <Flex direction="column">
                  <Text fontSize="10px" color={"gray.400"} mb="10px">
                    Project #3
                  </Text>
                  <Text fontSize="xl" color="#fff" fontWeight="bold" mb="10px">
                    Grupo ICE
                  </Text>
                </Flex>
              </Flex>
            </Grid>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Profile;
