import React, { useState } from 'react';

import { PageLayout } from './components/PageLayout';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import { ProfileData } from './components/ProfileData';

import { getKVSecretFunction, updateKVSecretFunction } from './keyVault';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';

import './App.css';

import Button from 'react-bootstrap/Button';
import { KeyVaultData } from './components/KeyVaultData';
import { KeyVaultUpdateResponse } from './components/KeyVaultUpdateResponse';

  /**
* Renders information about the signed-in user or a button to retrieve data about the user
*/
const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);
    const [kvData, setKeyVaultData] = useState(null);
    const [updateResponse, setKeyVaultUpdateStatus] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => setGraphData(response));
            });
    }

    function RequestKeyVaultData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        getKVSecretFunction().then((response) => setKeyVaultData(response));
    }

    function UpdateKeyVaultData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                updateKVSecretFunction(response.accessToken).then((response) => setKeyVaultUpdateStatus(response));
            });
    }


    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            <br/>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button variant="secondary" onClick={RequestProfileData}>
                    Request Profile Information
                </Button>
            )}
            <br/>
            {kvData ? (
                <KeyVaultData kvData={kvData} />
            ) : (
                <Button variant="secondary" onClick={RequestKeyVaultData}>
                    Request Secret Data From KV
                </Button>
            )}
            <br/>
            {updateResponse ? (
                <KeyVaultUpdateResponse updateResponse={updateResponse} />
            ) : (
                <Button variant="secondary" onClick={UpdateKeyVaultData}>
                    Update RefreshToken In KV
                </Button>
            )}
        </>
    );
};


/**
* If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
*/
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5>
                    <center>
                        Please sign-in to see your profile information.
                    </center>
                </h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <center>
                <MainContent />
            </center>
        </PageLayout>
    );
}