// chakra imports
import { Box, ChakraProvider } from "@chakra-ui/react";
// core components
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
import theme from "theme/themeAuth.js";
import Dashboard from "./Admin";

export default function Pages(props) {
  const { ...rest } = props;

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/auth") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";

  return (
    <ChakraProvider theme={theme} resetCss={false} w="100%">
      <Box w="100%">
        <Switch>
          {getRoutes(routes)}
          <Redirect from="/auth" to="/auth/inicio" component={Dashboard} />
        </Switch>
      </Box>
    </ChakraProvider>
  );
}
