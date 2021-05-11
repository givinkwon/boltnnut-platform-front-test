import React from "react";
import styled, { css } from "styled-components";
import * as Content from "components/Content";
const toolBarImg = "/static/images/project/ToolBar.svg";
const callImg = "/static/images/project/Call.svg";
const messagesImg = "/static/images/project/Messages.svg";

class ChatItemContainer extends React.Component {
  render() {
    return (
      <>
        <PartnerBox onClick={() => this.modalHandler(data.id)}>
          <PartnerInfo>
            <img
              // src={
              //   this.props.logo &&
              //   this.props.logo
              // }
              src={
                "https://boltnnutplatform.s3.amazonaws.com/media/partner/1.png"
              }
              width={36}
              height={36}
            ></img>
            <Font18 style={{ marginLeft: 10 }}>
              {this.props.name && this.props.name}
            </Font18>
          </PartnerInfo>
          <Font16>
            " 프로젝트 보고 연락드립니다 . 비공개 자료 공개해주실수 있나요 "
          </Font16>
          <IconBox>
            <Icon>
              <img src={toolBarImg}></img>
            </Icon>
            <Icon>
              <img src={callImg}></img>
            </Icon>
            <Icon>
              <img src={messagesImg}></img>
              <ChatNotice>
                <Font14>N</Font14>
              </ChatNotice>
            </Icon>
          </IconBox>
        </PartnerBox>
      </>
    );
  }
}

export default ChatItemContainer;
const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10000;
  background: #00000080;
`;
const Icon = styled.div`
  position: relative;
`;
const Font14 = styled(Content.FontSize14)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.86;
  letter-spacing: -0.35px;
  text-align: left;
  color: #ffffff;
`;
const ChatNotice = styled.div`
  position: absolute;
  width: 22px;
  height: 22px;
  // bottom: 15px;
  bottom: 8px;
  left: 12px;
  border-radius: 50%;
  // padding: 3px 7px 2px;
  display: ${(props) => (props.active ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  object-fit: contain;
  background-color: #ff3400;
`;
const IconBox = styled.div`
  width: 110px;
  display: flex;
  justify-content: space-between;
`;
const PartnerInfo = styled.div`
  display: flex;
`;
const PartnerBox = styled.div`
  margin-bottom: 12px;
  width: 100%;
  height: 56px;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: var(--white);
  display: flex;
  // justify-content: space-around;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px 0 28px;
`;

const Font16 = styled(Content.FontSize16)`
  font-weight: normal;
  letter-spacing: -0.4px !important;
  color: #282c36;
  line-height: 1.5;
`;

const Font18 = styled(Content.FontSize18)`
  color: #282c36;
  display: flex;
  align-items: center;
  line-height: 1.5;
  justify-content: center;
  letter-spacing: -0.45px !important;
`;
