import DaumPostcode from "react-daum-postcode";
import { useState } from "react";
import styled, { css } from "styled-components";
import { MobXProviderContext } from "mobx-react";

function useStores() {
  return React.useContext(MobXProviderContext);
}

function Postcode() {
  const [isAddress, setIsAddress] = useState("");
  const [isZoneCode, setIsZoneCode] = useState();

  const { Payment } = useStores();
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
    Payment.address = fullAddress;
    Payment.zipCode = data.zonecode;
    console.log(isAddress);
    Payment.modalActive = false;

    // setIsPostOpen(false);
  };

  return (
    <DaumPostcode style={postCodeStyle} autoclose onComplete={handleComplete} />
  );
}

const postCodeStyle = {
  display: "block",
  position: "absolute",
  top: "25%",
  left: "40%",
  width: "400px",
  height: "500px",
  // padding: "7px",
  border: "2px solid gray",
  // zIndex: "100",
};
export default Postcode;
