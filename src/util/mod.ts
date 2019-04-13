const util = {
  isType(data: any, lowerCase?: boolean) {
    const typeStr = Object.prototype.toString.call(data) || '';
    const result = typeStr.replace(/(\[object|\])/ig, '').trim();
    return lowerCase === true ? result.toLocaleLowerCase() : result;
  }
}

export default util;
