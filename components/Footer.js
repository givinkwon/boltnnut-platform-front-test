import React from "react";
import styled from "styled-components";
import Router from "next/router";
import {inject, observer} from "mobx-react";

// import Container from "./Container"; //
import * as Text from "./Text";
import * as Content from "components/Content";
import * as Title from "components/Title";
import { PRIMARY, WHITE } from "static/style";
import Containerv1 from './Containerv1';
import SelectComponent from './Select';


const rowline = "/static/images/components/Footer/rowline.svg";
const facebook_mob = "/static/images/components/Footer/facebook.svg";
const instargram_mob = "/static/images/components/Footer/instargram.svg";
const blog_mob = "/static/images/components/Footer/blog.svg";
const post_mob = "/static/images/components/Footer/post.svg";
const facebook = "/static/images/components/Footer/facebook_big.svg";
const instargram = "/static/images/components/Footer/instargram_big.svg";

const blog = "/static/images/components/Footer/blog_big.svg";
const post = "/static/images/components/Footer/post_big.svg";
const dropdown = "/static/images/components/Footer/dropdown.png";
const separator = "/static/images/components/Footer/separator.png";
const campustown = "/static/images/components/Footer/campustown.png";
const lowdirection = "static/images/components/Footer/lowdirection.svg";
const customStyles = {
  dropdownIndicator: () => ({
    color: '#555555',
    width: 16,
    height: 9,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  menu: (provided, state) => ({
    ...provided,
    width: 336,
  }),
  option: (provided, state) => 
    ({
    ...provided,
    color: state.isSelected ? '#000000' : '#555555',
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 16,
    fontSize: 16,
  }),
  control: () => ({
    fontSize: 16,
    width: 336,
    backgroundColor: '#fff',
    display: 'flex',
    borderRadius: 6,
    marginTop: 10
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    paddingLeft: 0
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    return { ...provided, opacity, transition };
  }
}

@inject('Auth', 'Magazine')
@observer
class FooterComponent extends React.Component {
  state = {
    idx: 0,
    current: 1,
    next: true,
    prev: false,
    width: 0,
    tab: 0,
  }
  // handleBackground = () =>
  // {
  //   const color = document.getElementById("MyBackground").getAttribute("style");
  //   console.log("color");
  // }

  componentDidMount() {
    const { Magazine } = this.props;
    Magazine.init();
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });

    // const color = document.getElementById("MyBackground");
    // console.log("asndlnaskldnalksd="+color);
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  
  render() {
    const {Auth, Magazine} = this.props;
    const { width } = this.state;
    return (
    <>
    { width > 768 ? (
      <>
      <Footer myColor={this.handleBackground} id="MyFooter">
        <Containerv1 style={{flexDirection: 'column'}}>
          <img src={rowline} style={{width: 16, height: 4, marginBottom: 6}}></img>
          <TelInfoWrapper>
            <Font24><span>TEL.</span> 02-926-6637</Font24>
          </TelInfoWrapper>
          <CompanyInfoWrapper>
              <span> 오전 10:00 ~ 오후 07:00 </span>
              <span> 점심시간 12:00 ~  01:00 </span>
              <div>
                휴일( 토요일, 일요일, 공휴일 )
                <div style={{display: 'flex'}}>
                  <img src={instargram} onClick={() => window.open('http://www.instargram.com/boltnnut_korea')}/>
                  <img src={blog} onClick={() => window.open('https://blog.naver.com/boltnnut_korea')}/>
                  <img src={post} onClick={() => window.open('https://post.naver.com/boltnnut_korea')}/>
                </div>
              </div>
          </CompanyInfoWrapper>
          <CompanyInfoWrapper style={{paddingTop: 16}}>
            <span class="title"> 
              NOTICE
            </span>
            <Select
              styles = {customStyles}
              options = {this.props.Magazine.magazine_list && this.props.Magazine.magazine_list}
              getOptionLabel={(option) => option.title}
              onChange={Magazine.setCurrent}
              value={Magazine.current ? Magazine.current : this.props.Magazine.magazine_list[0]}
              />
          </CompanyInfoWrapper>
          <CompanyInfoWrapper style={{paddingTop: 14}}>
            <FaqTable>
              <span class="cell" onClick={() => Router.push("/faq")}>
                자주찾는 질문
              </span>
              <img src={separator} />
              <span class="cell" onClick={() => Router.push("/term/personal")}>
                개인정보처리방침
              </span>
              <img src={separator} />
              <span class="cell" onClick={() => Router.push("/term/policy")}>
                이용약관
              </span>
            </FaqTable>
            <InfoDetailContainer>
              <span>
                <span class="title"> 회사명 </span> (주) 볼트앤너트
              </span>
              <span>
                <span class="title"> 대표자 </span> 윤기열, 신지섭
              </span>
              <span>
                <span class="title"> 사업자등록번호 </span> 390-87-01669
              </span>
              <span>
                <span class="title"> 사업장 소재지 </span> 서울특별시 성북구 고려대길 27길 3 2층
              </span>
              <span>
                <span class="title"> 이메일 </span> boltnnut@boltnnut.com
              </span>
              <img src={campustown} style={{float: 'right'}}/>
            </InfoDetailContainer>
          </CompanyInfoWrapper>
        </Containerv1>
      </Footer>
      </>
      ) : (
         
      <>

      {/* backColor==='white' ? footer=회색 : FOOTER=흰색 */}
      <Footer style = {{backgroundColor: this.props.color ? this.props.color : 'white'}}>
        <Containerv1 style={{flexDirection: 'column'}}>
        <img src={rowline} style={{width: 10, height: 2, marginBottom: 6}}></img>
          <Font14 style={{height: 17}}><span>TEL.</span>02-926-6637</Font14>
          <CompanyInfoWrapper>
              <Font12 style={{marginBottom: 2}}> 평일 오전 10:00 ~ 오후 07:00 점심시간 12:00 ~  01:00 </Font12>
              <Font12 style={{marginTop:0, marginBottom: 12}}>휴일 (토요일, 일요일, 공휴일 )</Font12>
          </CompanyInfoWrapper>
          <CompanyInfoWrapper>
            <InfoDetailContainer>
              <Font12 style={{letterSpacing: 0.23,marginTop: 12, marginBottom: 6}}>(주)볼트앤너트 사업자 정보
              <img src = {lowdirection} style={{height: 5, width: 10, marginLeft: 9}}></img></Font12>
              <Font12><span>회사명</span> (주)볼트앤너트</Font12>
              <Font12><span>대표자</span> 윤기열, 신지섭<br/></Font12>
              <Font12><span>사업자등록번호</span> 390-87-01669<br/></Font12>
              <Font12><span>이메일</span> boltnnut@boltnnut.com<br/></Font12>
              <Font12><span>사업장 소재지</span> 서울특별시 성북구 고려대길 27길 3 2층</Font12>
            </InfoDetailContainer>
            <FaqTable>
              <span class="cell" onClick={() => Router.push("/faq")}>
                <Font12 style={{fontWeight: 500}}>자주찾는 질문</Font12>
              </span>
              <img src={separator} />
              <span class="cell" onClick={() => Router.push("/term/policy")}>
                <Font12 style={{fontWeight: 500}}>이용약관</Font12>
              </span>
              <img src={separator} />
              <span class="cell" onClick={() => Router.push("/term/personal")}>
                <Font12 style={{fontWeight: 500}}>개인정보처리방침</Font12>
              </span>
            </FaqTable>

          </CompanyInfoWrapper>
          <ImageWrapper>
                  <img src={campustown} style={{height: 13, alignSelf: 'center'}}/>
                  <div class="imagebox">
                    <img src={instargram} style={{height: 24, width: 24}}onClick={() => window.open('http://www.instargram.com/boltnnut_korea')}/>
                    <img src={blog} style={{height: 24, width: 24}}onClick={() => window.open('https://blog.naver.com/boltnnut_korea')}/>
                    <img src={post} style={{height: 24, width: 24}}onClick={() => window.open('https://post.naver.com/boltnnut_korea')}/>
                  </div>
          </ImageWrapper>
        </Containerv1>
      </Footer>
      </>
      )
    }
  </>
    );
  }
}

export default FooterComponent;

const Footer = styled.div`
  background-color: white;
  padding: 40px 0 34px 0;
  display : inline-flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 20px 0 17px 0;
    width: 100%
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 100%;
  }
`;

const CompanyInfoContainer = styled.div`
  float : right;
  p {
    font-weight: 100;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.47;
    letter-spacing: -0.38px;
  }
  @media (min-width: 0px) and (max-width: 767.99px) {
    width: 100%;
    padding-left: 16px;
    padding-top: 24px;
    padding-bottom: 24px;
    padding-right: 16px;
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 100%;
  }
`;
const CompanyInfo = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  line-height : 1.47;
  letter-spacing : -0.38px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  > div {
    display: flex;
    flex-direction: column;
    margin-top: 14px;
    > p {
      margin-bottom: 5px;
      white-space: nowrap;
    }
  }
  > div:nth-of-type(2) {
    margin-left: auto;
    width: fit-content;
  }
  @media (min-width: 0px) and (max-width: 767.99px) {
    width: 154px;
    height: 76px;
    position: absolute;
    flex-direction: column;
    align-items: flex-start;
    > span {
      font-size: 10px;
      color: white;
      font-weight: 300;
    }
    > span:nth-of-type(1) {
      color: white;
      font-size: 12px;
      font-weight: bold;
      padding-bottom: 8px;
    }
  }
`;
const CompanyInfo2 = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  line-height : 1.47;
  letter-spacing : -0.38px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  > div {
    flex-direction: row;
    > p {
      margin-bottom: 5px;
      white-space: nowrap;
    }
  }
  > div:nth-of-type(2) {
    margin-left: auto;
    width: fit-content;
  }
  @media (min-width: 0px) and (max-width: 767.99px) {
    width: 120px;
    height: 91px;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 54px;
    position: relative;
    float: right;
    > span {
      font-size: 10px;
      color: white;
      font-weight: 300;
    }
    > span:nth-of-type(1) {
      color: white;
      font-size: 12px;
      font-weight: 500;
      padding-bottom: 8px;
    }

    > span:nth-of-type(2) {
      color: white;
      font-size: 12px;
      font-weight: 500;
      padding-bottom: 8px;
    }
  }
`;
const Image = styled.img`
  cursor: pointer;
  width: 148px;
`;
const SnsBox = styled.div`
  padding-left : 0;
  
  @media (min-width: 0px) and (max-width: 767.99px) {
    padding: 0;
    padding-top: 8px;
    display: inline-flex;
    width: 100%;
    height: 100%;
    > img {
      width: 20px;
      height: 20px;
      padding: 0;
      margin-right: 15px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
`;
const Sns = styled.img`
  cursor: pointer;
  height: 24px;
  padding-right : 21px;
  padding-top:12px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 0;
    width: 13.2px;
    height: 12.9px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
  }

  @media (min-width: 1300px) {
  }
`;
// const FontSize16 = styled.p`
//   font-family: 'Roboto', sans-serif;
// `;
const MobileFooter = styled.div`
  background-color: ${PRIMARY};
  padding: 0px 0px;
  display : inline-flex;
  justify-content: center;
  > div:nth-of-type(1) {
    position: relative;
  }
  > div:nth-of-type(2) {
    position: relative;
  }
  @media (min-width: 0px) and (max-width: 767.99px) {
    width: 100%
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 100%;
  }
`;
const MobileContainer = styled.div`
  background-color: ${PRIMARY};
  padding: 0px 0px;
  display : inline-flex;
  justify-content: center;
  @media (min-width: 0px) and (max-width: 767.99px) {
    width: 100%
    color: white;
    display: inline-flex;
    justify-content: space-between;
    padding-right: 10px;
    padding-top: 30px;
    > span {
      color: white;
      font-size: 10px;
      font-weight: 300;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.5;
      letter-spacing: -0.25px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 100%;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 100%;
  }

  @media (min-width: 1300px) {
    width: 100%;
  }
`;
const CompanyInfoWrapper = styled.div`
  width: 100%;
  height: auto;
  border-bottom: solid 1px #c6c7cc;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.4px;
  text-align: left;
  color: #86888c;
  .title {
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.4px;
    text-align: left;
    color: #282c36;
  }
  > div {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div > img {
      margin-left: 20px;
    }
  }
  > span {
    :nth-of-type(2) {
      padding-left: 10px;
    }
  }
  @media (min-width: 0px) and (max-width: 767.99px) {
    padding-top: 2px;
    >div{
      margin-bottom: 0;
    }
  }
  
`
const TelInfoWrapper = styled.div`
  width: 100%;
  height: 36px;  
  font-size: 24px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
  margin-bottom: 20px;
  @media (min-width: 0px) and (max-width: 767.99px) {
    
    align-items: center;
    justify-content: center;
    height: 17px;
    margin-bottom: 2px;
  }
`
const FaqTable = styled.table`
  width: auto;
  height: auto;
  .cell {
    display: table-cell;
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.47;
    letter-spacing: -0.38px;
    text-align: left;
    color: #282c36;
    cursor: pointer;
  }
  > img {
    margin-right: 10px;
    margin-left: 10px;
  }
  @media (min-width: 0px) and (max-width: 767.99px) {
    margin-bottom: 16px;
  }

`
const InfoDetailContainer = styled.div`
  width: auto;
  height: auto;
  margin-top: 10px;
  display: block !important;
  justify-content: initial !important;
  > span {
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.46;
    letter-spacing: -0.33px;
    text-align: left;
    color: #86888c;
    display: inline-flex;
    align-items: center;
    margin-right: 10px;
    .title {
      font-size: 13px;
      font-weight: 500;
      color: #55575c;
      margin-right: 5px;
    }
  }
  @media (min-width: 0px) and (max-width: 767.99px) {
    margin-top: 0;
    margin-bottom: 0 ;
  }

  
`
const ImageWrapper = styled.div`
  display: flex;
  margin-top: 14px;
  justify-content: space-between;
  .imagebox {
    > img {
      margin-left: 10px;
      @media (min-width: 0px) and (max-width: 767.99px){
        margin-left: 24px;
      }
    }
  }
`

const Select = styled(SelectComponent)`
  @keyframes fadeIn {  
    0% {
      opacity:0.5;
      transform: translateY(-10px);
    }
    100% {
      opacity:1;
      transform: translateY(0);
    }
  }

  >div: nth-of-type(2){
    -webkit-font-smoothing: antialiased;
    animation: fadeIn 0.2s ease-out;
  }
  
`



const Font12 = styled(Text.FontSize12)`
justfiy-content: center;
align-items: center;
  font-size: 12px !important;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.3px;
  text-align: left;
  color: #282c36;
  >span{
    font-weight: 500;
    color: #414550;
  }
  margin-top: 8px;
`

const Font14 = styled(Content.FontSize14)`
  font-family: Roboto;
  font-size: 14px !important;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.71;
  letter-spacing: normal !important;
  color: #282c36;
  >span{
    font-family: Roboto;
    line-height: 1.21;
    letter-spacing: 0.27px !important;
  }
`

const Font24 = styled(Content.FontSize24)`
object-fit: contain;
font-weight: 900;
font-stretch: normal;
font-style: normal;
line-height: 1.5;
letter-spacing: -0.6px;
color: #282c36;



`