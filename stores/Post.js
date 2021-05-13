import { observable, action } from "mobx";
import * as PostAPI from "axios/post";

import Loading from "./Loading";

class Post {
  constructor() {
    //makeObservable(this);
  }
  @observable data = [];

  @action getData = async () => {
    // await Loading.setOpen(true)
    // await PostAPI.getPosts()
    // .then(res => {
    //     this.data = res.data
    // })
    // .catch(e => {
    //     console.log(e)
    //     console.log(e.response)
    // })
    // setTimeout(() => { Loading.setOpen(false) }, 1000);
  };
}

export default new Post();
