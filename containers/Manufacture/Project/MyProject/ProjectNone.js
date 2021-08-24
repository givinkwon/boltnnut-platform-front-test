import React from "react";
import styled from "styled-components";
import Background from "components/Background";
import Containerv1 from "components/Containerv1";
import * as Title from "components/Title";
import Router from "next/router";
import Buttonv1 from "components/Buttonv1";
import { inject, observer } from "mobx-react";

@inject("Project")
@observer
class ProjectNone extends React.Component {
  render() {
    const { Project } = this.props;
    return (
      <Background style={{width:"894px", height:"248px"}}>
        <Containerv1 style={{display:"contents"}} >
          <NoneTitleBox>
            프로젝트를 찾고 계시나요? <br/>
            프로젝트에 지원하고 클라이언트와 직접 소통해보세요.
          </NoneTitleBox>

          <Button onClick={() => {
            Router.push('/project')
            Project.set_step_index(1)
            }
            }>
              프로젝트 찾기
          </Button>
          
        </Containerv1>
      </Background>
    );
  }
}

export default ProjectNone;

const Button = styled(Buttonv1)`
  width: 158px !important;
  height: 44px !important;
  font-size: 16px;
  font-family: NotoSansCJKkr !important;
  line-height: 1.5;
  letter-spacing: -0.4px;
  margin-top: 22px;
  margin-bottom: 66px;
  z-index: 2;
  :hover {
    background-color: #174aee;
  }
`;
const NoneTitleBox = styled.div`
  margin-top: 66px;
  margin-left: auto;
  margin-right: auto;
  // width: 346px;
  object-fit: contain;
  font-family: NotoSansCJKkr;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: -0.4px !important;
  text-align: center;
  color: #282c36;
`
// fontsize
const FontSize26 = styled(Title.FontSize26)`
  font-weight: bold;
  line-height: 1.31;
  letter-spacing: -0.65px;
  color: #0a2165;
`;

const FontSize24 = styled(Title.FontSize24)`
  font-weight: bold;
  line-height: 1.67;
  letter-spacing: -0.6px;
  color: #282c36;
`;

const FontSize22 = styled(Title.FontSize22)`
  font-weight: normal;
  line-height: 1.82;
  letter-spacing: -0.55px;
  color: #282c36;
`;

const FontSize20 = styled(Title.FontSize20)`
  font-weight: bold;
  line-height: 2.6;
  letter-spacing: -0.5px;
  color: #ffffff;
`;

const FontSize18 = styled(Title.FontSize18)`
  font-weight: normal;
  line-height: 1.89;
  letter-spacing: -0.45px;
  color: #111111;
`;

const RequestCompleteTitle = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 996px;
  border-bottom: solid 1px #c6c7cc;
`;

const RequestCompleteDesc = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  margin-bottom: 90px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 520px;
`;

const HomeBtn = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 242px;
	height: 61px;
	border-radius: 5px;
	border: solid 1px #0933b3;
	cursor: pointer;
	font-size: 20px;
	font-weight: bold;
	line-height: 2.6;
	letter-spacing: -0.5px;
	color: #0933b3;
	}
	&:hover {
		transition: all 0.5s;
		border: solid 1px #0a2165;
		background-color: #f6f6f6;
		color: #0a2165;
	}
`;

const MyProjectBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 242px;
  height: 61px;
  border-radius: 5px;
  border: solid 1px #0933b3;
  cursor: pointer;
  background-color: #0933b3;
  font-size: 20px;
  font-weight: bold;
  line-height: 2.6;
  letter-spacing: -0.5px;
  color: #ffffff;
  &:hover {
    transition: all 0.5s;
    background-color: #0a2165;
  }
`;
