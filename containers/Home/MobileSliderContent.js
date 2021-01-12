import React, {Component} from 'react';
import styled from "styled-components";
import * as Title from "components/Title";

class SliderMain extends React.Component {
  render() {
    return (
      <SliderContent>
          <img src={ this.props.src }/>
      </SliderContent>
    );
  }
}

export default SliderMain;

const SliderContent = styled.div`
  width: 240px;
  height: 128px;
`
const Head = styled(Title.FontSize24)`
  color: #0933b3;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  white-space: pre-line;
  text-align: left;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
  }
;
`
const Main = styled(Title.FontSize32)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.8px;
  text-align: left;
  color: #333742;
  margin: 10px 0px 30px 0px;
  white-space: pre-line;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 13px;
  }
`
const Foot = styled(Title.FontSize24)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  white-space: pre-line;
  color: #f6f6f6;
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 13px;
  }
`

