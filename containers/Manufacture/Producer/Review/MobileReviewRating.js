import React from "react";
const bluebar = "/static/icon/bluebar.svg";

class MobileReviewRating extends React.Component {
  render() {
    const { width, score } = this.props;
    return (
      <img
        src={bluebar}
        style={{
          width: `${score * 20}px`,
          zIndex: 100,
          position: "absolute",
          bottom: 7,
        }}
      />
    );
  }
}

export default MobileReviewRating;
