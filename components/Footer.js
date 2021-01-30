import React from "react";
import styled from "styled-components";
import Router from "next/router";
import {inject, observer} from "mobx-react";

// import Container from "./Container";
import * as Text from "./Text";
import { PRIMARY, WHITE } from "static/style";


const logo_footer = "/static/images/logo.png";
const instargram = "/static/images/instargram.png";
const facebook = "/static/images/facebook.png";
const blog = "/static/images/blog.png";
const blog_post = "/static/images/blog_post.png";

@inject('Auth')
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
  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    this.setState({ ...this.state, width: window.innerWidth });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  };
  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };
  render() {
    const {Auth} = this.props;
    const { width } = this.state;
    return (
    <>
    { width > 768 ? (
      <>
      <Footer>
        <Container style={{marginBottom: 0}}>
          <CompanyInfoContainer style={{paddingRight: 0}}>
            <Image src={logo_footer} onClick={() => Router.push("/")} />
            <CompanyInfo>
              <div>
                <Text.FontSize15 color="#fff" style={{marginBottom: 12}}>
                  (주)볼트앤너트
                </Text.FontSize15>
                <Text.FontSize15 color="#fff" style={{marginBottom: 12}}>
                  ​대표자 : 윤기열
                </Text.FontSize15>
                <Text.FontSize15 color="#fff" style={{marginBottom: 12}}>
                  사업자등록번호 390-87-01669
                </Text.FontSize15>
                <Text.FontSize15 color="#fff" style={{marginBottom: 12}}>
                  서울특별시 성북구 고려대로 27길 4, 3층
                </Text.FontSize15>
              </div>
            </CompanyInfo>
          </CompanyInfoContainer>
        </Container>
        <Container>
            <TextBox>
              <Text.FontSize18
                color={WHITE}
                fontWeight={500}
                onClick={() => Router.push("/request")}
              >
                가건젹 받기
              </Text.FontSize18>
              <Text.FontSize18
                color={WHITE}
                fontWeight={500}
                onClick={() => Router.push("/magazine")}
              >
                제조 인사이트
              </Text.FontSize18>

              <Text.FontSize18
                color={WHITE}
                fontWeight={500}
                onClick={() => Router.push("/term/policy")}
              >
                이용약관
              </Text.FontSize18>
              <Text.FontSize18
                color={WHITE}
                fontWeight={500}
                onClick={() => Router.push("/term/personal")}
              >
                개인정보처리방침
              </Text.FontSize18>
            </TextBox>
        </Container>
        <Container>
          <ContactInfoContainer>
            <Text.FontSize25 color="#fff" style={{marginBottom: 4},{height :30}}>
              ​CONTACT
            </Text.FontSize25>
            <Text.FontSize33 color="#fff" style={{}}>
              ​02.926.6637
            </Text.FontSize33>
            <Text.FontSize15 color="#fff" style={{marginBottom: 12}}>
              평일 오전 10시 - 오후 7시 
            </Text.FontSize15>
            <Text.FontSize16 color="#fff" style={{marginBottom: 5},{fontFamily: 'Roboto, sans-serif'}}>
              ​E. boltnnut@boltnnut.com
            </Text.FontSize16>
              <SnsBox>
                <Sns src={instargram} onClick={() => window.open('http://www.instargram.com/boltnnut_korea')} />
                <Sns src={facebook} onClick={() => window.open('http://www.facebook.com/boltnnut6637')} />
                <Sns src={blog} onClick={() => window.open('https://blog.naver.com/boltnnut_korea')} />
                <Sns src={blog_post} onClick={() => window.open('https://post.naver.com/boltnnut_korea')} />           
              </SnsBox>
          </ContactInfoContainer>
        </Container>
      </Footer>
      </>
      ) : (
         <MobileFooter>
           <CompanyInfoContainer>
             <div style={{flexDirection: "row", display: "block", position: "relative"}}>
             <CompanyInfo>
               <span> (주) 볼트앤너트 </span>
               <span> 대표자 윤기열, 신지섭</span>
               <span> 사업자등록번호 390-87-01669</span>
               <span> 서울특별시 성북구 고려대길30길 4 2층</span>
             </CompanyInfo>
             <CompanyInfo2>
               <span> CONTACT </span>
               <span> 02-926-6637 </span>
               <span> 평일 오전 10시~오후7시 </span>
               <span> boltnnut@boltnnut.com </span>
               <SnsBox>
                <Sns src={facebook} onClick={() => window.open('http://www.facebook.com/boltnnut6637')} />
                <Sns src={instargram} onClick={() => window.open('http://www.instargram.com/boltnnut_korea')} />
                <Sns src={blog} onClick={() => window.open('https://blog.naver.com/boltnnut_korea')} />
                <Sns src={blog_post} onClick={() => window.open('https://post.naver.com/boltnnut_korea')} />
              </SnsBox>
             </CompanyInfo2>
             </div>
             <MobileContainer>
               <span
                onClick={() => Router.push("/partner")}> 제조사 찾기 </span>
               <span> 자주찾는 질문 </span>
               <span
                onClick={() => Router.push("/term/policy")}> 이용약관 </span>
               <span
                onClick={() => Router.push("/term/personal")}> 개인정보 처리 방침 </span>
             </MobileContainer>
           </CompanyInfoContainer>
         </MobileFooter>
      )
    }
  </>
    );
  }
}

export default FooterComponent;

const Footer = styled.div`
  background-color: ${PRIMARY};
  padding: 99px 0px;
  display : inline-flex;
  justify-content: center;
  > div:nth-of-type(1) {
    position: relative;
  }
  > div:nth-of-type(2) {
    position: relative;
    width: 50%;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
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
// 여기
const Container = styled.div`
`

const TextBox = styled.div`
  display: flex;
  margin-bottom: 20px;
  :last-of-type {
    margin-bottom: 0;
  }
  p {
    cursor: pointer;
    width: auto;
    margin-left: 0px;
    text-align: center;
    font-weight: 100;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.45px;

    :nth-of-type(1) {
      margin-left: 0px;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    p {
      width: 12px;
      margin-left: 0px;
      :nth-of-type(1) {
        margin-left: 0px;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    p {
      width: 180px;
      margin-left: 0px;
      :nth-of-type(1) {
        margin-left: 0px;
      }
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
    p {
      width: 232px;
      margin-left: 0px;
      :nth-of-type(1) {
        margin-left: 0px;
      }
    }
  }
  @media (min-width: 1300px) { 
    p {
      width: 300px;
      margin-left: 0px;
      :nth-of-type(1) {
        margin-left: 0px;
      }
    }
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
const ContactInfoContainer = styled.div`
  p {
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.47;
    letter-spacing: -0.38px;
    top: 50%;
  }
  > p:nth-of-type(1) {
    font-weight: 500;
    line-height: 1.2;
    letter-spacing: 0.48px; 
  }
  > p:nth-of-type(2) {
    margin: 10px 0;
    font-weight: 500;
    line-height: 0.76;
    letter-spacing: normal; 
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