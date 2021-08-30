import { observable, action } from "mobx";
import * as ChatAPI from "axios/Manufacture/Chat"

class Chat {
  constructor() {
    //makeObservable(this);
  }

  @observable current_time = null;

  // 채팅 카드를 선택했는 지 활성화를 지칭하는 인덱스
  @observable chatcard_index = -1;

  // 채팅 내용를 저장한 array
  @observable chatcontent_arr = [];

  // 파트너의 answer id 값 저장
  @observable answerId = 0;

  // 채팅 로그를 가져오는 함수
  @action getChat = () => {
     
        const req = {
            params: {
              answer : this.answerId,
            },
          };
      
          ChatAPI.getChat(req)
          .then((res) => {
            // 채팅 내용 넣기
            this.chatcontent_arr = res.data
            console.log(res)
            })
         }
}

export default new Chat();
