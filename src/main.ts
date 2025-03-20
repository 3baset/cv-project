import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// Configure axios defaults
import axios from 'axios'
axios.defaults.baseURL = 'https://api.deepseek.com/v1'
axios.defaults.headers.common['Authorization'] = `Bearer sk-6712f0ee93394635958971746ab8c713`
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000 // 10 seconds timeout

// Add request interceptor
axios.interceptors.request.use(config => {
  console.log('Request:', config)
  return config
}, error => {
  console.error('Request Error:', error)
  return Promise.reject(error)
})

// Add response interceptor
axios.interceptors.response.use(response => {
  console.log('Response:', response)
  return response
}, error => {
  console.error('Response Error:', error)
  return Promise.reject(error)
})

createApp(App).mount('#app')
