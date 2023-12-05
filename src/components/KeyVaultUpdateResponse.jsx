import React from "react";
/**
 * Renders information about the user obtained from MS Graph 
 * @param props
 */
export const KeyVaultUpdateResponse = (props) => {
  return (
    <div id="profile-div">
      <p>
        <strong>Status: </strong> {props.updateResponse}
      </p>
    </div>
  );
};