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
          <Title32>클라이언트 분들의 "바로발주" 후기.</Title32>

          <ReviewContainer>
            <MainReviewBox>
              <div style={{ width: "324px" }}>
                <ImageBox>
                  <img src={logo4} />
                  <img src={stars} />
                </ImageBox>

                <Text22>
                투명하게 바로 견적이 나오는 서비스
                  <br /> 200% 만족합니다.
                </Text22>
                <Text18>
                기존 거래처가 계속 견적을 높게 불러서 인터넷에서 새로운 업체를 찾다가 바로공장을 찾게 되었습니다. 
                  <b
                    style={{
                      fontWeight: "bold",
                      color: "#000000",
                      backgroundColor: "#eaf0fa",
                    }}
                  >
                    투명하게 바로 견적이 나오는 서비스 200% 만족합니다.{" "}
                  </b>

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
                      지인 통해서 알게 되었어요. 단품 발주할 때 좋다고...
                      {" "}
                        <b
                          style={{
                            fontWeight: "bold",
                            color: "#000000",
                            backgroundColor: "#eaf0fa",
                          }}
                        >
                          납기가 촉박했는데 추석 연휴 때도 작업을 해주셔서 참 죄송하면서도 고마웠습니다.
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
                      며칠 고생하며 견적 받았던 여러 업체 보다 10% 정도는 싸길래 바로 결제를 했습니다. 첫 발주때는 품질이 100% 맘에 드는 건 아니었는데
                        <b
                          style={{
                            fontWeight: "bold",
                            color: "#000000",
                            backgroundColor: "#eaf0fa",
                          }}
                        >
                          이후에 담당자분이 특히 신경써주셔서 빠르게 가공품이 필요할 때마다 이용 중입니다.
                        </b>
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
                        연구용 부품이라 업체 찾기가 힘들었는데{" "}
                        <b
                          style={{
                            fontWeight: "bold",
                            color: "#000000",
                            backgroundColor: "#eaf0fa",
                          }}
                        >
                          담당자 분께서 본인 프로젝트 처럼 대응
                        </b>
                        해주시고 성능 나올 때까지 보완해주셔서 좋았습니다.{" "}
                        
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
