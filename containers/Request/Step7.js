import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import Buttonv1 from "components/Buttonv1";
import MeetingInformationModal from "MeetingInformationModal";

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";

@inject('Request','Proposal','DetailQuestion','ManufactureProcess')
@observer
class Step7Container extends Component {
  state = {
      modal_open : false,
  }
  closeModal = () => {
    this.setState({
      ...this.state,
      modal_shown: true,
    })
  }
  buttonClick = () => {
    const { Request } = this.props;
    
  }
  static defaultProps = { title: '컨설팅 신청이 완료되었습니다..' };
    render() {
      
      
      return(
          <Card>
            <Header>
                담당 컨설턴트
            </Header>
            <ContentBox>
                <Title>날짜 및 시간</Title>
                <Tail>
                   날짜 및 시간
                </Tail>
                <Title>장소</Title>
                <Tail>
                    * 서울특별시 성북구 고려대로 27길 4, 3층 볼트앤너트
                </Tail>
                <Tail>
                    방문하시는 담당자님 정보를 입력해주시면 원활한 상담을 도와드릴 수 있습니다.
                </Tail>
            </ContentBox>
            <CardFooter>
                <CustomButton onClick={ this.buttonClick }>
                    미팅 사전 정보 입력하기
                </CustomButton>
            </CardFooter>
            <MeetingInformationModal
                open={this.state.modal_open}
                handleClose={this.closeModal}
            />

          </Card>
        )
    }
}

export default withRouter(Step7Container);

const PlaceBox=styled.div`
  padding-top:31px;
`

const DateBox=styled.div`
  padding-top:30px;
`

const ConsultantBox=styled.div`
`

const ImageBox=styled.div` 
  padding-top:10px;
  display:flex;
  justify-content:space-between;
  >img
  {
    height:216px;
    width:380px;
  }
`

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

const Font18 = styled(Title.FontSize18)`
  // width:100%;
  text-align:left;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.18px;
  color: #282c36;
`

const Font24 = styled(Title.FontSize24)`
  // width:100%;
  text-align:left;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  color: #282c36;
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

