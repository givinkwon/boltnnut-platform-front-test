import React from "react";
import styled from "styled-components";
import Router from "next/router";

//Components
import Button from "components/Button";
import * as Text from "components/Text";
import { WHITE } from "static/style";
import Containerv1 from "components/Containerv1";
import Background from "components/Background";
import * as Content from "components/Content";
import * as Title from "components/Title";

//Image
const background = "static/images/Home/main.jpg";


class Banner0Conatiner extends React.Component {
  render () {
    return (
    <Background src={background}>
      <Containerv1>
        <Title.FontSize56 color={WHITE} shadow={"0 3px 6px rgba(0,0,0,0.61);"}> 
          내 제품 제작 비용과<br/>
          전문 제조사를<br/>
          바로 만나보세요.
        </Title.FontSize56>
      </Containerv1>
    </Background>
    );
  }
  }

export default Banner0Conatiner;

