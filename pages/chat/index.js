import React, { Component } from "react";
import { render } from "react-dom";

import * as AccountAPI from "axios/Account/Account";
import { inject, observer } from "mobx-react";

@inject("Auth") // *_app.js <Provider>에 넘겨준 store명과 일치해야함. *inject: 컴포넌트에서 store에 접근 가능하게 함. 해당 store에 있는 값을 컴포넌트의 props로 주입시켜줌.
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomName: "",
    };
  }

  componentDidMount() {
    document.querySelector("#room-name-input").focus();
    document.querySelector("#room-name-input").onkeyup = function (e) {
      if (e.keyCode === 13) {
        // enter, return
        document.querySelector("#room-name-submit").click();
      }
    };

    document.querySelector("#room-name-submit").onclick = function (e) {
      var roomName = document.querySelector("#room-name-input").value;
      window.location.pathname = "/chat/" + roomName + "/";
    };
    // page ip 기록

    this.props.Auth.previous_url = "chat";

    const formData = new FormData();

    const { history } = this.props;
    console.log(history, history.length)
    console.log(document.referrer)

    // document.referrer은 next.js 페이지 내부에서의 이동이 안잡힘
    // 페이지 내에 이동이 있는 경우 => 신규가 아님
    if(history.length > 1){
      formData.append("prevUrl", window.location.href + history[history.length-2])
    }
    else {
      document.referrer === ""
        ? formData.append("prevUrl", "direct")
        : formData.append("prevUrl", document.referrer);
    }

    formData.append("url", window.location.href);
    const req = {
      data: formData,
    };

        // 방문자 트래픽 기록
        AccountAPI.setUserIP(req)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
      
      // 전체 이동 기록
      AccountAPI.setUserPageIP(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
  }

  render() {
    return (
      <div>
        <input id="room-name-input" type="text" size="100" />
        <br />
        <input id="room-name-submit" type="button" value="Enter" />
      </div>
    );
  }
}

export default App;
