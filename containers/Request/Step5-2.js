import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
//Slider
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Buttonv1 from "components/Buttonv1";

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";

const CallingCard1 = "/static/images/request/Step4/Step4_CallingCard1.png";
const CallingCard2 = "/static/images/request/Step4/Step4_CallingCard2.png";

@inject('Schedule', 'Request')
@observer
class Step5_2Container extends Component {
  static defaultProps = { title: '컨설팅 신청이 완료 되었습니다.' };

  render() {
      const { Schedule, Request } = this.props;
      return(
          <Card>
            <Header>
              {this.props.title}
            </Header>
            <ContentBox>
                <Title1> 날짜 및 시간 </Title1>
                <Content1> {Schedule.book_time} </Content1>

                <Title1 style={{marginTop: 30}}> 화상미팅 장소 </Title1>
                <Content1> 해당시간에 카카오톡으로 ZOOM URL링크를 보내드립니다. </Content1>
            </ContentBox>
            <Title2>
                방문하시는 고객님의 정보를 입력해주시면 원활한 상담을 도와드릴 수 있습니다.
            </Title2>
          </Card>
        )
    }
}

export default withRouter(Step5_2Container);

const Card = styled.div`
  width: 894px;
  // height: 976px;
  object-fit: contain;
  border-radius: 10px;
  padding-left: 3.9%;
  padding-right: 3.9%;
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
  text-align: left;
  color: #0a2165;
  padding-top: 40px;
  padding-bottom: 20px;
  object-fit: contain;
`
const ContentBox = styled.div`
  // height: calc(46.3%);
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  border-top: solid 1px #c6c7cc;;
  border-bottom: solid 1px #c6c7cc;;
  margin-bottom: 60px;
`
const Title1 = styled.div`
    height: 36px;
    object-fit: contain;
    font-size: 24px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.67;
    letter-spacing: -0.6px;
    text-align: left;
    color: #282c36;
`
const Content1 = styled.div`
    margin-top: 6px;
    display: flex;
    align-items: center;
    object-fit: contain;
    height: 27px;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 2.22;
    letter-spacing: -0.45px;
    text-align: left;
    color: #282c36;
}
`
const Title2 = styled.div`
    margin-bottom: 40px;
    height: 29px;
    object-fit: contain;
    font-size: 20px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 2;
    letter-spacing: -0.5px;
    text-align: center;
    color: #282c36;
    text-align: left;
`
const InfomationWrapper = styled.div`

`
