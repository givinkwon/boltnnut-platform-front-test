import React from "react";
import styled from "styled-components";
import * as Title from "components/Title";
import StarRatingComponent from "react-star-rating-component";

const requestimg1 = "static/images/request/requestimg1.svg";
const requestimg2 = "static/images/request/requestimg2.svg";
const requestimg3 = "static/images/request/requestimg3.svg";

class RequestMain extends React.Component {
  render() {
    const card = [
      {
        img : requestimg1,
        title: "모든 제조사를 한눈에!",
        highlight: "원하는 제조사", 
        content : "에게 직접 의뢰를 요청할 수 있어요.",
      },
      {
        img : requestimg2,
        title: "보안 걱정은 NO!",
        highlight: "공개/비공개 여부", 
        content : "에 따라 선별된 의뢰를 요청할 수 있어요.",
      },
      {
        img : requestimg3,
        title: "전문가 상담이 무료!",
        highlight: "볼트앤너트 전문 의뢰 상담가가", 
        content : "상시 도움을 드려요.",
      },
    ];
    return (
      <Container>
      <InnerContainer>
        <Title20 >볼트앤너트 서비스만의 3가지 차별점!</Title20>
        <CardContainer>
          {card.map((v, idx) => (
            <div>
              <CardBox>
                <InnerCardBox>
                  <img src={v.img} style={{height : 109.3, marginTop: 55.9}}/>
                  <div style={{ display: "inline-flex", marginTop: "20px" }}>
                    <Title16>{v.title}</Title16>
                  </div>
                  <Title14 style={{width : 138}}>
                    <span style={{color : "#0933b3"}}>
                      {v.highlight}
                    </span>
                    <span>
                    {v.content}
                    </span>
                  </Title14>
                </InnerCardBox>
              </CardBox>
            </div>
          ))}
        </CardContainer>
      </InnerContainer>
    </Container>
    );
  }
}

export default RequestMain;

const Container = styled.div`
  height: 100%;
  margin-top: 70px;
  background-color: #f6f6f6;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height : 576px;
`;

const Title20 = styled(Title.FontSize20)`
  margin-top : 60px;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: -0.5px;
  color: #111111;
`;

const CardBox = styled.div`
  display: flex;
  justify-content: center;
  width: 283px;
  margin-left : 46px;
  height : 335px;
  border-radius: 10px;
  background-color: #ffffff;
  margin-top: 50px;
  margin-bottom : 60px;
  margin-right: 8px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
`;

const InnerCardBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 75%;
`;

const Title16 = styled(Title.FontSize16)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  letter-spacing: -0.33px;
  color: #555963;
  text-align: center;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  margin-left : auto;
  margin-right : auto;
  margin-bottom : 40px;
`;

const Title14 = styled(Title.FontSize14)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.46;
  color: #555963;
  text-align: center;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  margin-left : auto;
  margin-right : auto;
`;


const CardContainer = styled.div`
  display: inline-flex;
  position: relative;
  width: 100%;
  overflow-x: scroll;
  height: 576px;

  ::-webkit-scrollbar {
    display: none;
  }
`;
