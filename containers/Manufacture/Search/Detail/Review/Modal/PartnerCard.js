import React from "react";
import Select from "react-select";
import styled, { keyframes } from "styled-components";

import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import { isElementAccessExpression } from "typescript";

const star = "/static/icon/star.svg";

@inject("Partner", "Auth")
@observer
class PartnerCard extends React.Component {
  state = {
    width: null,
    activeCard: false,
  };

  componentDidMount = async () => {};
  componentWillUnmount = () => {};
  activeHandler = (key) => {
    console.log(this.props.id + 1);
    if (key == "in") {
      this.setState({ activeCard: true });
    } else {
      this.setState({ activeCard: false });
    }
  };

  render() {
    const { width, Partner, id, name, logo, history } = this.props;

    return (
      <>
        <Card
          onMouseOver={() => {
            console.log("onMouseOver");
            this.activeHandler("in");
          }}
          onMouseLeave={() => {
            console.log("onMouseLeave");
            this.activeHandler("out");
          }}
          active={this.state.activeCard}
        >
          <Number>
            <span>{id + 1}</span>
          </Number>
          <Logo>
            <div>
              <img src={logo} />
            </div>
          </Logo>
          <Content>
            <name>{name}</name>

            {history &&
              (width < 767.98 && history.toString().length > 14 ? (
                <product>{history.toString().substring(0, 14) + "..."}</product>
              ) : (
                <product>{history}</product>
              ))}
          </Content>
        </Card>
      </>
    );
  }
}

export default PartnerCard;

const Card = styled.div`
  display: flex;
  // height: 113px;
  min-height: 113px;
  width: 100%;
  border-bottom: 1px solid #e1e2e4;
  align-items: center;
  background-color: ${(props) => (props.active ? "#f6f6f6" : "#ffffff")};
  cursor: pointer;

  @media (min-width: 0px) and (max-width: 767.98px) {
    min-height: 0px;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    min-height: 100px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
`;
const Number = styled.div`
  flex-grow: 1;
`;
const Logo = styled.div`
  flex-grow: 1;
  > div {
    width: 65px;
    height: 69px;
    // background-color: #c9c9c9;
    border-radius: 3px;
    > img {
      width: 65px;
      height: 69px;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
`;
const Content = styled.div`
  // flex-grow: 22;
  width: 85%;
  display: flex;
  flex-direction: column;
  > name {
    font-size: 20px;
    line-height: 34px;
    letter-spacing: -0.5px;
    color: #191919;
    font-weight: bold;
  }
  > product {
    font-size: 18px;
    line-height: 27px;
    letter-spacing: -0.45px;
    color: #191919;
    font-weight: normal;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 68%;
    > name {
      font-size: 14px;
    }
    > product {
      font-size: 13px;
    }
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 80%;
    > name {
      font-size: 16px;
    }
    > product {
      font-size: 14px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 82%;

    > name {
      font-size: 18px;
    }
    > product {
      font-size: 16px;
    }
  }
`;
