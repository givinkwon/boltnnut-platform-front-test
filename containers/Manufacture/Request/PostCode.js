import DaumPostcode from "react-daum-postcode";
import { useState } from "react";
import styled, { css } from "styled-components";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";
import React from "react";
import Payment from "stores/Payment";

const Postcode = (observer) => {
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setIsZoneCode(data.zonecode);
    setIsAddress(fullAddress);
    Payment.modalActive = false;
    Payment.address = fullAddress;
    Payment.zipCode = data.zonecode;
  };

  return (
    <DaumPostcode style={postCodeStyle} autoclose onComplete={handleComplete} />
  );
};

const postCodeStyle = {
  display: "block",
  position: "absolute",
  top: "25%",
  left: "40%",
  width: "400px",
  height: "500px",
  border: "2px solid gray",
};
export default Postcode;
