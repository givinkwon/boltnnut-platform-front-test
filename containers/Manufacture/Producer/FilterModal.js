import React from "react";
import styled, { css } from "styled-components";
import Background from "components/Background";
import InnerBoxComponent from "components/InnerBox";

class FilterModalContainer extends React.Component {
  render() {
    return (
      <ModalBox>
        {/* <InnerBoxComponent
        //   outerStyles={{padding:''}}
          Content={() => {
            return <>asd</>;
          }}
        ></InnerBoxComponent> */}
      </ModalBox>
    );
  }
}

export default FilterModalContainer;

const ModalBox = styled.div`
  width: 100%;
  height: 293px;
`;

const MainCategoryBox = styled.div``;

const SubCategoryBox = styled.div``;

const ButtonBox = styled.div``;
