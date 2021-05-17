import React from "react";
import { inject, observer } from "mobx-react";

import ClientChatting from "./ClientChatting";
import PartnerChatting from "./PartnerChatting";
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
      {Auth.logged_in_client &&
      (this.props.width && this.props.width > 1279.98 ?(
        <div style={{ overflow: "visible" }}>
        <ClientChatting/>
        </div>
      )
      :
      (<div></div>)
      )
      
      }
      {Auth.logged_in_partner && 
      (this.props.width && this.props.width > 1279.98 ? (<div style={{ overflow: "visible" }}>
      <PartnerChatting/>
      </div>)
      :
      (<div>
      </div>))
      }
      </div>

    );
  }
}

export default ChattingContainer