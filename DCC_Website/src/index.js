import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Redirect from={`/`} to="/admin/inicio" />
      </Switch>
    </HashRouter>
  </QueryClientProvider>,
  document.getElementById("root")
);
