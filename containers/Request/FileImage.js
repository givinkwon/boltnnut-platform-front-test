import React, { Component } from 'react'
import { render } from 'react-dom';
import styled from "styled-components";


class FileImage extends Component {
    render(){
        const {name} = this.props
        return (
            <Container>
                <span>{name}</span>
                <div></div>
            </Container>
        )
    }
}

export default FileImage

const Container = styled.div`
  width: 65px;
  height: 83px;
  border: 1px solid #c6c7cc;
  background-color: #ffffff;
  position: relative;  
  margin: 32px 19px 0 19px;

  >span{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #0933b3;
    font-size: 16px;
    line-height: 35px;
    letter-spacing: -0.4px;
    text-align: left;
    font-weight: 500;
  }
  > div{
    position: absolute;
    left: calc(99% - 22px);
    bottom: calc(99% - 22px);
    width: 0px;
    height: 0px;
    border-bottom: 24px solid #d8d8d8;
    border-right: 24px solid #f6f6f6;
    border-top: 1px solid #f6f6f6;
  }
`
