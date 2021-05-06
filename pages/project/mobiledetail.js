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
import STLViewer from "stl-viewer";
const search_img = "/static/images/project/search.png";
const fileimg = "/static/images/project/fileimg.svg";
const fileimgBlack = "/static/images/project/fileimgBlack.svg";
const back_ic = '/static/images/components/MobileNav/back_ic.svg';
const separator = "/static/images/components/Footer/separator.png";
const downpass = '/static/images/pass5.png';
const uppass = '/static/images/pass6.png';
const callImg = "/static/images/project/Call.svg";
const messagesImg = "/static/images/project/Messages.svg";
@inject('Project', 'Loading')
@observer
class MobileDetail extends React.Component {
	state = {
		width: null,
    check: null,
	};
	componentDidMount() {
		window.addEventListener('resize', this.updateDimensions);
		this.setState({ ...this.state, width: window.innerWidth });
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateDimensions);
	}
	updateDimensions = () => {
		this.setState({ ...this.state, width: window.innerWidth });
	};


  boxChecked = (idx) => {
    this.setState({check: idx})
  }

  activeHandler = (idx) => {
    const{check} = this.state;

    if(check == idx){
      return true;
    }
    else{
      return false;
      
    }
  }



	render() {
		const { Project, Loading } = this.props;
		const { width, check } = this.state;
    const gray = "#f6f6f6";
		return (
      <>
        <div>
          { width && width < 768 && <MobileNav src={ back_ic } headText={"프로젝트 관리"} width={ width }/>}

        </div>
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
                <Font14 style = {{color: "#999999"}}>예상 금액</Font14><Font14 style = {{color: "#414550"}}>25,000,000원</Font14>
              </Box1>
              <Box1>
                <Font14 style = {{color: "#999999"}}>예상 기간</Font14><Font14 style = {{color: "#414550"}}>2달</Font14>
              </Box1>
              <Box1>
                <Font14 style = {{color: "#999999"}}>지원 수</Font14><Font14 style = {{color: "#414550"}}>2명</Font14>
              </Box1>
            </div>
            <div style = {{marginBottom: 40}}>
              



              
              <Font16 style = {{fontWeight: 'bold', color: '#282c36'}}>지원한 파트너</Font16>
              <Box1 
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
                  <img src = {downpass} style = {{height: 8, width: 15}}></img>
                </div>


                <div active = {this.activeHandler(0)}>
                  {/* <div style = {{
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
                 */}
                </div>
              </Box1>
              <Box1 style = {{alignItems: "center",boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.3)"}}>
                <Font14 style = {{fontWeight: '500', color: '#282c36'}}>하이젠어스</Font14>
                <Font14 style = {{color: '#999999'}}>"프로젝트 보고 연락...</Font14>
                <img src = {downpass} style = {{height: 8, width: 15}}></img>
              </Box1>
            </div>
            <div>
              <div style = {{marginBottom: 40}}>
                <Font16 style = {{marginBottom: 14}}>프로젝트 설명 및 요청사항</Font16>
                <Font15>공개 내용</Font15>
                <Box1 style = {{flexDirection: "column", paddingTop: 14, paddingBottom: 14}}>
                  <Font14 style = {{color: "#282c36", marginBottom: 40, lineHeight: '26px', letterSpacing: -0.35}}>생산 공정 금형사출로 부탁 어쩌고 찬아짱짱맨 최고 두루루루루루 두루치기 싫다</Font14>
                  <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <img
                      src={fileimg}
                      style={{width:20, height: 20, marginRight: 2 }}
                      />
                    <Font14 style = {{color: "#767676", alignItems: "center"}}>계약서 및 기능명세서.hwp</Font14>
                  </div>



                  <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <img
                      src={fileimg}
                      style={{width:20, height: 20, marginRight: 2 }}
                      />
                    <Font14 style = {{color: "#767676"}}>미팅 아카이빙.pdf</Font14>
                  </div>
                  <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <img
                      src={fileimg}
                      style={{width:20, height: 20, marginRight: 2 }}
                      />
                    <Font14 style = {{color: "#767676"}}>설계파일 업로드.pdf</Font14>
                  </div>
                </Box1>
                
              </div>
            
              <div style = {{marginBottom: 120}}>
                <Font15>비공개 내용</Font15>
                <Box1 style = {{flexDirection: "column", paddingTop: 20, paddingBottom: 0}}>
                  <Font16 style = {{paddingBottom: 8}}>47c2f5474824497c9b00a3_stl.stl</Font16>
                  <Font14 style = {{paddingBottom: 17}}>345 x 265 x 21 mm</Font14> 
                  <div style = {{display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center"}}>
                    <img src = {fileimg}></img>
                    <Box1 style = {{padding: 0, 
                      marginTop: 14,
                      marginBottom: 11, 
                      alignItems: "center", 
                      justifyContent: "center", 
                      width: 141, 
                      height: 32 }}>
                      <Font14 style = {{letterSpacing: -0.35, color: "#414550"}}>도면 상세보기</Font14>
                      <img src = {search_img} style = {{width: 16, height: 16, marginLeft: 15}}></img>
                    </Box1>
                  </div>
                
                  <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>생산공정</Font15><Font15>금형/사출</Font15>
                  </div>
                  <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                  <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>재료</Font15><Font15>금형/사출</Font15>
                  </div>
                  <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                  <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>마감</Font15><Font15>금형/사출</Font15>
                  </div>
                  <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                  <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>색상</Font15><Font15>금형/사출</Font15>
                  </div>
                  <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                  <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>수량</Font15><Font15>금형/사출</Font15>
                  </div>
                  <div style = {{borderStyle: "solid",borderTopWidth:1, borderTopColor:"#e1e2e4"}}></div>
                  <div style = {{height: 40, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                    <Font15 style = {{lineHeight: 2.67, fontWeight: 'bold', letterSpacing: -0.38}}>가격</Font15><Font15>금형/사출</Font15>
                  </div>



                </Box1>
                <Box1 style = {{flexDirection: "column", paddingTop: 14, paddingBottom: 14}}>
                  <Font14 style = {{color: "#282c36", marginBottom: 40, lineHeight: '26px', letterSpacing: -0.35}}>생산 공정 금형사출로 부탁 어쩌고 찬아짱짱맨 최고 두루루루루루 두루치기 싫다</Font14>
                  <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <img
                      src={fileimg}
                      style={{width:20, height: 20, marginRight: 2 }}
                      />
                    <Font14 style = {{color: "#767676", alignItems: "center"}}>계약서 및 기능명세서.hwp</Font14>
                  </div>



                  <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <img
                      src={fileimg}
                      style={{width:20, height: 20, marginRight: 2 }}
                      />
                    <Font14 style = {{color: "#767676"}}>미팅 아카이빙.pdf</Font14>
                  </div>
                  <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <img
                      src={fileimg}
                      style={{width:20, height: 20, marginRight: 2 }}
                      />
                    <Font14 style = {{color: "#767676"}}>설계파일 업로드.pdf</Font14>
                  </div>
                </Box1>
              </div>


          



            </div>
          </Containerv1>
        </Background>
        <Footer color = {gray}/>
      </>
		);
	}
}

export default MobileDetail;

const Box1= styled.div`
border-radius: 5px;
  border: solid 1px #c6c7cc;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 14px 10px 14px;
  margin-top: 14px;
  ${props => props.active && css`
  hegiht: 114px;  
    border-style: solid;
    border-color: #0933b3;
    >div{
      display: flex;
    }
  `}
  // :hover{
  //   border-style: solid;
  //   border-color: #0933b3;
  //   height: 114px;
  // }
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

