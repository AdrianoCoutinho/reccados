////////////verifica se está logado e o tipo de login, se é permanecido ou não///////
if(!sessionStorage.getItem('session')){
    !localStorage.getItem('session') ? window.location.replace("login.html") : null
}

const newMessage = document.querySelector('#new-message')
const editSaveBtn = document.querySelector('#editSaveBtn')
const inputDescript = document.querySelector('#inputDescript')
const inputDetail = document.querySelector('#inputDetail')
const titleModalEdit = document.querySelector('#messageTitle')
const editDescript = document.querySelector('#editDescript')
const editDetail = document.querySelector('#editDetail')
const userButton = document.querySelector('.dropdown-toggle')
const buttonLogout = document.querySelector('#logout')
const goTop = document.querySelector('#goTop')

/////////////pega o evento salvar ao criar um recado novo
newMessage.addEventListener('submit', addNewMessage)

///////pega a lista completa de usuarios
let users = JSON.parse(localStorage.getItem('users'))

/////////pega o usuário que está logado
let logedUserSession = JSON.parse(sessionStorage.getItem('session'))
let logedUserLocalS = JSON.parse(localStorage.getItem('session'))

/////////procura na array principal o usuario que está logado
let returUser = users.find((value) => {
    //////verifica se é sessão manter logado ou não
    if(logedUserSession) {
        return value.username === logedUserSession.username
    }
    else
    {
        return value.username === logedUserLocalS.username
    }
});

///////////////////////Faz o logout
buttonLogout.addEventListener('click', logout = () => {
    localStorage.getItem('session') ? localStorage.removeItem("session") : null
    sessionStorage.getItem('session') ? sessionStorage.removeItem("session") : null
    window.location.replace("login.html")
})

userButton.innerText = returUser.username

////////////////verifica qual é o IndexOf do usuario | utilizei o IndexOf como ID
let indexUser = users.findIndex((value) => {
    return value.username == returUser.username
});


///////adiciona os recados salvos em local Storage à pagina///////////
function listarRecados()
{
    let messagesHTML = ''
    for(let index in users[indexUser].messages) {

        messagesHTML +=`
        <tr>
        <th scope="row" class="scope">${index}</th>
        <td class="col-sm-2">${users[indexUser].messages[index].detail}</td>
        <td>${users[indexUser].messages[index].descript}</td>
        <td class="col-sm-2">
            <div class="d-grid gap-2 d-md-block center">
                <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editMessage(${index})">Editar</button>
                <button class="btn btn-danger" type="button" onclick="delMessage(${index})">Excluir</button>
            </div>
        </td>
        </tr>
        `
    }
    document.querySelector('tbody').innerHTML = messagesHTML
}
listarRecados()
/////////////////////////////////////////////////////////////////////

function addNewMessage(event) {
    /////pausa o submit do formulario
    event.preventDefault()
    ////verifica se os campos estão vazios
    if(inputDescript.value == '' || inputDetail.value == '')
    {
        alert('Não deixe nenhum campo vazio.')
        return
    }

    //////adiciona o novo recado
    let newMessage =
        {
            detail: inputDescript.value,
            descript: inputDetail.value
        }
    users[indexUser].messages.unshift(newMessage)//////////adiciona novo recado ao topo
    saveData()//////salva o novo recado
    listarRecados()
    event.target.reset()
    inputDescript.focus()
}

////////////////////Editar os valores dentro da array
function editToMessage(indexOf)
{
    users[indexUser].messages[indexOf].detail = editDetail.value
    users[indexUser].messages[indexOf].descript = editDescript.value
    console.log(users[indexUser].messages[indexOf])
    saveData()
    listarRecados()
}

//////////////Modificar textos, inputs, values do modal de edição///////////////
function editMessage(indexOf) {
    editSaveBtn.setAttribute('onclick', `editToMessage(${indexOf})`)
    titleModalEdit.innerText = `ID: ${indexOf} | ${users[indexUser].messages[indexOf].detail}`
    editDescript.value = users[indexUser].messages[indexOf].descript
    editDetail.value = users[indexUser].messages[indexOf].detail
    console.log(users[indexUser].messages[indexOf])
}

///////////////Remover recado
function delMessage(indexOf) {
    users[indexUser].messages.splice(indexOf, 1)
    saveData()////salva a array
    listarRecados()
}

///////Salva o array atual
function saveData()
{
    localStorage.setItem('users', JSON.stringify(users))//////salva o novo array
}

goTop.addEventListener('click', goForTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
})