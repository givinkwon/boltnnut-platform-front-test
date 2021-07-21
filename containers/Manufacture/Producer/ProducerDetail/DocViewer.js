import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { inject, observer } from "mobx-react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { toJS } from "mobx";
/*global kakao*/

@inject("Partner", "Auth")
@observer
class DocViewerContainer extends React.Component {
  state = {
    docViewerLoading: false,
    loading: 0,
  };
  componentdidmount() {
    console.log("docviewer didmount");
  }

  componentWillUnmount() {
    console.log("docviewer unmount");
  }

  componentDidUpdate = () => {
    console.log("didupdate");
    if (
      this.props.Partner.recentPartnerId !=
      this.props.Partner.partner_detail_list[0].item.id
    ) {
      this.props.Partner.recentPartnerId =
        this.props.Partner.partner_detail_list[0].item.id;
    }
  };
  shouldComponentUpdate = (prevProps, nextState) => {
    console.log(this.props.Partner.viewerLoading);
    console.log(this.state.loading);
    console.log(this.props.Partner.viewerLoading === this.state.loading);
    console.log(prevProps);

    console.log(this.props.Partner.recentPartnerId);
    console.log(this.props.Partner.partner_detail_list[0].item.id);
    console.log(
      this.props.Partner.recentPartnerId !=
        this.props.Partner.partner_detail_list[0].item.id
    );

    // this.props.Partner.subViewerLoading = this.state.loading;
    // return (
    //   this.props.Partner.viewerLoading === this.props.Partner.subViewerLoading
    // );

    return (
      this.props.Partner.viewerLoading === this.state.loading ||
      this.props.Partner.recentPartnerId !=
        this.props.Partner.partner_detail_list[0].item.id
    );

    // return !this.props.Partner.viewerLoading;
  };
  render() {
    console.log(toJS(this.props.Partner.selectedIntroductionFile));
    console.log(this.props.Partner.viewerLoading);

    console.log(this.props.Partner.subViewerLoading);

    this.setState((state) => {
      return { loading: state.loading + 1 };
    });
    // this.props.Partner.subViewerLoading += 1;

    console.log(this.state.loading);
    const { width, Partner } = this.props;
    const docs = [{ uri: this.props.Partner.selectedIntroductionFile }];
    //

    return (
      <>
        {this.props.Partner.viewerLoading < 2 && (
          <div style={{ position: "relative" }}>
            <DOCViewer
              documents={docs}
              pluginRenderers={DocViewerRenderers}
              height={width}
              window={window}
              type={this.props.Partner.selectedIntroductionFileType}
            />

            {/* ppt 하단에 전체 보기 및 다운로드 막는 박스인데 스타일 컴포넌트로 할 예정 (임시) */}
            <div
              id="prevent"
              style={{
                position: "absolute",
                width: "90px",
                height: "22px",
                bottom: "0%",
                right: "0%",
                zIndex: "9999",
              }}
            />
          </div>
        )}
      </>
    );
  }
}

export default DocViewerContainer;

const DOCViewer = styled(DocViewer)`
min-height: 300px;
.WACStatusBarContainer{
  border: 3px solid red;
}
> div:nth-of-type(1){
    display: none;
    z-index: 0;    
}
> div:nth-of-type(2) {    

  > div:nth-of-type(1) {
    // height: 1000px;
    height: ${(props) =>
      (props.type === "pptx" || props.type === "ppt") &&
      props.height / 2 - props.height / 5}px;
    height: ${(props) =>
      (props.type === "docx" || props.type === "doc") && 1200}px;
  }
}

  @media (min-width: 0px) and (max-width: 767.98px) {
    > div:nth-of-type(2) {
      > div:nth-of-type(1) {
        height: ${(props) =>
          props.type === "pptx" || props.type === "ppt"
            ? props.height
              ? props.height / 3 + props.height / 3
              : 0
            : 300}px;


      }
      }
    }
  }
`;
