import React from "react";
import styled from "styled-components";
import * as Title from "components/Title";
import { inject, observer } from "mobx-react";

const mobilemodalimg = "static/images/mobilemodalimg.svg";

@inject("Home")
@observer
class MobileModalContainer extends React.Component {
  onClickModal = () => {
    const { Home } = this.props;
    Home.modalState = false;
    console.log(Home.modalState);
  };

  render() {
    return (
      <Container>
        <InnerContainer>
          <img src={mobilemodalimg} />

          <Title14>저희 볼트앤너트는 더 나은 서비스 제공을 위해</Title14>
          <Title14>모바일 서비스 개편 중에 있습니다.</Title14>
          <Title14>
            원활한 프로세스를 위해 <b style={{ fontWeight: "bold", color: "#0933b3" }}>PC로 접속</b> 부탁드립니다.
          </Title14>

          <Button onClick={() => this.onClickModal()}>
            <Title14 style={{ color: "#0933b3" }}>확인</Title14>
          </Button>
        </InnerContainer>
      </Container>
    );
  }
}

export default MobileModalContainer;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 441px;

  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  z-index: 10000;

  background-color: #92959a;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 280px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const Title14 = styled(Title.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.71;
  letter-spacing: -0.35px;
  color: #1e2222;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 128px;
  height: 38px;
  border-radius: 29px;
  box-shadow: 2px 3px 6px 0 rgba(0, 0, 0, 0.17);
  border: solid 1.5px #0933b3;
  background-color: #ffffff;
  margin-top: 36px;
`;
