import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Router from "next/router";
import Container from 'components/Container'

import RatioImage from 'components/RatioImage';
import * as Text from "components/Text";
import {BLACK, BLACK1, DARKGRAY, PRIMARY, WHITE} from 'static/style'

const person = "/static/icon/info/person.png";
const star = "/static/icon/info/star.png";


class Section2Container extends React.Component {
  render() {
    return (
        <CustomContainer>
            <Container>
              <Header>유통제품 제조 패키지 가격표</Header>
              
              <ItemBox>
                  <MainBox>
                    <Main>
                      <Text.FontSize82>A</Text.FontSize82>
                    </Main>
                    <MainTitle>
                      <Text.FontSize24>300,000원</Text.FontSize24>
                    </MainTitle>
                  </MainBox>

                  <Item>
                    <div class="Header">
                        <Text.FontSize26>도면 설계 작업이 필요 없는 생산제품</Text.FontSize26>
                    </div>
                    <div class="Body1">
                        <Text.FontSize26> ex) 봉제, 목제류</Text.FontSize26>
                    </div>
                    <table class="Body2">
                      {/* 테이블로 해보기 */}
                      <ListBox>
                        <List>
                          <Circle/>
                          <Text.FontSize24>생산 조건 기획</Text.FontSize24>
                        </List>
                        <List>
                          <Circle/>
                          <Text.FontSize24>생산 업체 수배&협상</Text.FontSize24>
                        </List>
                        <List>
                          <Circle/>
                          <Text.FontSize24>프로세스 설계</Text.FontSize24>
                        </List>
                      </ListBox>
                      <ListBox>
                        <List>
                          <Circle/>
                          <Text.FontSize24>보고서 제출</Text.FontSize24>
                        </List>
                        <List>
                          <Circle/>
                          <Text.FontSize24>보고서 제출</Text.FontSize24>
                        </List>
                      </ListBox>
                    </table>
                  </Item>
              </ItemBox>
              <ItemBox>
                  <MainBox>
                    <Main>
                      <Text.FontSize82>B</Text.FontSize82>
                    </Main>
                    <MainTitle>
                      <Text.FontSize24>800,000원</Text.FontSize24>
                    </MainTitle>
                  </MainBox>

                  <Item>
                    <div class="Header">
                        <Text.FontSize26>간단한 도면 설계 작업이 필요한 생산제품</Text.FontSize26>
                    </div>
                    <div class="Body1">
                        <Text.FontSize26>ex) 실리콘, 플라스틱, 금속류</Text.FontSize26>
                    </div>
                    <div class="Body2">
                      <ListBox>
                        <List>
                          <Circle/>
                          <Text.FontSize24>개발 기능 고도화</Text.FontSize24>
                        </List>
                        <List>
                          <Circle/>
                          <Text.FontSize24>생산 업체 수배&협상</Text.FontSize24>
                        </List>
                        <List>
                          <Circle/>
                          <Text.FontSize24>프로세스 설계</Text.FontSize24>
                        </List>
                      </ListBox>
                      <ListBox>
                        <List>
                          <Circle/>
                          <Text.FontSize24>보고서 제출</Text.FontSize24>
                        </List>
                        <List>
                          <Circle/>
                          <Text.FontSize24>기구설계</Text.FontSize24>
                        </List>
                      </ListBox>
                    </div>
                  </Item>
              </ItemBox>
              <ItemBox>
                  <MainBox>
                    <Main>
                      <Text.FontSize82>C</Text.FontSize82>
                    </Main>
                    <MainTitle>
                      <Text.FontSize24>2,000,000원</Text.FontSize24>
                      <Text.FontSize24>~ 협의</Text.FontSize24>
                    </MainTitle>
                  </MainBox>

                  <Item>
                    <div class="Header">
                        <Text.FontSize26>물성 고려 복잡한 도면 설계 작업이 필요한 생산제품</Text.FontSize26>
                    </div>
                    <div class="Body1">
                        <Text.FontSize26>ex) 특정 이상 내구성 확보, 방수</Text.FontSize26>
                    </div>
                    <div class="Body2">
                      <ListBox>
                        <List>
                          <Circle/>
                          <Text.FontSize24>개발 기능 고도화</Text.FontSize24>
                        </List>
                        <List>
                          <Circle/>
                          <Text.FontSize24>생산 업체 수배&협상</Text.FontSize24>
                        </List>
                        <List>
                          <Circle/>
                          <Text.FontSize24>프로세스 설계</Text.FontSize24>
                        </List>
                      </ListBox>
                      <ListBox>
                        <List>
                          <Circle/>
                          <Text.FontSize24>보고서 제출</Text.FontSize24>
                        </List>
                        <List>
                          <Circle/>
                          <Text.FontSize24>기구 설계</Text.FontSize24>
                        </List>
                      </ListBox>
                    </div>
                  </Item>
              </ItemBox>
              <ItemBox>
                  <MainBox>
                    <Main>
                      <Text.FontSize82>D</Text.FontSize82>
                    </Main>
                    <MainTitle>
                      <Text.FontSize24>4,000,000원<br/>~협의</Text.FontSize24>
                    </MainTitle>
                  </MainBox>

                  <Item>
                    <div class="Header">
                        <Text.FontSize26>특허 회피 설계가 필요한 생산제품</Text.FontSize26>
                    </div>
                    <div class="Body1">
                        <Text.FontSize26>ex) 타 특허를 피하고자 하는 제품</Text.FontSize26>
                    </div>
                    <div class="Body2">
                      <ListBox>
                        <List>
                          <Circle/>
                          <Text.FontSize24>생산 조건 기획</Text.FontSize24>
                        </List>
                        <List>
                          <Circle/>
                          <Text.FontSize24>생산 업체 수배&협상</Text.FontSize24>
                        </List>
                        <List>
                          <Circle/>
                          <Text.FontSize24>프로세스 설계</Text.FontSize24>
                        </List>
                      </ListBox>
                      <ListBox>
                        <List>
                          <Circle/>
                          <Text.FontSize24>선행기술자료 검토</Text.FontSize24>
                        </List>
                        <List>
                          <Circle/>
                          <Text.FontSize24>명세서 권리범위 검토</Text.FontSize24>
                        </List>
                        <List>
                          <Circle/>
                          <Text.FontSize24>보고서 제출</Text.FontSize24>
                        </List>
                      </ListBox>
                      <ListBox>
                        <List>
                          <Circle/>
                          <Text.FontSize24>기구 설계</Text.FontSize24>
                        </List>
                      </ListBox>
                    </div>
                  </Item>
              </ItemBox>

             
            </Container>
        </CustomContainer>
    );
  }
}

export default Section2Container;

const Circle = styled.div`
  background-color: #0933b3;
  width:10px;
  height:10px;
  border-radius: 50px;
  margin-top : auto ;
  margin-bottom : auto ;
`
const Main = styled.div`
  border-radius: 10px;
  -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px);
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  height: 60%;
  p { 
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.39;
    letter-spacing: -2.05px;
    color: #0933b3;
    padding:52px 0px;  
  }
`
const MainBox = styled.div`
  margin-top : 50px;
  margin-left : 60px;
  width: 22.7%;
  p {
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 0.67;
    letter-spacing: -0.6px;
    color: #0933b3;
  }

  
`
const MainTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 0.67;
  letter-spacing: -0.6px;
  text-align: center;
  color: var(--cobalt-blue);

  margin-top : 20px ;
`
const ListBox = styled.tr`
  padding-top : 20px; 
`
const List = styled.td`
  display : inline-flex;
  padding-right : 60px;
  p {
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.6;
    letter-spacing: -0.63px;
    text-align: left;
    color: #191919;
  }
  
`

const ItemBox = styled.div`
  display: flex;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.3);
  background-color: #f3f3f3;
  
  margin-bottom : 65px;
  margin-left : auto;
  margin-right : auto;

  /* -webkit-backdrop-filter: blur(30px);
  backdrop-filter: blur(30px); */

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100%);
    display: flex;
    flex-direction: row;
    align-items: left;
    > p {
      margin-top: 20px;
    }
  }
  @media (min-width: 768px) {
    width: 996px;
    height : 310px;
    > p {
      margin-top: 20px;
    }
  }
`
const Image = styled.img`
  width: 80px;
  height: 89px;
  margin : 85px 0px 0px 75px;
     
`;
const Star = styled.img`
  width: 134px;
  height: 31px;
`;


const Header = styled.div`
  object-fit: contain;
  font-size: 32px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.41;
  letter-spacing: normal;
  color: #505050;
  margin : auto ;
  text-align : center;
  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 50px;
    width: 290px;
    margin-bottom: 20px;
    font-size: 24px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-top: 50px;
    width: 290px;
    margin-bottom: 40px;
    font-size: 24px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-top: 70px;
    margin-bottom: 73px;
  }
  @media (min-width: 1300px) {
    padding-top: 150px;
    padding-bottom: 60px;
  }
`

const Item = styled.table`
  width : 100% ;
  margin: 40px 0 0 50px; 
  text-align : left;
  > div {
    font-stretch: normal;
    font-style: normal;
  }
  .Header {
      p {
      text-align : left ;
      font-weight: 700;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.73;
      letter-spacing: normal;
      color: #323232 !important;
      }
      
      margin-top : 6px;
    }
  .Body1 {
      display : inline-flex;
    p {
      text-align : left ; 
      font-weight: 500;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.73;
      letter-spacing: normal;
      color: #707070;
    }
    
  }
  .Body2 {
    display : block;
   	justify-content: space-between;

  }
`


const CustomContainer = styled.div`
  padding: 0px;
  width: 100%;
  p {
      text-align : center ;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc(100% - 40px);
    padding: 0 20px;
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
`

// const Container = styled.div`
//   margin-right: auto;
//   margin-left: auto;
//   text-align : center;
//   align-items: center;
//   /* @media (min-width: 0px) and (max-width: 767.98px) {
//     width: calc(100% - 40px);
//     padding: 0 20px;
//   }

//   @media (min-width: 768px) and (max-width: 991.98px) {
//     width: 720px;
//   }

//   @media (min-width: 992px) and (max-width: 1299.98px) {
//     width: 930px;
//   }

//   @media (min-width: 1300px) {
//     width: 1200px;
//   } */
// `

