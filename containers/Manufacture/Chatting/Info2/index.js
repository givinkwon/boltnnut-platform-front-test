import React from "react";
import styled from "styled-components";
import Router from "next/router";
import ChatIndexContainer from "./ChatIndex";
import BannerContainer from "./Banner";
const Map = "/static/images/Info/InfoMap.svg";
const Line = "/static/images/Info/Line.svg";
const Line2 = "/static/images/Info/Line2.svg";
const Line3 = "/static/images/Info/Line3.svg";
const Banner1Img = "/static/images/Info/Banner1Img.png";
const Banner1Img2 = "/static/images/Info/Banner1Img2.png";
const Banner2Img = "/static/images/Info/Banner2Img.png";
const Banner3Img = "/static/images/Info/Banner3Img.png";
import PaymentPageContainer from "Request/PaymentPage";
import PaymentCompleteContainer from "Request/PaymentComplete";
import ChatCardContainer from "./ChatCard";
import ChatItemContainer from "components/ChatItem";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import * as PartnerAPI from "axios/Manufacutre/Partner";
@inject("Project", "Auth", "Answer", "Partner")
@observer
class InfoContainer extends React.Component {
  state = {
    partnerList: [],
    partnerDetailList: [],
  };
  async componentDidMount() {
    const { Project, Auth, Answer } = this.props;
    await Auth.checkLogin();

    Answer.loadAnswerListByPartnerId(Auth.logged_in_partner.id).then(() => {
      console.log(toJS(Answer.answers));
      this.setState({ partnerList: Answer.answers });

      Answer.answers.forEach((answer) => {
        const PartnerDetailList = this.state.partnerDetailList;
        PartnerAPI.detail(answer.partner)
          .then((res) => {
            PartnerDetailList.push({
              logo: res.data.logo,
              name: res.data.name,
            });
            this.setState({ partnerDetailList: PartnerDetailList });
          })
          .catch((e) => {
            console.log(e);
            console.log(e.response);
          });
      });
    });
  }

  render() {
    return <></>;
  }
}

export default InfoContainer;
const Header = styled.div`
  width: 100%;
  height: 83px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 56px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.64;
  letter-spacing: -1.4px;
  text-align: center;
  color: #282c36;
  margin: 240px 0px 18px 0px;
  > span {
    font-weight: 700;
  }
`;
const SubHeader = styled.div`
  width: 100%;
  height: 78px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 26px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.54;
  letter-spacing: -0.65px;
  text-align: center;
  color: #555963;
  margin-bottom: 50px;
`;
const Banner1 = styled.div`
  display: flex;
  flex-direction: row;
  width: 1221px;
`;
const Textbox = styled.div`
  display: flex;
  flex-direction: column;
  > p {
    object-fit: contain;
    font-family: NotoSansCJKkr;
    font-size: 40px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -1px;
    color: #282c36;
    margin-bottom: 32px;
  }
  > span {
    width: 630px;
    object-fit: contain;
    font-family: NotoSansCJKkr;
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.6px;
    text-align: left;
    color: #555963;
    line-height: 1.67;
  }
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 304px;
    height: 64px;
    border-radius: 46px;
    box-shadow: 2px 3px 6px 0 rgba(0, 0, 0, 0.4);
    font-family: NotoSansCJKkr;
    font-size: 23px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.58px;
    text-align: left;
    color: white;
    background-color: #0933b3;
    margin-top: 72px;
    cursor: pointer;
  }
`;
const ImgContainer = styled.div`
  position: relative;
`;
