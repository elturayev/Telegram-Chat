formRegister.onsubmit = async (event)=>{
	event.preventDefault()
	if(inputFile.files[0].size > (10 * 1024 * 1024)){
		return errorMessage.textContent = "The file size should be less than 10MB!"
	}
	if(!(['image/png', 'image/jpeg','image/jpg'].includes(inputFile.files[0].type))){
		return errorMessage.textContent = 'The file format should be .png or .jpg!'
	}

	let formData = new FormData()
	formData.append('file',inputFile.files[0])
	formData.append('username',userInput.value)
	formData.append('password',passwordInput.value)

	let response = await request('/auth/register','POST', formData)
	if(!response.token){
		errorMessage.textContent = response.message
	}else{
		window.localStorage.setItem('token',response.token)
		window.localStorage.setItem('profileImg',response.user.profileImg)
		setTimeout(()=>{window.location = '/'},1000)
		
	}
}