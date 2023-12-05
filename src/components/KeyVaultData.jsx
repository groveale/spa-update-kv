import React from "react";
/**
 * Renders information about the user obtained from MS Graph 
 * @param props
 */
export const KeyVaultData = (props) => {
  return (
    <div id="profile-div">
      <p>
        <strong>Secret Name: </strong> {props.kvData.name}
      </p>
      <p>
        <strong>Secret Value: </strong> {props.kvData.value}
      </p>
      <p>
        <strong>Last Modified: </strong> {props.kvData.properties.updatedOn}
      </p>
      <p>
        <strong>Id: </strong> {props.kvData.id}
      </p>
    </div>
  );
};