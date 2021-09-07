import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import MobileSelectComponent from "../Mobile/MobileSelect";
import * as PartnerAPI from "axios/Manufacture/Partner";

import ButtonComponent from "components/Buttonv2";
import FilterModalContainer from "./FilterModal";

const filter_img = "static/images/filter.svg";
const down_arrow = "/static/icon/down_arrow.svg";
const up_arrow = "/static/icon/up_arrow.svg";
const deleteButtonImg = "/static/images/delete.svg";

@inject("Auth", "Project", "Request", "Partner", "Category")
@observer
class SearchFilterBox extends React.Component {
  state = {
    search: "",
    modal_open: false,
    list: false,
    filter_city_active: false,
    filter_category_active: false,
    type: "",
    category_arrow: false,
    classify_arrow: false,
    location_arrow: false,
    develop_material_arrow: false,
  };

  dropdownHandler = (flag) => {
    const { Partner } = this.props;

    // 카테고리 선택
    if (flag === "business") {
      this.setState({ ...this.state, type: "business" });
    }

    // 업체 분류 선택
    if (flag === "category") {
      this.setState({ ...this.state, type: "category" });
    }

    // 지역 선택
    if (flag === "city") {
      this.setState({ ...this.state, type: "city" });
    }

    // 공정 선택
    if (flag === "develop&material") {
      this.setState({ ...this.state, type: "develop&material" });
    }

    if (Partner.filter_dropdown) {
      Partner.filter_dropdown = false;
    } else {
      Partner.filter_dropdown = true;
    }
  };

  scrollEventHandler = () => {
    const { Partner } = this.props;

    if (window.pageYOffset > 150) {
      Partner.scrollActive = true;
    } else {
      Partner.scrollActive = false;
    }
  };

  componentDidMount = () => {
    const { Partner, Category } = this.props;

    window.addEventListener("scroll", this.scrollEventHandler);
    Partner.filter_dropdown = true;
    Partner.subButtonActive = false;
    Category.category_selected_tagbox = [];
    Category.selected_category_subbox = [];

    if (Partner.fileArray > 0) {
      this.setState({ checkFileUpload: true });
    }
  };

  componentWillUnmount = () => {
    const { Partner } = this.props;
    Partner.filterArray.map((data, idx) => {
      data.checked = false;
    });
  };

  activeHandler = (flag) => {
    if (flag === "city") {
      if (this.state.filter_city_active) {
        this.setState({ filter_city_active: false });
      } else {
        this.setState({ filter_city_active: true });
      }
    }
    if (flag === "category") {
      if (this.state.filter_category_active) {
        this.setState({ filter_category_active: false });
      } else {
        this.setState({ filter_category_active: true });
      }
    }
    if (flag === "category_arrow") {
      if (this.state.category_arrow) {
        this.setState({ category_arrow: false });
      } else {
        this.setState({
          category_arrow: true,
          classify_arrow: false,
          location_arrow: false,
          develop_material_arrow: false,
        });
      }
    }
    if (flag === "classify_arrow") {
      if (this.state.classify_arrow) {
        this.setState({ classify_arrow: false });
      } else {
        this.setState({
          classify_arrow: true,
          category_arrow: false,
          location_arrow: false,
          develop_material_arrow: false,
        });
      }
    }
    if (flag === "location_arrow") {
      if (this.state.location_arrow) {
        this.setState({ location_arrow: false });
      } else {
        this.setState({
          location_arrow: true,
          category_arrow: false,
          classify_arrow: false,
          develop_material_arrow: false,
        });
      }
    }

    if (flag === "develop&material") {
      if (this.state.develop_material_arrow) {
        this.setState({ develop_material_arrow: false });
      } else {
        this.setState({
          develop_material_arrow: true,
          location_arrow: false,
          category_arrow: false,
          classify_arrow: false,
        });
      }
    }
  };

  onClickImgModalCloseHandler = () => {
    const { Partner } = this.props;
    const req = { page: 1 };

    Partner.matching_image = "";
    Partner.imgSearchModalActive = false;

    PartnerAPI.getPartners(req)
      .then((res) => {
        console.log(res);
        Partner.partner_count = res.data.count;
        Partner.partner_list = res.data.results;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { Category, Partner } = this.props;
    return (
      <ContainerV2 scrollActive={Partner.scrollActive}>

        {Partner.filter_dropdown && (
          <FilterModalContainer type={this.state.type}></FilterModalContainer>
        )}

        <SelectedCategoryContainer>
          {Category.category_selected_tagbox.length > 0 &&
            Category.category_selected_tagbox.map((v, idx) => (
              <SelectedCategoryBox>
                <div style={{ marginLeft: "10px" }}>{v.data}</div>
                <CloseImgBox
                  src="/static/images/xbox.svg"
                  onClick={() =>
                    this.props.Category.remove_selected(
                      v.type,
                      idx,
                      "search",
                      v.data
                    )
                  }
                />
              </SelectedCategoryBox>
            ))}
        </SelectedCategoryContainer>

        {/* 이미지 검색 리스트 */}
        <ImgSearchModalContainer active={Partner.imgSearchModalActive}>
          {Partner.fileArray.map((item, idx) => (
            <ImgSearchModalBox>
              <span>
                {Partner.fileArray[0] ? (
                  <img
                    style={{ width: 127, height: 101, objectFit: "scale-down" }}
                    src={Partner.searchFileUrl}
                  />
                ) : (
                  <>파일이 없습니다</>
                )}
              </span>
              <span style={{ fontSize: 14, color: "#1e2222" }}>
                해당 이미지를 검색 합니다.
              </span>
              <DeleteFile
                src={deleteButtonImg}
                onClick={() => this.onClickImgModalCloseHandler()}
              />
            </ImgSearchModalBox>
          ))}
        </ImgSearchModalContainer>
      </ContainerV2>
    );
  }
}

export default SearchFilterBox;

const TestDiv = styled.div`
  width: 792px;
  height: 59px;
  border-radius: 60px;
  box-shadow: 4px 5px 12px 0 rgba(146, 146, 146, 0.2);
  border: solid 0.5px #c6c7cc;
  background-color: #ffffff;
`;

const FilterCategory = styled.div`
  width: 100%;
  margin-top: 40px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  background: none;
  border: none;
`;

const CategoryContainer = styled.div`
  background: none;
  border: none;
  margin-right: 20px;
`;

const Material = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: ${(props) =>
    props.active ? "solid 1px #0933b3" : "solid 1px #c6c7cc"};
  width: 64px;
  height: 40px;
`;

const CategoryName = styled.div`
  background: none;
  border: none;
  width: 204px;
  font-size: 15px;
  line-height: 2.27;
  letter-spacing: -0.38px;
  text-align: left;
  color: #555963;
`;

const Field = styled.div`
  width: 204px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border-radius: 3px;
  border: ${(props) =>
    props.active ? "solid 1px #0933b3" : "solid 1px #c6c7cc"};
  div {
    margin-left: 16px;
    line-height: 2.27;
    letter-spacing: -0.38px;
    text-align: left;
    color: #b3b3b3;
  }
  img {
    margin-right: 12px;
    cursor: pointer;
  }
`;

const ContainerV2 = styled.div`
  display: flex;
  opacity: ${(props) => (props.scrollActive ? "0" : "1")};
  transition: 0.3s all;
  flex-direction: column;
  align-items: center;
  width: 1200px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 16px;
    width: 100%;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    justify-content: center;
    width: 100%;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 115%;
    justify-content: center;
  }
  @media (min-width: 1300px) {
    justify-content: center;
  }
`;

const ProcessMaterialBox = styled.div`
  font-size: 15px;
  line-height: 2.27;
  letter-spacing: -0.38px;
  text-align: center;
  color: #555963;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  position: relative;
  > span {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 70px;
  }
  > div:nth-of-type(3) {
    margin-right: 20px;
    width: 225px;
  }
  > div:nth-of-type(5) {
    width: 172px;
  }

  > div:nth-of-type(3),
  > div:nth-of-type(5) {
    padding: 8px 16px 9px 16px;
    box-sizing: border-box;
    box-shadow: 0 1px 3px 0 rgba(54, 56, 84, 0.3);
    height: 44px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    > span {
      color: #0a2165;
      font-size: 18px;
      font-weight: 500;
      line-height: 28px;
      letter-spacing: -0.45px;
    }
    > div {
      position: absolute;
      background-color: #0933b3;
    }

    display: ${(props) => (props.active ? "flex" : "none")};

    ${(props) =>
      props.active &&
      css`
        > div:nth-of-type(1) {
          @keyframes move_LtoR {
            0% {
              opacity: 0;
              width: 0;
              height: 3px;
              top: 0;
              left: 0;
            }
            50% {
              opacity: 1;
              width: 100%;
            }
            100% {
              opacity: 0;
              width: 0;
              height: 3px;
              top: 0;
              left: 0;
            }
          }

          animation: move_LtoR 2s ease-in-out;
          animation-delay: 1.5s;
        }

        > div:nth-of-type(2) {
          @keyframes move_TtoB {
            0% {
              opacity: 0;
              width: 3px;
              height: 0;
              top: 0;
              right: 0;
            }
            50% {
              opacity: 1;
              height: 100%;
            }
            100% {
              opacity: 0;
              width: 3px;
              height: 0;
              top: 0;
              right: 0;
            }
          }

          animation: move_TtoB 2s ease-in-out;
          animation-delay: 1.5s;
        }

        > div:nth-of-type(3) {
          @keyframes move_RtoL {
            0% {
              opacity: 0;
              width: 0;
              height: 3px;
              bottom: 0;
              right: 0;
            }
            50% {
              opacity: 1;
              width: 100%;
            }
            100% {
              opacity: 0;
              width: 0;
              height: 3px;
              bottom: 0;
              right: 0;
            }
          }

          animation: move_RtoL 2s ease-in-out;
          animation-delay: 1.5s;
        }

        > div:nth-of-type(4) {
          @keyframes move_BtoT {
            0% {
              opacity: 0;
              width: 3px;
              height: 0;
              bottom: 0;
              left: 0;
            }
            50% {
              opacity: 1;
              height: 100%;
            }
            100% {
              opacity: 0;
              width: 3px;
              height: 0;
              bottom: 0;
              left: 0;
            }
          }

          animation: move_BtoT 2s ease-in-out;
          animation-delay: 1.5s;
        }
        > span {
          @keyframes appear {
            0% {
              opacity: 0;
            }

            100% {
              opacity: 1;
            }
          }

          animation: appear 2s ease-in-out;
          animation-delay: 1s;
          animation-fill-mode: both;
        }
      `}
  }

  > div:nth-of-type(4),
  > div:nth-of-type(6) {
    display: ${(props) => (props.active ? "static" : "none")};

    ${(props) =>
      props.active &&
      css`
        @keyframes appear_two {
          0% {
            opacity: 0;
          }

          100% {
            opacity: 1;
          }
        }

        animation: appear_two 2s ease-in-out;
        animation-delay: 1.5s;
        animation-fill-mode: both;
      `}
  }
  > div:nth-of-type(4) {
    position: absolute;
    bottom: -25px;
    right: 240px;
    > span {
      font-size: 14px;
      line-height: 30px;
      letter-spacing: -0.14px;
      color: #86888c;
      font-weight: normal;
    }
  }

  > div:nth-of-type(6) {
    position: absolute;
    bottom: -25px;
    right: 29px;
    > span {
      font-size: 14px;
      line-height: 30px;
      letter-spacing: -0.14px;
      color: #86888c;
      font-weight: normal;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-bottom: 6px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > span {
      font-size: 14px;
      width: 50px;
    }

    > div:nth-of-type(3) {
      margin-right: 10px;
      width: 130px;
    }
    > div:nth-of-type(5) {
      width: 100px;
    }

    > div:nth-of-type(3),
    > div:nth-of-type(5) {
      padding: 4px 8px 5px 8px;
      span {
        font-size: 11px;
        // border: 3px solid red;
      }
    }

    > div:nth-of-type(4) {
      bottom: -25px;
      right: 165px;
      > span {
        font-size: 10px;
      }
    }

    > div:nth-of-type(6) {
      bottom: -25px;
      right: 49px;
      > span {
        font-size: 10px;
      }
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    > span {
      font-size: 18px;
      width: 50px;
      border: 3px solid blue;
    }

    > div:nth-of-type(3) {
      margin-right: 10px;
      width: 200px;
    }
    > div:nth-of-type(5) {
      width: 150px;
    }

    > div:nth-of-type(3),
    > div:nth-of-type(5) {
      padding: 6px 12px 7px 12px;
      span {
        font-size: 13px;
      }
    }

    > div:nth-of-type(4) {
      bottom: -25px;
      right: 154px;
      > span {
        font-size: 12px;
      }
    }

    > div:nth-of-type(6) {
      bottom: -25px;
      right: 6px;
      > span {
        font-size: 12px;
      }
    }
  }
  @media (min-width: 1300px) {
  }
`;
// const Category = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 24px;
//   > div:nth-of-type(1) {
//     margin-right: 24px;
//   }
//   > span {
//     font-size: 20px;
//     line-height: 40px;
//     letter-spacing: -0.5px;
//     color: #282c36;
//     font-weight: 500;
//     width: 70px;
//   }
//   @media (min-width: 0px) and (max-width: 767.98px) {
//     display: block;
//     margin-bottom: 6px;
//     > div {
//       display: inline-block;
//     }
//     > div:nth-of-type(1) {
//       margin-right: 32px;
//     }

//     > span {
//       font-size: 14px;
//       // width: 40px;
//       display: block;
//     }
//   }
//   @media (min-width: 768px) and (max-width: 991.98px) {
//     > span {
//       font-size: 16px;
//       width: 40px;
//     }
//   }
//   @media (min-width: 992px) and (max-width: 1299.98px) {
//     > span {
//       font-size: 18px;
//       width: 50px;
//     }
//   }
//   @media (min-width: 1300px) {
//   }
// `;
// const Location = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 24px;
//   > span {
//     font-size: 20px;
//     line-height: 40px;
//     letter-spacing: -0.5px;
//     color: #282c36;
//     font-weight: 500;
//     width: 70px;
//   }
//   @media (min-width: 0px) and (max-width: 767.98px) {
//     display: block;
//     margin-bottom: 6px;
//     > div {
//       display: inline-block;
//     }
//     > div:nth-of-type(1) {
//       margin-right: 32px;
//     }

//     > span {
//       font-size: 14px;
//       // width: 40px;
//       display: block;
//     }
//   }
//   @media (min-width: 768px) and (max-width: 991.98px) {
//     > span {
//       font-size: 16px;
//       width: 40px;
//     }
//   }
//   @media (min-width: 992px) and (max-width: 1299.98px) {
//     > span {
//       font-size: 18px;
//       width: 50px;
//     }
//   }
//   @media (min-width: 1300px) {
//   }
// `;

const Filter = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  > span:nth-of-type(1) {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    font-weight: 500;
    width: 84px;
  }
  > span:nth-of-type(2) {
    font-size: 16px;
    line-height: 40px;
    letter-spacinig: -0.4px;
    color: #999999;
    width: 172px;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    display: block;
    margin-bottom: 6px;
    > div {
    }
    > div:nth-of-type(1) {
      margin-right: 32px;
    }

    > span:nth-of-type(1) {
      font-size: 14px;
    }
    > span:nth-of-type(2) {
      font-size: 12px;
      line-height: 40px;
      letter-spacinig: -0.4px;
      color: #282c36;
      width: auto;
      float: right;
    }
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    > span:nth-of-type(1) {
      font-size: 16px;
      width: 40px;
    }
    > span:nth-of-type(2) {
      font-size: 13px;
      width: 132px;
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    > span:nth-of-type(1) {
      font-size: 18px;
      width: 50px;
    }
    > span:nth-of-type(2) {
      font-size: 15px;
      width: 132px;
    }
  }
  @media (min-width: 1300px) {
  }
`;

const SearchButton = styled(ButtonComponent)`
  border-radius: 3px;
  @media (min-width: 0px) and (max-width: 767.98px) {
    width: 70px;
    border: 1px solid #ffffff80;
    img {
      margin-right: 0 !important;
    }
    > p {
      display: none;
    }
  }
`;

const MobileSelect = styled(MobileSelectComponent)`
  width: 220px;
  box-sizing: border-box;

  option {
    color: #c1bfbf;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    width: 120px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 140px;
  }
`;

const Box = styled.div`
  width: 220px;

  ${(props) =>
    props.active &&
    css`
      svg {
        @keyframes select {
          0% {
            transform: skewY(-180deg);
          }
        }

        animation: select 0.4s ease-out;
        transform: rotate(-180deg);
      }
    `}

  ${(props) =>
    !props.active &&
    css`
      svg {
        @keyframes selectOut {
          0% {
            transform: rotate(-180deg);
          }
        }
        animation: selectOut 0.4s;
      }
    `}
`;

const InputContainer = styled.div`
  display: flex;

  > span {
    width: 38px;
    align-self: center;
    margin-left: 8px;
    margin-right: 16px;
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    margin-top: 16px;
    > span {
      font-size: 12px;
      width: 28px;
    }
    > span:nth-of-type(1) {
      margin-left: 4px;
      margin-right: 8px;
    }
  }
`;

const InputBox = styled.div`
display: flex;
width: 104px;
height: 32px;
box-sizing: border-box;
margin 0 7px;

input {
  width: 100%;  

  border: 1px solid #c6c7cc;
  border-radius: 3px;
  text-align: right;
  font-size: 16px;
  :focus {
    outline: none;
  }
  ::placeholder{
    color: #c1bfbf;
    text-align: right;
  }
}
`;

const DirectInputBox = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  color: #282c36;
  width: 185px;
  height: 30px;
  border: solid 1px #c6c7cc;
  border-radius: 3px;
  padding: 4px;
  box-sizing: border-box;
  > input {
    width: 90%;
    // padding: 4px;
    outline: none;
    border: none;
    font-size: 18px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #282c36;
    ::placeholder {
      font-size: 14px;
    }
  }

  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 12px;
    width: 155px;
    > input {
      font-size: 12px;
      line-height: 23px;
      ::placeholder {
        font-size: 10px;
      }
    }
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    width: 145px;
  }
`;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const CloseButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    background-color: #a4aab4;
    border-radius: 5px;
    > span {
      font-size: 16px;
      line-height: 52px;
      letter-spacing: -0.4px;
      color: #ffffff;
      font-weight: 500;
    }
  }
`;

const RequestButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
    // background-color: #0933b3;
    border: 1px solid #0933b3;
    border-radius: 5px;
    > span {
      font-size: 16px;
      line-height: 52px;
      letter-spacing: -0.4px;
      color: #0933b3;
      font-weight: 500;
    }
  }
`;

const FilterContainer = styled.div`
  margin-left: 25px;
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  > box:nth-of-type(1) {
    border-right: none;
  }
  box {
    width: 50%;
    height: 100%;
    border: 3px solid #0933b3;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    span {
      font-size: 18px;
      color: #282c36;
    }
  }
`;

const FilterItem = styled.div`
  width: 50%;
  height: 100%;
  border: 3px solid #0933b3;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#0933b3" : "#ffffff")};

  span {
    font-size: 18px;
    color: ${(props) => (props.active ? "#ffffff" : "#282c36")};
  }
`;

const FilterContent = styled.div`
  width: 100%;
  height: 293px;
  margin-top: 15px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: space-between;
  &:after {
    border-top: 3px solid transparent;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 10px solid white;
    content: "";
    position: absolute;
    top: 195px;
    left: 450px;
  }
`;

const Aside = styled.div`
  width: 319px;
  border-right: solid 1px #e1e2e4;
`;
const Buy = styled.div`
  height: 46px;
  text-align: left;
  display: flex;
  align-items: center;
  margin-left: 20px;
  color: #282c36;
  font-size: 15px;
  background-color: ${(props) => (props.active ? "#ededef" : "#ffffff")};
`;
const Develop = styled.div`
  height: 46px;
  text-align: left;
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 15px;
  color: #282c36;
  background-color: ${(props) => (props.active ? "#ededef" : "#ffffff")};
`;
const Making = styled.div`
  height: 46px;
  text-align: left;
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 15px;
  color: #282c36;
  background-color: ${(props) => (props.active ? "#ededef" : "#ffffff")};
`;
const Main = styled.div``;

const FilterButton = styled.div`
  background: none;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 117px;
  height: 44px;
  border: 2px solid #0933b3;
  border-radius: 3px;
  margin-right: 91px;
  margin-left: -5px;
  box-sizing: border-box;
  cursor: pointer;
  > span {
    font-size: 18px;
    line-height: 34px;
    letter-spacing: -0.45px;
    color: #0933b3;
    font-weight: normal;
  }

  @media (min-width: 768px) and (max-width: 991.98px) {
    margin-right: 17px;
    width: 86px;
    > span {
      font-size: 12px;
    }
    > img {
      width: 14px;
    }
  }

  @media (min-width: 992px) and (max-width: 1299.98px) {
    margin-right: 31px;
    > span {
      font-size: 14px;
    }
    > img {
      width: 18px;
    }
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  line-height: 34px;
  letter-spacing: -0.45px;
  color: #0933b3;
  font-weight: normal;
`;

const SelectedCategoryContainer = styled.div`
  display: inline-flex;
  gap: 15px;
  width: 760px;
  flex-wrap: wrap;
  margin-top: 12px;
  top: 50%;
`;

const SelectedCategoryBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eeeeee;
  border-radius: 20px;
  width: auto;
  height: 30px;
`;

const CloseImgBox = styled.img`
  width: 12px;
  height: 12px;
  cursor: pointer;
  margin: 0px 10px 0px 10px;
`;

const DevelopMaterialArrowImg = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 2px;
  margin-bottom: 5px;

  ${(props) =>
    props.active &&
    css`
      transform: rotate(180deg);
    `}
`;

const ImgSearchModalContainer = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
  justify-content: flex-start;
  width: 1200px;
  margin-top: 20px;
`;

const ImgSearchModalBox = styled.div`
  /* display: ${(props) => (props.active ? "block" : "none")}; */
`;

const DeleteFile = styled.img`
  width: 12px;
  height: 12px;
  margin-left: 12px;
  cursor: pointer;
`;
