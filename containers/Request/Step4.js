import styled from 'styled-components';
import * as Content from '../../components/Content';
import { Component } from 'react';


class Step4Container extends Component {
  render() {
    return (
      <Card>
        <Header>1</Header>
        <ContentBox>2</ContentBox>
      </Card>
    )
  }
}

export default Step4Container;




const Card = styled.div`
  width: 894px;
  height: 1002px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.52);
  background-color: white;
  margin: 60px 0px 200px 280px;
  display: inline;
  float: right;
`
const Header = styled(Content.FontSize32)`
  width: auto;
  height: calc(6.7%);
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.8px;
  text-align: left;
  color: #0a2165;
  margin-left: 5.4%;
  margin-right: 5.4%;
  padding-top: 4%;
  border-bottom: solid 1px #707070;
  object-fit: contain;
`
const ContentBox = styled.div`
  height: calc(46.3%);
  margin-right: 5.4%;
  margin-left: 5.4%;
  margin-top: 4%;
  display: flex;
  flex-direction: column;
`
