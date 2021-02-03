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
                <TaskTd style={{width:'17.2%'}}><Font20>용역 범위</Font20></TaskTd>
                {[...Array(8)].map((n,idx) => {
                    return (
                        <TaskTd><Font18>{idx*2+2}주차</Font18></TaskTd>
                    )
                })}
            </tr>
            {Proposal.estimateData.task && Proposal.estimateData.task.map((row)=>(
                <tr height={80}>

                    {/* <TaskTd><Font18 style={{textAlign:'right',marginRight:41}}>{row.name}</Font18></TaskTd> */}
                    <TaskTd><Font18>{row.name}</Font18></TaskTd>
                    {[...Array(8)].map((n,idx) => {
                        
                        return (
                            <TaskTd style={{backgroundColor:'white',border:'1px solid #e1e2e4'}}>
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
    width:500px;
    //height:80px;
    display:table-cell;
    vertical-align:middle;
    background-color:#e1e2e4;
`

const HalfTd=styled.td`
    display:inline-flex;
    // flex-direction:row;
    height:30px;
    width:50%;
    // height:100%;
    // width:${(props) => (props.active ? "50%" : '100%')};
    // height:${(props) => (props.active ? "30px" : '80px')};
    // height:100%:
    background-color:${(props) => (props.active ? "#e1e2e4" : 'white')};
    // z-index:1;
`