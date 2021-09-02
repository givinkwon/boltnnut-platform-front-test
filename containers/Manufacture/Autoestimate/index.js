import React, { Component, useCallback } from "react";
import styled from "styled-components";
import { inject, observer } from "mobx-react";
import FileImage from "FileImage.js";
import { useDropzone } from "react-dropzone";
import AutoEstimate from "../../../stores/Manufacture/AutoEstimate";

@inject("Request", "AutoEstimate")
@observer
class AutoestimateContainer extends React.Component {
  componentDidMount = () => {

  };

  MyDropzone = () => {
    const dropHandler = (files, stl_count) => {
      let loadingCounter = 0;
      files.forEach((file, fileIdx) => {
        if (file.check_stl) {
          // const ManufactureProcessFormData = new FormData();
          // ManufactureProcessFormData.append("blueprint", file);
          // ManufactureProcessFormData.append(
          //   "process",
          //   ManufactureProcess.categoryDefaultValue.big.id
          // );
          // ManufactureProcessFormData.append(
          //   "detailprocess",
          //   ManufactureProcess.categoryDefaultValue.mid.id
          // );
          // //기본정보입력에서 받은 의뢰서로 바꾸기
          // ManufactureProcessFormData.append("request", "");
          // // console.log(ManufactureProcessFormData);
          // this.setState({ loading: true });

          // ManufactureProcessAPI.saveSelect(ManufactureProcessFormData)
          //   .then((res) => {

          //     loadingCounter++;
          //     console.log(toJS(res));
          //     this.setState({
          //       fileList: fileList.push({
          //         submitFile: res.data.data,
          //         originFile: file,
          //         stl_file: true,
          //         drawFile: res.data.data.stl_file,
          //         fileName: file.name,
          //         price: res.data.data.maxPrice,

          //         productionPrice: res.data.data.maxPrice, // 생산가
          //         productionMaxPrice: res.data.data.maxPrice,
          //         productionMinPrice: res.data.data.minPrice,

          //         moldminPrice:
          //           Math.round(res.data.data.totalMinPrice / 10000) * 10000, // 금형최소가
          //         moldmaxPrice:
          //           Math.round(res.data.data.totalMaxPrice / 10000) * 10000, // 금형최대가

          //         moldPrice:
          //           Math.round(res.data.data.totalMaxPrice / 10000) * 10000, // 금형가

          //         x_length: Math.round(res.data.data.x_length),
          //         y_length: Math.round(res.data.data.y_length),
          //         z_length: Math.round(res.data.data.z_length),

          //         selectedMid: ManufactureProcess.categoryDefaultValue.mid,
          //         checked: true,

          //         quantity: { label: "", value: 0 },
          //         prevQuantity: 0,
          //         currentQuantity: 0,

          //         totalPrice: 0,
          //         totalMoldPrice: res.data.data.totalMaxPrice,
          //         totalMoldMinPrice: res.data.data.totalMinPrice,
          //         totalMoldMaxPrice: res.data.data.totalMaxPrice,
          //         totalEjaculationPrice: res.data.data.maxPrice,

          //         optionBig: ManufactureProcess.ManufactureProcessList,
          //         selectBig: ManufactureProcess.categoryDefaultValue.big,
          //         optionMid: ManufactureProcess.categoryDefaultValue.big.detail,
          //         selectedMid: ManufactureProcess.categoryDefaultValue.mid,
          //         priceLoading: false,
          //       }),
          //     });

          //     console.log(loadingCounter + "/" + files.length);
          //     console.log(loadingCounter + "/" + stl_count);
          //     if (loadingCounter === stl_count) {
          //       this.setState({ loading: false });
          //     }
          //     this.countPrice();
          //   })
          //   .catch((e) => {
          //     console.log(e);
          //     console.log(e.response);
          //   });
        } else {

          // const ManufactureProcessFormData = new FormData();
          // ManufactureProcessFormData.append("blueprint", file);
          // ManufactureProcessFormData.append(
          //   "process",
          //   ManufactureProcess.categoryDefaultValue.big.id
          // );
          // ManufactureProcessFormData.append(
          //   "detailprocess",
          //   ManufactureProcess.categoryDefaultValue.mid.id
          // );
          // //기본정보입력에서 받은 의뢰서로 바꾸기
          // ManufactureProcessFormData.append("request", 2467);

          // this.setState({
          //   fileList: fileList.push({
          //     originFile: file,
          //     fileName: file.name,
          //     stl_file: false,

          //     selectedMid: ManufactureProcess.categoryDefaultValue.mid,
          //     checked: true,

          //     quantity: { label: "", value: 0 },
          //     prevQuantity: 0,
          //     currentQuantity: 0,

          //     optionBig: ManufactureProcess.ManufactureProcessList,
          //     selectBig: ManufactureProcess.categoryDefaultValue.big,
          //     optionMid: ManufactureProcess.categoryDefaultValue.big.detail,
          //     selectedMid: ManufactureProcess.categoryDefaultValue.mid,
          //   }),
          // });
        }
      });
    };

    const onDrop = useCallback((acceptedFiles) => {
      let check_stl = false;
      let stl_count = 0;
      acceptedFiles.map((data, idx) => {
        let fileNameAvailable = ["stl", "stp", "step"];
        const extension = data.name.split(".");

        if (!fileNameAvailable.includes(extension[extension.length - 1])) {
          check_stl = false;
          data["check_stl"] = check_stl;
        } else {
          check_stl = true;
          data["check_stl"] = check_stl;
          stl_count++;
        }
      });

      AutoEstimate.checkFileUpload = true;

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
            <InputBox>
              <DropZoneContainer>
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
                    
              </DropZoneContainer>
            </InputBox>
      </div>
      </>
    );
  }
}

export default AutoestimateContainer;

const DropZoneContainer = styled.div`
  > div {
    display: flex;
    align-items: center;
    > span {
      width: 26px;
      height: 26px;
      border-radius: 13px;
      background-color: #0933b3;
      margin-right: 20px;
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
        //border: 3px solid red;
        width: 14px;
        height: 0px;
      }
      > div:nth-of-type(2) {
        width: 0px;
        height: 14px;
      }
    }
  }
  p:nth-of-type(1) {
    font-size: 20px;
    line-height: 40px;
    letter-spacing: -0.5px;
    color: #282c36;
    margin-bottom: 4px;
    span {
      color: #0933b3;
      font-weight: 600;
    }
    :focus {
      outline: none;
    }
  }
  > p:nth-of-type(2) {
    font-size: 16px;
    //line-height: 40px;
    letter-spacing: -0.4px;
    color: #767676;
  }
`;

const FileImageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;


const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${(props) => (props.checkFileUpload ? "100px" : "313px")};
  text-align: center;
  :focus {
    outline: 0;
  }
  cursor: pointer;
`;