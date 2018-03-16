import fetch from './api'
export function fetchPostUrlencoded(url, obj) {
  return new Promise((resolve, reject) => {
    fetch({
      url: url,
      method: 'post_urlencoded',
      data: obj
    }).then(response => {
      resolve(response.data)
    }).catch((error) => {
      console.log(error);
      reject(error);
    })
  })
}

export function fetchPostJson(url, obj) {
  return new Promise((resolve, reject) => {
    fetch({
      url: url,
      method: 'post',
      data: obj
    }).then(response => {
      resolve(response.data)
    }).catch((error) => {
      console.log(error);
      reject(error);
    })
  })
}

export function fetchGetHaveParam(url, obj) {
  return new Promise((resolve, reject) => {
    fetch({
      url: url,
      method: 'get',
      params: obj
    }).then(response => {
      resolve(response.data)
    }).catch((error) => {
      console.log(error);
      reject(error);
    })
  })
}

export function fetchGet(url) {
  return new Promise((resolve, reject) => {
    fetch({
      url: url,
      method: 'get'
    }).then(response => {
      resolve(response.data)
    }).catch((error) => {
      console.log(error);
      reject(error);
    })
  })
}
