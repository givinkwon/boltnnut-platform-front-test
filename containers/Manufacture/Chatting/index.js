import React from "react";
import { inject, observer } from "mobx-react";
import ChattingHeader from "./MyChatting/Header";
import ChattingContent from "./MyChatting/Content";

@inject("Project", "Auth", "Partner")
@observer
class ChattingContainer extends React.Component{
  async componentDidMount() {
    const { Auth } = this.props;
    await Auth.checkLogin();
  };
  render(){
    const {Auth, width } = this.props;
    return(
      <>
      {width && width > 767.98 &&
        <div style={{ display : "flex", backgroundColor: "#f6f6f6" , overflow: "visible" }}>
          <ChattingHeader/>
          <ChattingContent/>
        </div>
      }
      </>
    );
  }
}

export default ChattingContainer