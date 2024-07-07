// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

// Assets
import signInImage from "assets/img/signInImage.jpg";
import logo from "assets/img/logo-no-text.png";

// Custom Components
import GradientBorder from "components/GradientBorder/GradientBorder";

// Custom hooks
import useSignIn from "hooks/useSignIn";

function SignIn() {
  // Sign In form values
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    generalError,
    handleSignIn,
  } = useSignIn();

  const titleColor = "white";

  return (
    <Flex position="relative">
      <Flex
        minH="100vh"
        h={{ base: "120vh", lg: "fit-content" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        pt={{ sm: "100px", md: "0px" }}
        flexDirection="column"
        me={{ base: "auto", lg: "50px", xl: "auto" }}
      >
        <Flex
          alignItems="center"
          justifyContent="start"
          style={{ userSelect: "none" }}
          mx={{ base: "auto", lg: "unset" }}
          ms={{ base: "auto", lg: "auto" }}
          w={{ base: "100%", md: "50%", lg: "450px" }}
          px="50px"
        >
          <Flex
            direction="column"
            w="100%"
            background="transparent"
            mt={{ base: "50px", md: "150px", lg: "160px", xl: "245px" }}
            mb={{ base: "60px", lg: "95px" }}
          >
            <Heading color={titleColor} fontSize="36px" mb="10px">
              Bienvenido!
            </Heading>
            <Text
              mb="36px"
              ms="4px"
              color="white"
              fontWeight="normal"
              fontSize="14px"
            >
              Ingresa tu correo y contraseña para acceder a tu cuenta.
            </Text>
            <FormControl>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="normal"
                color="white"
              >
                Correo
              </FormLabel>
              <GradientBorder
                mb="2px"
                w={{ base: "100%", lg: "fit-content" }}
                borderRadius="20px"
              >
                <Input
                  color="white"
                  bg="rgb(255, 115, 54)"
                  border="transparent"
                  borderRadius="20px"
                  fontSize="sm"
                  size="lg"
                  w={{ base: "100%", md: "346px" }}
                  maxW="100%"
                  h="46px"
                  placeholder="Tu correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </GradientBorder>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Alert
                  status="error"
                  borderRadius={7}
                  mb="24px"
                  p={1}
                  fontSize={14}
                  maxW={300}
                  display={emailError ? "flex" : "none"}
                >
                  <AlertIcon />
                  {emailError}
                </Alert>
              </Box>
            </FormControl>
            <FormControl>
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="normal"
                color="white"
              >
                Contraseña
              </FormLabel>
              <GradientBorder
                mb="2px"
                w={{ base: "100%", lg: "fit-content" }}
                borderRadius="20px"
              >
                <Input
                  color="white"
                  bg="rgb(255, 115, 54)"
                  border="transparent"
                  borderRadius="20px"
                  fontSize="sm"
                  size="lg"
                  w={{ base: "100%", md: "346px" }}
                  maxW="100%"
                  type="password"
                  placeholder="Tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </GradientBorder>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Alert
                  status="error"
                  borderRadius={7}
                  mb="24px"
                  p={1}
                  fontSize={14}
                  maxW={300}
                  display={passwordError ? "flex" : "none"}
                >
                  <AlertIcon />
                  {passwordError}
                </Alert>
              </Box>
              {/* Error si los credenciales son incorrectos */}
              <Box display="flex" justifyContent="center" alignItems="center">
                <Alert
                  status="error"
                  borderRadius={7}
                  mb="10px"
                  p={2}
                  fontSize={14}
                  maxW={500}
                  display={generalError ? "flex" : "none"}
                >
                  <AlertIcon />
                  <AlertTitle>Credenciales Inválidos</AlertTitle>
                  <AlertDescription>{generalError}</AlertDescription>
                </Alert>
              </Box>
            </FormControl>
            <Button
              variant="brand"
              fontSize="14px"
              type="submit"
              w="100%"
              maxW="350px"
              h="45"
              mb="20px"
              mt="20px"
              onClick={handleSignIn}
            >
              INGRESAR
            </Button>
          </Flex>
        </Flex>
        <Box
          display={{ base: "none", lg: "block" }}
          overflowX="hidden"
          h="100%"
          maxW={{ md: "50vw", lg: "50vw" }}
          minH="100vh"
          w="960px"
          position="absolute"
          left="0px"
        >
          <Box
            bgImage={signInImage}
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
            position="absolute"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="rgba(0, 0, 0, 0.2)"
              backdropFilter="blur(5px)"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={8}
              >
                <Image src={logo} alt="logo" />
              </Box>
              <Text
                color="white"
                letterSpacing="8px"
                fontSize="36px"
                fontWeight="bold"
              >
                CONTABILIDAD, ACTIVOS & CONSULTORÍA
              </Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
