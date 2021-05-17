import React from "react";
import Select from "react-select";
import styled, { keyframes } from "styled-components";

class ReviewContainer extends React.Component {
  render() {
    const { data, width, Partner, categoryData, idx } = this.props;
    console.log(data);

    return (
      <>
        <MainContainer>
          <h1>{data.name}</h1>
        </MainContainer>
      </>
    );
  }
}

export default ReviewContainer;

const MainContainer = styled.div`
  width: 300px;
  height: 300px;
  border: 3px solid red;
`;
