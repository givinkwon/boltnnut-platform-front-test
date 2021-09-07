import React from "react";

// import BannerConatiner from "./Home/Banner";
// import MobileSearchFilterBox from "./Mobile/MobileSearchFilterBox";

// import ContentContainer from "./Home/Content";
// import MobileContentContainer from "./Mobile/MobileContent";
import { inject, observer } from "mobx-react";


@inject("Auth", "Partner", "Category", "Cookie")
@observer
class SearchConatiner extends React.Component {
  async componentDidMount() {
  }

  render() {

    return (
      <>
        {this.props.width &&
          (this.props.width > 767.99 ? (
            <div>
                {/* <> */}
                  {/* <BannerConatiner />
                  <ContentContainer width={this.props.width} />
                </> */}
            </div>
          ) : (
            <>
              {/* 제조사 찾기 모바일 버전 기본 화면 */}
                  {/* <MobileSearchFilterBox width={this.props.width} /> */}
                  {/* <MobileContentContainer width={this.props.width} /> */}
            </>
          ))}
      </>
    );
  }
}

export default SearchConatiner;
