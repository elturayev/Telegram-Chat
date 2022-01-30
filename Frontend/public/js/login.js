
formLogin.onsubmit = async (event)=>{
	event.preventDefault()
	let user = {
		username: userInput.value,
		password: passwordInput.value
	}

	let res = await request('/auth/login','POST',user)
	if(!res.token){
		errorMessage.textContent = res.message
	}
	else {
		window.localStorage.setItem('token',res.token)
		window.localStorage.setItem('profileImg',res.user.profileImg)
		window.location = '/'
	}
}
