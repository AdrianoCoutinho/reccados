////////////verifica se está logado e o tipo de login, se é permanecido ou não///////
if(!sessionStorage.getItem('session')){
    !localStorage.getItem('session') ? window.location.replace("login.html") : null
}

const newMessage = document.querySelector('#new-message')
const inputDescript = document.querySelector('#inputDescript')
const inputDetail = document.querySelector('#inputDetail')

const editSaveBtn = document.querySelector('#editSaveBtn')
const titleModalEdit = document.querySelector('#messageTitle')
const editDescript = document.querySelector('#editDescript')
const editDetail = document.querySelector('#editDetail')

const delSaveBtn = document.querySelector('#delSaveBtn')
const titleModalDel = document.querySelector('#messageTitleDel')
const delDescript = document.querySelector('#delDescript')
const delDetail = document.querySelector('#delDetail')

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
        <td class="text-break col-3">${users[indexUser].messages[index].detail}</td>
        <td class="text-break col-7">${users[indexUser].messages[index].descript}</td>
        <td class="col-2">
            <div class="d-grid gap-2 center">
                <button class="btn btn-rec btn-success" type="button" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editMessage(${index})">Editar</button>
                <button class="btn btn-rec btn-danger" type="button" data-bs-toggle="modal" data-bs-target="#delModal" onclick="delMessage(${index})">Excluir</button>
            </div>
        </td>
        </tr>
        `
    }
    document.querySelector('tbody').innerHTML = messagesHTML
}
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
    alertMessage('success','Novo recado adicionado')
    const alert = bootstrap.Alert.getOrCreateInstance('#alertInfo')
    setTimeout(closeAlert = () => {alert.close()}, 3500)
    users[indexUser].messages.unshift(newMessage)//////////adiciona novo recado ao topo
    saveData()//////salva o novo recado
    listarRecados()
    event.target.reset()
    inputDescript.focus()
}

//////////////Modificar textos, inputs, values do modal de edição///////////////
function editMessage(indexOf) {
    editSaveBtn.setAttribute('onclick', `editToMessage(${indexOf})`)
    titleModalEdit.innerText = `ID: ${indexOf} | ${users[indexUser].messages[indexOf].detail}`
    editDescript.value = users[indexUser].messages[indexOf].descript
    editDetail.value = users[indexUser].messages[indexOf].detail
}

////////////////////Editar os valores dentro da array
function editToMessage(indexOf)
{
    const editModal = document.getElementById('editModal')
    editModal.addEventListener('hidden.bs.modal', event => {
        alertMessage('warning','Recado editado.')
        const alert = bootstrap.Alert.getOrCreateInstance('#alertInfo')
        setTimeout(closeAlert = () => {alert.close()}, 3500)
    })
    users[indexUser].messages[indexOf].detail = editDetail.value
    users[indexUser].messages[indexOf].descript = editDescript.value
    users[indexUser].messages[indexOf]
    saveData()
    listarRecados()
}

function delMessage(indexOf) {
    delSaveBtn.setAttribute('onclick', `ConfirmdelMessage(${indexOf})`)
    titleModalDel.innerText = `ID: ${indexOf} | ${users[indexUser].messages[indexOf].detail}`
    delDescript.value = users[indexUser].messages[indexOf].descript
    delDetail.value = users[indexUser].messages[indexOf].detail
}

function alertMessage(type, message)
{
    const msgAlert = `
        <div class="alert alert-${type} text-uppercase alert-dismissible w-75 text-center" id="alertInfo" role="alert">
            <div>${message}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `
    document.querySelector('#alerts').innerHTML = msgAlert
}

///////////////Remover recado
function ConfirmdelMessage(indexOf) {
    const delModal = document.getElementById('delModal')
    delModal.addEventListener('hidden.bs.modal', event => {
        alertMessage('danger','Recado deletado.')
        const alert = bootstrap.Alert.getOrCreateInstance('#alertInfo')
        setTimeout(closeAlert = () => {alert.close()}, 3500)
    })
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

listarRecados()