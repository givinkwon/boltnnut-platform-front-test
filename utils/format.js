export function intcomma(x) {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else x;
}

export function formatDate(d) {
  const date = new Date(d);
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();
  // {item.updated_at.substring(0,10).replace(/-/g, ‘.’) + ” ” + item.updated_at.substring(11,16)}
  return `${year}.${`0${monthIndex}`.slice(-2)}.${`0${day}`.slice(-2)}`;
}

export function formatDateTime(d) {
  const date = new Date(d);
  const day = date.getDate();
  const monthIndex = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();
  // {item.updated_at.substring(0,10).replace(/-/g, ‘.’) + ” ” + item.updated_at.substring(11,16)}
  return `${year}.${monthIndex}.${`0${day}`.slice(
    -2
  )} ${hour}:${`0${min}`.slice(-2)}`;
}

export function getDays(d) {
  var week = ["일", "월", "화", "수", "목", "금", "토"];
  var dayOfWeek = week[new Date(d).getDay()];
  return dayOfWeek;
}

export function getRemaining(createdAt) {
  const now = new Date();
  let dueAt = new Date(createdAt);

  // 만들어진지 1일 후에 마감
  dueAt.setDate(dueAt.getDate() + 1);
  console.log(dueAt);

  const remaining = dueAt.valueOf() - now.valueOf();
  return Math.round(remaining / 1000 / 60 / 60);
}

export function formatPhone(num, type) {
  let formatNum = "";

  try {
    if (num.length == 11) {
      if (type == 0) {
        formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-****-$3");
      } else {
        formatNum = num.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      }
    } else if (num.length == 8) {
      formatNum = num.replace(/(\d{4})(\d{4})/, "$1-$2");
    } else {
      if (num.indexOf("02") == 0) {
        if (type == 0) {
          formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-****-$3");
        } else {
          formatNum = num.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
        }
      } else {
        if (type == 0) {
          formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-***-$3");
        } else {
          formatNum = num.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        }
      }
    }
  } catch (e) {
    formatNum = num;
    console.log(e);
  }

  return formatNum;
}
