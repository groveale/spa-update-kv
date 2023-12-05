import { keyVaultConfig } from "./authConfig";

export async function getKVSecretFunction() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    // body with refreshToken parameter
    const body = {
        secretKey: keyVaultConfig.secretKey
    };

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    };

    return fetch(keyVaultConfig.getSecretDetailsEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}

export async function updateKVSecretFunction(refreshToken) {
    
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Access-Control-Allow-Origin", "*");

    // body with refreshToken parameter
    const body = {
        refreshToken: refreshToken
    };

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    };

    return fetch(keyVaultConfig.updateSecretDetailsEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}