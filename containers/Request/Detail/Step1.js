import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Router from "next/router";
import Container from "components/Container";
import ButtonComponent from "components/Button";
import CheckBoxComponent from "components/CustomCheckBox";
import * as Text from "components/Text";

import * as CategoryAPI from "axios/Category";
import * as AccountAPI from "axios/Account";
import * as RequestAPI from "axios/Request";

import { DARKGRAY, BLACK, WHITE, PRIMARY } from "static/style";

@inject("Request", "Auth")
@observer
class TabConatiner extends React.Component {
  state = {
    check_list: null,
    pending: false,
    button_hover: false,
  };
  getClient = () => {
    console.log("getUser");
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token") != null) {
      const req = {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      };
      return AccountAPI.reloadUserInfo(req)
        .then((res) => {
          const user = res.data.data.User;
          if (user.type === 1) {
            alert("파트너 계정으로 의뢰할 수 없습니다.");
            if (this.props.Auth.home_index === 4) {
              Router.push("/4");
            } else if (this.props.Auth.home_index === 3) {
              Router.push("/3");
            } else if (this.props.Auth.home_index === 2) {
              Router.push("/2");
            } else if (this.props.Auth.home_index === 1) {
              Router.push("/5");
            } else {
              Router.push("/");
            }
          } else if (user.type === 0) {
            console.log("res.data.data.Client[0]: ", res.data.data.Client[0]);
            return res.data.data.Client[0];
          }
        })
        .catch((e) => {
          try {
            console.log(e);
            console.log(e.response);
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
          localStorage.removeItem("token");
          if (this.props.Auth.home_index === 4) {
            Router.push("/4");
          } else if (this.props.Auth.home_index === 3) {
            Router.push("/3");
          } else if (this.props.Auth.home_index === 2) {
            Router.push("/2");
          } else if (this.props.Auth.home_index === 1) {
            Router.push("/5");
          } else {
            Router.push("/");
          }
          return null;
        });
    }
    if (localStorage.getItem("token") == null) {
      const req = {
        headers: {
          Authorization: `Token b2b0395a326f98188b79dcabdc7578d2fdcbc349`,
        },
      };
      console.log(AccountAPI.reloadUserInfo(req));
      return AccountAPI.reloadUserInfo(req)
        .then((res) => {
          console.log(1);
          const user = res.data.data.User;
          if (user.type === 1) {
            alert("파트너 계정으로 의뢰할 수 없습니다.");
            if (this.props.Auth.home_index === 4) {
              Router.push("/4");
            } else if (this.props.Auth.home_index === 3) {
              Router.push("/3");
            } else if (this.props.Auth.home_index === 2) {
              Router.push("/2");
            } else if (this.props.Auth.home_index === 1) {
              Router.push("/5");
            } else {
              Router.push("/");
            }
          } else if (user.type === 0) {
            console.log("res.data.data.Client[0]: ", res.data.data.Client[0]);
            return res.data.data.Client[0];
          }
        })
        .catch((e) => {
          try {
            console.log(e);
            console.log(e.response);
            alert(e.response.data.message);
          } catch {
            console.log(e);
            console.log(e.response);
          }
          localStorage.removeItem("token");
          if (this.props.Auth.home_index === 4) {
            Router.push("/4");
          } else if (this.props.Auth.home_index === 3) {
            Router.push("/3");
          } else if (this.props.Auth.home_index === 2) {
            Router.push("/2");
          } else if (this.props.Auth.home_index === 1) {
            Router.push("/5");
          } else {
            Router.push("/");
          }
          return null;
        });
    }
  };
  createRequest = async () => {
    if (this.state.pending) {
      return;
    }
    this.setState({
      ...this.state,
      pending: true,
    });

    const { Request } = this.props;
    const client = await this.getClient();

    if (localStorage.getItem("token") != null) {
      Request.client_id = client.id;
    }
    if (localStorage.getItem("token") == null) {
      Request.client_id = 18;
    }
    Request.select_reqs = [];

    this.props.Request.setFindCategory(this.state.check_list);
    /*
    const req = {
      data: {
        client: client.id,
        product: this.props.project_id,
        category: toJS(this.props.Request.category_middle_set),
      },
    };
    // TODO CREATE REQUEST API

    RequestAPI.create(req)
      .then((res) => {
        console.log('견적서 생성')

        this.props.Request.id = res.data.id;
        this.props.Request.created_request = res.data;
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
        console.log(e.response.data);
        // Router.push("/");
      });

     */
  };
  componentDidMount() {
    CategoryAPI.getDevelop()
      .then((res) => {
        console.log(res);
        const results = res.data.results;
        this.setState({ check_list: results });
        console.log(results);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  }
  render() {
    const { Request } = this.props;
    const { check_list } = this.state;
    console.log(this.props.Request.category_id);

    return (
      <Container style={{ marginBottom: 60 }}>
        <Board>
          <Text.FontSize28 color={DARKGRAY} fontWeight={500}>
            제조분야 선택
          </Text.FontSize28>
          <TitleBox>
            <Text.FontSize36 color={BLACK} fontWeight={700}>
              Q 의뢰하실 개발/제조 분야를 선택해 주세요.
            </Text.FontSize36>
            {/*<div>
              <img src="/static/images/question.png" />
              <HelpText>
                <Text.FontSize16 color="#767676">
                  최적의 매칭을 위하여 한 의뢰에서 설계, 목업, 양산 중 한 영역만
                  선택할 수 있습니다.
                </Text.FontSize16>
              </HelpText>
            </div>*/}
          </TitleBox>
          <Content>
            {check_list &&
              check_list.map((category, idx) => {
                return (
                  <>
                    {Request.type == "develop" ? (
                      <>
                        {category.maincategory == "설계" && (
                          <W100 key={idx}>
                            <TextBox
                              active={Request.category_id === category.id}
                            >
                              <Text.FontSize24
                                color={
                                  Request.category_id === category.id
                                    ? WHITE
                                    : DARKGRAY
                                }
                                fontWeight={
                                  Request.category_id === category.id
                                    ? 500
                                    : 300
                                }
                              >
                                {category.maincategory}
                              </Text.FontSize24>
                            </TextBox>
                            <CheckList>
                              {category.develop_set.map((item, idx) => {
                                return (
                                  <>
                                    {item.id == 4 ||
                                    item.id == 11 ||
                                    item.id == 13 ? (
                                      ""
                                    ) : (
                                      <CustomCheckBoxComponent
                                        key={idx}
                                        checked={
                                          Request.category_middle_set.indexOf(
                                            item.id
                                          ) > -1
                                        }
                                        onClick={() =>
                                          Request.setCategoryMiddleSet(
                                            item.id,
                                            category.id
                                          )
                                        }
                                      >
                                        {item.category}
                                      </CustomCheckBoxComponent>
                                    )}
                                  </>
                                );
                              })}
                            </CheckList>
                          </W100>
                        )}
                      </>
                    ) : (
                      <>
                        {(category.maincategory == "목업" ||
                          category.maincategory == "양산") && (
                          <W100 key={idx}>
                            <TextBox
                              active={Request.category_id === category.id}
                            >
                              <Text.FontSize24
                                color={
                                  Request.category_id === category.id
                                    ? WHITE
                                    : DARKGRAY
                                }
                                fontWeight={
                                  Request.category_id === category.id
                                    ? 500
                                    : 300
                                }
                              >
                                {category.maincategory}
                              </Text.FontSize24>
                            </TextBox>
                            <CheckList>
                              {category.develop_set.map((item, idx) => {
                                return (
                                  <>
                                    {item.id == 4 ||
                                    item.id == 11 ||
                                    item.id == 13 ? (
                                      ""
                                    ) : (
                                      <CustomCheckBoxComponent
                                        key={idx}
                                        checked={
                                          Request.category_middle_set.indexOf(
                                            item.id
                                          ) > -1
                                        }
                                        onClick={() =>
                                          Request.setCategoryMiddleSet(
                                            item.id,
                                            category.id
                                          )
                                        }
                                      >
                                        {item.category}
                                      </CustomCheckBoxComponent>
                                    )}
                                  </>
                                );
                              })}
                            </CheckList>
                          </W100>
                        )}
                      </>
                    )}
                  </>
                );
              })}
            <div style={{ marginLeft: "auto" }}>
              {/*<Text.FontSize18
                style={{ marginTop: 12 }}
                fontWeight={500}
                color="#c6c6c6"
              >
                같은 영역에서는 중복 선택이 가능합니다
              </Text.FontSize18>*/}
              <ButtonComponent
                onClick={this.createRequest}
                style={{
                  marginLeft: "auto",
                  marginTop: 32,
                  marginBottom: 26,
                  transition: "0.1s",
                  backgroundColor: this.state.button_hover ? WHITE : PRIMARY,
                }}
                backgroundColor={PRIMARY}
                borderColor={PRIMARY}
                borderRadius={100}
                onMouseEnter={() => {
                  this.setState({
                    ...this.state,
                    button_hover: true,
                  });
                }}
                onMouseLeave={() => {
                  this.setState({
                    ...this.state,
                    button_hover: false,
                  });
                }}
              >
                <Text.FontSize28
                  id="request_category_select"
                  color={this.state.button_hover ? PRIMARY : WHITE}
                  fontWeight={500}
                >
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

  > p:nth-of-type(1) {
    margin-top: 10px;
  }

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
  margin-bottom: 30px;

  p {
    line-height: 1.25em;
  }
  img {
    flex-shrink: 0;
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
    margin-bottom: 10px;
    flex-direction: column;
    img {
      margin-left: 0px;
    }
    > div {
      margin-top: 10px;
    }
  }
`;
const HelpText = styled.div`
  background-color: #f9f9f9;
  padding: 7px 12px;
  border-radius: 8px;
  width: 100%;
  height: fit-content;
  > p {
    margin: 0px;
  }
  @media (min-width: 0px) and (max-width: 991.98px) {
    width: fit-content;
  }
`;

const W100 = styled.div`
  width: 100%;
  display: flex;
  margin: 4px 0px;
`;
const TextBox = styled.div`
  margin: auto;
  border-radius: 100px;
  background-color: ${PRIMARY}00;
  border: 1px solid #e4e6ed;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.active &&
    css`
      background-color: ${PRIMARY};
      border: 1px solid ${PRIMARY};
    `}

  @media (min-width: 0px) and (max-width: 767.98px) {
    min-width: 80px;
    margin-right: 10px;
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
`;

const CustomCheckBoxComponent = styled(CheckBoxComponent)`
  margin: 5px 0;
`;
