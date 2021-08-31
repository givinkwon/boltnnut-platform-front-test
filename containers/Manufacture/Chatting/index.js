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
  // width 체크하기
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  };

  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  
  render(){
    const {Auth, width } = this.props;
    return(
      <>
      {width && width > 767.98 &&
        <div style={{ display : "flex", backgroundColor: "#f6f6f6" , overflow: "visible" }}>
          <ChattingHeader width={width}/>
          <ChattingContent width={width}/>
        </div>
      }
      </>
    );
  }
}

export default ChattingContainer