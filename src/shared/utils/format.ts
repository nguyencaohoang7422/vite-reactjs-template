export const removeAccents = (str:string, isLowerCase = true) => {
  str = str || '';
  str = str.replaceAll(/[\u0300-\u036f]/g, '');
  str = str.replaceAll(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replaceAll(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replaceAll(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replaceAll(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replaceAll(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replaceAll(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replaceAll(/đ/g, 'd');
  str = str.replaceAll(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replaceAll(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replaceAll(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replaceAll(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replaceAll(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replaceAll(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replaceAll(/Đ/g, 'D');
  if (isLowerCase) {
    return str.toLowerCase().trim();
  }
  return str.trim();
};