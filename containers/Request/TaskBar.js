import React from 'react'
import styled from 'styled-components'
import * as Title from 'components/Title'
import * as Content from "components/Content";

import { inject, observer } from 'mobx-react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    table: {
      minWidth: 650
    },
    row:{
      height:'auto',
    },
    cell:{
      border:'1px solid gray'
    }
};

function createData(title, c1, c2) {
    return { title, c1, c2 };
  }

@inject('Proposal')
@observer
class TaskBarContainer extends React.Component {
    // rows1 = [
    //     // createData('작성일자', Proposal.estimate_year + '.' + Proposal.estimate_month + '.' + Proposal.estimate_day, ''),
    //     // createData('문서번호', 'C8-' + Proposal.estimate_year + Proposal.estimate_month + Proposal.estimate_day + '-' + estimateData.id, ''),
    //     // createData('수신인', estimateData.client, ''),
    //     createData('발신인', '', ''),
    //     // createData('제조사', '윤기열 대표 / (주) 볼트앤너트', 'TEL : 02 - 926 - 9967')
    //   ];

    rows1=[];
      componentDidMount()
      {
          console.log("ASBCKLBASKCBAJKLSCBK");
          this.rows1.push(createData('d', '', ''))
      }
  render(){
  const { Proposal } = this.props;
  const {classes} = this.props
  

  
  return (
      <>
      {/* <Table className={classes.table} size="small">
              <TableBody>
                  { this.rows1.map((row) => (
                <TableRow className ={classes.row} key={row.title}>
                  <TableCell className ={classes.cell} component="th" scope="row" width='154'>
                    <Font16 style={{marginRight:48,textAlign:'right'}}>{row.title}</Font16>
                  </TableCell>
                  <TableCell className ={classes.cell} width='472'>
                    <Font16 style={{marginLeft:20,textAlign:'left'}}>{row.c1}</Font16>
                  </TableCell>
                  <TableCell className ={classes.cell} width='268'>
                    <Font16 style={{marginRight:52,textAlign:'right'}}>{row.c2}</Font16>
                  </TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table> */}
            <table border="1">
                <th>테이블</th>
                <th>만들기</th>
                <tr>
                    <TaskTd style={{width:100}}>타이틀</TaskTd>
                    <TaskTd><HalfTd id={1} active={true}/><HalfTd id={2}/></TaskTd>
                    <TaskTd><HalfTd id={3}/><HalfTd id={4} active={true}/></TaskTd>
                    <TaskTd><HalfTd id={5} active={true}/><HalfTd id={6}/></TaskTd>
                    <TaskTd><HalfTd id={7}/><HalfTd id={8}/></TaskTd>
                    <TaskTd><HalfTd id={9}/><HalfTd id={10}/></TaskTd>
                    <TaskTd><HalfTd id={11}/><HalfTd id={12}/></TaskTd>
                    <TaskTd><HalfTd id={13}/><HalfTd id={14}/></TaskTd>
                    <TaskTd><HalfTd id={15}/><HalfTd id={16}/></TaskTd>
                </tr>
            </table>
            {/* {this.props.test} */}
            {/* {f} */}
            {/* <div onClick={()=>this.props.test.push(createData('asd','fff','fasdasdasd'))}>dd</div> */}
            {/* <div onClick={setF}>dd</div>
            <div onClick={()=>console.log(this.props.test)}>dasdasdd</div> */}
      </>
    )
  }
}

export default withStyles(styles)(TaskBarContainer);

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
    width:200px;
    height:80px;
    display:table-cell;
    vertical-align:middle;
    div
    {
        display:inline-block;
        flex-direction:row;
        height:30px;
        // width:50%;
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