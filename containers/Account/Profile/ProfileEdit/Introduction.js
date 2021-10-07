import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDropzone } from "react-dropzone";
import * as Text from "components/Text";

const plusImg = "/static/images/signup/plus.svg";
const closeImg = "/static/images/signup/close.svg";

@inject("Auth", "Answer", "Profile")
@observer
class Introduction extends React.Component {

  componentDidMount = () => {
    const { Profile } = this.props;
    console.log("mount");
    console.log(Profile.introductionCheckFileUpload);

    // Profile.introductionCheckFileUpload = false;
  };
  MyDropzone = () => {
    const { Profile } = this.props;

    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.map((data, idx) => {

        Profile.file = data;

        Profile.introductionCheckFileUpload = true;

        Object.assign(data, { preview: URL.createObjectURL(data) });
      });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      multiple: false,
    });

    return (
      <div {...getRootProps()} style={{ width: "100%" }}>
        <input {...getInputProps()} />
        <InputBox>
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <img src={plusImg} />
          )}
        </InputBox>
      </div>
    );
  };

  render() {
    const { Profile } = this.props;

    return (
      <Container>
        <Header>
          <Name>회사 소개서</Name>

          <Button
            onClick = {() => Profile.save_profile()}
          >저장하기</Button>
        </Header>

        {Profile.introductionCheckFileUpload ? (
          <Main>
            {Profile.file && (
              <Item>
                <div>{Profile.file.name}</div>
                <img
                  src={closeImg}
                  style={{cursor : "pointer"}}
                  onClick={() => {
                    Profile.file = "";
                    Profile.introductionCheckFileUpload = false;
                  }}
                />
              </Item>
            )}
          </Main>
        ) : (
          <this.MyDropzone onChange={this.scrollChange} />
        )}
      </Container>
    );
  }
}

export default Introduction;

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
  // box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.16);
  height: 406px;
  position: relative;

  > span {
  }
  > img {
    width: 200px;
    height: 200px;
    border: 3px solid green;
    // position: absolute;
    // top: 50%;
    // left: 50%;
    // transform: translate(-50%, -50%);
  }
`;

const DropZoneContainer = styled.div`
  > div {
    display: flex;
    align-items: center;
    > span {
      width: 26px;
      height: 26px;
      border-radius: 13px;
      background-color: #0933b3;
      margin-right: 20px;
      position: relative;
      > div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        border: 1px solid white;
      }
      > div:nth-of-type(1) {
        //border: 3px solid red;
        width: 14px;
        height: 0px;
      }
      > div:nth-of-type(2) {
        width: 0px;
        height: 14px;
      }
    }
  }
  p:nth-of-type(1) {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    margin-bottom: 4px;
    span {
      color: #0933b3;
      font-weight: 600;
    }
    :focus {
      outline: none;
    }
  }
  > p:nth-of-type(2) {
    font-size: 16px;
    //line-height: 40px;
    letter-spacing: -0.4px;
    color: #767676;
  }
`;

const InputBox = styled.div`
  width: 100%;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.16);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 430px;
  text-align: center;
  :focus {
    outline: 0;
  }
  cursor: pointer;
  > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Item = styled.div`
  display: inline-flex;
  border-radius: 20px;
  align-items: center;
  background-color: #f6f6f6;
  height: 34px;
  padding: 6px 12px 6px 16px;
  box-sizing: border-box;
  margin-right: 15px;
`;
