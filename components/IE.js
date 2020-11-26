import React from "react";
import styled, { css } from "styled-components";

const IEWrap = styled.div`
  z-index: 99999999;
  position: fixed;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  background-color: rgba(0,0,0,0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  
  p {
    line-height: 1.2em;
    font-size: 25px;
    color : #ffffff;
    font-weight: bold;
    margin-bottom: 30px;
      
    padding: 0 30px;
  }
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    p {
      padding: 0 20px;
    }
  }
`
export default class IE extends React.Component {
  render() {
    return (
      <IEWrap>
        <p>죄송합니다, 볼트앤너트 웹사이트는 인터넷 익스풀로러로 접속이 되지 않습니다. <br/><br/>다음의 브라우저를 사용하여 접속해 주시기 바랍니다. <br/>: 크롬, 파이어폭스, 큐큐 등</p>
      </IEWrap>
    );
  }
}