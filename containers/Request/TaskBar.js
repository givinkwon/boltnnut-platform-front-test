import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'
import * as Content from "components/Content";

import { inject, observer } from 'mobx-react';
@inject('Proposal')
@observer
class TaskBarContainer extends React.Component {
  render(){
  const { Proposal } = this.props;


    let activeHandler=(idx,start,end) =>
    {
        if(idx>=start && idx<=end)
        { return true; } else
        { return false; }
    };

    var max=0;
    let deActivateHandler=(idx)=>
    {
      if(idx>max)
      {
        return true;
      }
      else
      {
        return false;
      }
    };

    
  return (
      <>
        <table>
            <tr height={50}>
                <TaskTd style={{backgroundColor:'#e1e2e4',width:'17.2%'}}><Font20>용역 범위</Font20></TaskTd>
                {[...Array(8)].map((n,idx) => {
                    return (
                        <TaskTd style={{backgroundColor:'#e1e2e4'}}><Font18>{idx*2+2}주차</Font18></TaskTd>
                    )
                })}
            </tr>

            {Proposal.estimateData.task && Proposal.estimateData.task.map((row)=>
            {
              if(max<row.endPeriod)
              {
                max=row.endPeriod;
                if(max%2!=0)
                {
                  max+=1;
                }
              }
            }
            )}

            {Proposal.estimateData.task && Proposal.estimateData.task.map((row)=>
            (
                <tr height={80}>
                    <TaskTd style={{backgroundColor:'#e1e2e4'}}><Font18>{row.name}</Font18></TaskTd>

                    {[...Array(8)].map((n,idx) => {
                        return (
                            <TaskTd active ={deActivateHandler(idx*2+2)} style={{border:'1px solid #e1e2e4'}}>
                                <HalfTd active={activeHandler(idx*2+1,row.startPeriod,row.endPeriod)} displayHandler={deActivateHandler(idx*2+1)}/>
                                <HalfTd active={activeHandler(idx*2+2,row.startPeriod,row.endPeriod)} displayHandler={deActivateHandler(idx*2+2)}/>
                            </TaskTd>
                        )
                    })}
                </tr>
            ))
            }
        </table>
      </>
    )
  }
}

export default TaskBarContainer;

const Font20 = styled(Title.FontSize20)`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.2px;
  color: #282c36;
  text-align:center;
`
const Font18 = styled(Content.FontSize18)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.67;
  letter-spacing: -0.18px;
  color: #282c36;
  text-align:center;
`
const Font16 = styled(Content.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.16px;
  color: #282c36;
`


const TaskTd=styled.td`
    border-top:2px solid white;
    border-right:2px solid white;
    border-bottom:2px solid white;
    width:10%;
    display:table-cell;
    vertical-align:middle;
    background-color:${(props) => (props.active ? "#b4b4b4" : 'white')};
`

const HalfTd=styled.td`
    //displayHandler를 따로 만든 이유는 props.active로 제어하면 max값보다 작은 범위에서 설정해놓은 inline-flex가 풀려서 태스크바가 붙지 않는다.
    display:${(props) => (props.displayHandler ? "none" : 'inline-flex')};
    height:30px;
    width:50%;
    background-color:${(props) => (props.active ? "#e1e2e4" : 'white')};
`