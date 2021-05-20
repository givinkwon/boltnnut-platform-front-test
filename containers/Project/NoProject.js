import React from "react";
import styled from "styled-components";
import Background from "../../components/Background";
import Containerv1 from "../../components/Containerv1";
import * as Title from "../../components/Title";
import Router from "next/router";
import {inject, observer} from "mobx-react"

@inject("Auth", "Project")
@observer
class NoProject extends React.Component {
  state = {
    width: 0,
  }
  async componentDidMount() {
    await this.props.Auth.checkLogin();
    //창 크기
    window.addEventListener("resize", this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  search = () => {
		const { Project } = this.props;
		Project.newIndex = 0;
    Project.myIndex = 0;
	}

  render() {
    const { Auth } = this.props;
    return (
      <Background>
        <Containerv1>
          <RequestCompleteBox>
            {this.state.width > 768 ?  <>
              {Auth.logged_in_client &&     
              <>
              <RequestCompleteTitle>
                <FontSize26 style={{ marginBottom: "20px" }}>
                  프로젝트를 등록해주세요
                </FontSize26>
              </RequestCompleteTitle>

              <RequestCompleteDesc>
                <InlineDiv
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {/* <FontSize22>ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ</FontSize22> */}
                </InlineDiv>
                <InlineDiv
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {/* <FontSize22>BBBBBBBBBBB</FontSize22> */}
                </InlineDiv>
              </RequestCompleteDesc>

              <ButtonBox>
                <HomeBtn onClick={() => Router.push("/")}>홈으로 가기</HomeBtn>

                <MyProjectBtn onClick={() => Router.push("/request")}>프로젝트 등록하기</MyProjectBtn>
              </ButtonBox>
              </>
              }
              {Auth.logged_in_partner &&     
              <>
              <RequestCompleteTitle>
                <FontSize26 style={{ marginBottom: "20px" }}>
                  프로젝트에 제안서를 넣어주세요
                </FontSize26>
              </RequestCompleteTitle>

              <RequestCompleteDesc>
                <InlineDiv
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {/* <FontSize22>AAAAAAAAAAAA</FontSize22> */}
                </InlineDiv>
                <InlineDiv
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {/* <FontSize22>BBBBBBBBBBB</FontSize22> */}
                </InlineDiv>
              </RequestCompleteDesc>

              <ButtonBox>
                <HomeBtn onClick={() => Router.push("/")}>홈으로 가기</HomeBtn>

                <MyProjectBtn onClick={() => this.search()}>프로젝트 답변하기</MyProjectBtn>
              </ButtonBox>
              </>
            }
            
            
            </> :
            <>
              
            
            
            </>}




          </RequestCompleteBox>
        </Containerv1>
      </Background>
    );
  }
}

export default NoProject;

// global
const InlineDiv = styled.div`
  display: inline-flex;
`;

// fontsize
const FontSize26 = styled(Title.FontSize26)`
  font-weight: bold;
  line-height: 1.31;
  letter-spacing: -0.65px;
  color: #0a2165;
`;

const FontSize24 = styled(Title.FontSize24)`
  font-weight: bold;
  line-height: 1.67;
  letter-spacing: -0.6px;
  color: #282c36;
`;

const FontSize22 = styled(Title.FontSize22)`
  font-weight: normal;
  line-height: 1.82;
  letter-spacing: -0.55px;
  color: #282c36;
`;

const FontSize20 = styled(Title.FontSize20)`
  font-weight: bold;
  line-height: 2.6;
  letter-spacing: -0.5px;
  color: #ffffff;
`;

const FontSize18 = styled(Title.FontSize18)`
  font-weight: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: #111111;
`;

// body
const RequestCompleteBox = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 1200px;
  height: 496px;
  margin-top: 60px;
  margin-bottom: 200px;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
`;

const RequestCompleteTitle = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 996px;
  border-bottom: solid 1px #c6c7cc;
`;

const RequestCompleteDesc = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 90px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 520px;
`;

const HomeBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 242px;
	height: 61px;
	border-radius: 5px;
	border: solid 1px #0933b3;
	cursor: pointer;
	font-size: 20px;
	font-weight: bold;
	line-height: 2.6;
	letter-spacing: -0.5px;
	color: #0933b3;
	}
	&:hover {
		transition: all 0.5s;
		border: solid 1px #0a2165;
		background-color: #f6f6f6;
		color: #0a2165;
	}
`;

const MyProjectBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 242px;
  height: 61px;
  border-radius: 5px;
  border: solid 1px #0933b3;
  cursor: pointer;
  background-color: #0933b3;
  font-size: 20px;
  font-weight: bold;
  line-height: 2.6;
  letter-spacing: -0.5px;
  color: #ffffff;
  &:hover {
    transition: all 0.5s;
    background-color: #0a2165;
  }
`;
