import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";


@inject("Auth", "Answer", "Profile")
@observer
class Explaination extends React.Component {
  componentdidmount() {
    const { Profile } = this.props;
  }
  onChangeHandler = (e) => {
    const { Profile } = this.props;
    Profile.info_company = e.target.value;
  };
  render() {
    const { Profile } = this.props;
    return (
      <Container>
        <Header>
          <Name>회사 상세설명</Name>
            <Button
              onClick={(e) => {
                Profile.save_profile()
              }}
            >
              저장하기
            </Button>
        </Header>
        <Main>
          <textarea
            id="explaination"
            placeholder="회사소개를 입력하세요."
            autofocus="true"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "회사소개를 입력하세요.")}
            // rows={this.state.rows}
            type="text"
            className={"textarea"}
            placeholderStyle={{ fontWeight: "400" }}
            onChange={(e) => this.onChangeHandler(e)}
            value={Profile.info_company}
          />
        </Main>
      </Container>
    );
  }
}

export default Explaination;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  margin-top: 100px;
  margin-bottom: 120px;
`;

const Name = styled.div`
  font-size: 24px;
  line-height: 34px;
  letter-spacing: -0.6px;
  color: #414550;
  font-weight: bold;
  margin-right: 12px;
`;

const Button = styled.button`
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.45px;
  color: #0933b3;
  font-weight: 600;
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f6f6f6;
    border-radius: 3px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid #e1e2e4;
  margin-bottom: 20px;
`;
const Main = styled.div`
  width: 100%;
  > textarea {
    padding: 20px;
    box-sizing: border-box;
    flex-grow: 1;
    border: 1px solid #c6c7cc;
    border-radius: 5px;

    resize: none;

    font-size: 15px;
    line-height: 34px;
    letter-spzcing: -0.45px;
    color: #282c36;

    overflow: auto;
    height: auto;
    font-family: inherit;

    width: 100%;

    :focus {
      outline: none;
    }
    :placeholder {
      font-weight: 300;
    }
    white-space: pre-line;
  }
`;
