import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import Router from "next/router";

import Container from "components/Container";
import InputComponent from "components/Input2";

import * as Text from "components/Text";
import ButtonSpinner from "components/ButtonSpinner";

import * as RequestAPI from "axios/Request";

import { DARKGRAY, BLACK, WHITE, PRIMARY } from "static/style";

import { toJS } from "mobx";
import {withRouter} from "next/router";


@inject("Request", "Answer")
@observer
class Step4Conatiner extends React.Component {
  constructor(props) {
    super(props);
    this.fileRef = React.createRef();
  }

  state = {
    loading: false,
}


  chat = () => {
    const { Request, router } = this.props;

    const { name, content, price, day, file } = this.state;

    router.push('/answer/' + res.data.request)
  };
  render() {
    const { Request, Answer, router } = this.props;
    const { loading, name, content, price, day, example, example_content } = this.state;
    const developObj = Answer.getDevelopCategoryById(this.props.Request.category_middle_set[0]);
    let mainCategory = Answer.getDevelopBigCategoryById(developObj.maincategory);

    return (
      <Container style={{marginBottom: 60}}>
        <Board>

          {/*<Text.FontSize28 color={DARKGRAY} fontWeight={500} style={{marginTop: 10}}>
            공통질문
          </Text.FontSize28>
          <TitleBox>
            <Text.FontSize40 color={BLACK} fontWeight={500}>
              의뢰서 완성하기
            </Text.FontSize40>
          </TitleBox>*/}
          <Content>
            <Text.FontSize28 fontWeight={500}>의뢰서를 바탕으로 추가 문답 진행 후
            <br/><br/>
            최대 30분 내로 내 제품에 적합한 개발업체 리스트를 받아보실 수 있습니다.
            <br/><br/>
            </Text.FontSize28>
            <Text.FontSize28 fontWeight={700} font-color={PRIMARY}>
            채팅방에 입장한 후 꼭! 볼트앤너트 ID를 입력해주세요.
            <br/><br/>
            ID 미입력 시 상담 진행이 어렵습니다.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <br/><br/>
            회원 가입을 하지 않으셨을 경우에는 상담 진행이 어려우니 상담 전 회원가입을 부탁드립니다.
            <br/><br/>
            </Text.FontSize28>
            <Text.FontSize20>
            <br/><br/>
            ※접속이 되지 않을 경우 아래로 문의해주세요.
            <br/><br/>
            T. 02-926-6637
            <br/><br/>
            C. 홈페이지 우측 하단 실시간 톡
            </Text.FontSize20>
          </Content>
        </Board>
        <Button id="request_chat_button" style={{padding: 30}} href='https://pf.kakao.com/_xfAxlfxb/chat'>

            <Text.FontSize28 id="request_chat" color={WHITE} fontWeight={500}>
              무료 1:1 상담하기
            </Text.FontSize28>

        </Button>
      </Container>
    );
  }
}

export default withRouter(Step4Conatiner);

const LoadBox = styled.div`
  margin-top: -35px;
  margin-bottom: -35px;
`;
const TextArea = styled.textarea`
  font-family: 'Noto Sans KR',sans-serif;
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  white-space: pre-line;

  border-radius: 6px;
  border: solid 1px #dddddd;
  padding: 15px 25px;
  resize: none;

  ::placeholder {
    font-weight: 400;
    font-family: 'Noto Sans KR',sans-serif;
    @media (min-width: 0px) and (max-width: 767.98px) {
      font-size: 14px;
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
      font-size: 16px;
    }
    @media (min-width: 992px) and (max-width: 1299.98px) {
      font-size: 18px;
    }
    @media (min-width: 1300px) {
      font-size: 20px;
    }
  }

  :focus {
    outline: none;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
    padding: 15px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 16px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 18px;
  }
  @media (min-width: 1300px) {
    font-size: 20px;
  }
`;
const Button = styled.a`
  cursor: pointer;
  background-color: ${PRIMARY};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 18px 0px;
`;
const Board = styled.div`
  margin-top: -30px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 5px 10px 0px #0004;
  background-color: #fff;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 15px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 20px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 25px;
  }
  @media (min-width: 1300px) {
    padding: 30px;
  }
`;
const TitleBox = styled.div`

  display: flex;
  margin-top: 10px;
  img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }
  > div {
    display: flex;
    min-width: 200px;
  }
  > p {
    width: -webkit-fill-available;
    line-height: 1.3em;
  }
  @media (min-width: 0px) and (max-width: 991.98px) {
    flex-direction: column;
    width: 100%;
    img {
      margin-left: 0px;
    }
    > div {
      margin-top: 10px;
    }
    > p {
      margin-bottom: 30px;
    }
  }
`;
const W100 = styled.div`
  width: 100%;
  display: flex;
  margin: 4px 0px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const TextBox = styled.div`
  border-radius: 100px;
  background-color: ${PRIMARY};
  border: 1px solid #e4e6ed;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    border-radius: 20px;
    margin-left: 0;
    min-width: 90px;
    margin-right: 10px;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    min-width: 100px;
    margin-right: 18px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    min-width: 120px;
    margin-right: 22px;
  }
  @media (min-width: 1300px) {
    min-width: 130px;
    margin-right: 30px;
  }
`;
const CheckList = styled.div`
  width: 100%;

  background-color: #f9f9f9;
  padding: 12px 15px;
  padding-right: 0px;
  border-radius: 6px;
  border: solid 1px #dddddd;

  display: flex;
  flex-wrap: wrap;
  > div {
    width: calc(100% / 3);
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      width: calc(100% / 2);
    }
  }
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  > p {
      line-height: 1.5em;
      //text-align: center;
    }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > p {
    margin-top: 15px;
  }
`
const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;

  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;

  border-radius: 6px;
  border: solid 1px #dddddd;
  padding: 15px;

  input {
    font-size: 16px;
  }
  > p {
    max-height: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 12px;
  }


  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
  }
  @media (min-width: 1300px) {
  }
`

const FileIcon = styled.img`
  width: 20px;
  height: 20px;
`


const TextBox2 = styled.div`
  border-radius: 100px;
  background-color: ${PRIMARY};
  border: 1px solid #e4e6ed;
  height: 40px;
  background-color: #ed7d31;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;


  @media (min-width: 0px) and (max-width: 767.98px) {
    border-radius: 20px;
    margin-left: 0;
    min-width: 90px;
    margin-right: 10px;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    min-width: 100px;
    margin-right: 18px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    min-width: 120px;
    margin-right: 22px;
  }
  @media (min-width: 1300px) {
    min-width: 130px;
    margin-right: 30px;
  }

`;
