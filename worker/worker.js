const axios = require("axios");


const CLIENT_ID =
    "moviehub-worker";

const CLIENT_SECRET =
    "3zkX6fVGJESWvl7GSTwie82WGrcFGwzd";



async function getToken() {

    const response =
        await axios.post(
            "http://localhost:8080/realms/moviehub/protocol/openid-connect/token",

            new URLSearchParams({

                grant_type:
                    "client_credentials",

                client_id:
                CLIENT_ID,

                client_secret:
                CLIENT_SECRET

            }),

            {
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                }
            }
        );


    return response.data.access_token;

}



async function main() {

    const token =
        await getToken();



    const movies =
        await axios.get(
            "http://localhost:3000/movies",
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );



    console.log(
        "Raport filmów"
    );



    console.table(
        movies.data
    );

}


main();