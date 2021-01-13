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
  height: 120px;
`


