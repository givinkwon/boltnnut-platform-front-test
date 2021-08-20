import React from "react";
import styled from "styled-components";

import Container from "components/Containerv1";
import Background from "components/Background";

import Buttonv1 from "components/Buttonv1";

const content1 = "static/images/request/content1.svg";
const content2 = "static/images/request/content2.svg";
const content3 = "static/images/request/content3.svg";
const content4 = "static/images/request/content4.svg";
const content5 = "static/images/request/content5.svg";
const name = "static/images/request/HCLab.svg";
const star = "static/images/request/star.svg";

class RequestMain extends React.Component {
  render() {
    return (
      <Background style={{ backgroundColor: "#f6f6f6" }}>
        <Container>
          <Body>
            <Header>클라이언트 분들께 검증된 볼트앤너트를 만나보세요.</Header>
            <ReviewBox>
              <DevideBox>
                <ReviewSubBox style={{ height: "100%" }}>
                  <ReviewHeader>
                    <img src={name} style={{ marginRight: 15 }} />
                    <img src={star} />
                  </ReviewHeader>
                  <Title>
                    개발 업체 찾는 기간이
                    <br />
                    3달 단축됐습니다.
                  </Title>
                  <img
                    src={content1}
                    style={{ width: 306, height: 242, marginBottom: 50 }}
                  />
                  <Date>2020.06.25</Date>
                </ReviewSubBox>
              </DevideBox>

              <DevideBox>
                <ReviewSubBox>
                  <ReviewHeader>
                    <Name>끌린다</Name>
                    <img src={star} />
                  </ReviewHeader>
                  <Content
                    src={content2}
                    style={{
                      width: 320,
                      height: 76,
                      marginBottom: 30,
                      marginTop: 20,
                    }}
                  />
                  <Date>2021.06.25</Date>
                </ReviewSubBox>

                <ReviewSubBox>
                  <ReviewHeader>
                    <Name>코스메틱 회사</Name>
                    <img src={star} />
                  </ReviewHeader>
                  <Content
                    src={content3}
                    style={{
                      width: 320,
                      height: 103,
                      marginBottom: 20,
                      marginTop: 15,
                    }}
                  />
                  <Date>2021.06.30</Date>
                </ReviewSubBox>
              </DevideBox>

              <DevideBox>
                <ReviewSubBox>
                  <ReviewHeader>
                    <Name>TAJO</Name>
                    <img src={star} />
                  </ReviewHeader>
                  <Content
                    src={content4}
                    style={{
                      width: 320,
                      height: 103,
                      marginBottom: 8,
                      marginTop: 15,
                    }}
                  />
                  <Date>2020.08.30</Date>
                </ReviewSubBox>
                <ReviewSubBox>
                  <ReviewHeader>
                    <Name>1인 기업</Name>
                    <img src={star} />
                  </ReviewHeader>
                  <Content
                    src={content5}
                    style={{
                      width: 320,
                      height: 103,
                      marginBottom: 23,
                      marginTop: 12,
                    }}
                  />
                  <Date>2021.07.20</Date>
                </ReviewSubBox>
              </DevideBox>
            </ReviewBox>
          </Body>
        </Container>
      </Background>
    );
  }
}

export default RequestMain;

const Body = styled.div`
  width: 100%;
  height: 939px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: NotoSansCJKkr;
`;

const Header = styled.span`
  font-size: 32px;
  line-height: 1.56;
  letter-spacing: -0.8px;
  text-align: center;
  color: #555963;
`;

const ReviewBox = styled.div`
  width: 1180px;
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
`;

const DevideBox = styled.div`
  height: 532px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ReviewSubBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 30px 20px 30px;
  border-radius: 10px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  background-color: #fff;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
`;

const Name = styled.span`
  margin-right: 15px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  letter-spacing: -0.4px;
  color: #191919;
`;

const Title = styled.span`
  font-size: 22px;
  font-weight: 500;
  line-height: 1.64;
  letter-spacing: -0.55px;
  text-align: left;
  color: #1e2222;
  margin-bottom: 30px;
`;

const Content = styled.img``;

const Date = styled.div`
  font-size: 14px;
  line-height: 1.64;
  letter-spacing: -0.35px;
  color: #c6c7cc;
  text-align: right;
`;
