import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import keycloak from "./keycloak";

keycloak
    .init({
        onLoad: "login-required"
    })
    .then(() => {

        ReactDOM.createRoot(
            document.getElementById("root")
        ).render(
            <App keycloak={keycloak}/>
        );

    });