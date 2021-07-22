import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";

@inject("Partner", "Auth")
@observer
class ProposalCard extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <>
        <Card>
          {data && data.portfolio_set && (
            <ImgBox>
              <img src={data.portfolio_set[0].img_portfolio} />
            </ImgBox>
          )}
          <Content>
            <Name>{data.name}</Name>
            <Info>{data.deal}</Info>
            <Category>4</Category>
          </Content>
        </Card>
      </>
    );
  }
}

export default ProposalCard;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ffffff;
  box-shadow: 4px 5px 20px 0px rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  height: 390px;
  overflow: hidden;
  align-items: self-start;
`;

const ImgBox = styled.div`
  width: 100%;
  > img {
    width: 100%;
    height: 200px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 14px;
  box-sizing: border-box;
`;

const Name = styled.div`
  font-size: 18px;
  line-height: 40px;
  letter-spacing: -0.45px;
  color: #282c36;
  font-weight: bold;
`;

const Info = styled.div`
  font-size: 16px;
  line-height: 25px;
  letter-spacing: -0.4px;
  color: #86888c;
  font-weight: normal;
`;

const Category = styled.div``;
