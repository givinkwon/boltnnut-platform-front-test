import React, { Component, useCallback } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import { useDropzone } from "react-dropzone";
import STLViewer from "stl-viewer";
import FileImage from "FileImage.js";

import CircularProgress from "@material-ui/core/CircularProgress";
// Components
import * as Title from "components/Title";
import * as Content from "components/Content";
import * as ManufactureProcessAPI from "axios/Manufacture/ManufactureProcess";
import * as RequestAPI from "axios/Manufacture/Request";
import SelectComponent from "components/Select";
import ManufactureProcess from "stores/Manufacture/ManufactureProcess";
import InputComponent from "../AddFile2";
import Containerv1 from "components/Containerv1";
import Calendar from "./MobileCalendar2";
import { toJS } from "mobx";
import Router from "next/router";
import Modal from "../LoadingModal";

const fileImg = "/static/images/file.png";

const pass3 = "static/images/pass3.png";
const pass7 = "static/images/pass7.png";
const deleteButtonImg = "/static/images/delete.png";

let fileList = [];

let checkBox = false;

const customStyles = {
  container: (base, state) => {
    return {
      ...base,
      zIndex: state.isFocused ? "98" : "auto", //Only when current state focused
    };
  },
  dropdownIndicator: () => ({
    color: "#555555",
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000000" : "#555555",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 16,
    fontSize: 15,
  }),
  control: () => ({
    fontSize: 15,
    border: "1px solid #e6e6e6",
    backgroundColor: "#fff",
    display: "flex",
    borderRadius: 6,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
};

@inject("Request", "ManufactureProcess", "Auth","Schedule", "Project")
@observer
class FileUploadContainer extends Component {
  static defaultProps = { title: "도면을 업로드해주세요." };

  estimateInfoList = [];
  state = {
    fileList: [],
    checkFileUpload: false,
    checkCard: true,
    publicValue: "",
    privateValue: "",
    publicRows: 7,
    privateRows: 7,
    minRows: 1,
    maxRows: 100,
    checkHeight: false,
    loading: false,
    checkScroll: false,
    orderPrice: [],
    orderMinPrice: [],
    orderMaxPrice: [],
    checkBox,
    variation: false,
    purposeselected1: false,
    purposeselected2: false,
    purposeselected3: false,
    purposeAry: [
      { id: 1, name: "상담요청", checked: false },
      { id: 2, name: "견적문의", checked: false },
      { id: 3, name: "업체수배", checked: false },
    ],
    projectname: "",
    requestFileId: 0, // 도면 수정할 때 참고파일을 업로드하고 수정 버튼 눌렀을 때 기존 requestfile과 연결하기 위함
    requestId: 0, // 도면 수정할 때 도면파일을 업로드하고 수정 버튼 눌렀을 때 기존 request_set과 연결하기 위함
  };

  closeModal = () => {
    const { ManufactureProcess } = this.props;
    ManufactureProcess.loadingEstimate = false;
  };

  // componentDidMount = () => {
  //   const { ManufactureProcess } = this.props;
  //   this.props.ManufactureProcess.reset();
  //   fileList = [];
  //   ManufactureProcess.loadingEstimate = false;
  // };
  // 직접 입력할 경우 텍스트 박스의 값을 저장하는 함수
  setNumCount = (data, val) => {
    console.log(val);
    if (val.label != "직접 입력") {
      data.quantity = { label: val, value: val };
    }
    if (val.label == "직접 입력" && (val.value == 0 || val.value == "")) {
      data.quantity = { label: "직접 입력", value: val };
      data.currentQuantity = value;
    }
    if (val.value == 0) {
      data.quantity = { label: "직접 입력", value: val.value };
      data.currentQuantity = val.value;
    }
    console.log(data.quantity);
  };

  async setValue(idx) {
    await this.setState({ g: 3 });
    const directInputs = document.querySelectorAll(".directInput");

    const valueAry = [];
    for (var i = 0; i < directInputs.length; i++) {
      const string = directInputs[i].className;
      await valueAry.push(
        parseInt(string.slice(string.length - 1, string.length))
      );
    }

    for (var i = idx; i < fileList.length; i++) {
      if (fileList[i]) {
        if (fileList[i].selectBig.name === "금형사출") {
          const str_idx = valueAry.findIndex((e) => e === i);
          const str = directInputs[str_idx].className;

          const num = str.slice(str.length - 1, str.length);

          const directInput = document.querySelector(`.directInput${num}`);

          directInput.value = fileList[i].quantity.value;
        }
      }
    }
  }

  async deleteValue(idx) {
    await this.setState({ g: 3 });
    const directInputs = document.getElementsByClassName("directInput");
    const valueAry = [];
    for (var i = 0; i < directInputs.length; i++) {
      const string = directInputs[i].className;
      await valueAry.push(
        parseInt(string.slice(string.length - 1, string.length))
      );
    }

    for (var i = idx; i < fileList.length; i++) {
      if (fileList[i]) {
        if (fileList[i].selectBig.name === "금형사출") {
          const str_idx = valueAry.findIndex((e) => e === i);
          const str = directInputs[str_idx].className;

          const num = str.slice(str.length - 1, str.length);

          const directInput = document.querySelector(`.directInput${num}`);

          directInput.value = fileList[i].quantity.value;
        }
      }
    }
  }
  async deleteHandler() {
    const checked_ary = [];

    fileList.map((item, id) => {
      if (item.checked) {
        checked_ary.push(id);
        this.countQuantity(0, parseInt(item.quantity.value), 1);
      }
    });
    console.log(checked_ary);

    for (var i = checked_ary.length; i > 0; i--) {
      this.setState({ fileList: fileList.splice(checked_ary[i - 1], 1) });
    }

    if (fileList.length) {
      const directInputs = document.getElementsByClassName("directInput");
      const valueAry = [];

      console.log(directInputs);

      console.log(fileList);
      console.log(directInputs);

      for (var i = 0; i < directInputs.length; i++) {
        const string = directInputs[i].className;
        await valueAry.push(
          parseInt(string.slice(string.length - 1, string.length))
        );
        const str = directInputs[i].className;

        const num = str.slice(str.length - 1, str.length);
        const directInput = document.querySelector(`.directInput${num}`);

        directInput.value = fileList[num].quantity.value;
      }
      console.log(valueAry);
    }
    this.setState({ variation: true });
  }

  // ESC 버튼을 눌렀을 경우 발생하는 함수 (삭제 에정)
  escFunction(event) {
    if (event.keyCode === 27) {
      console.log("esc");
    }
  }

  /* 
    프로젝트 수정 할 때 클라이언트가 참고 파일를 업로드하거나 삭제하는 등의 변경 작업을 마치고 수정하기 버튼을 누르면
    해당 참고파일이 기존 request id로 생성되면서 연결
  */
  modifyRequestFile = async (file, share_flag) => {
    let reqFileFormData = new FormData();
    await reqFileFormData.append("request", this.state.requestId);
    await reqFileFormData.append("file", file);
    await reqFileFormData.append("share_inform", share_flag);

    const req = {
      data: reqFileFormData,
    };

    // for (var pair of reqFileFormData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    await RequestAPI.setRequestFile(req)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
        console.log(e.response.data);
      });
  };

  changeSubmit = () => {};
  requestSubmit = async (flag, id) => {
    const { projectname, purposeAry } = this.state;
    const { ManufactureProcess, Schedule, Request } = this.props;

    ManufactureProcess.projectSubmitLoading = false;
    console.log(toJS(ManufactureProcess.totalorderPrice));
    let deadline_state = "";
    let processData = "";
    let detailProcessData = "";
    let quantityData = "";

    console.log(ManufactureProcess.purposeContent);
    // error 처리
    if (ManufactureProcess.purposeContent == 0) {
      alert("문의 목적을 선택해주세요");
      ManufactureProcess.projectSubmitLoading = true;
      return false;
    }
    if (projectname.length == 0) {
      alert("프로젝트 제목을 입력해주세요");
      ManufactureProcess.projectSubmitLoading = true;
      return false;
    }
    if (projectname.length > 200) {
      alert("제목이 너무 깁니다. 200자 이내로 작성해주세요.");
      ManufactureProcess.projectSubmitLoading = true;
      return false;
    }
    if (ManufactureProcess.requestComment.length == 0) {
      alert("공개내용을 작성해주세요");
      ManufactureProcess.projectSubmitLoading = true;
      return false;
    }

    if (ManufactureProcess.requestComment.length > 4500) {
      alert("공개내용이 너무 깁니다. 4500자 이내로 작성해주세요.");
      ManufactureProcess.projectSubmitLoading = true;
      return false;
    }
    if (ManufactureProcess.requestComment2.length > 4500) {
      alert("비공개내용이 너무 깁니다. 4500자 이내로 작성해주세요.");
      ManufactureProcess.projectSubmitLoading = true;
      return false;
    }

    ManufactureProcess.date_undefined
      ? (deadline_state = "납기일미정")
      : ManufactureProcess.date_conference
      ? (deadline_state = "납기일협의가능")
      : "";

    let request_state = "";
    if (ManufactureProcess.purposeContent) {
      request_state =
        this.state.purposeAry[ManufactureProcess.purposeContent - 1].name;
    }
    console.log(request_state);

    console.log("requestSubmit");
    console.log(Schedule.clickDay);
    console.log(fileList);
    var formData = new FormData();

    formData.append("request_state", request_state);
    formData.append("name", projectname);

    // 선택한 날짜가 없으면, 기본 날짜 추가하기
    if (Schedule.clickDay) {
      formData.append("deadline", Schedule.clickDay + " 09:00");
    } else {
      formData.append("deadline", "2020-11-11 11:11");
    }

    // 선택한 납기 선택이 없으면 납기일 미정으로
    if (deadline_state.length == 0) {
      formData.append("deadline_state", "납기일미정");
    } else {
      formData.append("deadline_state", deadline_state);
    }
    formData.append("order_request_open", ManufactureProcess.requestComment);
    formData.append("order_request_close", ManufactureProcess.requestComment2);
    console.log(toJS(ManufactureProcess.openFileArray));
    if (ManufactureProcess.openFileArray.length === 0) {
      formData.append(`file_open`, "");
    }
    for (var i = 0; i < ManufactureProcess.openFileArray.length; i++) {
      formData.append(`file_open`, ManufactureProcess.openFileArray[i]);
    }
    console.log(toJS(ManufactureProcess.privateFileArray));
    if (ManufactureProcess.privateFileArray.length === 0) {
      formData.append(`file_close`, "");
    }
    for (var i = 0; i < ManufactureProcess.privateFileArray.length; i++) {
      formData.append(`file_close`, ManufactureProcess.privateFileArray[i]);
    }

    formData.append("price", ManufactureProcess.orderMaxPrice);
    formData.append("blueprint_exist", 1);
    for (var i = 0; i < fileList.length; i++) {
      console.log(toJS(fileList[i].selectBig.id));
      console.log(toJS(fileList[i].selectedMid.id));
      console.log(toJS(fileList[i].originFile));
      if (fileList[i].checked) {
        formData.append(`blueprint`, fileList[i].originFile);

        processData = processData + fileList[i].selectBig.id;
        detailProcessData = detailProcessData + fileList[i].selectedMid.id;
        quantityData = quantityData + fileList[i].quantity.value;

        console.log(quantityData);
        console.log(fileList[i].quantity.value);
        if (i < fileList.length - 1) {
          processData = processData + ",";
          detailProcessData = detailProcessData + ",";
          quantityData = quantityData + ",";
        }
      }
    }

    console.log(processData);
    console.log(detailProcessData);
    console.log(quantityData);

    formData.append("process", processData);
    formData.append("detailprocess", detailProcessData);
    formData.append("number", quantityData);

    const Token = localStorage.getItem("token");

    if (flag) {
      const req = {
        headers: {
          Authorization: `Token ${Token}`,
        },
        data: formData,
      };

      console.log(req);

      RequestAPI.create(req)
        .then((res) => {
          console.log("create: ", res);
          ManufactureProcess.projectSubmitLoading = true;
          dataLayer.push({ event: "request_Drawing" });
          this.props.Request.newIndex = 1;
          ManufactureProcess.reset();
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
      const processAry = processData.split(",");
      const detailProcessAry = detailProcessData.split(",");
      ManufactureProcess.getProcessList(processAry, detailProcessAry);
    } else {
      const RequestFormData = new FormData();

      // if (ManufactureProcess.openFileArray.length === 0) {
      //   RequestFormData.append(`file`, "");
      // }

      // for (var i = 0; i < ManufactureProcess.openFileArray.length; i++) {
      //   RequestFormData.append(`file`, ManufactureProcess.openFileArray[i]);
      //   RequestFormData.append("request", )
      //   RequestFormData.append("share_inform", )
      // }

      //RequestFormData.append("file", )

      await this.props.Project.projectDetailData.request_set[0].estimate_set.map(
        async (item, idx) => {
          console.log(item);

          const req = {
            id: item.id,
          };

          await RequestAPI.delEstimate(req)
            .then((res) => {
              console.log(toJS(res));
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
        }
      );

      for (let i = 0; i < this.props.Request.request_file_set.length; i++) {
        await this.props.Request.deleteRequestFile(
          this.props.Request.request_file_set[i]
        );
      }

      if (ManufactureProcess.openFileArray.length !== 0) {
        await ManufactureProcess.openFileArray.map(async (item, idx) => {
          this.modifyRequestFile(item, true);
        });
      }
      if (ManufactureProcess.privateFileArray.length !== 0) {
        await ManufactureProcess.privateFileArray.map(async (item, idx) => {
          this.modifyRequestFile(item, false);
        });
      }

      const modifyFormData = new FormData();

      for (var i = 0; i < fileList.length; i++) {
        console.log(fileList[i].originFile);
        console.log(toJS(fileList[i].selectBig.id));
        console.log(toJS(fileList[i].selectedMid.id));
        console.log(this.state.requestId);
        console.log(fileList[i].quantity.value);

        if (fileList[i].checked) {
          modifyFormData.append("blueprint", fileList[i].originFile);
          modifyFormData.append("process", fileList[i].selectBig.id);
          modifyFormData.append("detailprocess", fileList[i].selectedMid.id);
          modifyFormData.append("requestid", this.state.requestId);
          modifyFormData.append("number", fileList[i].quantity.value);

          const req = {
            headers: {
              Authorization: `Token ${Token}`,
            },
            data: modifyFormData,
          };

          await RequestAPI.modifyEstimate(req)
            .then((res) => {
              console.log(res);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }

      const reqFormData = new FormData();

      // reqFormData.append()

      const req = {
        headers: {
          Authorization: `Token ${Token}`,
        },
        data: formData,
        id: this.state.requestId,
      };

      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }

      await RequestAPI.modifyProject(req)
        .then((res) => {
          console.log(`modify Project : ${res}`);
          ManufactureProcess.projectSubmitLoading = true;
          ManufactureProcess.changeProject = false;
          this.props.Request.newIndex = 3;
        })
        .catch((e) => {
          console.log(e);
          console.log(e.response);
        });
    }
  };

  purposeHandler = (item) => {
    const { ManufactureProcess } = this.props;
    const { purposeAry } = this.state;
    console.log(ManufactureProcess.purposeContent);
    if (item.checked) {
      item.checked = false;
      ManufactureProcess.purposeContent = 0;
    } else {
      item.checked = true;
      if (ManufactureProcess.purposeContent) {
        this.state.purposeAry[
          ManufactureProcess.purposeContent - 1
        ].checked = false;
      }
      ManufactureProcess.purposeContent = item.id;
    }
    this.setState({ g: 3 });
  };

  checkQuantityData = (e, data, idx) => {
    const directInput = document.getElementsByClassName("directInput");

    const re = /^[0-9\b]+$/;

    if (e.target.value === "") {
      e.target.placeholder = "직접 입력하세요";
    } else if (!re.test(e.target.value)) {
      data.quantity = { label: "직접 입력", val: "" };
    }

    if (data.selectBig.name === "금형사출") {
      if (e.target.value > 0 && e.target.value < 100) {
        alert("최소 주문 수량은 100개입니다!");
        data.quantity = { label: "직접 입력", val: 0 };
        e.target.value = "";
        if (directInput[idx]) {
        }
      } else {
        this.countPrice();
      }
    } else {
      this.countPrice();
    }
  };

  countQuantity = (prev_value = 0, current_value = 0, checked = 0) => {
    const { ManufactureProcess } = this.props;
    if (!checked) {
      ManufactureProcess.quantity =
        ManufactureProcess.quantity - prev_value + current_value;
    } else if (checked === 1) {
      ManufactureProcess.quantity = ManufactureProcess.quantity - current_value;
    } else {
      ManufactureProcess.quantity = ManufactureProcess.quantity + current_value;
    }
    console.log(ManufactureProcess.quantity);
  };
  async componentDidMount() {
    const { ManufactureProcess, Project, Schedule } = this.props;
    const { purposeAry } = this.state;
    //console.log("didMount")
    // console.log(ManufactureProcess.changeProject);
    console.log(toJS(Project.projectDetailData));
    ManufactureProcess.loadingEstimate = false;

    await this.props.ManufactureProcess.reset();
    fileList = [];

    console.log(ManufactureProcess.checkFileUpload);
    console.log(toJS(ManufactureProcess.purposeContent));

    if (ManufactureProcess.changeProject) {
      this.props.ManufactureProcess.checkFileUpload = true;
      await this.state.purposeAry.map((item, idx) => {
        item.checked = false;
      });

      await ManufactureProcess.init();
      console.log(toJS(this.props.Project.projectDetailData.id));
      this.setState({
        requestFileId: Project.projectDetailData.request_set[0]
          .requestfile_set[0]
          ? Project.projectDetailData.request_set[0].requestfile_set[0].request
          : 0,
        requestId: Project.projectDetailData.request_set[0].id
          ? Project.projectDetailData.request_set[0].id
          : 0,
      });

      this.state.projectname = Project.projectDetailData.request_set[0].name;
      this.state.publicValue =
        Project.projectDetailData.request_set[0].order_request_open;
      ManufactureProcess.requestComment =
        Project.projectDetailData.request_set[0].order_request_open;
      this.state.privateValue =
        Project.projectDetailData.request_set[0].order_request_close;
      ManufactureProcess.requestComment2 =
        Project.projectDetailData.request_set[0].order_request_close;
      const clickDayAry =
        Project.projectDetailData.request_set[0].deadline.split("T");
      Schedule.clickDay = clickDayAry[0];
      if (
        Project.projectDetailData.request_set[0].deadline_state ===
        "납기일협의가능"
      ) {
        ManufactureProcess.date_conference = true;
      } else {
        ManufactureProcess.date_undefined = true;
      }
      ManufactureProcess.date_conference;

      await this.state.purposeAry.map((item, idx) => {
        if (
          item.name === Project.projectDetailData.request_set[0].request_state
        ) {
          item.checked = true;
          ManufactureProcess.purposeContent = idx + 1;
        }
      });

      await Project.projectDetailData.request_set[0].estimate_set.map(
        async (item, idx) => {
          let loadingCounter = 0;

          const response = await fetch(item.stl_file);
          const data = await response.blob();
          //const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
          const filename = item.stl_file.split("/").pop(); // url 구조에 맞게 수정할 것
          //const metadata = { type: `image/${ext}` };
          // console.log(decodeURI(filename));
          console.log(filename.toString());
          let file = new File([data], filename);

          const ManufactureProcessFormData = new FormData();
          ManufactureProcessFormData.append("blueprint", file);
          ManufactureProcessFormData.append(
            "process",
            ManufactureProcess.categoryDefaultValue.big.id
          );
          ManufactureProcessFormData.append(
            "detailprocess",
            ManufactureProcess.categoryDefaultValue.mid.id
          );
          //기본정보입력에서 받은 의뢰서로 바꾸기
          ManufactureProcessFormData.append("request", "");
          // console.log(ManufactureProcessFormData);
          this.setState({ loading: true });

          ManufactureProcessAPI.saveSelect(ManufactureProcessFormData)
            .then((res) => {
              loadingCounter++;
              console.log(res);
              this.setState({
                fileList: fileList.push({
                  submitFile: res.data.data,
                  originFile: file,
                  stl_file: true,
                  drawFile: res.data.data.stl_file,
                  fileName: file.name,
                  price: res.data.data.maxPrice,
                  //MaxPrice: res.data.data.maxPrice,

                  productionPrice: res.data.data.maxPrice, // 생산가
                  productionMaxPrice: res.data.data.maxPrice,
                  productionMinPrice: res.data.data.minPrice,

                  moldminPrice:
                    Math.round(res.data.data.totalMinPrice / 10000) * 10000, // 금형최소가
                  moldmaxPrice:
                    Math.round(res.data.data.totalMaxPrice / 10000) * 10000, // 금형최대가

                  moldPrice:
                    Math.round(res.data.data.totalMaxPrice / 10000) * 10000, // 금형가

                  x_length: Math.round(res.data.data.x_length),
                  y_length: Math.round(res.data.data.y_length),
                  z_length: Math.round(res.data.data.z_length),

                  selectedMid: ManufactureProcess.categoryDefaultValue.mid,
                  checked: true,

                  quantity: { label: "", value: 0 },
                  prevQuantity: 0,
                  currentQuantity: 0,

                  totalPrice: 0,
                  totalMoldPrice: res.data.data.totalMaxPrice,
                  totalMoldMinPrice: res.data.data.totalMinPrice,
                  totalMoldMaxPrice: res.data.data.totalMaxPrice,
                  totalEjaculationPrice: res.data.data.maxPrice,

                  optionBig: ManufactureProcess.ManufactureProcessList,
                  selectBig: ManufactureProcess.categoryDefaultValue.big,
                  optionMid: ManufactureProcess.categoryDefaultValue.big.detail,
                  selectedMid: ManufactureProcess.categoryDefaultValue.mid,
                  priceLoading: false,
                }),
              });

              // console.log(loadingCounter + "/" + files.length);
              // if (loadingCounter === files.length) {
              //   this.setState({ loading: false });
              // }

              // console.log(loadingCounter + "/" + stl_count);
              if (loadingCounter) {
                this.setState({ loading: false });
              }
              this.countPrice();
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
              console.log(e.response.data);
            });
        }
      );

      // await Project.projectDetailData.request_set[0].estimate_set.map(
      //   (item, idx) => {
      //     this.setState({
      //       fileList: fileList.push({
      //         //originFile: file,
      //         originFile: item.stl_file,
      //         stl_file: true,
      //         drawFile: item.stl_file,
      //         //fileName: file.name,
      //         fileName: "efweerr.stl",
      //         price: item.maxPrice,
      //         //MaxPrice: res.data.data.maxPrice,
      //         productionPrice: item.maxPrice, // 생산가
      //         moldPrice: Math.round(item.totalMaxPrice / 10000) * 10000, // 금형가
      //         ejaculationPrice: Math.round(item.maxPrice / 10) * 10, // 사출가
      //         x_length: Math.round(item.x_length),
      //         y_length: Math.round(item.y_length),
      //         z_length: Math.round(item.z_length),
      //         //selectedMid: ManufactureProcess.categoryDefaultValue.mid,
      //         checked: true,
      //         quantity: { label: "", value: item.number },
      //         prevQuantity: 0,
      //         currentQuantity: 0,
      //         totalPrice: 0,
      //         totalMoldPrice: item.totalMaxPrice,
      //         totalEjaculationPrice: item.maxPrice,
      //         optionBig: ManufactureProcess.ManufactureProcessList,
      //         //selectBig: ManufactureProcess.categoryDefaultValue.big,
      //         selectBig: { name: "금형사출", id: item.process, detial: [] },

      //         optionMid: ManufactureProcess.categoryDefaultValue.big.detail,
      //         selectedMid: { name: "플라스틱", id: item.category },
      //         priceLoading: true,
      //       }),
      //     });
      //     console.log(this.fileList);
      //   }
      // );

      ManufactureProcess.checkFileUpload = true;
      console.log(toJS(this.props.Project.projectDetailData));
      await this.props.Request.getRequestFile(
        this.props.Project.projectDetailData.request_set[0].id
      );
      console.log(toJS(this.props.Request.request_file_set));
      //request_file_set

      // for (let i = 0; i < this.props.Request.request_file_set.length; i++) {
      //   await this.props.Request.deleteRequestFile(
      //     this.props.Request.request_file_set[i]
      //   );
      // }
      // this.setState({ g: 3 });

      await Project.projectDetailData.request_set[0].requestfile_set.map(
        async (item, idx) => {
          const response = await fetch(item.file);
          const data = await response.blob();
          //const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
          const filename = item.file.split("/").pop(); // url 구조에 맞게 수정할 것
          //const metadata = { type: `image/${ext}` };
          // console.log(decodeURI(filename));
          console.log(filename.toString());
          console.log(decodeURI(filename));
          let file = new File([data], decodeURI(filename));

          let fileNameNotAvailable = ["stl", "stp", "step"];
          const extension = item.file.split(".");
          console.log(extension);
          //console.log(fileNameAvailable)

          if (!fileNameNotAvailable.includes(extension[extension.length - 1])) {
            if (item.share_inform) {
              this.props.ManufactureProcess.openFileArray.push(file);
            } else {
              this.props.ManufactureProcess.privateFileArray.push(file);
            }
          }

          console.log(toJS(this.props.ManufactureProcess.openFileArray));
        }
      );
    }

    if (!ManufactureProcess.checkPaymentButton) {
      window.addEventListener("scroll", this.loadScroll);
    }
  }

  componentDidUpdate() {
    const { ManufactureProcess } = this.props;
  }

  componentWillUnmount = () => {
    const { ManufactureProcess } = this.props;
    fileList = [];
    ManufactureProcess.dataPrice = [];
    ManufactureProcess.openFileArray = [];
    ManufactureProcess.privateFileArray = [];
    ManufactureProcess.changeProject = false;
    window.removeEventListener("scroll", this.loadScroll);
  };

  // 각각의 도면 데이터들의 가격과 총 주문금액을 계산하는 함수
  async countPrice() {
    const { ManufactureProcess } = this.props;
    let price = 0;
    let minprice = 0;
    let maxprice = 0;
    await fileList.map((data, idx) => {
      if (data.stl_file) {
        data.totalMoldPrice = Math.round(data.moldPrice / 10000) * 10000;
        console.log(data.totalMoldPrice);

        data.totalPrice =
          Math.round(data.productionPrice / 10) * 10 * data.quantity.value;

        data.totalMaxPrice =
          Math.round(data.productionMaxPrice / 10) * 10 * data.quantity.value;
        data.totalMinPrice =
          Math.round(data.productionMinPrice / 10) * 10 * data.quantity.value;

        // 도면 데이터가 체크 되어 있는 경우에만 총 주문금액 계산
        if (data.checked) {
          if (data.selectBig.name === "금형사출") {
            price += data.totalMoldPrice;
            price += data.totalPrice;

            minprice += Math.round(data.totalMoldMinPrice / 10000) * 10000;
            minprice += data.totalMinPrice;

            maxprice += Math.round(data.totalMoldMaxPrice / 10000) * 10000;
            maxprice += data.totalMaxPrice;
          } else {
            price += data.totalPrice;
            console.log(data.totalMinPrice);
            console.log(data.totalMaxPrice);
            minprice += data.totalMinPrice;
            maxprice += data.totalMaxPrice;
          }
        } else {
          this.setState({ g: 3 });
        }
      }
    });
    ManufactureProcess.orderPrice = price;
    ManufactureProcess.orderMinPrice = minprice;
    ManufactureProcess.orderMaxPrice = maxprice;
    console.log(ManufactureProcess.orderPrice);
  }

  loadFileResopnse = (fileIdx) => {
    console.log(fileIdx);
    console.log(fileList);
    console.log(fileList[fileIdx].originFile);
    console.log(toJS(ManufactureProcess.selectedBigCategory.id));
    console.log(toJS(ManufactureProcess.selectedMidCategory.id));
    const ManufactureProcessFormData = new FormData();
    ManufactureProcessFormData.append(
      "blueprint",
      fileList[fileIdx].originFile
    );
    ManufactureProcessFormData.append(
      "process",
      ManufactureProcess.selectedBigCategory.id
    );
    ManufactureProcessFormData.append(
      "detailprocess",
      ManufactureProcess.selectedMidCategory.id
    );
    console.log(ManufactureProcess.selectedMidCategory.id);
    fileList[fileIdx].selectedMid = ManufactureProcess.selectedMidCategory;
    fileList[fileIdx].priceLoading = true;
    this.setState({ t: false });
    console.log(
      "fileIdx = " +
        fileIdx +
        " / process = " +
        ManufactureProcess.selectedBigCategory.id +
        " / detailProcess =" +
        ManufactureProcess.selectedMidCategory.id
    );

    //기본정보입력에서 받은 의뢰서로 바꾸기
    ManufactureProcessFormData.append("request", "");
    // this.setState({fileList:fileList})
    console.log(ManufactureProcessFormData);
    ManufactureProcessAPI.saveSelect(ManufactureProcessFormData)
      .then((res) => {
        console.log(res);

        // Range 제공을 위함 몰드 비용
        fileList[fileIdx].moldPrice = res.data.data.totalMaxPrice;
        fileList[fileIdx].totalMoldMaxPrice = res.data.data.totalMaxPrice;
        fileList[fileIdx].totalMoldMinPrice = res.data.data.totalMinPrice;
        fileList[fileIdx].price = res.data.data.totalMaxPrice;
        // Range 제공을위함. 사출/생산 비용.
        fileList[fileIdx].productionPrice = res.data.data.maxPrice;
        fileList[fileIdx].productionMinPrice = res.data.data.minPrice;
        fileList[fileIdx].productionMaxPrice = res.data.data.maxPrice;
        // 사출비용
        fileList[fileIdx].productionMaxPrice = res.data.data.maxPrice;
        fileList[fileIdx].priceLoading = false;

        this.countPrice();

        //리렌더링을 위한 state설정. 바꿔야될듯
        this.setState({ t: true });
        this.setState({
          fileList: fileList,
        });
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      });
    //
  };
  checkboxChange = (idx, e) => {
    this.setState({ ...this.state, checkCard: e });
  };

  // 스크롤 할 때 도면 추가하는 부분 밑으로 스크롤 할 경우 헤더 부분 fix가 풀리고 다시 도면 추가하는 부분으로 스크롤 할 경우 헤더 부분이 fix가 되게끔 하는 함수
  loadScroll = () => {
    const { ManufactureProcess } = this.props;
    if (!ManufactureProcess.checkPaymentButton) {
      var scrollTop = Math.max(
        document.documentElement.scrollTop,
        document.body.scrollTop
      );

      const bannerHeight = 208;
      const paddingHeight = 215;
      const noticeBoxHeight = 90;
      var standardHeight = 80 + bannerHeight;
      var currentHeight =
        paddingHeight + standardHeight + fileList.length * 240;
      const card = document.getElementById("card");

      if (card) {
        if (this.props.ManufactureProcess.checkFileUpload) {
          if (scrollTop > currentHeight) {
            card.style.display = "none";
            card.style.position = "static";
          } else if (scrollTop < currentHeight) {
            if (scrollTop > bannerHeight + 30) {
              card.style.display = "flex";
              card.style.position = "fixed";

              this.setState({ checkHeight: true });
            } else if (scrollTop < bannerHeight + 40) {
              card.style.display = "flex";
              card.style.position = "static";
              this.setState({ checkHeight: false });
            }
          }
        } else {
          card.style.display = "flex";
        }
      }
    }
  };

  // 추가 요청 사항 부분 - 사용자가 멀티 라인으로 텍스트 할 경우 자동으로 높이 조절되게끔 해주는 함수
  publicRequestHandler = (event) => {
    this.props.Auth.checkLogin();
    if (!this.props.Auth.logged_in_user) {
      alert("로그인이 필요한 서비스입니다.");
      Router.push("/login");
      return;
    }
    const textareaLineHeight = 34;
    const { minRows, maxRows } = this.state;
    const { ManufactureProcess } = this.props;
    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      publicValue: event.target.value,
      publicRows: currentRows < maxRows ? currentRows : maxRows,
    });

    ManufactureProcess.requestComment = event.target.value;
  };

  privateRequestHandler = (event) => {
    const textareaLineHeight = 34;
    const { minRows, maxRows } = this.state;
    const { ManufactureProcess } = this.props;
    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      privateValue: event.target.value,
      privateRows: currentRows < maxRows ? currentRows : maxRows,
    });

    ManufactureProcess.requestComment2 = event.target.value;
  };

  // 수량이 변경되는 경우 수량 정보를 저장
  onQuantityChange(data, value) {
    if (
      data.selectBig.name === "금형사출" &&
      value.value > 0 &&
      value.value < 100
    ) {
      alert("최소 주문 수량은 100개입니다!");
    } else {
      this.setState(() => {
        return { quantity: value.value };
      });
      data.quantity = value;
    }
  }

  setIsShown = (flag, idx = 0) => {
    console.log(checkBox_one);
    if (idx === 0) {
      checkBox = flag;
      this.setState({ checkBox: flag });
    } else if (idx === 1) {
      checkBox_one = flag;
      this.setState({ checkBox_one: flag });
    }
  };

  MyDropzone = () => {
    const { ManufactureProcess } = this.props;
    const dropHandler = (files, stl_count) => {
      let loadingCounter = 0;
      console.log("dropHandler");
      console.log(files);
      files.forEach((file, fileIdx) => {
        if (file.check_stl) {
          const ManufactureProcessFormData = new FormData();
          ManufactureProcessFormData.append("blueprint", file);
          ManufactureProcessFormData.append(
            "process",
            ManufactureProcess.categoryDefaultValue.big.id
          );
          ManufactureProcessFormData.append(
            "detailprocess",
            ManufactureProcess.categoryDefaultValue.mid.id
          );
          //기본정보입력에서 받은 의뢰서로 바꾸기
          ManufactureProcessFormData.append("request", "");
          console.log(ManufactureProcessFormData);
          this.setState({ loading: true });
          ManufactureProcessAPI.saveSelect(ManufactureProcessFormData)
            .then((res) => {
              loadingCounter++;
              this.setState({
                fileList: fileList.push({
                  submitFile: res.data.data,
                  originFile: file,
                  stl_file: true,
                  drawFile: res.data.data.stl_file,
                  fileName: file.name,
                  price: res.data.data.maxPrice,

                  productionPrice: res.data.data.maxPrice, // 생산가
                  productionMaxPrice: res.data.data.maxPrice,
                  productionMinPrice: res.data.data.minPrice,

                  moldminPrice:
                    Math.round(res.data.data.totalMinPrice / 10000) * 10000, // 금형최소가
                  moldmaxPrice:
                    Math.round(res.data.data.totalMaxPrice / 10000) * 10000, // 금형최대가

                  moldPrice:
                    Math.round(res.data.data.totalMaxPrice / 10000) * 10000, // 금형가

                  x_length: Math.round(res.data.data.x_length),
                  y_length: Math.round(res.data.data.y_length),
                  z_length: Math.round(res.data.data.z_length),

                  selectedMid: ManufactureProcess.categoryDefaultValue.mid,
                  checked: true,

                  quantity: { label: "", value: 0 },
                  prevQuantity: 0,
                  currentQuantity: 0,

                  totalPrice: 0,
                  totalMoldPrice: res.data.data.totalMaxPrice,
                  totalMoldMinPrice: res.data.data.totalMinPrice,
                  totalMoldMaxPrice: res.data.data.totalMaxPrice,
                  totalEjaculationPrice: res.data.data.maxPrice,

                  optionBig: ManufactureProcess.ManufactureProcessList,
                  selectBig: ManufactureProcess.categoryDefaultValue.big,
                  optionMid: ManufactureProcess.categoryDefaultValue.big.detail,
                  selectedMid: ManufactureProcess.categoryDefaultValue.mid,
                  priceLoading: false,
                }),
              });

              console.log(loadingCounter + "/" + files.length);

              console.log(loadingCounter + "/" + stl_count);
              if (loadingCounter === stl_count) {
                this.setState({ loading: false });
              }

              this.countPrice();
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });
          console.log(fileList);
        } else {
          console.log(file.name);

          const ManufactureProcessFormData = new FormData();
          ManufactureProcessFormData.append("blueprint", file);
          ManufactureProcessFormData.append(
            "process",
            ManufactureProcess.categoryDefaultValue.big.id
          );
          ManufactureProcessFormData.append(
            "detailprocess",
            ManufactureProcess.categoryDefaultValue.mid.id
          );
          //기본정보입력에서 받은 의뢰서로 바꾸기
          ManufactureProcessFormData.append("request", "");

          console.log(ManufactureProcessFormData);
          console.log(file);
          this.setState({
            fileList: fileList.push({
              originFile: file,
              fileName: file.name,
              stl_file: false,
              selectedMid: ManufactureProcess.categoryDefaultValue.mid,
              checked: true,
              quantity: { label: "", value: 0 },
              prevQuantity: 0,
              currentQuantity: 0,

              optionBig: ManufactureProcess.ManufactureProcessList,
              selectBig: ManufactureProcess.categoryDefaultValue.big,
              optionMid: ManufactureProcess.categoryDefaultValue.big.detail,
              selectedMid: ManufactureProcess.categoryDefaultValue.mid,
            }),
          });
        }
      });
    };

    const onDrop = useCallback((acceptedFiles) => {
      // Do something with the files
      console.log(acceptedFiles);
      let check_stl = false;
      let stl_count = 0;
      acceptedFiles.map((data, idx) => {
        let fileNameAvailable = ["stl", "stp"];
        const extension = data.name.split(".");

        if (!fileNameAvailable.includes(extension[extension.length - 1])) {
          console.log("stl X");
          check_stl = false;
          data["check_stl"] = check_stl;
        } else {
          console.log("stl O");
          check_stl = true;
          data["check_stl"] = check_stl;
          stl_count++;
        }
        console.log(data);
      });

      this.setState({ checkFileUpload: true });
      this.props.ManufactureProcess.checkFileUpload = true;

      const card = document.getElementById("card");

      if (card) {
        card.style.display = "flex";
      }
      dropHandler(acceptedFiles, stl_count);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
    });

    return (
      <>
        <div {...getRootProps()}>
          <input {...getInputProps()} />

          <InputBox
            checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
          >
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <DropZoneContainer>
                {this.state.loading === true ? (
                  <>
                    <div>Uploading files...</div>
                    <CircularProgress
                      style={{
                        margin: "10px auto",
                        width: "22px",
                        height: "22px",
                      }}
                      className="spinner"
                    />
                  </>
                ) : (
                  <>
                    {!this.props.ManufactureProcess.checkFileUpload && (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            marginBottom: "24px",
                          }}
                        >
                          <div
                            style={{
                              color: "#0933b3",
                              fontSize: "20px",
                              fontWeight: "bold",
                              marginBottom: "-3px",
                            }}
                          >
                            ↑
                          </div>
                          <div
                            style={{
                              width: "22px",
                              height: "7px",
                              border: "3px solid #0933b3",
                              borderTop: "none",
                            }}
                          ></div>
                        </div>
                        <p>
                          3D 도면 파일을 이곳에 드래그 또는{" "}
                          <span>파일찾기</span>
                        </p>
                        <p>*한 파일에 한 파트만 업로드 해주세요.</p>
                        <FileImageContainer>
                          <FileImage name=".STP" />
                          <FileImage name=".STEP" />
                          <FileImage name=".STL" />
                          <FileImage name=".DWG" />
                        </FileImageContainer>
                      </>
                    )}
                    {this.props.ManufactureProcess.checkFileUpload && (
                      <div>
                        <span>
                          <div></div>
                          <div></div>
                        </span>
                        <p>
                          3D 도면 파일을 이곳에 드래그 또는{" "}
                          <span>파일찾기</span>
                        </p>
                      </div>
                    )}
                  </>
                )}
              </DropZoneContainer>
            )}
          </InputBox>
        </div>
      </>
    );
  };
  render() {
    const { ManufactureProcess } = this.props;
    const { purposeAry } = this.state;
    const openPlaceHolderText = `모두에게 공개될 수 있는 내용을 입력해주세요.

		다음 사항이 명확하게 작성되어야 정확한 답변을 받을 가능성이 높습니다.
		1. 제작품 목적 및 사용 환경
		2. 제작 부품별 특이 사항
		3. 공급처가 충족해야하는 발주 조건
		`;

    const privatePlaceholderText = `회사의 세부적인 기술과 관련하여 외부로 유출되지 않아야 할 내용을 입력해주세요.`;

    return (
      <>
        <Containerv1 style={{ flexDirection: "column" }}>
          <Card
            checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
            onChange={this.scrollChange}
            id="card"
          >
            <Header
              checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
            >
              {this.props.ManufactureProcess.checkFileUpload
                ? "도면 추가"
                : this.props.title}
            </Header>
            <ContentBox
              checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
            >
              <this.MyDropzone onChange={this.scrollChange}></this.MyDropzone>
            </ContentBox>

            <NoFileButton checkFileUpload={ManufactureProcess.checkFileUpload}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  this.props.Request.newIndex = 2;
                }}
              >
                <span>도면 파일 없이 견적 받기</span>
                <span>
                  <img src={pass7} />
                </span>
              </div>
            </NoFileButton>
          </Card>

          <ItemList
            checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
          >
            {fileList.map((data, idx) => (
              <>
                {data.stl_file ? (
                  <ItemBox id="itemBox">
                    <MainBox>
                      <StlBox>
                        <div>{data.fileName}</div>
                        <Length>
                          {data.x_length +
                            " x " +
                            data.y_length +
                            " x " +
                            data.z_length +
                            " mm"}
                        </Length>
                        <STLViewer
                          model={data.drawFile} // stl파일 주소
                          width={120} // 가로
                          height={120} // 세로
                          modelColor="gray" // 색
                          backgroundColor="white" // 배경색
                          rotate={true} // 자동회전 유무
                          orbitControls={true} // 마우스 제어 유무
                          cameraX={500}
                          lights={[0, 0, 1]}
                        />
                      </StlBox>
                      <ColumnBox>
                        <ManufactureBox>
                          <Label>생산공정</Label>
                          <Select
                            defaultValue={
                              ManufactureProcess.categoryDefaultValue.big
                            }
                            styles={customStyles}
                            value={data.selectBig}
                            options={data.optionBig}
                            getOptionLabel={(option) => option.name}
                            onChange={(e) => {
                              ManufactureProcess.setBigCategory(e);
                              if (e.name == "절삭가공") {
                                ManufactureProcess.loadingEstimate = true;
                              }
                              this.loadFileResopnse(idx);

                              data.selectBig = e;
                              data.optionMid = e.detail;

                              if (data.selectBig.name === "금형사출") {
                                data.quantity = { label: "0", value: "0" };
                              } else {
                                data.quantity = { label: "1", value: "1" };
                              }
                              this.countPrice();
                            }}
                          />
                        </ManufactureBox>
                      </ColumnBox>
                      <MaterialBox>
                        <Label>재료</Label>
                        <Select
                          defaultValue={
                            ManufactureProcess.categoryDefaultValue.mid
                          }
                          value={data.selectedMid}
                          styles={customStyles}
                          options={data.optionMid}
                          getOptionLabel={(option) => option.name}
                          onChange={(e) => {
                            ManufactureProcess.setMidCategory(e);

                            this.countQuantity(0, 0);
                            this.loadFileResopnse(idx);
                            this.countPrice();
                          }}
                        />
                      </MaterialBox>
                      <WCLabel checkQuantity={data.quantity.value}>
                        <Label>마감</Label>
                        <Label>색상</Label>
                      </WCLabel>
                      <WCBox>
                        <span>기본가공</span>
                        <span>검정</span>
                      </WCBox>

                      <QuantityBox quantity={data.quantity.value}>
                        {data.quantity.label != "직접 입력" &&
                          data.selectBig.name !== "금형사출" && (
                            <Select
                              id="select"
                              quantity={data.quantity.label}
                              width="118px"
                              styles={customStyles}
                              style={{ overflow: "visible" }}
                              options={quantityAry}
                              getOptionLabel={(option) => option.label}
                              value={data.quantity}
                              onChange={(value) => {
                                console.log(data.selectBig.name);
                                if (data.checked) {
                                  this.countQuantity(
                                    data.quantity.value,
                                    value.value
                                  );
                                }
                                this.onQuantityChange(data, value);
                                this.countPrice();
                              }}
                            />
                          )}

                        {(data.quantity.label == "직접 입력" ||
                          data.selectBig.name === "금형사출") && (
                          <DirectInputBox
                            quantity={data.quantity.label}
                            id="directInputBox"
                          >
                            <input
                              className={`directInput directInput${idx}`}
                              placeholder="직접 입력하세요"
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  this.checkQuantityData(e, data, idx);
                                  if (e.target.value >= 100) {
                                    if (data.checked) {
                                      this.countQuantity(
                                        parseInt(data.prevQuantity),
                                        parseInt(e.target.value)
                                      );
                                    }
                                    data.prevQuantity = e.target.value;
                                  }
                                }
                              }}
                              onBlur={(e) => {
                                console.log(e.target.value);
                                console.log(data.prevQuantity);
                                if (e.target.value >= 100) {
                                  if (data.checked) {
                                    this.countQuantity(
                                      parseInt(data.prevQuantity),
                                      parseInt(e.target.value)
                                    );
                                  }
                                  data.prevQuantity = e.target.value;
                                }
                                this.checkQuantityData(e, data, idx);
                              }}
                              onChange={(e) => {
                                console.log("onChange!!");
                                console.log(this.value);
                                const re = /^[0-9\b]+$/;

                                if (
                                  e.target.value === "" ||
                                  re.test(e.target.value)
                                ) {
                                  this.setNumCount(data, e.target.value);
                                } else {
                                  data.quantity = {
                                    label: "직접 입력",
                                    val: 0,
                                  };
                                  e.target.value = "";
                                  this.setNumCount(data, e.target.value);
                                  alert("숫자를 입력하세요");
                                }
                              }}
                            />
                          </DirectInputBox>
                        )}
                      </QuantityBox>
                    </MainBox>

                    <div style={{ textAlign: "right" }}>
                      <TailBox
                        id="tailBox"
                        checkSelectBig={data.selectBig.name}
                        style={{ display: "inline-block" }}
                      >
                        <div>
                          <span>
                            {data.priceLoading === true ? (
                              <CircularProgress
                                style={{ width: "22px", height: "22px" }}
                                className="spinner"
                              />
                            ) : data.selectBig.name === "금형사출" ? (
                              <>
                                <div>
                                  <span>금형비 </span>
                                  <span>
                                    {data.totalMoldPrice.toLocaleString(
                                      "ko-KR"
                                    ) + " 원"}
                                  </span>
                                  <span> + </span>
                                  <span>사출비 </span>
                                  <span>
                                    {data.totalPrice.toLocaleString("ko-KR") +
                                      " 원"}
                                  </span>
                                </div>

                                <div>
                                  <span>가격 </span>
                                  <span>
                                    {(
                                      data.totalMoldPrice + data.totalPrice
                                    ).toLocaleString("ko-KR") + " 원"}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <span>가격 </span>
                                  <span>
                                    {data.totalPrice.toLocaleString("ko-KR") +
                                      " 원"}
                                  </span>
                                </div>
                              </>
                            )}
                          </span>
                        </div>
                      </TailBox>
                    </div>
                    <FileAddBox
                      onClick={() => {
                        const temp = JSON.parse(JSON.stringify(fileList[idx]));
                        temp.originFile = fileList[idx].originFile;

                        this.setState({
                          fileList: fileList.splice(idx, 0, temp),
                        });

                        this.loadFileResopnse(idx + 1);

                        this.setValue(idx);
                        if (fileList[idx].checked) {
                          this.countQuantity(
                            0,
                            parseInt(fileList[idx].quantity.value),
                            2
                          );
                        }
                      }}
                    >
                      <img src={fileImg}></img>
                    </FileAddBox>
                    <DeleteBox>
                      <span
                        onClick={() => {
                          this.setState({ fileList: fileList.splice(idx, 1) });

                          if (fileList.length === 0) {
                            if (ManufactureProcess.changeProject) {
                              this.setState({ checkFileUpload: false });
                              this.props.ManufactureProcess.checkFileUpload = false;
                            }

                            if (
                              !this.props.ManufactureProcess.checkFileUpload
                            ) {
                              const card = document.getElementById("card");
                              if (card) {
                                card.style.display = "flex";
                                card.style.position = "static";
                              }
                            }
                          }
                          this.countPrice();
                        }}
                      >
                        <img src={deleteButtonImg} />
                      </span>
                    </DeleteBox>
                  </ItemBox>
                ) : (
                  <>
                    <ItemBox id="itemBox">
                      <MainBox>
                        <StlBox>
                          <div style={{ marginBottom: 30 }}>
                            {data.fileName}
                          </div>
                        </StlBox>
                        <ColumnBox>
                          <ManufactureBox>
                            <Label>생산공정</Label>
                            <Select
                              defaultValue={
                                ManufactureProcess.categoryDefaultValue.big
                              }
                              styles={customStyles}
                              value={data.selectBig}
                              options={data.optionBig}
                              getOptionLabel={(option) => option.name}
                              onChange={(e) => {
                                ManufactureProcess.setBigCategory(e);

                                data.selectBig = e;
                                data.optionMid = e.detail;

                                if (data.selectBig.name === "금형사출") {
                                  if (data.checked) {
                                    this.countQuantity(data.quantity.value, 0);
                                  }
                                  data.quantity = { label: "0", value: 0 };
                                } else {
                                  if (data.checked) {
                                    this.countQuantity(data.quantity.value, 1);
                                  }
                                  data.quantity = { label: "1", value: 1 };
                                }

                                this.setState({ g: 3 });
                              }}
                            />
                          </ManufactureBox>
                        </ColumnBox>
                        <MaterialBox>
                          <Label>재료</Label>
                          <Select
                            defaultValue={
                              ManufactureProcess.categoryDefaultValue.mid
                            }
                            value={data.selectedMid}
                            styles={customStyles}
                            options={data.optionMid}
                            getOptionLabel={(option) => option.name}
                            onChange={(e) => {
                              ManufactureProcess.setMidCategory(e);

                              this.countQuantity(0, 0);
                              this.loadFileResopnse(idx);
                              this.countPrice();
                              this.setState({ g: 3 });
                            }}
                          />
                        </MaterialBox>
                        <WCLabel>
                          <Label>마감</Label>
                          <Label>색상</Label>
                        </WCLabel>
                        <WCBox>
                          <span>기본가공</span>
                          <span>검정</span>
                        </WCBox>

                        <QuantityBox quantity={data.quantity.value}>
                          {data.quantity.label != "직접 입력" &&
                            data.selectBig.name !== "금형사출" && (
                              <Select
                                id="select"
                                quantity={data.quantity.label}
                                width="118px"
                                styles={customStyles}
                                style={{ overflow: "visible" }}
                                options={quantityAry}
                                getOptionLabel={(option) => option.label}
                                value={data.quantity}
                                onChange={(value) => {
                                  console.log(data.selectBig.name);
                                  if (data.checked) {
                                    this.countQuantity(
                                      data.quantity.value,
                                      value.value
                                    );
                                  }
                                  this.onQuantityChange(data, value);
                                }}
                              />
                            )}

                          {(data.quantity.label == "직접 입력" ||
                            data.selectBig.name === "금형사출") && (
                            <DirectInputBox
                              quantity={data.quantity.label}
                              id="directInputBox"
                            >
                              <input
                                className={`directInput directInput${idx}`}
                                placeholder="직접 입력하세요"
                                onKeyPress={(e) => {
                                  if (e.key === "Enter") {
                                    this.checkQuantityData(e, data, idx);
                                    if (e.target.value >= 100) {
                                      if (data.checked) {
                                        this.countQuantity(
                                          parseInt(data.prevQuantity),
                                          parseInt(e.target.value)
                                        );
                                      }
                                      data.prevQuantity = e.target.value;
                                    }
                                  }
                                }}
                                onBlur={(e) => {
                                  console.log(e.target.value);
                                  console.log(data.prevQuantity);
                                  if (e.target.value >= 100) {
                                    if (data.checked) {
                                      this.countQuantity(
                                        parseInt(data.prevQuantity),
                                        parseInt(e.target.value)
                                      );
                                    }
                                    data.prevQuantity = e.target.value;
                                  }

                                  if (data.selectBig.name === "금형사출") {
                                    if (
                                      e.target.value > 0 &&
                                      e.target.value < 100
                                    ) {
                                      alert("최소 주문 수량은 100개입니다!");
                                      data.quantity = {
                                        label: "직접 입력",
                                        val: 0,
                                      };
                                      e.target.value = "";
                                    }
                                  }
                                }}
                                onChange={(e) => {
                                  console.log("onChange!!");
                                  console.log(this.value);
                                  const re = /^[0-9\b]+$/;

                                  if (
                                    e.target.value === "" ||
                                    re.test(e.target.value)
                                  ) {
                                    this.setNumCount(data, e.target.value);
                                  } else {
                                    data.quantity = {
                                      label: "직접 입력",
                                      val: 0,
                                    };
                                    e.target.value = "";
                                    this.setNumCount(data, e.target.value);
                                    alert("숫자를 입력하세요");
                                  }
                                }}
                              />
                            </DirectInputBox>
                          )}
                        </QuantityBox>
                      </MainBox>

                      <div style={{ textAlign: "right" }}>
                        <TailBox
                          id="tailBox"
                          checkSelectBig={data.selectBig.name}
                          style={{ display: "inline-block" }}
                        >
                          <Font15>
                            *해당 도면은 자동견척 산출이 어렵습니다.
                          </Font15>
                        </TailBox>
                      </div>
                      <FileAddBox
                        onClick={() => {
                          const temp = JSON.parse(
                            JSON.stringify(fileList[idx])
                          );
                          temp.originFile = fileList[idx].originFile;

                          this.setState({
                            fileList: fileList.splice(idx, 0, temp),
                          });

                          this.loadFileResopnse(idx + 1);

                          this.setValue(idx);
                          if (fileList[idx].checked) {
                            this.countQuantity(
                              0,
                              parseInt(fileList[idx].quantity.value),
                              2
                            );
                          }
                        }}
                      >
                        <img src={fileImg}></img>
                      </FileAddBox>
                      <DeleteBox>
                        <span
                          onClick={() => {
                            this.setState({
                              fileList: fileList.splice(idx, 1),
                            });

                            if (fileList.length === 0) {
                              if (ManufactureProcess.changeProject) {
                                this.setState({ checkFileUpload: false });
                                this.props.ManufactureProcess.checkFileUpload = false;
                              }

                              if (
                                !this.props.ManufactureProcess.checkFileUpload
                              ) {
                                const card = document.getElementById("card");
                                if (card) {
                                  card.style.display = "flex";
                                  card.style.position = "static";
                                }
                              }
                            }
                            this.countPrice();
                          }}
                        >
                          <img src={deleteButtonImg} />
                        </span>
                      </DeleteBox>
                    </ItemBox>
                  </>
                )}
              </>
            ))}
          </ItemList>
        </Containerv1>
        <Price
          checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
          id="price"
        >
          <PriceLabel>
            <div>
              <span>자동 견적 가격</span>
            </div>
            <div>
              <p>해당 사항은 볼트앤너트 알고리즘이 도출한 견적으로</p>
              <p>가공품의 발주 요건에 따라 변경될 수 있습니다.</p>
              <p>본 견적은 후처리를 제외한 순수 단품 가공 견적입니다.</p>
            </div>
          </PriceLabel>

          <PriceData>
            <span>
              {ManufactureProcess.orderMinPrice.toLocaleString("ko-KR")}
            </span>
            <span>~</span>
            <span>
              {ManufactureProcess.orderMaxPrice.toLocaleString("ko-KR")}
              <span> 원</span>
            </span>
          </PriceData>
        </Price>

        <Containerv1 style={{ flexDirection: "column" }}>
          <Purposebox
            checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
          >
            <TitleLabel>
              <span>문의 목적</span>
            </TitleLabel>

            <SelectBox>
              {this.state.purposeAry.map((item, idx) => {
                return (
                  <PurposeSelectCircle
                    active={item.checked}
                    onClick={() => {
                      this.purposeHandler(item);
                      console.log(idx);
                    }}
                  >
                    <PurposeFont18 active={item.checked}>
                      {item.name}
                    </PurposeFont18>
                  </PurposeSelectCircle>
                );
              })}
            </SelectBox>
          </Purposebox>
          <Projectbox
            checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
          >
            <TitleLabel>
              <span>프로젝트 제목</span>
            </TitleLabel>
            <ProjectTitle>
              <input
                placeholder="프로젝트 제목을 입력해주세요."
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) =>
                  (e.target.placeholder = "프로젝트 제목을 입력해주세요")
                }
                value={this.state.projectname}
                onChange={(e) => {
                  console.log(e.target.value);
                  this.setState({ projectname: e.target.value });
                }}
              />
            </ProjectTitle>
          </Projectbox>

          <DeliveryBox
            checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
          >
            <TitleLabel>
              <span>희망 납기일</span>
            </TitleLabel>
            <DeliveryDate
              checkDateConference={ManufactureProcess.date_conference}
              checkDateUndefined={ManufactureProcess.date_undefined}
              checkCalendar={ManufactureProcess.calendar_checked}
              checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
            >
              <div>
                <div>
                  <Calendar mobile={true} />
                </div>
                <div>
                  <div
                    onClick={() => {
                      console.log("click1");
                      if (ManufactureProcess.date_conference) {
                        ManufactureProcess.date_conference = false;
                      } else {
                        ManufactureProcess.date_conference = true;
                        if (ManufactureProcess.date_undefined) {
                          ManufactureProcess.date_undefined = false;
                        }
                      }
                      console.log(ManufactureProcess.date_conference);
                    }}
                  >
                    <div>
                      <img src={pass3} />
                    </div>
                    <span>납기일 협의 가능</span>
                  </div>
                  <div
                    onClick={() => {
                      console.log("click2");
                      if (ManufactureProcess.date_undefined) {
                        ManufactureProcess.date_undefined = false;
                      } else {
                        ManufactureProcess.date_undefined = true;
                      }
                      console.log(ManufactureProcess.date_undefined);
                    }}
                  >
                    <div>
                      <img src={pass3} />
                    </div>
                    <span>납기일 미정</span>
                  </div>
                </div>
              </div>
            </DeliveryDate>
          </DeliveryBox>
          <RequestBox
            checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
          >
            <TitleLabel>
              <span>프로젝트 설명 및 요청사항</span>
            </TitleLabel>
            <Request
              active={checkBox}
              checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
            >
              <div>
                <span>공개 내용</span>
              </div>

              <textarea
                placeholder={`${openPlaceHolderText}`}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => {
                  e.target.placeholder = `${openPlaceHolderText}`;
                  if (this.state.publicValue === "") {
                    this.setState({ publicRows: 7 });
                  }
                }}
                rows={this.state.publicRows}
                value={this.state.publicValue}
                className={"textarea"}
                placeholderStyle={{ fontWeight: "400" }}
                onChange={this.publicRequestHandler}
              />

              <div>
                <span>비공개 내용 </span>
              </div>
              <textarea
                placeholder={`${privatePlaceholderText}`}
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => {
                  e.target.placeholder = `${privatePlaceholderText}`;
                  if (this.state.privateValue == "") {
                    this.setState({ privateRows: 7 });
                  }
                }}
                rows={this.state.privateRows}
                value={this.state.privateValue}
                className={"textarea"}
                placeholderStyle={{ fontWeight: "400" }}
                onChange={this.privateRequestHandler}
              />
            </Request>
          </RequestBox>

          <ReferenceBox
            checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
          >
            <TitleLabel>
              <span>참고파일</span>
              <p>이미지 혹은 PDF 자료만 업로드 가능합니다.</p>
            </TitleLabel>
            <Reference
              checkFileUpload={this.props.ManufactureProcess.checkFileUpload}
            >
              <div>
                <span>공개 자료</span>
              </div>

              <span style={{ display: "inline-block", width: "100%" }}>
                <InputComponent mobile={true} file={true} isOpen={true} />
                <div></div>
              </span>

              <div>
                <span>비공개 자료</span>
              </div>

              <span style={{ display: "inline-block", width: "100%" }}>
                <InputComponent mobile={true} file={true} isOpen={false} />
                <div></div>
              </span>
            </Reference>
          </ReferenceBox>
          <Button checkFileUpload={ManufactureProcess.checkFileUpload}>
            <div>
              {ManufactureProcess.changeProject ? (
                <span
                  onClick={() => {
                    let check_count = 0;
                    fileList.map((item, idx) => {
                      item.fileName;
                      let fileNameAvailable = ["txt"];
                      const extension = item.fileName.split(".");

                      //console.log(fileNameAvailable)
                      if (item.checked) {
                        if (
                          item.quantity.value === 0 ||
                          item.quantity.value === ""
                        ) {
                          console.log("수량을 입력해주세요");
                          check_count++;
                        }
                      }

                      if (
                        fileNameAvailable.includes(
                          extension[extension.length - 1]
                        )
                      ) {
                        this.props.ManufactureProcess.privateFileArray.push({
                          file: item,
                        });
                      }
                    });

                    if (check_count) {
                      alert("수량을 입력해주세요");
                    } else {
                      ManufactureProcess.checkPaymentButton = true;

                      if (ManufactureProcess.projectSubmitLoading) {
                        this.requestSubmit(
                          0,
                          this.props.Project.projectDetailData.request_set[0].id
                        );
                      } else {
                        alert("요청 중입니다. 잠시만 기다려주세요.");
                      }
                    }
                  }}
                >
                  프로젝트 수정 완료
                </span>
              ) : (
                <span
                  onClick={() => {
                    let check_count = 0;
                    fileList.map((item, idx) => {
                      item.fileName;
                      let fileNameAvailable = ["txt"];
                      const extension = item.fileName.split(".");

                      if (item.checked) {
                        if (
                          item.quantity.value === 0 ||
                          item.quantity.value === ""
                        ) {
                          console.log("수량을 입력해주세요");
                          check_count++;
                        }
                      }

                      if (
                        fileNameAvailable.includes(
                          extension[extension.length - 1]
                        )
                      ) {
                        this.props.ManufactureProcess.privateFileArray.push({
                          file: item,
                        });
                      }
                    });

                    if (check_count) {
                      alert("수량을 입력해주세요");
                    } else {
                      ManufactureProcess.checkPaymentButton = true;

                      if (ManufactureProcess.projectSubmitLoading) {
                        this.requestSubmit(1);
                      } else {
                        alert("요청 중입니다. 잠시만 기다려주세요.");
                      }
                    }

                    // this.requestSubmit(1);
                  }}
                >
                  상담 및 가격 요청하기
                </span>
              )}
            </div>
          </Button>
          {ManufactureProcess.loadingEstimate && (
            <Layer>
              <span>
                <Modal
                  width={this.props.width}
                  open={ManufactureProcess.loadingEstimate}
                  close={this.closeModal}
                />
              </span>
            </Layer>
          )}
        </Containerv1>
      </>
    );
  }
}

export default FileUploadContainer;

const quantityAry = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "직접 입력", value: "" },
];

const purposeAry = [
  { id: 1, name: "상담요청", checked: false },
  { id: 2, name: "견적문의", checked: false },
  { id: 3, name: "업체수배", checked: false },
];

const Select = styled(SelectComponent)`
  width: ${(props) => (props.width ? props.width : "100%")};
  display: ${(props) => (props.quantity === "직접 입력" ? "none" : "block")};
  margin: 8px 0 12px 0;

  @keyframes fadeIn {
    0% {
      opacity: 0.5;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  >div: nth-of-type(2) {
    -webkit-font-smoothing: antialiased;
    animation: fadeIn 0.2s ease-out;
  }
`;

const ItemList = styled.div`
  width: 97%;
  height: 100%;
  padding-left: 3px;

  padding-top: ${(props) => (props.checkFileUpload ? "130px" : "")};
`;

const ItemBox = styled.div`
  // display: flex;
  // justify-content: space-between;
  width: 100%;
  height: 100%;
  position: relative;

  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5);
  background-color: #ffffff;
  margin-bottom: 40px;
  box-sizing: border-box;
  padding: 20px 14px;
`;

const StlBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 93%;
  box-sizing: border-box;
  align-self: flex-start;
  > div {
    width: 100%;
    text-align: left;
    word-wrap: break-word;
  }
`;

const Length = styled.div`
  font-size: 14px;
  line-height: 40px;
  letter-spacing: -0.35px;
  color: #282c36;
`;

const ColumnBox = styled.div`
  width: 100%;
`;
const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ContentBox = styled.div`
  width: ${(props) => (props.checkFileUpload ? "calc(100%-3px)" : "100%")};
  height: ${(props) => (props.checkFileUpload ? "100px" : "")};
  display: flex;
  flex-direction: column;
  border: 2px dashed #a4aab4;
  border-radius: 5px;
  background-color: #f6f6f6;
  margin-bottom: ${(props) => (props.checkFileUpload ? "0" : "50px")};
  :focus {
    outline: none;
  }
`;
const ManufactureBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const MaterialBox = styled.div`
  width: 100%;
`;
const Label = styled.div`
  font-size: 15px;
  letter-spzcing: -0.38px;
  color: #282c36;
  font-weight: normal;
  > span {
    float: right;
    font-size: 14px;
    // line-height: 40px;
    letter-spacing: -0.35px;
    color: #999999;
  }
`;
const WCLabel = styled.div`
  display: flex;
  width: 100%;
  > div {
    flex-grow: 1;
  }
  > div:nth-of-type(2) {
    padding-left: 5px;
  }
`;

const WCBox = styled.div`
  width: 100%;
  display: flex;
  > span {
    flex-grow: 1;
    width: 100%;
    text-align: left;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    font-size: 15px;
    line-height: 40px;
    letter-spacing: -0.38px;
    color: #282c36;
    background-color: #e1e2e4;
    padding-left: 11px;
    border: 1px solid #e1e2e4;
    border-radius: 3px;
    margin: 8px 12px 12px 0;
    box-sizing: border-box;
    height: 38px;
  }
  > span:nth-of-type(2) {
    margin-right: 0;
  }
`;

const QuantityBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TailBox = styled.div`
  width: 100%;
  // position: absolute;
  // top: 90%;
  // left: -5%;
  > div {
    > span {
      > span {
        font-size: 15px;
        color: #282c36;
        letter-spacing: -0.38px;
        line-height: 40px;
        font-weight: normal;
      }
      > span:nth-of-type(odd) {
        // font-weight: 500;
        // text-align: left;
        // margin-right: 10px;
      }

      > span:nth-of-type(even) {
      }
      > div {
        > span {
          color: #0933b3;
          font-size: 18px;
          line-height: 40px;
          letter-spacing: -0.45px;
          font-weight: bold;
        }
      }
    }
  }
`;

const DeleteBox = styled.div`
  position: absolute;
  top: 3%;
  left: 91%;
`;

const InputBox = styled.div`
  margin-top: ${(props) => (props.checkFileUpload ? "" : "50px")};
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.checkFileUpload ? "50px" : "")};
  text-align: center;
  :focus {
    outline: 0;
  }
  cursor: pointer;
`;

const Card = styled.div`
  width: ${(props) => (props.checkFileUpload ? "calc(100% - 30px)" : "100%")};
  height: ${(props) => (props.checkFileUpload ? "120px" : "")};
  object-fit: contain;
  background-color: white;
  margin-bottom: ${(props) => (props.checkFileUpload ? "20px" : "")};
  display: flex;
  flex-direction: column;
  position: ${(props) => (props.checkFileUpload ? "fixed" : "static")};
  top: 50px;
  z-index: 99;
  box-sizing: border-box;
`;

const Header = styled.div`
  margin-top: ${(props) => (props.checkFileUpload ? "0px" : "80px")};
  font-weight: ${(props) => (props.checkFileUpload ? "bold" : "normal")};
  font-stretch: normal;
  font-style: normal;
  line-height: 18px;
  letter-spacing: -0.4px;
  color: #282c36;
  padding-top: 16px;
  padding-bottom: 20px;
  object-fit: contain;
  text-align: ${(props) => (props.checkFileUpload ? "left" : "center")};
  font-size: ${(props) => (props.checkFileUpload ? "18px" : "16px")};
`;

const FileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckBox = styled.div`
  width: 100%;
  position: absolute;
  top: 3%;
  left: 5%;
  
  > div{        
    width: 19px;
    height: 19px;
    background-color: ${(props) => (props.active ? "#0933b3" : "#ffffff")};
    margin-right: 10px;    
    position: relative;
    cursor: pointer;
    border: 1px solid #c6c7cc;
    border-radius: 2px;
    box-sizing: border-box;
    > img{
      display: ${(props) => (props.active ? "static" : "none")};
      position: absolute;
      top: 17%;
      left: 15%;        
    }
  }
}
`;

const DropZoneContainer = styled.div`
  > div {
    display: flex;
    align-items: center;

    > span {
      width: 20px;
      height: 20px;
      border-radius: 10px;
      background-color: #0933b3;
      margin-right: 16px;
      position: relative;

      > div {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        border: 1px solid white;
      }
      > div:nth-of-type(1) {
        width: 8px;
        height: 0px;
      }
      > div:nth-of-type(2) {
        width: 0px;
        height: 8px;
      }
    }
  }

  p:nth-of-type(1) {
    font-size: 15px;
    line-height: 30px;
    letter-spacing: -0.38px;
    color: #282c36;
    margin-bottom: 4px;
    height: ${(props) => (props.checkFileUpload ? "" : "22px")};

    span:nth-of-type(1) {
      border-bottom: ${(props) =>
        props.checkFileUpload ? "" : "1px solid #0933b3"};
    }
    span {
      color: #0933b3;
      font-weight: bold;
    }

    :focus {
      outline: none;
    }
  }
  > p:nth-of-type(2) {
    font-size: 14px;
    line-height: 30px;
    letter-spacing: -0.35px;
    color: #767676;
    height: 20px;
  }
`;

const TableHeader = styled.div`
  margin-top: 30px;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #c6c7cc;
  padding-bottom: 18px;
  display: ${(props) => (props.checkFileUpload ? "flex" : "none")};

  > div {
    width: 19px;
    height: 19px;
    border: 1px solid #c6c7cc;
    margin-left: 18px;
    margin-right: 148px;
    box-sizing: border-box;
  }
  > span {
    font-size: 1.125em;
    text-align: left;
    line-height: 40px;
    letter-spacing: -0.45px;
    color: #282c36;
    font-weight: 600;
  }
  > span:nth-of-type(1) {
    margin-right: 223px;
  }
  > span:nth-of-type(2) {
    margin-right: 164px;
  }
  > span:nth-of-type(3) {
    margin-right: 141px;
  }
  > span:nth-of-type(4) {
    margin-right: 76px;
  }
  > span:nth-of-type(5) {
    margin-right: 93px;
  }
  > span:nth-of-type(6) {
    margin-right: 85px;
  }
`;

const DirectInputBox = styled.div`
  font-size: 18px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.45px;
  color: #282c36;
  height: 37px;
  border: solid 1px #c6c7cc;
  border-radius: 3px;
  padding: 4px;
  width: 97%;
  display: block;
  margin: 8px 0 12px 0;
  > input {
    width: 90%;
    padding: 4px;
    outline: none;
    border: none;
    font-size: 15px;
    line-height: 30px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.45px;
    color: #282c36;
    ::placeholder {
      font-size: 14px;
    }
  }
`;

const NoFileButton = styled.div`
  width: 100%;
  margin-bottom: ${(props) => (props.checkFileUpload ? "0" : "120px")};
  text-align: center;
  display: ${(props) => (props.checkFileUpload ? "none" : "flex")};
  flex-direction: ${(props) => (props.checkFileUpload ? "" : "column")};
  align-items: ${(props) => (props.checkFileUpload ? "" : "center")};

  > div:nth-of-type(1) {
    border: 1px solid #a4aab4;
    border-radius: 60px;
    width: 230px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    > span:nth-of-type(1) {
      font-size: 15px;
      line-height: 19px;
      letter-spacing: -0.38px;
      color: #0933b3;
      margin-right: 11px;
    }
    > span:nth-of-type(2) {
      // position: relative;
      > img {
        vertical-align: middle;
        color: #414550;
        // position: absolute;
        // top: 15%;
      }
    }
  }
`;

const Price = styled.div`
  flex-direction: column;

  width: 100%;
  //height: 197px;
  border-top: 3px solid #414550;
  border-bottom: 2px solid #c6c7cc;

  margin-top: 60px;
  margin-bottom: 70px;
  display: ${(props) => (props.checkFileUpload ? "flex" : "none")};
`;
const PriceLabel = styled.div`
  height: 170px;
  display: flex;
  flex-direction: column;
  //justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #e1e2e4;
  padding: 20px 0;
  box-sizing: border-box;
  // position: relative;
  > div:nth-of-type(1) {
    // display: flex;
    // align-items: center;
    > span:nth-of-type(1) {
      font-size: 16px;
      line-height: 40px;
      letter-spacing: -0.4px;
      color: #282c36;
      font-weight: bold;
    }
    // > span:last-child {
    //   margin-left: 13px;
    //   width: 20px;
    //   height: 20px;
    //   border: 1px solid #000000;
    //   border-radius: 10px;
    //   display: inline-block;
    //   text-align: center;
    //   font-size: 16px;
    //   letter-spacing: -0.4px;
    //   color: #414550;
    //   font-weight: bold;
    //   box-sizing: border-box;
    // }
  }
  > div:nth-of-type(2) {
    // display: ${(props) => (props.active ? "block" : "none")};
    // width: 448px;
    // height: 135px;
    // border: 1px solid #707070;
    // border-radius: 5px;
    // position: absolute;
    // background-color: #ffffff;
    // top: 75px;
    // right: 8%;
    // padding: 20px 10px 20px 30px;
    // box-sizing: border-box;
    text-align: center;
    > p {
      font-size: 14px;
      line-height: 26px;
      letter-spacing: -0.4px;
      color: #767676;
    }
  }
`;
const PriceData = styled.div`
  height: 105px;
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    font-size: 22px;
    line-height: 40px;
    letter-spacing: -0.55px;
    color: #0933b3;
    font-weight: bold;
    margin-right: 22px;
  }
  > span:last-child {
    color: #0933b3;
    font-weight: bold;
  }
`;

const Purposebox = styled.div`
  display: ${(props) => (props.checkFileUpload ? "flex" : "none")};
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;
`;
const SelectBox = styled.div`
  display: flex;
  justify-content: center;
`;
const InlineDiv = styled.div`
  display: inline-flex;
`;
const PurposeSelectCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 107px;
  height: 37px;
  border-radius: 30px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
  background-color: ${(props) => (props.active ? "#0933b3" : "#ffffff")};
  cursor: pointer;
  margin-right: 13px;
`;
const PurposeFont18 = styled.div`
  font-size: 15px;
  font-weight: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: ${(props) => (props.active ? "#ffffff" : "#414550")};
`;

const TitleLabel = styled.div`
  //display: ${(props) => (props.checkFileUpload ? "block" : "none")};
  margin-bottom: 5px;
  > span {
    font-size: 16px;
    line-height: 40px;
    letter-spacing: -0.6px;
    color: #282c36;
    font-weight: bold;
    margin-right: 12px;
  }
  > p {
    vertical-align: middle;
    display: inline-block;
    font-size: 14px;
    line-height: 40px;
    letter-spacing: -0.35px;
    color: #86888c;
  }
`;

const Projectbox = styled.div`
  display: ${(props) => (props.checkFileUpload ? "block" : "none")};
`;

const ProjectTitle = styled.div`
  height: 37px;
  border: 1px solid #e1e2e4;
  border-radius: 5px;
  padding: 8px 0 7px 14px;
  box-sizing: border-box;
  //margin-top: 16px;
  margin-bottom: 10px;

  > input {
    width: 99%;
    // padding: 4px;
    outline: none;
    border: none;
    font-size: 15px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.38px;
    color: #282c36;
    ::placeholder {
      font-size: 14px;
    }
  }
`;

const DeliveryBox = styled.div`
  display: ${(props) => (props.checkFileUpload ? "block" : "none")};
  margin-top: 40px;
  margin-bottom: 40px;

  // > div:nth-of-type(1) {
  //   height: 27px;
  //   font-size: 18px;
  //   line-height: 40px;
  //   letter-spacing: -0.45px;
  //   color: #282c36;
  //   font-weight: bold;
  //   margin-bottom: 16px;
  // }
`;
const DeliveryDate = styled.div`
  //width: 1200px;
  display: ${(props) => (props.checkFileUpload ? "static" : "none")};
  background-color: #f6f6f6;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 26px 24px 22px 24px;
  box-sizing: border-box;

  > div:nth-of-type(1) {
    display: flex;
    //justify-content: center;
    flex-direction: column;
    // align-items: center;

    > div:nth-of-type(1) {
      //width: 66%;
      margin-bottom: 18px;
      height: 37px;
      font-size: 18px;
      line-height: 40px;
      letter-spacing: -0.45px;
      color: #282c36;
      font-weight: bold;
      //margin-bottom: 16px;
      //border: 3px solid red;
      background-color: #ffffff;
      position: relative;
      // display: flex;
      // align-items: center;
      > span {
        position: absolute;
        right: 2%;
        bottom: 6%;
      }
      > div {
        //display: ${(props) => (props.checkCalendar ? "block" : "none")};
        //display: block;
      }
    }
    >div:nth-of-type(2){
      display: flex;
      justify-content: space-around;
    > div:nth-of-type(1) {        
      > div {
        background-color: ${(props) =>
          props.checkDateConference ? "#0933b3" : "#999999"};        
        > img {          
        }
      }   
    }
    > div:nth-of-type(2) {
      > div {
        background-color: ${(props) =>
          props.checkDateUndefined ? "#0933b3" : "#999999"};       
        > img {
        }
      }
    }
    > div:nth-of-type(1),
    > div:nth-of-type(2) {
      //position: relative;
      //padding-left: 35px;
      display: flex;
      > div {
        width: 17px;
        height: 17px;
        border: 1px solid white;
        border-radius: 2px;
        position: relative;
        margin-right: 8px;
        box-sizing: border-box;

        > img {
          position: absolute;
          top: 18%;
          left: 14%;
        }
      }
      >span{
        font-size: 14px;
        //line-height: 40px;
        letter-spacing: -0.35px;
        color: #86888c;
      }
    }
  }
`;

const RequestBox = styled.div`
  display: ${(props) => (props.checkFileUpload ? "block" : "none")};
  width: 100%;
`;
const Request = styled.div`
  //width: 1200px;
  // display: ${(props) => (props.checkFileUpload ? "static" : "none")};
  background-color: #f6f6f6;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 0 12px 13px 12px;
  box-sizing: border-box;
  margin-bottom: 40px;
  //margin-top: 16px;
  position: relative;

  > div {
    margin-top: 12px;
    margin-bottom: 4px;
    > span:nth-of-type(1) {
      //height: 27px;
      font-size: 14px;
      line-height: 40px;
      letter-spacing: -0.35px;
      color: #282c36;
      font-weight: normal;
      margin-bottom: 16px;
      margin-right: 7px;
    }

    // > span:last-child {
    //   width: 20px;
    //   height: 20px;
    //   border: 1px solid #000000;
    //   border-radius: 10px;
    //   display: inline-block;
    //   text-align: center;
    //   font-size: 16px;
    //   letter-spacing: -0.4px;
    //   color: #414550;
    //   font-weight: bold;
    //   box-sizing: border-box;
    // }
  }
  // > div:nth-of-type(2) {
  //   display: ${(props) => (props.active ? "block" : "none")};
  //   width: 600px;
  //   height: 180px;
  //   // border: 3px solid green;
  //   position: absolute;
  //   top: 44%;
  //   left: 17%;
  //   background-color: #ffffff;
  //   z-index: 1;
  //   padding: 20px 10px 20px 30px;
  //   box-sizing: border-box;
  //   > p {
  //     color: #767676;
  //     line-height: 34px;
  //     letter-spacing: -0.45px;
  //     font-size: 18px;
  //   }

  > textarea {
    resize: none;
    border: 1px solid #ffffff;
    width: 100%;
    padding: 14px 16px;
    box-sizing: border-box;
    font-size: 15px;
    line-height: 34px;
    letter-spzcing: -0.38px;
    color: #282c36;
    border-radius: 5px;
    overflow: auto;
    height: auto;
    font-family: inherit;
    :focus {
      outline: none;
    }
    :placeholder {
      font-weight: 300;
    }
    white-space: pre-line;
  }
`;

const ReferenceBox = styled.div`
  display: ${(props) => (props.checkFileUpload ? "static" : "none")};
  margin-bottom: 40px;
`;
const Reference = styled.div`
  background-color: #f6f6f6;
  border: 1px solid #ffffff;
  border-radius: 5px;
  padding: 0 24px 22px 24px;
  box-sizing: border-box;
  > div {
    height: 27px;
    margin-top: 12px;
    margin-bottom: 4px;
    box-sizing: border-box;
    > span {
      font-size: 14px;
      line-height: 40px;
      letter-spacing: -0.35px;
      color: #282c36;
      font-weight: normal;
      margin-right: 10px;
    }
    // > p {
    //   display: inline-block;
    //   font-size: 16px;
    //   line-height: 40px;
    //   letter-spacing: -0.4px;
    //   color: #86888c;
    // }
  }
  // > div:nth-of-type(even) {
  //   border: 1px solid #ffffff;
  //   background-color: #ffffff;
  //   position: relative;
  // }
`;

const Button = styled.div`
  // margin-top: 83px;
  margin-bottom: 120px;
  display: ${(props) => (props.checkFileUpload ? "flex" : "none")};
  justify-content: center;
  align-items: center;

  > div {
    width: 100%;
    height: 44px;
    font-size: 16px;
    line-height: 52px;
    letter-spacing: -0.4px;
    font-weight: bold;
    border-radius: 5px;
    text-align: center;
    position: relative;
    border: 1px solid #ffffff;
    background-color: #0933b3;
    color: #ffffff;

    > span {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const FileAddBox = styled.div`
  position: absolute;
  top: 7%;
  left: 91%;
`;

const Font15 = styled(Content.FontSize15)`
  color: #0933b3;
  text-align: right;
  font-weight: normal;
`;

const Layer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  // opacity: 0.1;
  background-color: rgba(0, 0, 0, 0.5);

  > span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;
