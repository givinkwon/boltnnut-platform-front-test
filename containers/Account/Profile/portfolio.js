import React, { useCallback } from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import { useDropzone } from "react-dropzone";
import * as Text from "components/Text";
import { toJS } from "mobx";

const plusImg = "/static/images/signup/plus.svg";
const closeImg = "/static/images/signup/close.svg";

@inject("Auth", "Answer", "Profile")
@observer
class portfolio extends React.Component {
  componentWillUnmount = () => {
    const { Profile } = this.props;
    console.log("unmount");
    Profile.portfolioCheckFileUpload = false;
  };

  componentDidMount = () => {
    const { Profile } = this.props;
    console.log("mount");
    console.log(Profile.portfolioCheckFileUpload);
    // Profile.introductionCheckFileUpload = false;
  };
  MyDropzone = () => {
    const { Profile } = this.props;
    const dropHandler = (files) => {
      console.log(files);
    };

    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.map((data, idx) => {
        console.log(data);
        Profile.Portfolio_set.push(data);
        // Profile.introductionFile = data;

        // console.log(Profile.introductionFile);
        console.log(Profile.Portfolio_set);

        Profile.portfolioCheckFileUpload = true;

        Object.assign(data, { preview: URL.createObjectURL(data) });
      });

      dropHandler(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <div
        {...getRootProps()}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
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
    const { Profile, Portfolio_set } = this.props;
    console.log(toJS(Profile.portfolio_set));
    console.log(toJS(Portfolio_set));

    return (
      <Container>
        <Header>
          <Info>
            <Name>포트폴리오</Name>
            <Description>진행했던 제품들 사진을 올려주세요.</Description>
          </Info>

          <Button>파일 업로드하기</Button>
        </Header>

        <this.MyDropzone onChange={this.scrollChange} />

        <Main>
          <SmallImageContainer>
            {Profile.Portfolio_set &&
              Profile.Portfolio_set.map((item, idx) => {
                return (
                  <SmallImageBox>
                    <img
                      src={closeImg}
                      onClick={() => {
                        console.log(idx);
                        Profile.Portfolio_set.splice(idx, 1);
                      }}
                    />
                    <img src={item.preview} />
                  </SmallImageBox>
                );
              })}
          </SmallImageContainer>
        </Main>
      </Container>
    );
  }
}

export default portfolio;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  margin-top: 100px;
`;

const Info = styled.div`
  display: flex;
`;

const Name = styled.div`
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.6px;
  color: #414550;
  font-weight: bold;
  margin-right: 12px;
`;

const Description = styled.div`
  font-size: 16px;
  line-height: 34px;
  letter-spacing: -0.4px;
  color: #555963;
  font-weight: normal;
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
  margin-top: 60px;
  width: 100%;
  height: 406px;
  position: relative;
`;

const InputBox = styled.div`
  width: 60%;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.16);
  background-color: #eeeeee;
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

const SmallImageContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
`;
const SmallImageBox = styled.div`
  width: 169px;
  height: 123px;
  flex: 0 0 auto;
  border: 1px solid #707070;
  border-radius: 3px;
  margin-right: 10px;
  cursor: pointer;
  position: relative;

  > img:nth-of-type(1) {
    position: absolute;
    top: 2%;
    right: 2%;
  }

  > img:nth-of-type(2) {
    width: 100%;
    height: 100%;
  }
`;
