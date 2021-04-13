import DaumPostcode from "react-daum-postcode";
import { useState } from "react";
import styled, { css } from "styled-components";
// import { MobXProviderContext } from "mobx-react";

// function useStores() {
//   return React.useContext(MobXProviderContext);
// }

function Postcode() {
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
    console.log(isAddress);
    // setIsPostOpen(false);
  };

  return (
    <>
      asd
      <DaumPostcode style={postCodeStyle} onComplete={handleComplete} />
    </>
  );
}

const postCodeStyle = {
  display: "block",
  position: "absolute",
  top: "50%",
  width: "400px",
  height: "500px",
  padding: "7px",
  border: "2px solid gray",
};
// const postCodeStyle = styled.div`
//     display: block
//     position: absolute
//     top: 50%
//     width: 400px
//     height: 500px
//     padding: 7px
// `;
export default Postcode;
