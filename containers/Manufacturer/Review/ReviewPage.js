import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import * as Title from "components/Title";

import SearchProjectModal from "../Modal/SearchProjectModal";
import SearchPartnerModal from "../Modal/SearchPartnerModal";
import QuestionContainer from "../Modal/QuestionBox";

const checkImg = "/static/images/pass8.png";
const star = "/static/icon/star.svg";

@inject("Partner")
@observer
class ReviewPage extends React.Component {
  state = {
    search: null,
    rows: 1,
    value: "",
    minRows: 1,
    maxRows: 5,
    star_ary: [
      { id: 1, checked: false },
      { id: 2, checked: false },
      { id: 3, checked: false },
      { id: 4, checked: false },
      { id: 5, checked: false },
    ],
  };

  componentWillUnmount = () => {
    const { Partner } = this.props;
    // Partner.reviewActiveIndex = 0;
  };

  starCheckHandler = async (star_id, bool) => {
    // console.log(`${star_id}번째 클릭 : ${bool}`);
    this.state.star_ary.map((data) => {
      //   console.log(data.id - 1);
      if (star_id === data.id - 1) {
        // console.log("TTTTTTTTTTT");
      }
    });
    await this.setState({
      star_ary: this.state.star_ary.map((data) =>
        star_id + 1 == data.id
          ? {
              ...data,
              checked: bool,
            }
          : data
      ),
    });
    //console.log(this.state.star_ary);
  };
  starRatingHandler = async (star_id) => {
    //console.log(star_id);
    if (this.state.star_ary[star_id - 1].checked) {
      //this.state.star_ary[star_id - 1].checked = false;
      const bool = false;

      for (let i = 0; i < star_id - 1; i++) {}
      for (let i = star_id; i < 5; i++) {
        await this.starCheckHandler(i, bool);
      }
    } else {
      const bool = true;
      for (let i = 0; i < star_id; i++) {
        await this.starCheckHandler(i, bool);
      }
    }
  };

  openModal = () => {
    const { Partner } = this.props;

    // console.log("requestmodal open click");
    // this.setState({ modalOpen: true });

    Partner.searchProjectModalActive = true;
  };
  closeModal = () => {
    const { Partner } = this.props;
    // console.log("requestmodal close click");

    Partner.searchProjectModalActive = false;
  };

  render() {
    const { Partner, width } = this.props;
    return (
      <>
        <Card>
          <Header>
            <div>
              <img src={checkImg} />
            </div>
            <span>후기 작성</span>
          </Header>
          <Search>
            <div>
              <span>프로젝트명</span>
              <div
                onClick={() => {
                  console.log("onClick!");
                  this.openModal();
                }}
              >
                <span>입력하기</span>
              </div>
            </div>

            <div>
              <span>파트너</span>
              <div
                onClick={() => {
                  this.openModal();
                }}
              >
                <span>검색</span>
              </div>
            </div>
          </Search>
          <StarBox>
            <content>이 파트너와 상담은 어떠셨나요?</content>
            <starcontainer>
              {this.state.star_ary.map((item, idx) => {
                return (
                  <StarImg starActive={item.checked}>
                    <img
                      src={star}
                      onClick={() => this.starRatingHandler(idx + 1)}
                    />
                  </StarImg>
                );
              })}
            </starcontainer>
            <span>선택해주세요.</span>
          </StarBox>
          <QuestionBox>
            <QuestionContainer />
            <QuestionContainer />
            <QuestionContainer />
          </QuestionBox>
          <Section></Section>
          <Footer></Footer>

          {Partner.searchProjectModalActive && (
            <Layer>
              <span>
                <SearchProjectModal
                  width={width}
                  open={Partner.searchProjectModalActive}
                  close={this.closeModal}
                />
              </span>
            </Layer>
          )}

          {Partner.searchPartnerModalActive && (
            <Layer>
              <span>
                <SearchPartnerModal
                  width={width}
                  open={Partner.searchPartnerModalActive}
                  close={this.closeModal}
                />
              </span>
            </Layer>
          )}
        </Card>
      </>
    );
  }
}

export default ReviewPage;

const Card = styled.div`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 2100px;
  margin-top: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 132px;
  paddinig-bottom: 116px;
  box-sizing: border-box;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    width: 48px;
    height: 48px;
    border: 2px solid #0933b3;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  > span {
    font-size: 26px;
    line-height: 40px;
    letter-spacing: -0.65px;
    color: #0933b3;
    font-weight: bold;
    margin-top: 14px;
  }
`;
const Search = styled.div`
  width: 80%;
  height: 144px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  margin-top: 49px;

  display: flex;
  flex-direction: column;

  padding: 28px 54px 19px 43px;
  box-sizing: border-box;
  > div {
    display: flex;
    justify-content: space-between;
    > span {
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #282c36;
      font-weight: bold;
    }
    > div {
      border: 1px solid #c6c7cc;
      border-radius: 3px;
      width: 149px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        font-size: 18px;
        line-height: 34px;
        letter-spacing: -0.45px;
        color: #0933b3;
        font-weight: 500;
      }
    }
  }
  > div:nth-of-type(1) {
    margin-bottom: 17px;
  }
`;
const StarBox = styled.div`
  margin-top: 45px;
  padding: 41px 0;
  box-sizing: border-box;
  border-top: 1px solid #e1e2e4;
  border-bottom: 1px solid #e1e2e4;
  // height: 263px;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 41px 0;
  box-sizing: border-box;
  > content {
    font-size: 24px;
    line-height: 40px;
    letter-spacing: -0.6px;
    color: #282c36;
    font-weight: normal;
    margin-bottom: 41px;
  }
  > starcontainer {
    display: flex;
    justify-content: center;
    margin-bottom: 37px;
    > div {
      > img {
        width: 45px;
        height: 42px;
      }
    }
  }
  > span:last-child {
    font-size: 16px;
    line-height: 40px;
    letter-spacing: -0.4px;
    color: #c6c7cc;
    font-weight: normal;
  }
`;
const QuestionBox = styled.div``;
const Section = styled.div``;
const Footer = styled.div``;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.5);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;
const StarImg = styled.div`
  margin-right: 5px;
  > img {
    filter: ${(props) => (props.starActive ? "sepia(63%) saturate(10)" : "")};
    cursor: pointer;
  }
`;
