import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";

import Container from "components/Container";
import ButtonComponent from "components/Button";
import * as Text from "components/Text";

import * as CategoryAPI from "axios/Category";
import * as RequestAPI from "axios/Request";

import { DARKGRAY, BLACK, WHITE, PRIMARY } from "static/style";

@inject("Request")
@observer
class TabConatiner extends React.Component {
  state = {
    index: 0,
    selected: 0,
    developSet: [],
    button_hover: false,
    index_for_question: 1,
  };
  next = () => {
    const { index, selected, index_for_question } = this.state;
    const { Request } = this.props;
    if (!selected) {
      alert("답변을 선택해주세요.");
    } else {
      const request = Request.selected[index];
      const title = request.request;
      const content = request.content_set[0][`content${selected}`];
      const req = {
        data: {
          category: request.category,
          question: title,
          answer: content,
        },
      };

      Request.select_reqs = Request.select_reqs.concat(req)
      console.log(Request.select_reqs.length)
      console.log(Request.select_reqs)

      if(Request.selected.length === index + 1) {
        Request.tab = 3;
      }
      else {
        this.setState({
          selected: 0,
          index: index + 1,
          index_for_question: index_for_question + 1,
        });
      }
    }
  };
  componentDidMount() {
    CategoryAPI.getDevelop()
      .then((res) => {
        let developSet = [];
        res.data.results.forEach(developBig => {
          developBig.develop_set.forEach(develop => {
            developSet.push(develop);
          })
        });

        this.setState({
          ...this.state,
          developSet: developSet,
        })
      })
      .catch(e => {
        console.log(e);
        console.log(e.response);
      })
  }
  render() {
    const { index, selected, index_for_question } = this.state;
    const { Request } = this.props;
    console.log(Request.selected);
    const data =
      Request.selected.length > index && Request.selected[index].content_set[0];
    const title =
      Request.selected.length > index && Request.selected[index].request;
    console.log("data : ", data);

    let developCategory = (this.state.developSet && data)
      && this.state.developSet.find(develop => develop.id === Request.selected[index].category);
    console.log(Request.selected.length)
    console.log(index_for_question + "입니다")
    return (
      <Container>
        <Board>
          <Text.FontSize28 color={PRIMARY} fontWeight={500} style={{marginTop: 20}}>
            {developCategory && developCategory.category}  |   {this.state.index_for_question}/{this.props.Request.selected.length} 번째 질문
          </Text.FontSize28>

          <TitleBox>
            <Text.FontSize40
              color={BLACK}
              fontWeight={700}
              style={{ lineHeight: 1.3 }}
            >
              Q {title}
            </Text.FontSize40>
          </TitleBox>
          <Content>
            {data.content1 && (
              <CheckBox
                active={selected === 1}
                onClick={() => this.setState({ selected: 1 })}
              >
                <Text.FontSize24 fontWeight={selected === 1 ? 700 : 400}>
                  {data.content1}
                </Text.FontSize24>
              </CheckBox>
            )}
            {data.content2 && (
              <CheckBox
                active={selected === 2}
                onClick={() => this.setState({ selected: 2 })}
              >
                <Text.FontSize24 fontWeight={selected === 2 ? 700 : 400}>
                  {data.content2}
                </Text.FontSize24>
              </CheckBox>
            )}
            {data.content3 && (
              <CheckBox
                active={selected === 3}
                onClick={() => this.setState({ selected: 3 })}
              >
                <Text.FontSize24 fontWeight={selected === 3 ? 700 : 400}>
                  {data.content3}
                </Text.FontSize24>
              </CheckBox>
            )}
            {data.content4 && (
              <CheckBox
                active={selected === 4}
                onClick={() => this.setState({ selected: 4 })}
              >
                <Text.FontSize24 fontWeight={selected === 4 ? 700 : 400}>
                  {data.content4}
                </Text.FontSize24>
              </CheckBox>
            )}
            <div style={{ marginLeft: "auto" }}>
              <ButtonComponent
                onClick={this.next}
                style={{ marginLeft: "auto", width: 130, marginTop: 22, marginBottom: 22,
                  transition: '0.1s',
                  backgroundColor: this.state.button_hover ? WHITE : PRIMARY,
                }}
                backgroundColor={PRIMARY}
                borderColor={PRIMARY}
                borderRadius={100}
                onMouseEnter={() => {
                  this.setState({
                    ...this.state,
                    button_hover: true,
                  })
                }}
                onMouseLeave={() => {
                  this.setState({
                    ...this.state,
                    button_hover: false,
                  })
                }}
              >
                <Text.FontSize28 color={this.state.button_hover ? PRIMARY : WHITE} fontWeight={500}>
                  다음
                </Text.FontSize28>
              </ButtonComponent>
            </div>
          </Content>
        </Board>
      </Container>
    );
  }
}

export default TabConatiner;

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
    min-width: 300px;
  }
  > p {
    width: -webkit-fill-available;
  }
  @media (min-width: 0px) and (max-width: 991.98px) {
    flex-direction: column;
    img {
      margin-left: 0px;
    }
    > div {
      margin-top: 10px;
    }
  }
`;

const CheckBox = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  margin: 8px 0px;
  padding: 15px 20px;
  border: 1px solid #e8e9ec;
  border-radius: 4px;
  > p {
    color: #767676;
  }
  ${(props) =>
    props.active &&
    css`
      background-color: #e8e9ec;
      > p {
        color: #001a56;
      }
    `}
`;

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;