import axios from 'axios';

let base = process.env.HOST + 'robot/';
axios.interceptors.request.use(config => {
  switch (config.method) {
    case 'get':
    case 'delete':
      for (const key in config.params) {
        if (Object.hasOwnProperty.call(config.params, key)) {
          const element = config.params[key];
          if (element instanceof Array) {
            for (let i = 0; i < element.length; i++) {
              element[i] = encodeURIComponent(element[i])
            }
            config.params[key] = element.join(',')
          } else {
            config.params[key] = encodeURIComponent(config.params[key])
          }
        }
      }
      break;
    default:
      break;
  }
  return config;
}, err => Promise.reject(error));



export const getMemberList = params => { return axios.get(`${base}getMemberList`, { params }); };

export const getMemberInfo = params => { return axios.get(`${base}getMemberInfo`, { params }); };

export const getGroupInfo = params => { return axios.get(`${base}getGroupInfo`, { params }); };

export const getGroupList = params => { return axios.get(`${base}getGroupList`, { params }); };

export const powerSwitch = params => { return axios.post(`${base}powerSwitch`, params); };

export const getAt = params => { return axios.get(`${base}CQ/getAt`, { params }); };

export const getAts = params => { return axios.get(`${base}CQ/getAts`, { params }); };

export const addMessage = params => { return axios.post(`${base}message/addMessage`, params); };

export const removeMessage = params => { return axios.delete(`${base}message/removeMessage`, { params }); };

export const removeMessages = params => { return axios.delete(`${base}message/removeMessages`, { params }); };

export const getLoginQrCode = params => { return axios.get(`${base}getLoginQrCode`, { params }); };

export const getLoginState = params => { return axios.get(`${base}getLoginState`, { params }); };