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

  return (
      <>
        <table>
            <tr height={50}>
                <TaskTd style={{width:'17.2%'}}>용역 범위</TaskTd>
                {[...Array(8)].map((n,idx) => {
                    return (
                        <TaskTd>{idx*2+2}주차</TaskTd>
                    )
                })}
            </tr>
            {Proposal.estimateData.task && Proposal.estimateData.task.map((row)=>(
                <tr height={80}>

                    <TaskTd>{row.name}</TaskTd>
                    {[...Array(8)].map((n,idx) => {
                        return (
                            <TaskTd>
                                <HalfTd active={activeHandler(idx*2+1,row.startPeriod,row.endPeriod)}/>
                                <HalfTd active={activeHandler(idx*2+2,row.startPeriod,row.endPeriod)}/>
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

const Font16 = styled(Content.FontSize16)`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.88;
  letter-spacing: -0.16px;
  color: #282c36;
`
const TaskTd=styled.td`
    border:1px solid gray;
    width:500px;
    //height:80px;
    display:table-cell;
    vertical-align:middle;
  
    div
    {
        display:inline-block;
        height:30px;
        width:50%;
        background-color:#a4aab4;
    }
`

const HalfTd=styled.td`
    display:inline-block;
    flex-direction:row;
    height:30px;
    // width:50%;
    width:50%;
    background-color:${(props) => (props.active ? "#a4aab4" : 'white')};
    z-index:1;
`