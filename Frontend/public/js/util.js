const backendApi = 'http://192.168.43.28:5000'

let headers = {
	token: window.localStorage.getItem('token')
}



const request = async (route, method, body)=>{

	if(!(body instanceof FormData)){
		headers['Content-Type'] = 'application/json'
	}

	let response = await fetch(backendApi + route, {
		method,
		headers,
		body: (body instanceof FormData) ? body : JSON.stringify(body)
	})

	return (await response.json())
}


function createElements(...array){
	return array.map(el=> document.createElement(el))
}

