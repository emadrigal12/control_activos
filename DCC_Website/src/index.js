import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { AuthProvider } from "hooks/AuthContext";
import ProtectedRoute from "components/ProtectedRoute.js";
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <HashRouter>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <ProtectedRoute path={`/admin`} component={AdminLayout} />
          <Redirect from={`/`} to="/auth/signin" />
        </Switch>
      </HashRouter>
    </AuthProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);
