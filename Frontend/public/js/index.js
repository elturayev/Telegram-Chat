;(async function () {
    let token = await request('/message/token/1')
    if(token.message){
        window.localStorage.removeItem('profileImg')
        window.localStorage.removeItem('token')
    	window.location = '/login'
    }
})()

async function renderUsers(search,private){
	let users = await request('/users'+ (search ? '?search=' + search : ''))
    let iam = await request('/users/one/one')
    let mes = await request('/message/'+iam.userId)
    let userStr = ''
    users = users.reverse()
	for (let user of users){
        if(iam.userId != user.userId){
            if(private){
                for(let i of mes){
                    if( (i.userId == user.userId || i.sendUserId == user.userId)){
                       let li = `
                            <div onclick = "ren(${user.userId})" class="row sideBar-body">
                                <div class="col-sm-3 col-xs-3 sideBar-avatar">
                                  <div class="avatar-icon">
                                    <img src="${backendApi + user.profileImg}">
                                  </div>
                                </div>
                                <div class="col-sm-9 col-xs-9 sideBar-main">
                                  <div class="row">
                                    <div class="col-sm-8 col-xs-8 sideBar-name">
                                      <span class="name-meta">${user.username}
                                    </span>
                                    </div>
                                    <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                                    </div>
                                  </div>
                                </div>
                            </div>`
                        userStr += li
                        break
                    }
                }
            }
            else{
                let li = `
                    <div onclick = "ren(${user.userId})" class="row sideBar-body">
                        <div class="col-sm-3 col-xs-3 sideBar-avatar">
                          <div class="avatar-icon">
                            <img src="${backendApi + user.profileImg}">
                          </div>
                        </div>
                        <div class="col-sm-9 col-xs-9 sideBar-main">
                          <div class="row">
                            <div class="col-sm-8 col-xs-8 sideBar-name">
                              <span class="name-meta">${user.username}
                            </span>
                            </div>
                            <div class="col-sm-4 col-xs-4 pull-right sideBar-time">
                            </div>
                          </div>
                        </div>
                    </div>`
                userStr += li
            }
        }
	}
    if(!private){
        userDiv.innerHTML = userStr
    }else{
        privateUsers.innerHTML =userStr
    }
}

setInterval(()=>{
    renderUsers(null,1)
},1000)

let youId
async function ren(userId){
    youId = userId
    messageRender(userId)
    let response = await request('/users/'+userId)
    let li = `
            <div class="col-sm-2 col-md-1 col-xs-3 heading-avatar">
              <div class="heading-avatar-icon">
                <img src="${backendApi + response.profileImg}">
              </div>
            </div>
            <div class="col-sm-8 col-xs-7 heading-name">
              <a id="profilePhoto" class="heading-name-meta">${response.username}
              </a>
              <span class="heading-online">Online</span>
            </div>
            <div class="col-sm-1 col-xs-1  heading-dot pull-right">
              <i class="fa fa-ellipsis-v fa-2x  pull-right" aria-hidden="true"></i>
            </div>
    `
    online.innerHTML = li
}
 
setInterval(()=>{
    messageRender(youId)
},1000)
async function messageRender(sendUserId){
    let user = await request('/users/one/one')
    let messages = await request(`/message?userId=${user.userId}&sendUserId=${sendUserId}`)
    let mesStr = `
        <div class="row message-previous">
          <div class="col-sm-12 previous">
            <a  id="ankitjain28" name="20">
            Welcome to chat!
            </a>
          </div>
        </div>
    `
    for (let mes of messages){
        let date = new Date(mes.messageDate)
        const dateStr = date.toLocaleTimeString('uz-UZ')
        date = dateStr.split(":") 
        let hour = date[0] + ':' + date[1]
        if(mes.sendUserId == user.userId){
            let div = `
            <div class="row message-body">
                <div class="col-sm-12 message-main-receiver">
                  <div class="receiver">
                    <div class="message-text">${mes.messageText}</div>
                    <span class="message-time pull-right">${hour}</span>
                  </div>
                </div>
            </div>`
            mesStr += div
        }
        if(mes.userId == user.userId){
            let div = `
            <div class="row message-body">
                <div class="col-sm-12 message-main-sender">
                  <div class="sender">
                    <div class="message-text">${mes.messageText}</div>
                    <span class="message-time pull-right">${hour}</span>
                  </div>
                </div>
            </div>`
            mesStr += div
        }
    }
    conversation.innerHTML = mesStr
}

avatar.src = backendApi + window.localStorage.getItem('profileImg')

composeText.onkeyup = (event)=>{
    if(event.keyCode == 13){
        renderUsers(composeText.value)
    }
}

searchText.onkeyup = (event)=>{
    if(event.keyCode == 13){
        renderUsers(searchText.value,1)
    }
}

icon.onclick = async ()=>{
   
    renderUsers()
}

send.onclick = async()=>{
    if(comment.value.trim() && youId){
        let chat = {
            sendUserId: youId,
            messageText: comment.value
        }
        let response = await request('/message','POST',chat)
        if(response.chat){
            setTimeout(()=>{
                messageRender(response.chat.sendUserId)
                renderUsers(null,1)
            },500)
        }
    }
    comment.value = null
}
