/**
 * @author Oh Kyu Seok
 * @email cane1226@gmail.com
 * @create date 2021-08-05 10:54:45
 * @modify date 2021-08-05 10:54:45
 * @desc 한 박스 안에 버튼 2개가 space-between으로 정렬되어있는 CSS Component입니다
 */

import styled from "styled-components";

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${(props) => (props.width ? props.width : "100%")};
`;

export default ButtonBox;
