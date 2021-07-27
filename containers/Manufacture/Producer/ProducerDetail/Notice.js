import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";

const closeImg = "/static/images/producer/close.svg";

@inject("Partner", "Auth")
@observer
class NoticeCard extends React.Component {
  render() {
    const { src, content } = this.props;
    return (
      <>
        <Card>
          <content>
            이 제조사가 마음에 드시나요? <span>[프로젝트 의뢰하기]</span> 버튼을
            눌러 지금 바로 프로젝트를 시작해보세요!
          </content>
          {/* <img src={closeImg} /> */}
        </Card>
      </>
    );
  }
}

export default NoticeCard;

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #c6c7cc;
  background-color: #f6f6f6;
  border-radius: 5px;
  padding: 19px;
  box-sizing: border-box;
  > content {
    font-size: 15px;

    line-height: 24px;
    letter-spacing: -0.4px;
    color: #282c36;
    font-weight: normal;
    > span {
      color: #0933b3;
      font-weight: bold;
    }
  }
`;
