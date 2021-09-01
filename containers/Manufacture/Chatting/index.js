import React from "react";
import { inject, observer } from "mobx-react";
import ChattingHeader from "./MyChatting/Header";
import ChattingContent from "./MyChatting/Content";
// 로딩용
import ButtonSpinnerComponent from "components/ButtonSpinner";

@inject("Project", "Auth", "Partner")
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
    const {Auth, width, Partner } = this.props;
    return(
      <>
      {width && width > 767.98 &&
        <div style={{ display : "flex", backgroundColor: "#f6f6f6" , overflow: "visible" }}>
          
          {Partner.loadingFlag ? ( <ButtonSpinnerComponent scale="30%" primary /> ) 
          
            : 
          
            (
              <>
              <ChattingHeader width={width}/>
              <ChattingContent width={width}/>
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