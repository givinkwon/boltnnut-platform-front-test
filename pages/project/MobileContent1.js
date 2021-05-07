import React from 'react';
import styled, {css} from 'styled-components';
import { inject, observer } from 'mobx-react';
import BannerContainer from 'containers/Project/Banner';
import Router from 'next/router';
import Container from 'components/Container'
import Containerv1 from 'components/Containerv1'
import Nav from 'components/Nav';
import MobileNav from 'components/MobileNav';
import Footer from 'components/Footer';
import Spinner from 'components/Spinner';
import * as Text from "components/Text";
import * as Content from "components/Content";
import * as Title from "components/Title";
import Background from "components/Background";
import MobileContent2 from './MobileContent2';

const fileimgBlack = "/static/images/project/fileimgBlack.svg";
const back_ic = '/static/images/components/MobileNav/back_ic.svg';
const separator = "/static/images/components/Footer/separator.png";
const downpass = '/static/images/pass5.png';
const uppass = '/static/images/pass6.png';
const callImg = "/static/images/project/Call.svg";
const messagesImg = "/static/images/project/Messages.svg";

@inject("Project", "Auth", "Answer")
@observer
class MobileContent1 extends React.Component {
  state = {
    item: [],
    partnerList: [],
    check: null,
  };
  handler = {
    get(item, property, itemProxy) {
      console.log(`Property ${property} has been read.`);
      return target[property];
    },
  };
  async componentDidMount() {
    const { Project, Auth, Answer } = this.props;

    console.log("<Web> did mount");

    // const color = document.getElementsByClassName("Footer").setAttribute("style","background-color:red");
    // const color = document.getElementById("MyFooter").getAttribute('style');
    // console.log(color);
    // Project.init(918)

    //console.log(Auth)

    await Auth.checkLogin();
    if (Auth.logged_in_client) {
      Project.getPage(Auth.logged_in_client.id);
      Answer.loadAnswerListByProjectId(379).then(() => {
        // console.log(toJS(Answer.answers));
        this.setState({ partnerList: Answer.answers });
      });
    }
  }
  boxChecked = (idx) => {
    this.setState({check: idx})
  }

  activeHandler = (idx) => {
    const{check} = this.state;

    if(check == idx){
      console.log('true')
      return true;
    }
    else{
      console.log('false')
      return false;
      
    }
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

    return(
      <Background>
      <Containerv1 style = {{display: 'flex', flexDirection:'column', paddingTop: 90}}>
        <div style = {{marginBottom: 40}}>
          <Font15 style = {{color: "#0933b3", marginBottom: 14, fontWeight: 'bold'}}>모집중</Font15>
          <Font16 style = {{marginBottom: 8, fontWeight: 'bold', color: '#282c36'}}>실리콘 반려동물 샤워기</Font16>
          <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Font14 style = {{color: "#999999"}}>제품 및 용품 반려동물 용품</Font14>
            <img src={separator} />
            <Font14 style = {{color: "#999999"}}>2021.03.11</Font14>
          </div>

          <Box1>
            <Font14 style = {{color: "#999999"}}>예상 금액</Font14><Font14 style = {{color: "#414550"}}>{estimate}</Font14>
          </Box1>
          <Box1>
            <Font14 style = {{color: "#999999"}}>예상 기간</Font14><Font14 style = {{color: "#414550"}}>{period}</Font14>
          </Box1>
          <Box1>
            <Font14 style = {{color: "#999999"}}>지원 수</Font14><Font14 style = {{color: "#414550"}}>2명</Font14>
          </Box1>
        </div>
        <div style = {{marginBottom: 40}}>
          



          
          <Font16 style = {{fontWeight: 'bold', color: '#282c36'}}>지원한 파트너</Font16>
          <Box2 
            active = {this.activeHandler(0)}
            onMouseOver = {()=>this.boxChecked(0)}
            onMouseOut = {()=>this.boxChecked(null)}
            style = {{
            flexDirection: 'column', 
            alignItems: "center", 
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.3)"
            }}>

            <div style = {{width: "100%", display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}}>
              <Font14 style = {{fontWeight: '500', color: '#282c36'}}>하이젠어스</Font14>
              <Font14 style = {{color: '#999999'}}>"프로젝트 보고 연락...</Font14>
              {this.activeHandler(0)? (
                  <img src = {uppass} style = {{height: 8, width: 15}}></img>
                ):(
                <img src = {downpass} style = {{height: 8, width: 15}}></img>
                )
              }
            </div>


            <div active = {this.activeHandler(0)} 
              style = {{  
              width: "100%", 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: "center", 
              justifyContent: "space-evenly", 
              marginTop: 20,
              }}>
              <Icon>
                <img src = {fileimgBlack}></img>
                <Font12>회사소개서</Font12>
              </Icon>
              <img src = {separator} style = {{width: 1, height: 32}}></img>
              <Icon>
                <img src={callImg}></img>
                <Font12>111-111-1111</Font12>
              </Icon>
              <img src = {separator} style = {{width: 1, height: 32}}></img>
              <Icon>
                <img src={messagesImg}></img>
                <ChatNotice>
                  <Font14>N</Font14>
                </ChatNotice>
                <Font12>채팅하기</Font12>
              </Icon>
            </div>
            

          </Box2>
          <Box2 style = {{alignItems: "center",boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.3)"}}>
            <Font14 style = {{fontWeight: '500', color: '#282c36'}}>하이젠어스</Font14>
            <Font14 style = {{color: '#999999'}}>"프로젝트 보고 연락...</Font14>
            <img src = {downpass} style = {{height: 8, width: 15}}></img>
          </Box2>
        </div>
        < MobileContent2/>
        </Containerv1>
        </Background>
    );
  }
}
export default MobileContent1

const Box1= styled.div`
border-radius: 5px;
  border: solid 1px #c6c7cc;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 14px 10px 14px;
  margin-top: 14px;
  
`

const Box2 = styled.div`
border-radius: 5px;
  border: solid 1px #c6c7cc;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 14px 10px 14px;
  margin-top: 14px;
  
>div:nth-of-type(2) {
  display: ${(props) => (props.active ? "flex !important" : "none !important")};
}
:hover{
  border-style: solid;
  border-color: #0933b3;
  height: 114px;
}

`

const Icon = styled.div`
display: flex;
flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 26px;
    hegiht: 26px;
  }
  p {

  }
`
const ChatNotice = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  // bottom: 15px;
  bottom: 8px;
  left: 12px;
  border-radius: 50%;
  // padding: 3px 7px 2px;
  display: ${(props) => (props.active ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  object-fit: contain;
  background-color: #ff3400;
`;

const Font12 = styled(Text.FontSize12)`
font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.83;
  letter-spacing: -0.3px;
  color: #282c36;
`

const Font14 = styled(Content.FontSize14)`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.07;
  letter-spacing: -0.35px;
  
` 

const Font15 = styled(Content.FontSize15)`
  
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -0.38px;
`

const Font16 = styled(Content.FontSize16)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.4px;
`

