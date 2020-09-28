import React from "react";
import styled from "styled-components";
import Router from "next/router";

import Container from "components/Container";
import Button from "components/Button";
import * as Text from "components/Text";
import { WHITE } from "static/style";
import * as AnswerAPI  from 'axios/Answer'

const search_ic = "static/icon/search.png";

class BannerConatiner extends React.Component {
  render() {
    return (
      <Banner>
        <Container>

          <Title color={WHITE} fontWeight={700} style={{marginTop: 8}}>
            내 제품에 딱 맞는 <Strong>제품개발업체의</Strong><br/>
            가견적을 <Strong>빠르고 쉽게</Strong> 받아보세요<br/>
          </Title>

          <Subtitle color={WHITE} style={{marginBottom: 4}}>
            <W50 left>
            가전제품부터 산업장비까지, <Bold>3900여 개 전문업체</Bold>가 <br/>
            당신의 제품기획을 현실로 만들어드립니다.
            </W50>
            <W50 right>
            <ButtonBox>
                <Button
                id={'request'}
                backgroundColor={WHITE + "00"}
                borderColor={WHITE}
                onClick={() => Router.push("/request")}
                >
                <Text.FontSize24 id={'request_text'} color={WHITE} fontWeight={500} borderRadius={0}>
                    무료로 가견적 받기
                </Text.FontSize24>
                </Button>
            </ButtonBox>
            </W50>

          </Subtitle>



          {
            /*
            <Text.FontSize20 color={WHITE} style={{marginBottom: 4}}>
              다양한 제조 전문가들의 포트폴리오를 확인해보세요
            </Text.FontSize20>
            <Text.FontSize20 color={WHITE}>
            전문가 정보 무료로 찾아보고 나에게 딱 맞는 전문가에게 제품 제조를 맡겨보세요
            </Text.FontSize20>
             */
          }
        </Container>
      </Banner>
    );
  }
}

export default BannerConatiner;

const ButtonBox = styled.div`
  height : 64px;
  width : 227px;
  display : inline-block;
  div:nth-of-type(1) {
    margin-right: 10px;
    width: 100% !important;
    height: fit-content;
    padding: 15px 0 !important;
    background-color: #ffc000 !important;;
    border: none;
    border-radius: 30px;
     @media (min-width: 0px) and (max-width: 767.98px) {
        margin-top: 30px;
    }

    > p {

        color: #061953 !important;
        width: 161px !important;
        height: 27px !important;
        font-size: 17px !important;
        font-weight: bold;
        text-align: center;
        @media (min-width: 0px) and (max-width: 767.98px) {
            padding-top: 5px;
        }
      }
    :hover {
      background-color: ${WHITE};
      > p {

      }
    }
    @media (min-width: 0px) and (max-width: 767.98px) {
        width : 50%
        padding-top: 5px;
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
  	    width : 30%
    }
  }
`;
const Banner = styled.div`
  background-image: url("/static/images/banner.jpg");
  background-position: center;
  background-size: cover;
  height: 440px;
  ${Container} {
    padding: 75px 0;
    > p:nth-of-type(2) {
      margin-top: 8px;
    }
    > p:nth-of-type(3) {
      line-height: 1.3;
    }
  }
`;


// ed7d31
const Title = styled(Text.FontSize40)`
  margin-bottom: 25px;

  line-height: 1.3em;
  word-break: keep-all;
  @media (min-width: 0px) and (max-width: 767.98px) {
        text-align: center;
    }
`

const Subtitle = styled(Text.FontSize20)`
  line-height: 1.4em;
  font-Weight : 500;
  width : 1200px !important;
  display : inline-flex;
  > div:nth-of-type(2) {
      text-align: right;
    }

  @media (min-width: 0px) and (max-width: 369.98px) {
        width : 100% !important;
        display : inline-block;
        font-size : 12px;
        text-align: center;
    }
  @media (min-width: 370px) and (max-width: 479.98px) {
        width : 100% !important;
        display : inline-block;
        text-align: center;
    }
  @media (min-width: 480px) and (max-width: 767.98px) {
        width : 480px !important;
        text-align: center;
    }
  @media (min-width: 768px) and (max-width: 991.98px) {
  	    width : 720px !important;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  	    width : 900px !important;
  }
`;

const Strong = styled.span`
  color: #ffc000 !important;
`;

const Bold = styled.span`
  font-Weight : 700;
`;

const W100 = styled.div`
  width: 100%;
`
const W50 = styled.div`
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 100%;
    text-align: center !important;
  }
  @media (min-width: 768px) {
    width: 50%;
  }
`
