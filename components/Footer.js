import React from "react";
import styled from "styled-components";
import Router from "next/router";
import {inject, observer} from "mobx-react";

import Container from "./Container";
import * as Text from "./Text";
import { PRIMARY, WHITE } from "static/style";

@inject('Auth')
@observer
class FooterComponent extends React.Component {
  render() {
    const {Auth} = this.props;

    return (
      <Footer>
        <Container style={{marginBottom: 40}}>
          <Text.FontSize28 color="#fff" fontWeight={700}>
            (주) 볼트앤너트
          </Text.FontSize28>
          <CompanyInfo>
            <div>
              <Text.FontSize12 color="#fff">
                서울특별시 성북구 고려대로30길 4 2층
              </Text.FontSize12>
              <Text.FontSize12 color="#fff">
                사업자등록번호 390-87-01669
              </Text.FontSize12>
              <Text.FontSize12 color="#fff">
                ​대표자 : 윤기열, 신지섭
              </Text.FontSize12>
            </div>
          </CompanyInfo>
          <div style={{marginTop: 10}}>
            <Text.FontSize12 color="#fff" style={{marginBottom: 5}}>
              ​T. 02.926.6637
            </Text.FontSize12>
            <Text.FontSize12 color="#fff">
              ​E. boltnnut@boltnnut.com
            </Text.FontSize12>
          </div>
        </Container>

        <Container>
          <div>
            <TextBox>
              <Text.FontSize14
                color={WHITE}
                fontWeight={500}
                onClick={() => Router.push("/notice")}
              >
                공지사항
              </Text.FontSize14>
              {/*<Text.FontSize14
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
              </Text.FontSize14>*/}
              <Text.FontSize14
                color={WHITE}
                fontWeight={500}
                onClick={() => Router.push("/store?tab=1")}
              >
                이용 요금
              </Text.FontSize14>
            </TextBox>
            <TextBox>
              <Text.FontSize14
                color={WHITE}
                fontWeight={500}
                onClick={() => Router.push("/term/policy")}
              >
                이용약관
              </Text.FontSize14>
              <Text.FontSize14
                color={WHITE}
                fontWeight={500}
                onClick={() => Router.push("/faq?tab=1")}
              >
                자주 묻는 질문
              </Text.FontSize14>
              <Text.FontSize14
                color={WHITE}
                fontWeight={500}
                onClick={() => Router.push("/term/personal")}
              >
                개인정보 처리 방침
              </Text.FontSize14>
            </TextBox>
          </div>
        </Container>
      </Footer>
    );
  }
}

export default FooterComponent;

const Footer = styled.div`
  background-color: ${PRIMARY};
  padding: 40px 0px;
  
  > div:nth-of-type(1) {
    margin-bottom: 50px;
  }
`;
const TextBox = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  
  :last-of-type {
    margin-bottom: 0;
  }
  
  p {
    cursor: pointer;
    width: 120px;
    margin-left: 30px;
    :nth-of-type(1) {
      margin-left: 0px;
    }
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    p {
      width: 100px;
      margin-left: 25px;
      :nth-of-type(1) {
        margin-left: 0px;
      }
    }
  }
  @media (min-width: 768px) {
    p {
      width: 120px;
      margin-left: 30px;
      :nth-of-type(1) {
        margin-left: 0px;
      }
    }
  }
`;
const CompanyInfo = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    
    > p {
      margin-bottom: 5px;
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
