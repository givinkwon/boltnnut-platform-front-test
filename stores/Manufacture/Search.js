import { observable, action } from "mobx";
import Slider from "react-slick";

class Search {
  constructor() {
    //makeObservable(this);
  }
  @observable checked = false;
  @observable list = false;
  @observable search = "";
  @observable slider = null;
  @observable width = null;

  @action handleIntersection = (event) => {
    if (event.isIntersecting) {
      console.log("추가 로딩을 시도합니다");
    }
  };

  @action onChange = (e) => {};

  @action handleChange = (selectedOption) => {
    this.props.onChange(selectedOption);
  };

  @action selectClick = () => {
    this.list = true;
  };

  @action selectOut = () => {
    this.list = false;
  };

  @action sliderNext = () => {
    this.slider.slickNext();
  };

  @action sliderPrev = () => {
    this.slider.slickPrev();
  };

  @action updateDimensions = () => {
    this.width = window.innerWidth;
  };

  @action test = (e) => {
    console.log(e);
  };
}

export default new Search();
