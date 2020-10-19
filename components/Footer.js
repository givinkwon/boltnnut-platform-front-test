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

@inject('Auth')
@observer
class FooterComponent extends React.Component {
  render() {
    const {Auth} = this.props;

    return (
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
                  ​대표자 : 윤기열, 신지섭
                </Text.FontSize15>
                <Text.FontSize15 color="#fff" style={{marginBottom: 12}}>
                  사업자등록번호 390-87-01669
                </Text.FontSize15>
                <Text.FontSize15 color="#fff" style={{marginBottom: 12}}>
                  서울특별시 성북구 고려대로30길 4 2층
                </Text.FontSize15>
              </div>
            </CompanyInfo>
          </CompanyInfoContainer>
        </Container>
        <Container>
          <div>
            {/* <TextBox>
              <Text.FontSize14
                color={WHITE}
                fontWeight={500}
                onClick={() => Router.push("/notice")}
              >
                공지사항
              </Text.FontSize14>
              <Text.FontSize14
                color={WHITE}
                fontWeight={500}
                onClick={() => {
                  if (Auth.logged_in_partner) {
                    Router.push("/info?tab=2");
                  }
                  else {
                    Router.push("/info?tab=1");
                  }
                }}
              >
                이용안내
              </Text.FontSize14>
              <Text.FontSize14
                color={WHITE}
                fontWeight={500}
                onClick={() => Router.push("/store?tab=1")}
              >
                이용 요금
              </Text.FontSize14>
            </TextBox> */}
            <TextBox>
              <Text.FontSize18
                color={WHITE}
                fontWeight={500}
                onClick={() => Router.push("/partner")}
              >
                제조사 찾기
              </Text.FontSize18>
              <Text.FontSize18
                color={WHITE}
                fontWeight={500}
                onClick={() => Router.push("/magazine")}
              >
                인사이트
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
                개인정보 처리 방침
              </Text.FontSize18>
              {/* <Text.FontSize14
                color={WHITE}
                fontWeight={500}
                onClick={() => Router.push("/faq?tab=1")}
              >
                자주 묻는 질문
              </Text.FontSize14> */}
            </TextBox>
          </div>
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
            <Text.FontSize12 color="#fff" style={{marginBottom: 5}}>
              <SnsBox>
                <Sns src={instargram} onClick={() => window.open('http://www.instargram.com/boltnnut_korea')} />
                <Sns src={facebook} onClick={() => window.open('http://www.facebook.com/boltnnut6637')} />
                <Sns src={blog} onClick={() => window.open('http://www.blog.naver.com/boltnnut_korea')} />
              </SnsBox>
            </Text.FontSize12>
          </ContactInfoContainer>
        </Container>
      </Footer>
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
    left:62px;  
  }
  > div:nth-of-type(2) {
    position: relative; 
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
  /* padding-right: 15px;
  padding-left: 15px; */
  /* margin-right: auto;
  margin-left: auto; */

  /* @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 720px;
  }

  @media (min-width: 992px) and (max-width: 1299.98px) { 
    width: 930px;
  }

  @media (min-width: 1300px) { 
    width: 1200px;
  } */
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
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
    align-items: flex-start;
    
    > div:nth-of-type(2) {}
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
  > img:nth-of-type(1) {
    padding-left : 0;
  }
`;
const Sns = styled.img`
  cursor: pointer;
  height: 24px;
  padding : 17px;
`;
// const FontSize16 = styled.p`
//   font-family: 'Roboto', sans-serif;
// `;