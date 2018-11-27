import axios from 'axios'
export const http = axios.create({
	baseURL: 'https://api.apixu.com/v1/'
});
export const apiKey = '234c64fd90ec4946a9065716182711';
