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
    console.log(data);
    console.log(data.name);
    console.log(dataList);
    console.log(dataList[2]);
    console.log(dataList.length);

    console.log(idx);
    console.log(categoryData);

    await Partner.getBusinessCategory(data.id);

    console.log(toJS(Partner.hashBusinessCategory));
  };
  render() {
    const { data, width } = this.props;
    console.log(data);
    console.log(data.name);
    console.log(dataList);
    dataList.push(data);
    return (
      <>
        {width > 767.98 ? (
          <Card>
            {data && data.portfolio_set.length !== 0 && (
              <ImgBox>
                <img src={data.portfolio_set[0].img_portfolio} />
              </ImgBox>
            )}
            <Content>
              <Name>{data.name}</Name>
              <Info>{data.history}</Info>
              {/* <Category>4</Category> */}
            </Content>
          </Card>
        ) : (
          <Card>
            {data && data.portfolio_set.length !== 0 && (
              <ImgBox>
                <img src={data.portfolio_set[0].img_portfolio} />
              </ImgBox>
            )}
            <Description>
              <Content>
                <Name>{data.name}</Name>
                <Info>{data.history}</Info>
                {/* <Category>4</Category> */}
              </Content>
            </Description>
          </Card>
        )}
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
  width: 100%;
  background-color: #ffffff;
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: row;
    height: 90%;
    margin-bottom: 10px;
  }
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px 14px;
  box-sizing: border-box;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 8px 7px;
  }
`;

const Name = styled.div`
  font-size: 18px;
  line-height: 40px;
  letter-spacing: -0.45px;
  color: #282c36;
  font-weight: bold;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 15px;
    line-height: 22px;
    margin-bottom: 10px;
  }
`;

const Info = styled.div`
  font-size: 16px;
  line-height: 25px;
  letter-spacing: -0.4px;
  color: #86888c;
  font-weight: normal;
  text-align: left;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 13px;
    line-height: 18px;
  }
`;

const Description = styled.div`
  // border: 3px solid red;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 70%;
  }
`;

const Category = styled.div``;
