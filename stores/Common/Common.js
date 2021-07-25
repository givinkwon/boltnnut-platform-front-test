import { observable, action } from "mobx";

class Common {
  @action makeUrl = (url) => {
    if (typeof window !== "undefined") {
      return window.location.protocol + "//" + window.location.host + "/" + url;
    }
  };
}

export default new Common();
