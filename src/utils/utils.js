
export default {
  /**
   * 验证邮箱格式是否正确
   * @param  {String}  s 邮箱地址
   * @return {Boolean}   
   */
  isEmail(s) {
    const reg = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/ //邮箱格式
    return reg.test(s)
  },
  /**
  * 判断是否是手机号码
  * @param  {string}  s 手机号码字符串
  * @return {Boolean}   true 是，false 否
  */
  isMobile(s) {
    const reg = /^1[3456789]\d{9}$/
    return reg.test(s)
  },
  /**
  * 验证是否是域名
  * @param  {String}   域名 不含http://
  * @return {Boolean}   
  */
  // isDomain(s) {
  //   //   ^([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$  不带http,https 头
  //   const reg = /^((ht|f)tps?):\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?$/
  //   return reg.test(s)
  // },
  /**
   * 给链接添加http头
   * @param {*} url 
   */
  addHttp(url) {
    if (url.indexOf('//') === 0) {
      url = 'http:' + url
    } else if (['http://', 'https://'].every(v => url.indexOf(v) === -1)) {
      url = 'http://' + url
    }
    return url
  },

  /**
   * 新窗口打开页面，防止被拦截
   * @param {*} url 
   */
  openWindow(url) {
    const a = document.createElement('a')
    a.target = '_blank'
    a.href = url
    document.body.appendChild(a)
    a.click()
    // document.body.removeChild(a)
  },
}