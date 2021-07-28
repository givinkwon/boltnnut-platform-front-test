import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import Router from "next/router";

import Container from "components/Container";
import RatioImage from "components/RatioImage";
import * as Text from "components/Text";
import { BLACK1, DARKGRAY } from "static/style";

@inject("Request")
@observer
class ContentConatiner extends React.Component {
  render() {
    const { Request } = this.props;
    return (
      <CustomContainer>
        <List>
          {Request.contents.length > 0 &&
            Request.contents.map((item, idx) => {
              console.log(item);
              return (
                <Item
                  key={idx}
                  onClick={() => Router.push(`/request/${item.id}`)}
                >
                  <Image
                    ratio="50%"
                    src={item.small_img}
                    onClick={() => this.setState({ tab: 1 })}
                  />
                  <Text.FontSize24 color={DARKGRAY} fontWeight={500}>
                    {item.subclass}
                  </Text.FontSize24>
                </Item>
              );
            })}
        </List>
      </CustomContainer>
    );
  }
}

export default ContentConatiner;

const CustomContainer = styled(Container)`
  margin-bottom: 50px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 30px 0px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 30px 0px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 30px 0px;
  }
  @media (min-width: 1300px) {
    padding: 30px 0px;
  }
`;
const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  marign: 30px 15px 0;

  @media (min-width: 0px) and (max-width: 767.98px) {
    width: calc((100% / 2) - 12px);
    margin: 30px 3px 0;
    :nth-of-type(2n) {
      margin-left: 15px;
    }
    > p {
      margin-top: 10px;
    }
  }
  @media (min-width: 768px) {
    width: calc((100% / 3) - 30px);
    margin: 30px 15px 0;
    :nth-of-type(3n-1) {
      margin-left: 15px;
      margin-right: 15px;
    }
    > p {
      margin-top: 20px;
    }
  }
`;
const Image = styled(RatioImage)`
  cursor: pointer;
  border-radius: 12px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    max-width: 400px;
  }
  > div {
    transition: 0.4s;
  }
  :hover {
    > div {
      transform: scale(1.2);
    }
  }
`;
