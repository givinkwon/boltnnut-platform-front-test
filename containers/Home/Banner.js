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
          <Title fontWeight={700}>
            나에게 특화된 맞춤 제조사를<br/> 한 눈에 확인하세요.
          </Title>
          <ButtonBox>
            <Button
              id={'request'}
              backgroundColor={WHITE + "00"}
              borderColor={WHITE}
              onClick={() => Router.push("/request")}
            >
              <Text.FontSize32 color={WHITE} fontWeight={500} borderRadius={0} style={{height: 47, display: "flex", alignItems: "center"}}>
                제조사 찾기
              </Text.FontSize32>
            </Button>
          </ButtonBox>
        </Container>
      </Banner>
    );
  }
}

export default BannerConatiner;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  div:nth-of-type(1) {
    width: 366px;
    height: 92px;
    padding: 0 !important;
    margin-top: 120px;
    background-color: #0a2165;
    border: none;
    border-radius: 10px;
    :hover {
      background-color: #0933b3;//${WHITE};
      > p {
        color: ${WHITE}; !important;
      }

    }
    @media (min-width: 0px) and (max-width: 767.98px) {
        width : 40%
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
  	    width : 30%
    }

  }
`
const Banner = styled.div`
  background-position: center;
  background-size: cover;
  height: 772px;
  ${Container} {
    > p:nth-of-type(2) {
      margin-top: 8px;
    }
    > p:nth-of-type(3) {
      line-height: 1.3;
    }
  }
`;


// ed7d31
const Title = styled(Text.FontSize62)`
  width: 800px;
  height: 172px;
  padding-top: 202px;
  margin-right: auto;
  margin-left: auto;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 62px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: -1.55px;
  text-align: center;
  color: #191919;
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
        width : 100% !important;
        display : inline-block;
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
