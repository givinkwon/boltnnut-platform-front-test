import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'
import { inject, observer } from "mobx-react";

@inject("Request")
@observer
class QuestionSelect extends React.Component {
  test = () => {
    const { Request } = this.props;
    let innerText = document.getElementById("queText");
    console.log(innerText);
  }
  render(){
    const { Request } = this.props;
    return (
      <SelectContainer onClick={ this.test }>
        {this.props.question.map((question) => <Select onClick={ this.test }><Text id={"queText"} color={this.props.color}>{question}</Text></Select>)}
      </SelectContainer>
    );
  }
}

export default QuestionSelect;

const SelectContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-left: 33px;
`
const Text = styled(Title.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.16px;
  color: ${(props) => (props.color ? props.color : '#282c36')};
  margin-left: 10px;
`
const Select = styled.button`
  border: none;
  width: 686px;
  height: 46px;
  background-color: #ffffff;
  object-fit: contain;
  border-radius: 3px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  outline: 0;
  border: 0;
  &:hover {
    border: solid 2px #0933b3;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.3);
  }
`
