
  let socket = io('http://localhost:3000')
  document.querySelector('#chat-form').addEventListener('submit', (e) => {
    e.preventDefault()
    let message = document.querySelector('#chat-input').value
    document.querySelector('#chat-input').value =''
      socket.emit('messageToServer', message)    
  })

  const nsList = document.querySelector('#namespace-list')
// Getting the namespaces and start-message on connection
  socket.on('welcome', (data) => {
    console.log(data);
    data.nsData.forEach((namespace) => {
      nsList.innerHTML +=`<div class="namespace" ns=${namespace.endpoint}><img src="${namespace.image}" width="50px" height="50px "/></div>`
      
       // Adding listeners to the namespaces
      console.log(Array.from(document.getElementsByClassName('namespace')))
      Array.from(document.getElementsByClassName('namespace')).forEach((elem)=>{
      elem.addEventListener('click', (e) => {
        const nsEndpoint = elem.getAttribute('ns')
        joinNS(nsEndpoint)
        console.log('clicked on NS');
    })
  })
    
    })
  })
 
  
  socket.on('messageFromServer', (msg) => {
      let messageContainer = document.querySelector('#message-list')
      let li = document.createElement('li')
      li.innerText = msg
      messageContainer.appendChild(li)
  })

  socket.on('keywordReply', (msg) => {
    console.log(msg)
    let messageContainer = document.querySelector('#message-list')
    let li = document.createElement('li')
    li.innerText = msg
    messageContainer.appendChild(li)
  })
  
//function to join the namespaces
function joinNS(endpoint){
  if(socket){
    socket.close()
  }
  socket = io(`http://localhost:3000${endpoint}`)
  socket.on('nsRooms', (nsRooms) => {
    console.log(nsRooms);
  })
  socket.on('welcome', (msg) => {
    console.log(msg);
  })
}



