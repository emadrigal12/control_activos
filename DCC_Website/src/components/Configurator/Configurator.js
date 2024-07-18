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
  Link,
  Switch,
  Text,
  DarkMode,
  LightMode,
  useToast,
} from "@chakra-ui/react";
import GitHubButton from "react-github-btn";
import { Separator } from "components/Separator/Separator";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FaTwitter, FaFacebook } from "react-icons/fa";

// Hooks
import { AuthContext } from "hooks/AuthContext";
import useUserData from "hooks/useUserData";

export default function Configurator(props) {
  // Data from the user
  const { userData } = useUserData();

  const { secondary, isOpen, onClose, fixed, ...rest } = props;
  const [switched, setSwitched] = useState(props.isChecked);

  // Log out function
  const { logout } = React.useContext(AuthContext);
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Sesión cerrada correctamente",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  // Chakra Color Mode
  let fixedDisplay = "flex";
  if (props.secondary) {
    fixedDisplay = "none";
  }
  let colorButton = "white";
  const secondaryButtonColor = "white";
  const settingsRef = React.useRef();
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
                  <Button
                    w="100%"
                    mb="16px"
                    bg="brand.200"
                    color={colorButton}
                    fontSize="xs"
                    variant="brand"
                    px="30px"
                  >
                    Alguna Función
                  </Button>
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
      </Drawer>
    </>
  );
}
Configurator.propTypes = {
  secondary: PropTypes.bool,
  isOpen: PropTypes.func,
  onClose: PropTypes.func,
  fixed: PropTypes.bool,
};
