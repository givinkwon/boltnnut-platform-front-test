import React from "react";
import styled from "styled-components";
import Router from "next/router";

//Components
import { WHITE } from "static/style";
import Background from "components/Background";
import * as Content from "components/Content";
import * as Title from "components/Title";
import Fade from 'react-reveal/Fade';

import { inject, observer } from "mobx-react";


@inject('Proposal','Partner')
@observer
class MobileBanner5Container extends React.Component {

  render () {

    return (
    <Background src={background}>
        <Fade bottom>
          <div >
          </div>
        </Fade>
    </Background>
    );
  }
  }

export default MobileBanner0Container;

const Header = styled(Title.FontSize23)`
  text-align: center;
  margin-bottom: 26px;
`
const Title1 = styled(Content.FontSize16)`
  text-align: center;
  line-height: 0.94;
  letter-spacing: -0.4px;
  object-fit: contain;
`
const Content1 = styled(Content.FontSize17)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  text-align: center;
`
