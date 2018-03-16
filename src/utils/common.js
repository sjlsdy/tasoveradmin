export function add0(m) {
  return m < 10 ? '0' + m : m
}

export function getLocalTime(nS) {
  var time = new Date(nS);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  // return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) +
  //   ':' + add0(s);
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm);
}

export function dateTrans(s) {
  let date = '';
  let d = new Date(s);
  let month = d.getMonth() + 1;
  let day = d.getDate();
  let fmonth = (month < 10 ? "0" + month : month);
  let fday = (day < 10 ? "0" + day : day);
  date = d.getFullYear() + '-' + fmonth + '-' + fday;
  return date;
}

export function oveTtime(endTime) {
  var date1 = new Date(); //开始时间
  var date2 = endTime; //结束时间
  var date3 = date1.getTime() - date2; //时间差的毫秒数
  //计算出相差天数
  var days = Math.floor(date3 / (24 * 3600 * 1000))
    //计算出小时数
  var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000))
    //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000))
    //计算相差秒数
  var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000)
  return days + "天 " + hours + "小时 " + minutes + " 分钟";
}

//钱数以逗号分隔并保留小数位
export function splitK(s, n) {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(),
    r = s.split(".")[1];
  let t = "";
  if (l[l.length - 1] == "-") {
    l.pop();
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return '-' + t.split("").reverse().join("") + "." + r;
  } else {
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return t.split("").reverse().join("") + "." + r;
  }
}
//还原以逗号分隔的钱数
export function rmoney(s) {
  return parseFloat(s.replace(/[^\d\.-]/g, ""));
}

export function formatTextIsNum(val) {
  var reg = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/
  if (!reg.test(val)) {
    return false;
  } else {
    return true;
  }
}

export function formateNum(...num) {
  return Math.pow(10, Math.max.apply(null, num[0]))
}

export function numAdd(...num) {
  let baseNum = [];
  let totalPrice = 0,
    forNum;
  for (let i = 0; i < num[0].length; i++) {
    try {
      baseNum.push(num[0][i].toString().split(".")[1].length);
    } catch (e) {
      baseNum.push(0);
    }
  }
  forNum = formateNum(baseNum);
  for (let j = 0; j < num[0].length; j++) {
    totalPrice = (totalPrice * forNum + num[0][j] * forNum) / forNum;
  }
  return totalPrice;
}

//模糊查询
export function vague(keyWord, data) {
  var list = data;
  var len = data.length;
  var arr = [];
  var reg = new RegExp(keyWord);
  for (var i = 0; i < len; i++) {
    //如果字符串中不包含目标字符会返回-1
    if (list[i].name.match(reg)) {
      arr.push(list[i]);
    }
  }
  return arr;
}

//格式化票的列表
export function formatBillQuery(list) {
  let arr = [];
  for (let item1 of list) {
    let item2 = {};
    item2.cellClassName = {};
    item2.billTime = getLocalTime(item1.billTime);
    item2.bType = item1.billType;
    item2.isToVoid = item1.isToVoid;
    if (item1.billType == 1) {
      item2.billType = "订单";
    } else if (item1.billType == 3) {
      item2.billType = "冲红";
      item2.cellClassName.billType = 'table-info-cell-war'
    }
    if (item1.writeOffType == 1) {
      item2.writeOffType = "已核销";
    } else if (item1.writeOffType == 2) {
      item2.writeOffType = "部分核销";
    } else if (item1.writeOffType === 0) {
      item2.writeOffType = "未核销";
    }
    item2.billNo = item1.billNo;
    item2.amount = splitK(item1.amount);
    item2.totalAmount = splitK(item1.totalAmount);
    item2.taxAmount = splitK(item1.taxAmount);
    if (item1.isExcess == 1) {
      item2.isExcess = "超额";
      item2.cellClassName.isExcess = 'table-info-cell-red'
    } else if (item1.isExcess == 0) {
      item2.isExcess = "正常";
      item2.cellClassName.isExcess = 'table-info-cell-green'
    }
    item2.billId = item1.id;
    arr.push(item2);
  }
  console.log(arr);
  return arr;
}
//格式化收票列表
export function formatSBillQuery(list) {
  let arr = [];
  for (let item1 of list) {
    let item2 = {};
    item2.cellClassName = {};
    item2.date = getLocalTime(item1.date);
    item2.bType = item1.billType;
    if (item1.billType == 1) {
      item2.billType = "订单";
    }
    if (item1.tickSts == 1) {
      item2.tickSts = "已支付";
    } else if (item1.tickSts == 2) {
      item2.tickSts = "部分支付";
    } else {
      item2.tickSts = "未支付";
    }
    item2.ticketNo = item1.ticketNo;
    item2.amount = splitK(item1.amount);
    item2.totalAmount = splitK(item1.totalAmount);
    item2.taxAmount = splitK(item1.taxAmount);
    item2.billId = item1.id;
    arr.push(item2);
  }
  console.log(arr);
  return arr;
}

//获取storage
export function getStorage(store) {
  var _storage = {};
  var key = 'user';
  var storageStr = localStorage.getItem(key);
  if (storageStr) {
    _storage = JSON.parse(storageStr);
    store.commit('setToken', _storage.token);
    store.commit('setPermInfo', _storage.permInfo);
  }
  return _storage
}

export function setBodyAtt() {
  var bd = document.getElementsByTagName('body')[0];
  bd.setAttribute('id', 'doc-bd');
}

export function removeBodyAtt() {
  var bd = document.getElementsByTagName('body')[0];
  setTimeout(function() {
    bd.removeAttribute('id');
  }, 200)

}
//提示框
export function tipsModal(msg, modal, type, s) {
  switch (type) {
    case 'info':
      modal.info({
        title: '提示框',
        content: msg
      });
      break;
    case 'success':
      modal.success({
        title: '提示框',
        content: msg,
        onOk: function() {
          // setBodyAtt();
          if (s == 'lev1') {
            removeBodyAtt();
          } else {
            setBodyAtt();
          }
        }
      });
      break;
    case 'warning':
      modal.warning({
        title: '提示框',
        content: msg,
        onOk: function() {
          if (s == 'lev1') {
            removeBodyAtt();
          } else {
            setBodyAtt();
          }
        }
      });
      break;
    case 'error':
      modal.error({
        title: '提示框',
        content: msg
      });
      break;
  }
}

/*==========订单状态==========*/
export function orderStatus(status) {
  switch (status) {
    case 0:
      return '已取消'
      break;
    case 1:
      return '客户询价单已生成'
      break;
    case 2:
      return '天驶询价单已生成'
      break;
    case 3:
      return '已邀请供应商报价'
      break;
   	case 4:
      return '供应商报价中'
      break;
    case 5:
      return '供应商报价已完成'
      break;
    case 6:
      return '已选择报价'
      break;
    case 7:
      return '订单确认待发货'
      break;
    case 8:
      return '订单确认待支付'
      break;
    case 9:
      return '支付完毕待发货'
      break;
    case 11:
      return '订单核价被打回'
      break;
   	case 20:
      return '退货审核已发起'
      break;
    case 21:
      return '定损员已确认'
      break;
    case 22:
      return '待供应商确认'
      break;
    case 23:
      return '供应商已确认'
      break;
    case 24:
      return '退货已发货'
      break;
    case 25:
      return '退货完成'
      break;
    case 26:
      return '退款已完成'
      break;
   	case 30:
      return '供应商备货中'
      break;
    case 31:
      return '配送中'
      break;
    case 97:
      return '已收货待支付确认'
      break;
    case 98:
      return '预订单保存'
      break;
    case 99:
      return '订单完成'
      break;
    default:
      return '状态错误'
      break;
  }
}

/*================================================================================MD5加密================================================================================*/
export function md5(string) {
  function md5_RotateLeft(lValue, iShiftBits) {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }

  function md5_AddUnsigned(lX, lY) {
    var lX4, lY4, lX8, lY8, lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  }

  function md5_F(x, y, z) {
    return (x & y) | ((~x) & z);
  }

  function md5_G(x, y, z) {
    return (x & z) | (y & (~z));
  }

  function md5_H(x, y, z) {
    return (x ^ y ^ z);
  }

  function md5_I(x, y, z) {
    return (y ^ (x | (~z)));
  }

  function md5_FF(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x),
      ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  };

  function md5_GG(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x),
      ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  };

  function md5_HH(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x),
      ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  };

  function md5_II(a, b, c, d, x, s, ac) {
    a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x),
      ac));
    return md5_AddUnsigned(md5_RotateLeft(a, s), b);
  };

  function md5_ConvertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1 = lMessageLength + 8;
    var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 %
      64)) / 64;
    var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    var lWordArray = Array(lNumberOfWords - 1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(
        lByteCount) << lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  };

  function md5_WordToHex(lValue) {
    var WordToHexValue = "",
      WordToHexValue_temp = "",
      lByte, lCount;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(
        WordToHexValue_temp.length - 2, 2);
    }
    return WordToHexValue;
  };

  function md5_Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };
  var x = Array();
  var k, AA, BB, CC, DD, a, b, c, d;
  var S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22;
  var S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20;
  var S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23;
  var S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21;
  string = md5_Utf8Encode(string);
  x = md5_ConvertToWordArray(string);
  a = 0x67452301;
  b = 0xEFCDAB89;
  c = 0x98BADCFE;
  d = 0x10325476;
  for (k = 0; k < x.length; k += 16) {
    AA = a;
    BB = b;
    CC = c;
    DD = d;
    a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
    d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
    c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
    b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
    a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
    d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
    c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
    b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
    a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
    d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
    c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
    b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
    a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
    d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
    c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
    b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
    a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
    d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
    c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
    b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
    a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
    d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
    c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
    b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
    a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
    d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
    c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
    b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
    a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
    d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
    c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
    b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
    a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
    d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
    c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
    b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
    a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
    d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
    c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
    b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
    a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
    d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
    c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
    b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
    a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
    d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
    c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
    b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
    a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
    d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
    c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
    b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
    a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
    d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
    c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
    b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
    a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
    d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
    c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
    b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
    a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
    d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
    c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
    b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
    a = md5_AddUnsigned(a, AA);
    b = md5_AddUnsigned(b, BB);
    c = md5_AddUnsigned(c, CC);
    d = md5_AddUnsigned(d, DD);
  }
  return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) +
    md5_WordToHex(d)).toLowerCase();
}

/*export const cookieHelp = {
    setCookie: function (name, value,days) {
        var exp = new Date();
        exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    getCookie: function (name) //读取cookies
    {
        var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
        if (arr = document.cookie.match(reg)) return unescape(arr[2]);
        else return null;
    }
}
*/
