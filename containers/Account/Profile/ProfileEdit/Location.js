import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import LocationSearchModal from "./LocationSearchModal";
import * as Text from "components/Text";

@inject("Auth", "Answer", "Profile")
@observer
class Location extends React.Component {
  state = {
    modalActive: false,
  };

  openModal = () => {
    const { Profile } = this.props;
    console.log("open click");

    Profile.locationModalActive = true;
  };
  closeModal = () => {
    const { Profile } = this.props;
    console.log("close click");
    Profile.locationModalActive = false;
  };

  handleComplete = (data) => {
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
  };

  render() {
    const { region, width, Profile } = this.props;

    return (
      <Container>
        <Header>
          <Name>위치</Name>

          <Button onClick={() => (Profile.locationModalActive = true)}>
            주소 검색
          </Button>
        </Header>
        <Main>
          <span>도로명주소</span>
          <div>
            <span>{Profile.region}</span>
          </div>
          {/* <button onClick={this.onSubmitHandler}>입력</button> */}
        </Main>
        {Profile.locationModalActive && (
          <Layer>
            {/* <Postcode /> */}
            <span>
              <LocationSearchModal
                width={width}
                open={this.openModal}
                close={this.closeModal}
                header=""
              />
            </span>
          </Layer>
        )}
      </Container>
    );
  }
}

export default Location;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  margin-top: 100px;
  margin-bottom: 120px;
`;

const Name = styled.div`
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.6px;
  color: #414550;
  font-weight: bold;
  margin-right: 12px;
`;

const Button = styled.button`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.45px;
  color: #0933b3;
  font-weight: 600;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
    border-radius: 3px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e2e4;
  margin-bottom: 20px;
`;
const Main = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  > span {
    width: 95px;
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.45px;
    color: #282c36;
    font-weight: 500;
    margin-right: 20px;
  }
  > div {
    width: 100%;
    border: 1px solid #c6c7cc;
    min-height: 36px;
    display: flex;
    align-items: center;
    padding: 3px 10px;
    box-sizing: border-box;

    > input {
        width: 99%;
        height: 36px;
        border: none;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.67;
        letter-spacing: -0.18px;
        text-align: left;
        font-size: 14px;
        // font-family: inherit
        :focus {
          outline: none;    
        }
        ::placeholder {  
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 2.43;
          letter-spacing: -0.35px;
          text-align: left;
          color: #999999;
          padding-left: 0;
        }
        
  }
`;

const Temp = styled.div``;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.5);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;
