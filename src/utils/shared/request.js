/**
 * @description 处理请求返回值的数据，这里是请求成功的时候的返回值
 * @param res
 */
function getResData(res) {
  return {
    data: res.data ? res.data : {},
    message: res.message ? res.message : '',
    code: res.code ? res.code: ''
  }
}

export function getResultResData(res) {
  return getResData(res)
}
