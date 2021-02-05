import React, {Component} from "react";
import styled from "styled-components";
import Router, { withRouter } from 'next/router';
import { inject, observer } from 'mobx-react';
import Buttonv1 from "components/Buttonv1";

// Components
import * as Content from "components/Content";
import * as Title from "components/Title";

@inject('Request','Proposal','DetailQuestion','ManufactureProcess')
@observer
class Step6Container extends Component {
  buttonClick = () => {
    const { Request } = this.props;
    Request.step_index = 4;
  }
  static defaultProps = { title: '고객님의 제조 의뢰가 접수 되었습니다.' };
    render() {
      
      
      return(
          <Card>
            <Header>
              {this.props.title}
            </Header>
            <ContentBox>
                Step6입니다
              <Font18 style={{textAlign:'center',paddingTop:144}}>1:1 프로젝트 매니저를 배정받아 보다 정확하고 안전한 견적을 받아보세요.</Font18>

              <Buttonv1 fontSize={20} onClick={ this.buttonClick } style={{margin:'0 auto', marginTop: 30,marginBottom:60,width:255,height:49}}>
                무료 컨설팅 받기
              </Buttonv1>
            </ContentBox>
          </Card>
        )
    }
}

export default withRouter(Step6Container);

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
