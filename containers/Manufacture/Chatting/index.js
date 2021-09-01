import React from "react";
import { inject, observer } from "mobx-react";
import ChattingHeader from "./MyChatting/Header";
import ChattingContent from "./MyChatting/Content";
// 로딩용
import ButtonSpinnerComponent from "components/ButtonSpinner";
import NoChatting from "./MyChatting/NoChatting";

@inject("Project", "Auth", "Partner", "Chat")
@observer
class ChattingContainer extends React.Component{
  async componentDidMount() {
    const { Auth, Partner } = this.props;
    await Auth.checkLogin();

    // 로딩
    Partner.loadingFlag = true;
    setTimeout(() => {
      Partner.loadingFlag = false;
    } , 500);
  };
  // width 체크하기
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  };

  updateDimensions = () => {
    this.setState({ ...this.state, width: window.innerWidth });
  };

  
  render(){
    const {Auth, width, Partner, Project } = this.props;
    return(
      <>
      {width && width > 767.98 &&
        <div style={{ display : "flex", backgroundColor: "#f6f6f6" , overflow: "visible" }}>
          
          {Partner.loadingFlag ? ( <ButtonSpinnerComponent scale="30%" primary /> ) 
          
            : 
          
            (
              <>
              <ChattingHeader width={width}/>
              {Project.projectDataList.length > 0 ? ( <ChattingContent width={width}/> ) : ( <NoChatting/> ) }
              </>
            ) 
          }
        </div>
      }
      </>
    );
  }
}

export default ChattingContainer