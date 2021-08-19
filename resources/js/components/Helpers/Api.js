import axios from 'axios';
import {getAccessToken, getRefreshToken} from './tokens';
const mainApi = axios.create({
	baseURL: '/api/js-ra-tokens-api/',
});

//mainApi.interceptors.request.use(convertPostObjectToFormData);
mainApi.interceptors.request.use(function(request){
    if(request.url === "auth/refresh.php"){
        request.headers.Authorization = getRefreshToken()
    }
	else if(!!getAccessToken()){
		request.headers.Authorization = getAccessToken()
	}

	return request;
});



export default mainApi ;

function convertPostObjectToFormData(request){
	if(request.method === 'post' && !(request.data instanceof FormData)){
		let body = new FormData();

		for(let key in request.data){
			body.append(key, request.data[key]);
		}

		request.data = body;
	}

	return request;
}

