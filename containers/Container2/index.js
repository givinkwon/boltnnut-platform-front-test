import React from 'react';

class Container2 extends React.Component {
  render() {
    return (
      <div style={styles.flexRow}>
        <div style={styles.img}>
        </div>
        <div style={styles.flexCol}>
          <span style={styles.banner}>컨설턴트 중 해당 제품</span>
          <span style={styles.h1}>1초만에 내 제품<br/>가견적 받기</span>
          <span style={styles.content}>평균 48시간의 견적 시간을 450건 의뢰 데이터를<br/>기반으로 클릭 한 번으로 해결해 드립니다.</span>
        </div>
      </div>
    );
  }
};
export default Container2;

const styles = {
  img: {
    width: 300,
    height: 300,
    backgroundColor: 'yellow',
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  h1: {
    fontFamily: "NotoSansCJKkr",
    fontSize: 56,
    fontWeight: "bold",
    letterSpacing: "-1.4px",
    lineHeight: 1.36,
  },
  banner: {
    color: "#0933b3",
    lineHeight: 1.45,
    fontFamily: "NotoSansCJKkr",
    fontWeight: "bold",
    textAlign: "left",
    width: 300,
    marginBottom: 30,
    fontSize: 20,
  },
  content: {
    color: '#282c36',
    fontSize: 24,
    fontFamily: 'NotoSansCJKkr',
    fontWeight: 500,
    width: 465,
    textAlign: 'left',
    letterSpacing: '-0.6px',
    lineHeight: 1.67,
    marginTop: 110,
  },
}
