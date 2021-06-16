import React from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

const stars = [1, 2, 3, 4, 5];
const star = "/static/icon/star_blue3.svg";

class ReviewStarRating extends React.Component {
  render() {
    const { width, margin } = this.props;
    return stars.map((data, id) => {
      if (id < 4) {
        return (
          <img
            src={star}
            style={{
              filter: "sepia(80%) saturate(10)",
              width: `${width}px`,
              margin: `0 ${margin}px`,
            }}
          />
        );
      } else {
        return (
          <img
            src={star}
            style={{
              filter: "invert(0.5) opacity(0.5)",
              width: `${width}px`,
              margin: `0 ${margin}px`,
            }}
          />
        );
      }
    });
  }
}

export default ReviewStarRating;
