import React from "react";
import styled from "styled-components";
import * as Content from "components/Content";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";
import Background from "components/Background";
import Container from "components/Containerv1";
import ProposalCard from "components/ProposalCard";

const money = "/static/images/project/money.svg";
const calendar = "/static/images/project/period.svg";
const applicant = "/static/images/project/applicant.svg";
const fileimg = "/static/images/project/fileimg.svg";
const search_img = "static/images/project/search.png";

import Content4 from "./Content4";

@inject("Project", "Auth")
@observer
class Content1 extends React.Component {
  state = {
    item: [],
  };
  async componentDidMount() {
    const { Project, Auth } = this.props;

    console.log("<Web> did mount");

    // const color = document.getElementsByClassName("Footer").setAttribute("style","background-color:red");
    // const color = document.getElementById("MyFooter").getAttribute('style');
    // console.log(color);
    // Project.init(918)

    //console.log(Auth)

    await Auth.checkLogin();
    if (Auth.logged_in_client) {
      Project.getPage(Auth.logged_in_client.id);
    }
    console.log(Auth.logged_in_client);
  }

  render() {
    const { Project } = this.props;
    let name = "";
    let date = "";
    let period = "";
    let estimate = "";
    let applicantnumber = "";
    let category = Project.category;
    let maincategory = "";
    let categoryname = "";
    let maincategoryname = "";

    Project.projectDataList &&
      Project.currentPage > 0 &&
      Project.projectDataList.map((item, idx) => {
        if (idx === 0) {
          name = item.request_set[0].name ? item.request_set[0].name : "미지정";
          date = item.request_set[0].createdAt
            ? item.request_set[0].createdAt.substr(0, 10).replaceAll("-", ".")
            : "미지정";
          period = item.request_set[0].period
            ? item.request_set[0].period + " 달"
            : "미지정";
          estimate = item.request_set[0].price
            ? item.request_set[0].price
            : "미지정";
          category = Project.category;
          maincategory = Project.maincategory;
          categoryname = Project.categoryname;
          maincategoryname = Project.maincategoryname;
          console.log(item);
        }
      });

    return (
      <>
        <Container1>
          <Top>
            <Box1>
              <Font18
                style={{
                  color: "#ffffff",
                  fontWeight: "500",
                  letterSpacing: -0.18,
                }}
              >
                모집 중
              </Font18>
            </Box1>
            <div style={{ display: "inline-flex", flexDirection: "row" }}>
              <Font16 style={{ color: "#999999", marginRight: 17 }}>
                등록 일자
              </Font16>{" "}
              <Font16 style={{ color: "#999999" }}>{date}</Font16>
            </div>
          </Top>
          <Head>
            <Font26
              style={{ height: 38, fontWeight: "bold", letterSpacing: -0.65 }}
            >
              {name}
            </Font26>
            {/* <div>
              <Font17 style={{ color: "#86888c" }}>
                {maincategory}
                {maincategoryname}
              </Font17>
            </div> */}
            {/* <div></div> */}
            <div>
              <Font17 style={{ color: "#86888c" }}>
                {category}
                {categoryname}
              </Font17>
            </div>
          </Head>
          <Box2Container>
            <Box2>
              <Box2ImageContainer>
                <img src={money}></img>
              </Box2ImageContainer>
              <div style={{ marginBottom: 27 }}>
                <Font18 style={{ color: "#86888c" }}>예상 금액</Font18>
                <Font18 style={{ fontWeight: "bold" }}>{estimate}</Font18>
              </div>
            </Box2>

            <Box2>
              <Box2ImageContainer>
                <img src={calendar}></img>
              </Box2ImageContainer>
              <div style={{ marginBottom: 27 }}>
                <Font18 style={{ color: "#86888c" }}>예상 기간</Font18>
                <Font18 style={{ fontWeight: "bold" }}>{period}</Font18>
              </div>
            </Box2>

            <Box2>
              <Box2ImageContainer>
                <img src={applicant}></img>
              </Box2ImageContainer>
              <div style={{ marginBottom: 27 }}>
                <Font18 style={{ color: "#86888c" }}>지원자 수</Font18>
                <Font18 style={{ fontWeight: "bold" }}>2 명</Font18>
              </div>
            </Box2>
          </Box2Container>
          <Info>
            <div style={{ width: 125 }}>
              <Font20>모집 마감일</Font20>
              <Font20>진행 분류</Font20>
              <Font20>관련 기술</Font20>
            </div>
            <div>
              <div>
                <Font20 style={{ color: "#282c36" }}>2021년 3월 24일</Font20>
                <Font16 style={{ color: "#0933b3", marginLeft: 28 }}>
                  10일 남음
                </Font16>
              </div>
              <Font20 style={{ color: "#282c36" }}>뜨악</Font20>
              <Font20 style={{ color: "#282c36" }}>CNC</Font20>
            </div>
          </Info>
          {/* <InfoDetail>
            <Font20 style={{ color: "#282c36", fontWeight: "bold" }}>
              프로젝트 내용 상세 설명
            </Font20>
            <Font18
              style={{
                letterSpacing: -0.45,
                fontWeight: "normal",
                marginBottom: 40,
                lineHeight: 1.67,
              }}
            >
              저희 의뢰하기 자체에 파일로만 업로드 되어있고 상세 설명이 없는데
              이부분은 꼭 필요한데 어떻게 할까요 저희 의뢰하기 자체에 파일로만
              업로드 되어있고 상세 설명이 없는데 이부분은 꼭 필요한데 어떻게
              할까요 동해물과 백도산이 마르고 닳도록저희 의뢰하 기 자체에
              파일로만 업로드 되어있고 상세 설명이 없는데 이부분은 꼭 필요한데
              어떻게 할까요 저희 의뢰하기 자체에 파일로만 업 로드 되어있고 상세
              설명이 없는데 이부분은 꼭 필요한데 어떻게 할까요 동해물과 백도산이
              마르고 닳도록 희 의뢰하기 자체에 파 일로만 업로드 되어있고 상세
              설명이 없는데 이부분은 꼭 필요한데 어떻게 할까요 저희 의뢰하기
              자체에 파일로만 업로드 되어있고 상세 설명이 없는데 이부분은 꼭
              필요한데 어떻게 할까요 동해물과 백도산이 마르고 닳도록저희
              의뢰하기 자체에 파일로만 업로드 되어있고 상세 설명이 없는데
              이부분은 꼭 필요한데 어떻게 할까요 저희 의뢰하기 자체에 파일로만
              업로드 되어있고 상세 설명이 없는데 이부분은 꼭 필요한데 어떻게
              할까요 동해물과 백도산이 마르고 닳도록 희 의뢰하기 자체에 파일로만
              업로드 되어있고 상세 설명이 없는데 이부분은 꼭 필요한데 어떻게
              할까요 저희 의뢰하기 자체에 파일로만 업로드 되어있고 상세 설명이
              없
            </Font18>
            <Font20 style={{ color: "#282c36", fontWeight: "bold" }}>
              프로젝트 관련 파일
            </Font20>
            <div>
              <Font20>
                <img
                  src={fileimg}
                  style={{ marginLeft: 15, marginRight: 12 }}
                ></img>
                계약서 및 기능명세서.hwp
              </Font20>
              <Font20>
                <img
                  src={fileimg}
                  style={{ marginLeft: 15, marginRight: 12 }}
                ></img>
                계약서 및 기능명세서.hwp
              </Font20>
              <Font20>
                <img
                  src={fileimg}
                  style={{ marginLeft: 15, marginRight: 12 }}
                ></img>
                계약서 및 기능명세서.hwp
              </Font20>
              <Font20>
                <img
                  src={fileimg}
                  style={{ marginLeft: 15, marginRight: 12 }}
                ></img>
                계약서 및 기능명세서.hwp
              </Font20>
            </div>
          </InfoDetail> */}

          <Content4 />
        </Container1>
      </>
    );
  }
}

export default Content1;

const Container1 = styled.div`
  width: 912px;
  display: flex;
  flex-direction: column;
  padding: 52px 42px 50px;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  background-color: var(--white);
`;

const Top = styled.div`
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 28px;
`;
const Box1 = styled.div`
  border-radius: 3px;
  display: flex;
  width: 101px;
  height: 40px;
  background-color: #0933b3;
  justify-content: center;
  align-items: center;
`;

const Head = styled.div`
  div {
    display: inline-flex;
    flex-direction: row;
    margin-top: 12px;
  }
  div:nth-of-type(1) {
    padding-right: 24.5px;
  }
  div:nth-of-type(2) {
    height: 15px;
    border-right: solid 1px #a4aab4;
  }
  div:nth-of-type(3) {
    padding-left: 24.5px;
  }
`;

const Box2Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 50px 0 60px;
`;

const Box2 = styled.div`
  width: 293px;
  height: 199px;
  border-radius: 10px;
  border: solid 1px #c6c7cc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Box2ImageContainer = styled.div`
  height: 60px;
  margin-top: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  display: inline-flex;
  flex-direction: row;
  > div {
    display: flex;
    flex-direction: column;
    > p {
      margin-bottom: 12px;
    }
    > p:nth-of-type(3) {
      margin-bottom: 0;
    }
    > div {
      margin-bottom: 12px;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
    }
  }
  padding-bottom: 50px;
  border-bottom: solid 2px #e1e2e4;
`;

const InfoDetail = styled.div`
  padding-top: 40px;
  > p:nth-of-type(1) {
    margin-bottom: 20px;
  }
  > p:nth-of-type(3) {
    margin-bottom: 20px;
  }
  > div p {
    margin-bottom: 12px;
  }
  > div p:last-of-type {
    margin-bottom: 0;
  }
`;

const Font16 = styled(Content.FontSize16)`
  font-weight: normal;
  letter-spacing: -0.4px !important;
  color: #282c36;
  line-height: 1.5;
`;

const Font17 = styled(Content.FontSize17)`
  line-height: 1.5;
`;
const Font18 = styled(Content.FontSize18)`
  color: #282c36;
  display: flex;
  align-items: center;
  line-height: 1.5;
  justify-content: center;
  letter-spacing: -0.45px !important;
`;
const Font20 = styled(Title.FontSize20)`
  color: #86888c;
  display: flex;
  align-items: center;
  text-align: center;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.5px;
  line-height: 1.5;
  align-items: center;
`;
const Font26 = styled(Title.FontSize26)`
  line-height: 1.5;
  display: flex;
  align-items: center;
`;
