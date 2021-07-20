import React from "react";
import styled, { css } from "styled-components";
import Background from "components/Background";
import InnerBoxComponent from "components/InnerBox";
import * as Title from "components/Title";
import * as Content from "components/Content";
const MainArr = ["제품", "기계/설비/장비", "부품", "공구류"];
class FilterModalContainer extends React.Component {
  state = {
    mainSelectIdx: 0,
    subSelectIdx: 0,
  };
  activeHandler = (type, idx) => {
    if (type === "main") {
      if (idx === this.state.mainSelectIdx) {
        return true;
      } else {
        return false;
      }
    } else {
      if (idx === this.state.subSelectIdx) {
        return true;
      } else {
        return false;
      }
    }
  };

  buttonClick = (type, idx) => {
    if (type === "main") {
      this.setState({ mainSelectIdx: idx });
    } else {
      this.setState({ subSelectIdx: idx });
    }
  };
  render() {
    return (
      <ModalBox>
        {/* <InnerBoxComponent
        //   outerStyles={{padding:''}}
          Content={() => {
            return <>asd</>;
          }}
        ></InnerBoxComponent> */}
        <MainCategoryBox>
          <>
            {/* map으로 뿌리기 */}
            {MainArr.map((data, idx) => {
              return (
                <MainCategoryButton
                  onClick={() => {
                    this.buttonClick("main", idx);
                  }}
                  active={this.activeHandler("main", idx)}
                >
                  <MainCategoryFont>{data}</MainCategoryFont>
                </MainCategoryButton>
              );
            })}
          </>
        </MainCategoryBox>
        <div style={{ width: "100%" }}>
          <SubCategoryBox>
            {MainArr.map((data, idx) => {
              return (
                <SubCategoryButton active={this.activeHandler("sub", idx)}>
                  <SubCategoryFont>{data}</SubCategoryFont>
                </SubCategoryButton>
              );
            })}
          </SubCategoryBox>
          <ButtonBox>2</ButtonBox>
        </div>
      </ModalBox>
    );
  }
}

export default FilterModalContainer;

const ModalBox = styled.div`
  display: flex;
  width: 100%;
  height: 293px;
  box-shadow: 4px 5px 20px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
`;

const MainCategoryBox = styled.div`
  height: 100%;
  width: 26.6vw;
  border-right: 1px solid #e1e2e4;
`;

const MainCategoryButton = styled.div`
  background: ${(props) => (props.active ? "#ededef" : "none")};
  > p {
    color: ${(props) => props.active && "#0933b3"};
  }
`;

const SubCategoryButton = styled.div`
  background: ${(props) => (props.active ? "#ededef" : "none")};
`;
const SubCategoryBox = styled.div`
  height: 78.8%;
  border-bottom: 1px solid #e1e2e4;
`;

const ButtonBox = styled.div``;

const MainCategoryFont = styled(Content.FontSize15)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.27;
  letter-spacing: -0.38px;
  text-align: left;
  color: #282c36;
`;

const SubCategoryFont = styled(Content.FontSize14)`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.43;
  letter-spacing: -0.35px;
  text-align: left;
  color: #282c36;
`;
