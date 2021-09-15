import React from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";

import * as Title from "components/Title";

@inject("Partner", "Auth", "Common")
@observer
class ReviewWritingModalContainer extends React.Component {
  render() {
    return (
      <ReviewWritingModalSection>
        <div>aasdasdasdasdasdasdas</div>
      </ReviewWritingModalSection>
    );
  }
}

export default ReviewWritingModalContainer;

// Font && Common
const Font14 = styled(Title.FontSize14)`
  font-family: NotoSansCJKkr;
  font-weight: normal;
`;

const Font15 = styled(Title.FontSize15)`
  font-family: NotoSansCJKkr;
  color: #999999;
  font-weight: normal;
`;

const Font16 = styled(Title.FontSize16)`
  font-family: NotoSansCJKkr;
  color: #000000;
  font-weight: normal;
`;

const Font24 = styled(Title.FontSize24)`
  font-family: NotoSansCJKkr;
  font-weight: bold;
`;

const InnerBox = styled.div`
  display: flex;
`;
// --------------------------------------------------------------------------------

const ReviewWritingModalSection = styled.section`
  display: flex;
  flex-direction: column;
`;
