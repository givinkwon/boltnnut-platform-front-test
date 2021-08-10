import React from "react";
import styled from "styled-components";
import Containerv1 from "../../components/Containerv1";
import Background from "../../components/Background";
import * as Title from "../../components/Title";
import * as Text from "../../components/Text";

const boltnnutlogo = "/static/images/boltnnutlogo.svg";
const logo1 = "/static/images/logo1.svg";
const logo2 = "/static/images/logo2.svg";
const logo3 = "/static/images/logo3.svg";
const logo4 = "/static/images/logo4.svg";
const logo5 = "/static/images/logo5.svg";
const stars = "/static/images/stars.svg";

class Banner5Container extends React.Component {
  render() {
    return (
      <CustomBackground>
        <Container>
          <Title32>클라이언트 분들께 검증된 볼트앤너트를 만나보세요.</Title32>

          <ReviewContainer>
            <MainReviewBox>
              <div style={{ width: "324px" }}>
                <ImageBox>
                  <img src={logo4} />
                  <img src={stars} />
                </ImageBox>

                <Text22>
                  개발 업체 찾는기간이
                  <br /> 3달이 단축됐습니다.
                </Text22>
                <Text18>
                  처음에는 100개 정도만 양산을 할 생각으로 여러 업체를
                  찾아다녔는데 괜찮은 업체를 찾기가 정말 힘들었습니다.
                  <b
                    style={{
                      fontWeight: "bold",
                      color: "#000000",
                      backgroundColor: "#eaf0fa",
                    }}
                  >
                    업체들과 미팅을 할 때 제조 관련 용어를 몰라 힘이 들었는데,{" "}
                  </b>
                  볼트앤너트를 통해 실질적으로 도움이 되는 다양한 제조 지식을
                  얻을 수 있었습니다. 무엇보다도 볼트앤너트를 통해 좋은 업체들을
                  만난 것이 가장 큰 도움이 되었습니다.
                </Text18>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "63px",
                  }}
                >
                  <Text14>2020.06.25</Text14>
                </div>
              </div>
            </MainReviewBox>

            {/* MiniReview */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "792px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <MiniReviewBox>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "324px",
                      }}
                    >
                      <ImageBox>
                        <img src={logo2} />
                        <img src={stars} />
                      </ImageBox>

                      <Text15>
                        볼트앤너트는 단순히 설계를 해주고 제조사들과의 연결 만
                        해주는 것이 아니라{" "}
                        <b
                          style={{
                            fontWeight: "bold",
                            color: "#000000",
                            backgroundColor: "#eaf0fa",
                          }}
                        >
                          함께 고민을 나누어 준다는 것이 너무 감사했고,
                          만족스러웠습니다.
                        </b>
                      </Text15>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "38px",
                        }}
                      >
                        <Text14>2021.06.25</Text14>
                      </div>
                    </div>
                  </MiniReviewBox>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <MiniReviewBox>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "324px",
                      }}
                    >
                      <ImageBox>
                        <img src={logo5} />
                        <img src={stars} />
                      </ImageBox>

                      <Text15>
                        <b
                          style={{
                            fontWeight: "bold",
                            color: "#000000",
                            backgroundColor: "#eaf0fa",
                          }}
                        >
                          비전문가다보니 업체 찾고 소통하기가 쉽지 않았습니다.
                        </b>{" "}
                        지인소개를 통해 볼트앤너트를 알게 되어 문의를 드렸는 데
                        그런 취약점을 잘 채워주시는 것 같아 감사드립니다.
                      </Text15>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "38px",
                        }}
                      >
                        <Text14>2020.08.30</Text14>
                      </div>
                    </div>
                  </MiniReviewBox>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "792px",
                  marginTop: "24px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <MiniReviewBox>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "324px",
                      }}
                    >
                      <ImageBox>
                        <img src={logo3} />
                        <img src={stars} />
                      </ImageBox>

                      <Text15>
                        볼트앤너트에서 업체를 찾다가 '맞춤형 문의'를 하였는데,{" "}
                        <b
                          style={{
                            fontWeight: "bold",
                            color: "#000000",
                            backgroundColor: "#eaf0fa",
                          }}
                        >
                          일반인의 수준에 맞추어 설명
                        </b>
                        을 해주셨고, 또 제작이 불가능한 것들도{" "}
                        <b
                          style={{
                            fontWeight: "bold",
                            color: "#000000",
                            backgroundColor: "#eaf0fa",
                          }}
                        >
                          거절하지 않고 충분히 고려해 주신다는 점이 큰 장점
                        </b>
                        같습니다.
                      </Text15>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "38px",
                        }}
                      >
                        <Text14>2021.06.30</Text14>
                      </div>
                    </div>
                  </MiniReviewBox>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <MiniReviewBox>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "324px",
                      }}
                    >
                      <ImageBox>
                        <img src={logo1} />
                        <img src={stars} />
                      </ImageBox>

                      <Text15>
                        업체 찾기가 힘들었는데{" "}
                        <b
                          style={{
                            fontWeight: "bold",
                            color: "#000000",
                            backgroundColor: "#eaf0fa",
                          }}
                        >
                          담당자 분께서 본인 프로젝트 처럼 대응
                        </b>
                        해주시고 업체와 미팅에도 동석하여{" "}
                        <b
                          style={{
                            fontWeight: "bold",
                            color: "#000000",
                            backgroundColor: "#eaf0fa",
                          }}
                        >
                          직접 말하 기 어려운 부분을 업체와 소통해주는 부분
                        </b>
                        이 가장 마음 에 들었습니다.
                      </Text15>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "38px",
                        }}
                      >
                        <Text14>2021.07.20</Text14>
                      </div>
                    </div>
                  </MiniReviewBox>
                </div>
              </div>
            </div>
          </ReviewContainer>
        </Container>
      </CustomBackground>
    );
  }
}

export default Banner5Container;

const CustomBackground = styled(Background)`
  height: 939px;
  background-color: #f6f6f6;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 140px;
`;

const Title32 = styled(Title.FontSize32)`
  font-size: 32px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: -0.8px;
  color: #555963;
`;

const ReviewContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 1200px;
  margin-top: 80px;
`;

const MainReviewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 384px;
  height: 532px;
  border-radius: 10px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
`;

const MiniReviewBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 384px;
  height: 254px;
  border-radius: 10px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
`;

const ImageBox = styled.div`
  display: flex;
  align-itmes: center;
  gap: 10px;
`;

const Text14 = styled(Text.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.64;
  letter-spacing: -0.35px;
  color: #c6c7cc;
`;

const Text15 = styled(Text.FontSize15)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.53;
  letter-spacing: -0.38px;
  color: #555963;
  margin-top: 43px;
`;

const Text16 = styled(Text.FontSize16)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.4px;
  color: #0933b3;
`;

const Text18 = styled(Text.FontSize18)`
  margin-top: 48px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.45px;
  color: #86888c;
`;

const Text22 = styled(Text.FontSize22)`
  margin-top: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.64;
  letter-spacing: -0.55px;
  color: #1e2222;
`;
