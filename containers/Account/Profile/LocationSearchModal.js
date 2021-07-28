import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import * as AccountAPI from "axios/Account/Account";
import DaumPostcode from "react-daum-postcode";
import * as Text from "components/Text";

@inject("Auth", "Answer", "Profile")
@observer
class LocationSearchModal extends React.Component {
  handleComplete = async (data) => {
    const { Profile, closeModal } = this.props;
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

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    Profile.LocationAddress = fullAddress;
    Profile.locationModalActive = false;
    // await closeModal();
  };

  render() {
    return (
      <Container>
        <PostBox
          onComplete={this.handleComplete}
          // style={postCodeStyle}
          height={700}
          autoClose
          width={700}
          //   height={height}
          style={modalStyle}
        />
      </Container>
    );
  }
}

export default LocationSearchModal;

const modalStyle = {
  zIndex: "100",
  border: "1px solid #000000",
  overflow: "hidden",
  width: "800px",
  height: "333px",
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const PostBox = styled(DaumPostcode)`
  .info_body {
    border: 3px solid red;
  }
`;
