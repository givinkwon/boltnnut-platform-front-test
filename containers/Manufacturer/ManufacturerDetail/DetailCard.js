import React from "react";
import styled, { css } from "styled-components";
import dynamic from "next/dynamic";

// @ts-ignore
const FileViewer = dynamic(() => import("react-file-viewer"), {
  ssr: false,
});
import { inject, observer } from "mobx-react";
import * as Title from "components/Title";
const waterMarkImg = "/static/images/logo_marine@2x.png";
// const file = "./Case-Study-Shell.pdf";
const type = "pdf";

const onError = (e) => {
  console.log(e, "error in file-viewer");
};

@inject("Partner")
@observer
class DetailCardContainer extends React.Component {
  render() {
    const { width } = this.props;
    console.log(this.props.Partner.selectedIntroductionFile);
    return (
      <>
        <Card
          width={width}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          <div
            onCentextMenu={(e) => {
              e.preventDefault();
            }}
            style={{
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%,-50%)",
              zIndex: 1,
            }}
          >
            <div style={{ opacity: 0.2 }}>
              <img src={waterMarkImg} />
            </div>
          </div>
          <InnerBox>
            {/* <TopInlineBox>
              <div>활동 가능</div>
              <div style={{ textAlign: "left" }}>등록일자 ~~~</div>
            </TopInlineBox> */}

            <IntroductionBox width={width}>
              <Font24>회사소개서</Font24>
              <FileViewerContainer
                fileType={this.props.Partner.selectedIntroductionFileType}
                filePath={this.props.Partner.selectedIntroductionFile}
                onError={onError}
              />
            </IntroductionBox>
          </InnerBox>
        </Card>
      </>
    );
  }
}

export default DetailCardContainer;

const Font24 = styled(Title.FontSize24)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.6px;
  text-align: left;
  color: #282c36;
`;
const IntroductionBox = styled.div`
  width: auto;
  text-align: center;

  @media (min-width: 0px) and (max-width: 767.98px) {
    canvas {
      width: ${(props) => (props.width ? props.width - 100 : "")}px;
    }
  }
`;
const TopInlineBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Card = styled.div`
  margin-top: 50px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;

  > div {
    > div {
      > img {
        width: 100%;
      }
    }
  }
`;

const InnerBox = styled.div`
  width: 100%;
  padding: 54px 0 54px 0;
`;

const FileViewerContainer = styled(FileViewer)``;
