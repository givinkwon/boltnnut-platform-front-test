import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDropzone } from "react-dropzone";
import * as Text from "components/Text";

const plusImg = "/static/images/signup/plus.svg";
@inject("Auth", "Answer")
@observer
class Introduction extends React.Component {
  MyDropzone = () => {
    const dropHandler = (files) => {};

    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.map((data, idx) => {});

      dropHandler(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <InputBox
          checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
        >
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <DropZoneContainer>
              {this.state.loading === true ? (
                <>
                  <div>Uploading files...</div>
                  <CircularProgress
                    style={{
                      margin: "10px auto",
                      width: "22px",
                      height: "22px",
                    }}
                    className="spinner"
                  />
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      marginBottom: "24px",
                    }}
                  ></div>
                </>
              )}
            </DropZoneContainer>
          )}
        </InputBox>
      </div>
    );
  };

  render() {
    return (
      <Container>
        <Header>
          <Name>회사 소개서</Name>

          <Button>파일 업로드하기</Button>
        </Header>
        <Main>
          <img src={plusImg} />
        </Main>
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
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.16);
  height: 406px;
  position: relative;
  > img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
