import axios from 'axios'
import qs from 'qs'

export default {
  get(url, data) {
    return new Promise((resolve, reject) => {
      axios.get(url, { params: data })
        .then(result => {
          if (result.data) {
            resolve(result.data)
          } else {
            reject(result.data || result)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  post(url, data, head, config) {
    const h = head ? `?${qs.stringify(head)}` : ''
    return new Promise((resolve, reject) => {
      axios.post(url + h, data, { headers: { ...config } })
        .then(result => {
          if (result.data) {
            resolve(result.data)
          } else {
            reject(result.data || result)
          }
        })
        .catch(error => {
          reject(error)
        })

    })

  },

  postFormData(url, data, config) {
    return new Promise((resolve, reject) => {
      axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' }, ...config })
        .then(result => {
          if (result.data) {
            resolve(result.data)
          } else {
            reject(result.data || result)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  delete(url, data) {
    return new Promise((resolve, reject) => {
      axios.delete(url, { params: data })
        .then(result => {
          if (result.data) {
            resolve(result.data)
          } else {
            reject(result.data || result)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  put(url, data) {
    return new Promise((resolve, reject) => {
      axios.put(url, qs.stringify(data))
        .then(result => {
          if (result.data) {
            resolve(result.data)
          } else {
            reject(result.data || result)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  ajax(option) {
    return new Promise((resolve, reject) => {
      axios(option)
        .then(result => {
          if (result.data) {
            resolve(result.data)
          } else {
            reject(result.data || result)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  all(...args) {
    return new Promise((resolve, reject) => {
      axios.all([...args])
        .then(axios.spread((...params) => {
          resolve(params)
        }))
        .catch(error => {
          reject(error)
        })
    })
  }
}
