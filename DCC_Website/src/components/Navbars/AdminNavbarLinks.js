// Chakra Icons
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
// Chakra Imports
import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
// Assets
import avatar1 from "assets/img/avatars/avatar1.png";
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
// Custom Icons
import { ProfileIcon, SettingsIcon } from "components/Icons/Icons";
// Custom Components
import { ItemContent } from "components/Menu/ItemContent";
import { SidebarResponsive } from "components/Sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
import routes from "routes.js";

export default function HeaderLinks(props) {
  const { variant, children, fixed, secondary, onOpen, ...rest } = props;

  // Chakra Color Mode
  let inputBg = "#28020F";
  let mainText = "gray.400";
  let navbarIcon = "white";
  let searchIcon = "white";

  if (secondary) {
    navbarIcon = "white";
    mainText = "white";
  }
  const settingsRef = React.useRef();
  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
    >
      <SidebarResponsive
        iconColor="gray.500"
        logoText={props.logoText}
        secondary={props.secondary}
        routes={routes}
        // logo={logo}
        {...rest}
      />
      <SettingsIcon
        cursor="pointer"
        ms={{ base: "16px", xl: "0px" }}
        me="16px"
        ref={settingsRef}
        onClick={props.onOpen}
        color={navbarIcon}
        w="18px"
        h="18px"
      />
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
