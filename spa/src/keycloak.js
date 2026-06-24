import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
    url: "http://localhost:8080",
    realm: "moviehub",
    clientId: "moviehub-react"
});

export default keycloak;