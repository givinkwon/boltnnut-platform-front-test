import { observable, action } from "mobx";
import * as ChatAPI from "axios/Manufacture/Chat"
import Auth from "../Account/Auth";
import { toJS } from "mobx";
import Partner from "./Partner";
import Project from "./Project";

class Chat {
  constructor() {
    //makeObservable(this);
  }

  @observable current_time = null;

  // 채팅 카드를 선택했는 지 활성화를 지칭하는 인덱스
  @observable chatcard_index = -1;

  // 채팅 로그 내용를 저장한 array
  @observable chatcontent_arr = [];
  
  // 채널 소통을 위해 현재 채팅창 내용을 저장한 array 
  @observable chatMessages = [];

  // 파트너의 answer id 값 저장
  @observable answerId = 0;

  // 채팅방의 제목 설정 => 클라이언트인 경우에는 '파트너의 업체명'이 파트너인 경우에는 '의뢰서의 제목'이 이름이 된다.
  @observable chat_title = "";
  
  // 채팅에서 현재 파일
  @observable currentFile = [];

  // 이전 채팅을 가져오기 위한 현재 채팅 페이지
  @observable chatPageCount = 1;

  // 채팅 로그를 가져오는 함수
  @action getChat = () => {
     
        // 채널 소통을 위한 현재 채팅 내용 초기화
        this.chatMessages = [];

        const req = {
            params: {
              answer : this.answerId,
            },
          };
      
          ChatAPI.getChat(req)
          .then((res) => {
            // 채팅 내용 넣기
            this.chatcontent_arr = res.data

            for( let i = 0; i < res.data.results.length; i++) {
              console.log(res.data.results[i])
              this.chatMessages.unshift({
                member: res.data.results[i].user_type,
                text: res.data.results[i].text_content,
                time: res.data.results[i].createdAt,
                chat_type: res.data.results[i].chat_type,
                bRead: false,
                file: res.data.results[i].file,
              });
            }

            console.log(this.chatcontent_arr)
            console.log(this.chatMessages)
            })
         }

  // 메세지 읽음 표시 함수 => currentMessage는 onmessage로 온 채팅(실제 채팅 / 수신 완료 / 접속 완료 포함), fullMessage는 지금 있는 전체 메세지
  @action checkRead = async (fullMessage, currentMessage, flag = 1) => {

    // 전체 메세지(기존 메세지)에 메세지가 있으면
    if (fullMessage.length > 0) {
      
      // 메세지 for 문
      fullMessage.forEach((element) => {
        // 두 개의 메세지 모두 도착하면 
        if (element.time && currentMessage.time) { 
          // 메세지의 type이 다른 경우 => 본인 메세지가 아닌 경우   
          if (
            currentMessage.type != element.member &&
            // currentMessage 시간이 element 시간보다 높을 때 >> 읽음 표시
            element.time.slice(0, 19) <= currentMessage.time.slice(0, 19)
          ) {
            element.bRead = true;
          }
        }
      });
    }

  
    // 메세지를 보낸 경우에 체크하여 카카오톡 보내기
    if (
      // 메세지가 있는 경우 && "접속완료" 메세지가 온 경우 && 마지막 메세지만 읽지 않은 경우 => 읽지 않은 메세지가 여러 개일 때, 1개만 보내기 위함
      fullMessage.length > 1 &&
      currentMessage.message != "접속완료" && currentMessage.message != "수신완료" &&
      fullMessage[fullMessage.length - 1].bRead == false &&
      fullMessage[fullMessage.length - 2].bRead == true
    ) {
      //접속되어있는지 판단하기 위해 조건이 참이 됐을 때의 마지막 메시지 인덱스를 저장 => 메세지를 또 보내면 fullMessage가 갱신되므로
      const checkIdx = fullMessage.length - 1;
      setTimeout(() => {
        // 5초 뒤에도 그 인덱스가 false면 => 읽지 않음 상태면 카카오톡 보내기
        if (!fullMessage[checkIdx].bRead) {
          
          const req = {
            data : {
              // project id
            answer : this.answerId,
            // 채팅 텍스트
            text : currentMessage.message,
            user_type : currentMessage.type // 0이면 클라이언트 -> 파트너, 1이면 파트너 -> 클라이언트
            }
          }

          ChatAPI.sendChat(req)
            .then((res) => console.log(res))
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
        }
      }, 5000);
    }
  };

  // 채팅 보내기 
  @action SendMessage = (myMessage) => {
    // Redis 서버에 보내기
    console.log(myMessage)
    this.chatSocket.send(
      JSON.stringify({
        message: myMessage,
        type: Auth.logged_in_user.type,
        time: this.current_time,
        bReceive: false,
        file: this.currentFile,
        chatType: 0,
      })
    );

  };

  // 파일 or 이미지 보내기
  @action SendFile = (file) => {
    // 채팅 로그 저장하기
    var formData = new FormData();

    formData.append("chat_type", file[0].chat_type);
    formData.append("answer", file[0].answer);
    formData.append("file", file[0].origin_file);
    formData.append("user_type", 0);

    const Token = localStorage.getItem("token");
    const req = {
      data: formData,
    };

    // file url 먼저 서버로 보내서 받기
    ChatAPI.saveFile(req)
      .then((res) => {
        console.log(res);

        const file_url = res.data.file;

        // 소켓으로 채팅 보내기
        this.chatSocket.send(
          JSON.stringify({
            type: Auth.logged_in_user.type,
            message: file_url,
            chatType: res.data.chat_type,
            time: this.current_time,
            bReceive: false,
            file: file_url,
          })
        );
        console.log("send");
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });

  }

  // 이전 채팅 메세지 가져오기
  @action loadPrevMessages = async (page) => {
    // 초기화
    let reverseChat = null

    const loadChatReq = {
      extraUrl: `${this.answerId}`,
      params: {
        page: page,
      },
    };

    // 채팅방(answerId에 따라 채팅 로그 불러오기)
    ChatAPI.loadChat(loadChatReq)
      .then((res) => {
        
        reverseChat = res.data.results;
        console.log(res)
        // 제안서 가져오기
        ChatAPI.loadChatCount(this.answerId).then((m_res) => {

          reverseChat.forEach(async (message) => {
          
          let readState = true;
          // 클라이언트인 경우
          if (message.user_type === 0) {

            if (
              m_res.data.check_time_partner.slice(0, 19) <
              message.createdAt.slice(0, 19)
            ) {
              readState = false;
            }
          } 

          // 파트너인 경우
          else {
            if (
              m_res.data.check_time_client.slice(0, 19) <
              message.createdAt.slice(0, 19)
            ) {
              readState = false;
            }
          }
        
          console.log(message)
        // 배열 값 앞에 추가하기
        this.chatMessages.unshift({
          member: message.user_type,
          text: message.text_content,
          time: message.createdAt,
          bRead: readState,
          file: message.file,
          chat_type: message.chat_type,
          });
        });

        })
      })
        .catch((e) => {
          console.log("이전 메세지가 없습니다.");
        });
      };

}


export default new Chat();
