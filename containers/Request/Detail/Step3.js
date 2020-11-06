import React from "react";
import styled, { css } from "styled-components";
import { inject, observer } from "mobx-react";
import Router from "next/router";

import Container from "components/Container";
import InputComponent from "components/Input2";

import * as Text from "components/Text";
import ButtonSpinner from "components/ButtonSpinner";

import * as RequestAPI from "axios/Request";

import { DARKGRAY, BLACK, WHITE, PRIMARY } from "static/style";

import { toJS } from "mobx";
import {withRouter} from "next/router";


@inject("Request", "Answer")
@observer
class TabConatiner extends React.Component {
  constructor(props) {
    super(props);
    this.fileRef = React.createRef();
  }

  state = {
    loading: false,
    check_list: null,
    name: "",
    content: "",
    price: "",
    day: "",
    file: null,
    fileName: '',
    example: false,
    mainCategory: '',
    example_content_real: '',
    example_content: `[1] 제품 기능
-뚜껑을 열고 흐르는 물에 헹굴 수 있을 정도의 생활 방수 (IPX5이상)
-USB케이블 호환하여 충전 가능
-버튼 기능 on/off
-안전장치 기능 (뚜껑 열릴 시 작동 안되도록 설계 – 자석을 사용)

[2] 제품 스펙
1) 전체 사이즈: 가로x세로x높이(8.5x8.5x21.5cm) (내부 물 용량: 380ml)
2) 무게: 400~600g정도 필요
3) 배터리 방식: 유선충전 방식 (리튬 배터리 용량 4000mAh)

[3] 부품별 종류 및 재질
1) 칼날(스테인레스 스틸 304)
2) 상부뚜껑(abs),
3) 몸통(트라이탄)
4) 하단(abs),
5) 하단뚜껑(abs)
6) 실리콘고무 3개(상부,몸통,하부)
7) dc모터
8) 리튬이온배터리

[4] 기타 계약 조건 및 추가사항
-회로도, 거버파일, 펌웨어 코드 등 작업물 이관 필요
-비밀유지 보장 필요`,
    example_content2: `[1] 제품 기능
-뚜껑을 열고 흐르는 물에 헹굴 수 있을 정도의 생활 방수 (IPX5이상)
-USB케이블 호환하여 충전 가능
-버튼 기능 on/off
-안전장치 기능 (뚜껑 열릴 시 작동 안되도록 설계 – 자석을 사용)

[2] 부품별 종류 및 재질
1) 칼날(스테인레스 스틸 304) – 기성품 사용 예정 or 가공
2) 상부뚜껑(abs), - 사출 필요
3) 몸통(트라이탄) – 사출 필요
4) 하단(abs), - 사출 필요
5) 하단뚜껑(abs) – 사출 필요
6) 실리콘고무 3개(상부,몸통,하부) 사출 필요
7) dc모터 – 기성품 사용(수배 완료)
8) 리튬이온배터리 – 기성품 사용(수배 완료)

[3] 기타 계약 조건 및 추가사항
-금형 게런티 보장 - 100만번 필요
-비밀 유지 보장 필요
    `
  };



   setInputName = (e) => {
        if(!this.state.example){
		    this.props.Request.input_name = e.target.value;

		    this.setState({
                ...this.state,
                name: this.props.Request.input_name,

            })
        }
	}
	setInputPhone = (e) => {
        if(!this.state.example){
		    this.props.Request.input_phone = e.target.value;

		    this.setState({
                ...this.state,
                phone: this.props.Request.input_phone,

            })
        }
	}
   setInputContent = (e) => {
		if(!this.state.example){
		    this.props.Request.input_content = e.target.value;
		    this.setState({
                ...this.state,
                content: this.props.Request.input_content,

            })
        }
	}
   setInputPrice = (e) => {
		if(!this.state.example){
		    this.props.Request.input_price = e.target.value;
		    this.setState({
                ...this.state,
                price: this.props.Request.input_price,

            })
        }
	}



   setInputDay = (e) => {
		if(!this.state.example){
		    this.props.Request.input_day = e.target.value;
		      this.setState({
                ...this.state,
                day: this.props.Request.input_day,

            })
        }
	}

  onChangeFile = (e) => {
    if(e.currentTarget.files.length === 0) {
      this.setState({
        ...this.state,
        fileName: '',
      })
      return
    }

    const fileName = e.currentTarget.files[0].name;
    this.setState({
      ...this.state,
      file: e.currentTarget.files[0],
      fileName: fileName,
    })
  }

  example = () => {
    const { Request, Answer } = this.props;
    const { mainCategory, name, content, price, day, file, example, example_content, example_content_real } = this.state;

    if(this.state.example == true){
         this.setState({
            ...this.state,
            example: !this.state.example,
        })

        }
    else{
        this.setState({
            ...this.state,
            example: !this.state.example,
        })

        }
  }
  reply = () => {
    const { Request, router } = this.props;
    const { name, content, price, day, file, phone } = this.state;

    if (!name) {
      alert("제품 의뢰명을 입력해주세요.");
      return;
    }
    if(Request.client_id ==18){
        if (!phone) {
            alert("전화번호를 입력해주세요.");
            return;
    }
    }
    {/*if (!content) {
      alert("의뢰내용을 입력해주세요.");
      return;
    }
    if(content.length < 100){
      alert(`의뢰내용이 부족합니다. 주요 기능과 기존 개발단계 포함된 의뢰 내용을 100자 이상 써주세요,
의뢰내용이 부족하면 의뢰서가 반려되거나 파트너들이 매칭되지 않을 수 있습니다.`);
      return;
    }
    if (!price) {
      alert("희망견적을 입력해주세요.");
      return;
    }
    if (!day) {
      alert("희망기간을 입력해주세요.");
      return;
    }


    if (!file) {
      if(this.props.Request.category_id == 1){
        alert("스케치가 포함된 기획 문서를 첨부해주세요. 해당 파일이 없으면 의뢰서가 반려되거나 파트너가 매칭되지 않을 수 있습니다.");
        return;
      }

      if(this.props.Request.category_id == 3){
        alert("Stp, Stl 등 설계 파일을 첨부해주세요. 해당 파일이 없으면 의뢰서가 반려되거나 파트너가 매칭되지 않을 수 있습니다.");
        return;
      }

      if(this.props.Request.category_id == 4){
        alert("Stp, Stl 등 설계 파일을 첨부해주세요. 해당 파일이 없으면 의뢰서가 반려되거나 파트너가 매칭되지 않을 수 있습니다.");
        return;
      }
    }*/}

    /*
      client: client.id,
      product: this.props.project_id,
      category: toJS(this.props.Request.category_middle_set),
    */
    this.setState({ loading: true });
    var formData = new FormData();
    formData.append("content", "1")
    formData.append("client", Request.client_id)
    formData.append("product", this.props.project_id) // 의뢰제품
    Request.category_middle_set.forEach((categoryMiddle) => {
      formData.append("category", categoryMiddle);
    })
    if(Request.client_id !=18){
        formData.append("name", name);
    }
    if(Request.client_id ==18){
        formData.append("name", name + ":" + phone);
    }
    {/*formData.append("content", content);
    formData.append("price", price);
    formData.append("day", day);
    */}
    if(file) {
      formData.append("file", file);
    }
    const req = {
      data: formData,
    };
    RequestAPI.create(req)
      .then((res) => {
        console.log("create: ", res);
        Request.created_request = res.data
        Request.loadAppropriatePartners()

        Request.select_reqs.forEach(req => {
          const data = {...req.data}
          req.data = {...data, request: res.data.id}
          RequestAPI.selectSave(req)
            .then((res) => {
              console.log(res);
              //router.push('/answer/' + res.data.request)
              Request.tab = 4
              //this.setState({
              //  selected: 0,
              //  index: index + 1,
              });
            })
            .catch((e) => {
              console.log(e);
              console.log(e.response);
            });

        const token = localStorage.getItem("token")
        if(!token) { return }
        {/*console.log(res.data.category.join(','))
        const new_req = {
            headers: {
                Authorization: `Token ${token}`,
            },
            data: {
                subclass: res.data.product,
                subject: res.data.name,
                category: res.data.category,
            },
        }
        RequestAPI.sendKakao(new_req)
          .then((res) => {
            console.log("sendKakao :", res);
          })
          .catch((e) => {
            console.log(e);
            console.log(e.response);
            console.log(e.response.new_req);
          });
          */}
      })
      .catch((e) => {
        console.log(e);
        console.log(e.response);
      })
      .then(() => {
        this.setState({ loading: false });
      });
  };
  render() {
    const { Request, Answer, router } = this.props;
    const { loading, name, content, price, day, example, example_content } = this.state;
    const developObj = Answer.getDevelopCategoryById(this.props.Request.category_middle_set[0]);
    let mainCategory = Answer.getDevelopBigCategoryById(developObj.maincategory);

    return (
      <Container style={{marginBottom: 60}}>
        <Board>

          <Text.FontSize28 color={DARKGRAY} fontWeight={500} style={{marginTop: 10}}>
            공통질문
          </Text.FontSize28>
          <TitleBox>
            <Text.FontSize40 color={BLACK} fontWeight={500}>
              의뢰서 완성하기
            </Text.FontSize40>
          </TitleBox>
          <Content>
            <W100 style={{ marginBottom: 15}}>
              <TextBox active={true} style={{ marginTop: 10 }}>
                <Text.FontSize20 color={WHITE} fontWeight={700}>
                  의뢰 제품명
                </Text.FontSize20>
              </TextBox>

              <TextArea
				value={this.props.Request.input_name}
				placeholder="개발 및 제조 하고자 하는 제품의 이름을 입력해주세요."
				onChange={this.setInputName}
			  />

            </W100>
            {this.props.Request.client_id == 18 &&
            <W100 style={{ marginBottom: 15}}>
              <TextBox active={true} style={{ marginTop: 10 }}>
                <Text.FontSize20 color={WHITE} fontWeight={700}>
                  전화번호
                </Text.FontSize20>
              </TextBox>

              <TextArea
				value={this.props.Request.input_phone}
				placeholder="연락 받으실 전화번호를 알려주세요"
				onChange={this.setInputPhone}
			  />

            </W100>
            }
            {/*<W100 style={{ alignItems: 'flex-start' }}>
              <TextBox active={true} style={{ marginTop: 0 }}>
                <Text.FontSize20 color={WHITE} fontWeight={700}>
                  의뢰 내용
                </Text.FontSize20>
              </TextBox>

              {this.state.example == true ?  (

              <TextArea
                value={mainCategory.maincategory == "설계" ? this.state.example_content : this.state.example_content2 }
                rows={8}
              />
              ) : (
              <TextArea
                placeholder="의뢰내용을 적어주세요. 자세한 내용은 상단의 '예시 의뢰서 확인하기' 버튼을 확인하세요"
                value={this.props.Request.input_content}
				onChange={this.setInputContent}
                rows={8}

              />
              )}
            </W100>
            <W100>
              <TextBox active={true} style={{ marginTop: 10 }}>
                <Text.FontSize20 color={WHITE} fontWeight={700}>
                  희망기간
                </Text.FontSize20>
              </TextBox>
              {this.state.example == true ?  (
              <TextArea
                value={mainCategory.maincategory == "설계" ? '80일' : '60일' }
              />
              ) : (
              <TextArea
                type="number"
                placeholder="80(일) - 숫자만 적어주세요"
                value={this.props.Request.input_day}
				onChange={this.setInputDay}
              />
              )}

            </W100>
            <W100>
              <TextBox active={true} style={{ marginTop: 10 }}>
                <Text.FontSize20 color={WHITE} fontWeight={700}>
                  희망 견적
                </Text.FontSize20>
              </TextBox>
               {this.state.example == true ?  (
              <TextArea
                value={mainCategory.maincategory == "설계" ? '2500만원' : '6000만원' }
              />
              ) : (
              <TextArea
                type="number"
                placeholder="4000(만원) - 숫자만 적어주세요."
                value={this.props.Request.input_price}
				onChange={this.setInputPrice}
              />
              )}

            </W100>
            */}
            <W100 style={{marginTop: 10}}>
              <TextBox active={true} style={{ marginTop: 10 }}>
                <Text.FontSize20 color={WHITE} fontWeight={700}>
                  의뢰 파일
                </Text.FontSize20>
              </TextBox>
              <input
                onChange={this.onChangeFile}
                style={{display: 'none'}}
                ref={this.fileRef}
                type='file'
              />

              <Wrap>

                <InputBox onClick={() => this.fileRef.current.click()}>
                  <Text.FontSize20 color="#767676" fontWeight={400}>
                    { this.state.fileName ? this.state.fileName : '선택된 파일 없음' }
                  </Text.FontSize20>

                  <FileIcon src="/static/icon/download_file.svg" />
                </InputBox>
              </Wrap>
            </W100>
            {/*
            <W100 style={{marginTop: 50}}>
             <Text.FontSize20 color={PRIMARY} fontWeight={700}>
                * 비용을 적절하게 작성하지 않으면 의뢰서가 반려되거나 파트너들이 매칭되지 않을 수 있습니다.
                <br/><br/> 제조 예산을 정하기 어려우신 분들께서는 볼트앤너트 공식 전화(02-926-6637)로 전화주시면
                <br/><br/> 볼트앤너트 제조 매니저가 해당 프로젝트에 적합한 예산을 정하는 방법을 알려드립니다.
             </Text.FontSize20>
            </W100>*/}

          </Content>
        </Board>
        <Button id="request_submit_button" style={{padding: 30}} onClick={!this.state.example && this.reply}>
          {loading ? (
            <LoadBox>
              <ButtonSpinner scale="50%" />
            </LoadBox>
          ) : (
            <Text.FontSize28 id="request_submit" color={WHITE} fontWeight={500}>
              제출하기
            </Text.FontSize28>
          )}
        </Button>
      </Container>
    );
  }
}

export default withRouter(TabConatiner);

const LoadBox = styled.div`
  margin-top: -35px;
  margin-bottom: -35px;
`;
const TextArea = styled.textarea`
  font-family: 'Noto Sans KR',sans-serif;
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  white-space: pre-line;

  border-radius: 6px;
  border: solid 1px #dddddd;
  padding: 15px 25px;
  resize: none;
  
  ::placeholder {
    font-weight: 400;
    font-family: 'Noto Sans KR',sans-serif;
    @media (min-width: 0px) and (max-width: 767.98px) {
      font-size: 14px;
    }
    @media (min-width: 768px) and (max-width: 991.98px) {
      font-size: 16px;
    }
    @media (min-width: 992px) and (max-width: 1299.98px) {
      font-size: 18px;
    }
    @media (min-width: 1300px) {
      font-size: 20px;
    }
  }
  
  :focus {
    outline: none;
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    font-size: 14px;
    padding: 15px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    font-size: 16px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    font-size: 18px;
  }
  @media (min-width: 1300px) {
    font-size: 20px;
  }
`;
const Button = styled.div`
  cursor: pointer;
  background-color: ${PRIMARY};
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 18px 0px;
`;
const Board = styled.div`
  margin-top: -30px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 5px 10px 0px #0004;
  background-color: #fff;
  @media (min-width: 0px) and (max-width: 767.98px) {
    padding: 15px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    padding: 20px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    padding: 25px;
  }
  @media (min-width: 1300px) {
    padding: 30px;
  }
`;
const TitleBox = styled.div`

  display: flex;
  margin-top: 10px;
  img {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    margin-right: 10px;
  }
  > div {
    display: flex;
    min-width: 200px;
  }
  > p {
    width: -webkit-fill-available;
    line-height: 1.3em;
  }
  @media (min-width: 0px) and (max-width: 991.98px) {
    flex-direction: column;
    width: 100%;
    img {
      margin-left: 0px;
    }
    > div {
      margin-top: 10px;
    }
    > p {
      margin-bottom: 30px;
    }
  }
`;
const W100 = styled.div`
  width: 100%;
  display: flex;
  margin: 4px 0px;
  
  @media (min-width: 0px) and (max-width: 767.98px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const TextBox = styled.div`
  border-radius: 100px;
  background-color: ${PRIMARY};
  border: 1px solid #e4e6ed;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;

  @media (min-width: 0px) and (max-width: 767.98px) {
    border-radius: 20px;
    margin-left: 0;
    min-width: 90px;
    margin-right: 10px;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    min-width: 100px;
    margin-right: 18px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    min-width: 120px;
    margin-right: 22px;
  }
  @media (min-width: 1300px) {
    min-width: 130px;
    margin-right: 30px;
  }
`;
const CheckList = styled.div`
  width: 100%;

  background-color: #f9f9f9;
  padding: 12px 15px;
  padding-right: 0px;
  border-radius: 6px;
  border: solid 1px #dddddd;

  display: flex;
  flex-wrap: wrap;
  > div {
    width: calc(100% / 3);
  }
  @media (min-width: 0px) and (max-width: 767.98px) {
    > div {
      width: calc(100% / 2);
    }
  }
`;
const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  > p {
    margin-top: 15px;
  }
`
const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;

  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;

  border-radius: 6px;
  border: solid 1px #dddddd;
  padding: 15px;
  
  input {
    font-size: 16px;
  }
  > p {
    max-height: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 12px;
  }
  
  
  @media (min-width: 0px) and (max-width: 767.98px) {
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
  }
  @media (min-width: 992px) and (max-width: 1299.98px) { 
  }
  @media (min-width: 1300px) {
  }
`

const FileIcon = styled.img`
  width: 20px;
  height: 20px;
`


const TextBox2 = styled.div`
  border-radius: 100px;
  background-color: ${PRIMARY};
  border: 1px solid #e4e6ed;
  height: 40px;
  background-color: #ed7d31;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;


  @media (min-width: 0px) and (max-width: 767.98px) {
    border-radius: 20px;
    margin-left: 0;
    min-width: 90px;
    margin-right: 10px;
    margin-top: 15px;
    margin-bottom: 10px;
  }
  @media (min-width: 768px) and (max-width: 991.98px) {
    min-width: 100px;
    margin-right: 18px;
  }
  @media (min-width: 992px) and (max-width: 1299.98px) {
    min-width: 120px;
    margin-right: 22px;
  }
  @media (min-width: 1300px) {
    min-width: 130px;
    margin-right: 30px;
  }

`;
