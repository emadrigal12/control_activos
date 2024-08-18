// Chakra Imports
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Text,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Separator } from "components/Separator/Separator";
import PropTypes from "prop-types";
import React, { useState, useContext } from "react";

// Hooks
import { AuthContext } from "hooks/AuthContext";
import useUserData from "hooks/useUserData";
import { useCreateEntity } from "hooks/useCreateEntity";

export default function Configurator(props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isFirstSubmit, setIsFirstSubmit] = useState(true);

  // Data from the user
  const { userData } = useUserData();

  // Manejo de los permisos de usuario
  const { userRole } = useContext(AuthContext);
  const allowedRoles = [1];
  const isRoleAllowed = allowedRoles.includes(userRole);

  const { secondary, isOpen, onClose, fixed, ...rest } = props;

  // Log out function
  const { logout } = React.useContext(AuthContext);
  const toast = useToast();

  // Inicializar el formulario
  const [formData, setFormData] = React.useState({
    Username: "",
    Password: "",
    Nombre: "",
    Apellido: "",
    Rol_Id: "",
  });

  // Resetear el formulario
  const resetForm = () => {
    setFormData({
      Username: "",
      Password: "",
      Nombre: "",
      Apellido: "",
      Rol_Id: "",
      Estado: "A",
    });
    setEmail("");
    setEmailError("");
  };

  // Hook Formulario de creación de usuario
  const { mutate } = useCreateEntity(resetForm);

  // Validar el correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Maneja los cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      if (!isFirstSubmit) {
        // Validar solo después del primer envío
        if (validateEmail(value)) {
          setEmailError("");
        } else {
          setEmailError("Formato inválido. Ej: usuario@email.com");
        }
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // handleSave para crear un nuevo usuario
  const handleSave = async () => {
    setIsFirstSubmit(false);
    formData.Username = email;
    const newUser = {
      ...formData,
      Username: email,
    };
    console.log(newUser);
    if (
      formData.Username === "" ||
      formData.Password === "" ||
      formData.Nombre === "" ||
      formData.Apellido === "" ||
      formData.Rol_Id === "" ||
      email === "" ||
      !validateEmail(email)
    ) {
      setEmailError("Formato inválido. Ej: usuario@email.commmm");
      toast({
        title: "Campos vacíos",
        description: "Por favor, llena todos los campos",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
      return;
    }
    onCloseCrearUsuario(); // Cerrar el modal
    mutate(
      { data: newUser, url: "http://localhost:4000/usuarios" },
      {
        onSuccess: () => {
          handleCloseCrearUsuario();
        },
      }
    );
  };

  // Log out
  const handleLogout = () => {
    logout();
    toast({
      title: "Sesión cerrada correctamente",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Crear usuario
  const handleCrearUsuario = () => {
    onOpenCrearUsuario();
  };

  // Chakra Color Mode
  let fixedDisplay = "flex";
  if (props.secondary) {
    fixedDisplay = "none";
  }
  let colorButton = "white";
  const secondaryButtonColor = "white";
  const settingsRef = React.useRef();

  const handleCloseCrearUsuario = () => {
    resetForm(); // Resetear el formulario
  };

  // Modals
  const {
    isOpen: isOpenCrearUsuario,
    onOpen: onOpenCrearUsuario,
    onClose: onCloseCrearUsuario,
  } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement={document.documentElement.dir === "rtl" ? "left" : "right"}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}
      >
        <DrawerContent
          bg="linear-gradient(127.09deg, rgba(40, 40, 40, 0.94) 19.41%, rgba(60, 60, 60, 0.49) 76.65%)"
          backdropFilter="blur(42px)"
        >
          <DrawerHeader pt="24px" px="24px">
            <DrawerCloseButton color="white" />
            <Text color="white" fontSize="xl" fontWeight="bold" mt="16px">
              {userData?.Nombre} {userData?.Apellido}
            </Text>
            <Separator />
          </DrawerHeader>
          <DrawerBody w="340px" ps="24px" pe="40px">
            <Flex flexDirection="column">
              <Box>
                <Box>
                  {isRoleAllowed && (
                    <Button
                      w="100%"
                      mb="16px"
                      bg="brand.200"
                      color={colorButton}
                      fontSize="xs"
                      variant="brand"
                      px="30px"
                      onClick={handleCrearUsuario}
                    >
                      Crear Usuario
                    </Button>
                  )}

                  <Button
                    onClick={handleLogout}
                    w="100%"
                    color={secondaryButtonColor}
                    fontSize="xs"
                    variant="outlineWhite"
                    px="20px"
                    mb="16px"
                  >
                    <Text textDecorationColor="none">Cerrar sesión</Text>
                  </Button>
                </Box>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
        {/* Crear Proyecto Modal */}
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpenCrearUsuario}
          onClose={handleCloseCrearUsuario}
        >
          <ModalOverlay />
          <ModalContent
            bg="linear-gradient(90deg, rgba(46,46,46) 42%, rgba(47,47,47) 71%)"
            color="white"
          >
            <ModalHeader>Nuevo Usuario</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl isInvalid={!!emailError}>
                <FormLabel>Correo Electrónico</FormLabel>
                <Input
                  errorBorderColor="crimson"
                  name="email"
                  value={email}
                  placeholder="Ingrese un correo electrónico"
                  onChange={handleInputChange}
                />
                <FormErrorMessage>{emailError}</FormErrorMessage>
              </FormControl>
              <FormControl mt={"15px"}>
                <FormLabel>Contraseña</FormLabel>
                <Input
                  errorBorderColor="crimson"
                  name="Password"
                  placeholder="Ingrese una contraseña"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={"15px"}>
                <FormLabel>Nombre</FormLabel>
                <Input
                  errorBorderColor="crimson"
                  name="Nombre"
                  placeholder="Ingrese un correo electrónico"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={"15px"}>
                <FormLabel>Apellidos</FormLabel>
                <Input
                  errorBorderColor="crimson"
                  name="Apellido"
                  placeholder="Ingrese un correo electrónico"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={"15px"}>
                <FormLabel>Tipo de Usuario</FormLabel>
                <Select
                  placeholder="Seleccione un Tipo de Usuario"
                  name="Rol_Id"
                  onChange={handleInputChange}
                >
                  <option value="1" style={{ color: "black" }}>
                    Administrador
                  </option>
                  <option value="2" style={{ color: "black" }}>
                    Supervisor
                  </option>
                  <option value="3" style={{ color: "black" }}>
                    Operador
                  </option>
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="brand" mr={3} onClick={handleSave}>
                Guardar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Drawer>
    </>
  );
}
Configurator.propTypes = {
  secondary: PropTypes.bool,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  fixed: PropTypes.bool,
};
