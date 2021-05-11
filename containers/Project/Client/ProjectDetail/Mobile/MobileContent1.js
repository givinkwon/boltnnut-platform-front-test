import React from 'react';
import styled, {css} from 'styled-components';
import { inject, observer } from 'mobx-react';
import * as Text from "components/Text";
import * as Content from "components/Content";
import MobileContent2 from './MobileContent2';
import {toJS} from "mobx";
import * as PartnerAPI from "axios/Partner";
import ChatTestContainer from "containers/Info2/ChatTest";

const fileimgBlack = "/static/images/project/fileimgBlack.svg";
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
    modalActive: false,
    selectedRoom: null,
    partnerDetailList: [],
  };
  handler = {
    get(item, property, itemProxy) {
      console.log(`Property ${property} has been read.`);
      return target[property];
    },
  };

  getToday(date) {
    //let date = new Date();
    console.log(date);
    // let year = date.getFullYear();
    // let month = ("0" + (1 + date.getMonth())).slice(-2);
    // let day = ("0" + date.getDate()).slice(-2);

    // console.log(year);
    // console.log(month);
    // console.log(day);
    // return year + month + day;
  }
  modalHandler = (id) => {
    this.setState({ selectedRoom: id });
    const { Project } = this.props;
    Project.chatModalActive = !Project.chatModalActive;
    // this.setState({ modalActive: !this.state.modalActive });
  };
  
  activeHandler = (active) => {
    if (active === "activeOne") {
      if (this.state.activeOne) {
        this.setState({ activeOne: false });
      } else {
        this.setState({ activeOne: true });
      }
    } else {
      if (this.state.activeTwo) {
        this.setState({ activeTwo: false });
      } else {
        this.setState({ activeTwo: true });
      }
    }
  };
  async componentDidMount() {
    const { Project, Auth, Answer } = this.props;
    Project.chatModalActive = false;
    // const color = document.getElementsByClassName("Footer").setAttribute("style","background-color:red");
    // const color = document.getElementById("MyFooter").getAttribute('style');
    // console.log(color);
    // Project.init(918)

    //console.log(Auth)
    this.getToday(
      Project.projectDetailData &&
        Project.projectDetailData.request_set[0].deadline
    );
    await Auth.checkLogin();

    if (Auth.logged_in_partner) {
      // Project.getPage(1069);
      // console.log(Project.selectedProjectId);
      Answer.loadAnswerListByProjectId(Project.selectedProjectId).then(() => {
        console.log(toJS(Answer.answers));
        this.setState({ partnerList: Answer.answers });

        console.log("====================================================");
        console.log("해당 프로젝트의 정보입니다.");
        console.log("프로젝트 번호: " + Project.selectedProjectId);
        console.log("지원한 파트너 정보들");
        console.log(toJS(Answer.answers));
        console.log("====================================================");
        Answer.answers.forEach((answer) => {
          const PartnerDetailList = this.state.partnerDetailList;
          PartnerAPI.detail(answer.partner)
            .then((res) => {
              // console.log(res);
              // console.log("ANSKLCNALKSCNLKASNCKLANSCLKANSCLKN");
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

    if (Auth.logged_in_client) {
      // console.log(Auth.logged_in_client);
      Project.getPage(Auth.logged_in_client.id);
      // console.log(Project.selectedProjectId);
      Answer.loadAnswerListByProjectId(Project.selectedProjectId).then(() => {
        console.log(toJS(Answer.answers));
        this.setState({ partnerList: Answer.answers });

        console.log("====================================================");
        console.log("해당 프로젝트의 정보입니다.");
        console.log("프로젝트 번호: " + Project.selectedProjectId);
        console.log("지원한 파트너 정보들");
        console.log(toJS(Answer.answers));
        console.log("====================================================");
        Answer.answers.forEach((answer) => {
          const PartnerDetailList = this.state.partnerDetailList;
          PartnerAPI.detail(answer.partner)
            .then((res) => {
              // console.log(res);
              // console.log("ANSKLCNALKSCNLKASNCKLANSCLKANSCLKN");
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
  }

render() {
  const { Project, Partner, user } = this.props;
    // if (this.state.partnerDetailList[0]) {
    //   console.log(this.state.partnerDetailList[0].name);

    const { projectDetailData } = Project;
    // }

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
            ? item.request_set[0].period
            : "미지정";
          estimate = item.request_set[0].price
            ? item.request_set[0].price
            : "미지정";
          category = Project.category;
          maincategory = Project.maincategory;
          categoryname = Project.categoryname;
          maincategoryname = Project.maincategoryname;
          // console.log(item);
        }
      });

    return(
      <Container1>
         {/* {console.log(toJS(projectDetailData))} */}
          {Project.chatModalActive && (
            // <Layer onClick={this.modalHandler}>
            <Layer>
              {/* <Postcode /> */}
              <ChatTestContainer
                roomName={this.state.selectedRoom}
              ></ChatTestContainer>
            </Layer>
          )}
          <Head></Head>
        <div style = {{marginBottom: 40}}>
          <Head>
            <Font15 style = {{color: "#0933b3", marginBottom: 14, fontWeight: 'bold'}}>{projectDetailData &&projectDetailData.request_set[0].request_state}</Font15>

            <Font16 style = {{marginBottom: 8, fontWeight: 'bold', color: '#282c36', }}>{name}</Font16>
            <div style = {{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <div style = {{display: 'flex', flexDirection: 'row'}}>
                  {/* <Font14 style = {{color: "#999999"}}></Font14>
                  <img src={separator} style = {{marginLeft: 11, marginRight: 11}}/>
                  <Font14 style = {{color: "#999999"}}></Font14> */}
              </div>
              
              <Font14 style = {{color: "#c6c7cc"}}>
                {projectDetailData && 
                projectDetailData.request_set[0].createdAt.substr(0, 10).replaceAll("-", ".")}</Font14>
            </div>
          </Head>

          <Box1>
            <Font14 style = {{color: "#999999"}}>예상 금액</Font14>
            <Font14 style = {{color: "#414550"}}>
              {projectDetailData && console.log(toJS(projectDetailData))}
                    {/* 예상금액 0원일 때 미정으로 변경 */}
                    {/* {projectDetailData &&
                    projectDetailData.request_set[0].price.toLocaleString(
                      "ko-KR"
                    ) != 0
                      ? projectDetailData.request_set[0].price.toLocaleString(
                          "ko-KR"
                        ) + " 원"
                      : "미정"} */}
                    {projectDetailData && 
                    projectDetailData.request_set[0].price ?  
                    projectDetailData.request_set[0].price.toLocaleString("ko-KR")+"원" : "미정"}
            </Font14>
          </Box1>
          <Box1>
            <Font14 style = {{color: "#999999"}}>희망 납기</Font14>
            <Font14 style = {{color: "#414550"}}>
              {projectDetailData &&
              projectDetailData.request_set[0].deadline
                .slice(2, 10)
                .replace(/-/gi, ".")}</Font14>
          </Box1>
          <Box1>
            <Font14 style = {{color: "#999999"}}>지원 제조사 수</Font14>
            <Font14 style = {{color: "#414550"}}>{this.state.partnerList.length}</Font14>
          </Box1>
        </div>
        <div style = {{marginBottom: 40}}>
        
          

          {user === "partner" ? (
                /* 파트너일 때 */
                ""
              ) : (
          /* 클라이언트일 때 */
          <>      
          <Font16 style = {{fontWeight: 'bold', color: '#282c36'}}>지원한 파트너</Font16>
          {/* map으로 뿌리기 */}
          {this.state.partnerList.map((data, idx) => {
            return(
              <Box2 
                  onClick={() => this.modalHandler(data.id)}
                  active = {this.state.activeOne}
                  onMouseOver = {() => this.activeHandler("activeOne")}
                  onMouseOut = {() => this.activeHandler("activeOne")}  
                  style = {{
                  flexDirection: 'column', 
                  alignItems: "center", 
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.3)"
                  }}>
                  <div style = {{width: "100%", display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}}>
                    {console.log("업체명")}
   
                    <Font14 style = {{fontWeight: '500', color: '#282c36'}}>{this.state.partnerDetailList[idx] &&
                                this.state.partnerDetailList[idx].name}</Font14>
                    <Font14 style = {{color: '#999999'}}>"프로젝트 보고 연락...</Font14>
                    {() => this.activeHandler(idx)? (
                        <img src = {uppass} style = {{height: 8, width: 15}}></img>
                      ):(
                      <img src = {downpass} style = {{height: 8, width: 15}}></img>
                      )
                    }
                  </div>
                  <div 
                    active = {() => this.activeHandler(idx)} 
                    onMouseover={() => this.modalHandler(data.id)}
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

                      <Font12>{this.state.partnerDetailList[idx] &&
                                this.state.partnerDetailList[idx].phonenum}</Font12>

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
            );
            }
          )}
          </>
          )
          }
        </div>
        < MobileContent2  user={user}/>
        </Container1>
    );
  }
}
export default MobileContent1

const Container1 = styled.div`
display: flex;
flex-direction:column;
width: 100%;
`

const Head = styled.div`
  word-break: break-all;
`
const Box1= styled.div`
border-radius: 5px;
  border: solid 1px #c6c7cc;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 14px 10px 14px;
  margin-top: 14px;
  word-break: break-all;
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
const PartnerBox = styled.div`
  margin-bottom: 12px;
  // width: 100%;
  height: 56px;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: var(--white);
  display: flex;
  // justify-content: space-around;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px 0 28px;
`;
const BlackBox = styled.div`
  position: relative;
  > span {
    font-size: 18px;
    color: #0933b3;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

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

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  right: 0;
  bottom: 0;
  z-index: 10000;
  background: #00000080;
`;