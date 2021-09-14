import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

let dataList = [];

@inject("Partner", "Auth")
@observer
class ProposalCard extends React.Component {
  componentDidMount = async () => {
    const { Partner, data, idx, categoryData } = this.props;
    await Partner.getBusinessCategory(data.id);
  };

  render() {
    const { data, width } = this.props;

    dataList.push(data);

    return (
      <>
        {width > 767.98 ? (
          <Card height={this.props.height}>
            {data && data.portfolio_set.length !== 0 && (
              <ImgBox>
                <img src={data.portfolio_set[0].img_portfolio} />
              </ImgBox>
            )}
            <Content>
              <InnerBox>
                <Name>{data.name}</Name>
                <Info>{data.history && data.history.length >= 40 ? data.history.slice(0, 40) + "..." : data.history}</Info>
              </InnerBox>
            </Content>
          </Card>
        ) : (
          <Card height={this.props.height}>
            {data && data.portfolio_set.length !== 0 && (
              <ImgBox>
                <img src={data.portfolio_set[0].img_portfolio} />
              </ImgBox>
            )}
            <Description>
              <Content>
                <InnerBox>
                  <Name>{data.name}</Name>
                  <Info>{data.history && data.history.length >= 40 ? data.history.slice(0, 40) + "..." : data.history}</Info>
                </InnerBox>
              </Content>
            </Description>
          </Card>
        )}
      </>
    );
  }
}

export default ProposalCard;

const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e1e2e4;
  height: 309px;
`;

const ImgBox = styled.div`
  width: 100%;
  > img {
    width: 100%;
    height: 200px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 30%;
    > img {
      height: 150px;
    }
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

const Name = styled.p`
  font-size: 14px;
  color: #282c36;
  font-weight: bold;
  margin-top: 20px;
`;

const Info = styled.p`
  font-size: 14px;
  color: #86888c;
  font-weight: normal;
  margin-top: 20px;
`;

const Description = styled.div`
  // border: 3px solid red;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 70%;
  }
`;

const Category = styled.div``;
