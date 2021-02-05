import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import Buttonv1 from "components/Buttonv1";
import MeetingInformationModal from "./MeetingInformationModal";

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";

@inject('Request','Proposal','DetailQuestion','ManufactureProcess')
@observer
class Step7Container extends Component {
  render() {
      return(
          <Card>
            <Header>
                담당 컨설턴트
            </Header>
            <ContentBox>
            </ContentBox>
            <CardFooter>
                <CustomButton onClick={ this.buttonClick }>
                    미팅 사전 정보 입력하기
                </CustomButton>
            </CardFooter>
          </Card>
        )
    }
}

export default Step7Container;

const Card = styled.div`
  width: 894px;
  // height: 976px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
  margin: 60px 0px 200px 280px;
  display: inline;
  float: right;
`
const Header = styled(Content.FontSize32)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.8px;
  text-align: center;
  color: #0a2165;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-top: 40px;
  padding-bottom:20px;
  border-bottom: solid 1px #707070;
  object-fit: contain;
`

const ContentBox = styled.div`
  // height: calc(46.3%);
  margin-right: 5.4%;
  margin-left: 5.4%;
  margin-top: 4.4%;
  display: flex;
  flex-direction: column;
`


const Tail = styled(Content.FontSize14)`
  font-weight: 500;
  height: 24px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.86;
  letter-spacing: -0.14px;
  text-align: left;
  color: #282c36;
  object-fit: contain;
  margin-top: 6px;
`
const CardFooter = styled.div`
  width: 100%;
  margin-top: 70px;
  display: inline-flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  > span {
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.88;
    letter-spacing: -0.16px;
    text-align: left;
    color: #282c36;
  }
`

const CustomButton = styled(Buttonv1)`
  width: 220px !important;
  height: 52px !important;
  margin-top: 30px;
  font-size: 20px !important;
  margin-bottom: 60px;
`
const FoldedComponent = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: NotoSansCJKkr;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  text-align: left;
  color: #282c36;
  width: fit-content;  
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  padding: 8px 16px;
  background-color: var(--white);
  margin-bottom: 30px;
  line-height: 1.3;
  > img {
    width: 14px;
    height: 8px;
    margin-left: 22px;
  }
`

