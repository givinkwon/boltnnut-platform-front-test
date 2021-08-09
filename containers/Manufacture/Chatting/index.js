import React from "react";
import { inject, observer } from "mobx-react";

import MyChatting from "./MyChatting/index";
import BannerContainer from "./Banner";

@inject("Project", "Auth", "Partner")
@observer
class ChattingContainer extends React.Component{
  async componentDidMount() {
    const { Auth } = this.props;
    await Auth.checkLogin();
  };
  render(){
    const {Auth} = this.props;
    return(
      <div style = {{marginBottom: 200}}>
      <BannerContainer/>
      {this.props.width && this.props.width > 767.98 &&
        <div style={{ overflow: "visible" }}>
        <MyChatting/>
        </div>
      }
      </div>
    );
  }
}

export default ChattingContainer