////////////verifica se está logado e o tipo de login, se é permanecido ou não///////
sessionStorage.getItem('session') ? window.location.replace("home.html") : 
localStorage.getItem('session') ? window.location.replace("home.html") : null

const formRegister = document.querySelector('#register')
const formLogin = document.querySelector('#login')
const inputUser = document.querySelector('#inputUser')
const inputPass = document.querySelector('#inputPass')
const cotinueLogin = document.querySelector('#cotinueLogin')
const inputRePass = document.querySelector('#inputRePass')
const inputRePass2 = document.querySelector('#asdasasda')
const spanError = document.querySelector('.gap-2')

////verifica se está na pagina de registro e pega o evento submit do formulario
formRegister ? formRegister.addEventListener('submit', register) : null
function register(event) {
    /////pausa o submit do formulario
    event.preventDefault()
    ////verifica se os campos estão vazios
    if(inputUser.value == '' || inputPass.value == '')
    {
        let errorMsg = `<span class="text-center erro">Não deixe os campos senha e usuário vazios.</span>
        <button class="btn btn-submit" type="submit">Cadastrar</button>`
        spanError.innerHTML = errorMsg
        return
    }
    /////verifica se repetiu as senhas corretamente
    if(inputPass.value != inputRePass.value)
    {
        let errorMsg = `<span class="text-center erro">As senhas não correspondem.</span>
        <button class="btn btn-submit" type="submit">Cadastrar</button>`
        spanError.innerHTML = errorMsg
        return
    }

    if(inputPass.value.length < 6)
    {
        let errorMsg = `<span class="text-center erro">Digite pelo menos 6 caracteres.</span>
        <button class="btn btn-submit" type="submit">Cadastrar</button>`
        spanError.innerHTML = errorMsg
        return
    }
    ///verifica se já existe uma array salva,
    ///se não tiver cria uma com o usuario atual como primeiro object
    if(!localStorage.getItem('users'))
    {
        let users = [
            {
                username: inputUser.value.toLowerCase(),
                password: inputPass.value,
                messages:
                    [
                        {
                            detail: 'Primeiro recado',
                            descript: 'este é seu primeiro recado, adicione um novo utilizando os campos acima e edite ou apague os existentes com os botões de ação ao lado.'
                        }
                    ]
            }
        ]
        localStorage.setItem('users', JSON.stringify(users))
        window.location.replace("login.html")///////Redireciona para pagina de login
    }
    else
    {
        ////faz um filter para ver se já existe o username
        let users = JSON.parse(localStorage.getItem('users'))
        let retorno = users.find((value) => {
            return value.username === inputUser.value.toLowerCase()
        });
        ////se existir ele barra
        if(retorno) {
            let errorMsg = `<span class="text-center erro">Este usuário já existe.</span>
            <button class="btn btn-submit" type="submit">Cadastrar</button>`
            spanError.innerHTML = errorMsg
            return
        }
        else
        {
            /////se não existir cria um novo usuario
            let newuser =
                {
                    username: inputUser.value.toLowerCase(),
                    password: inputPass.value,
                    messages:
                    [
                        {
                            detail: 'Primeiro recado',
                            descript: 'este é seu primeiro recado, adicione um novo utilizando os campos acima e edite ou apague os existentes com os botões de ação ao lado.'
                        }
                    ]
                }
            users.push(newuser)
            localStorage.setItem('users', JSON.stringify(users))
            window.location.replace("login.html")///////Redireciona para pagina de login
        }
    }
    
}


////////////////////////LOGIN//////////////////////////////////////
/////verifica se está na pagina de login e pega evento de submit do formulario de login
formLogin ? formLogin.addEventListener('submit', login) : null
function login(event) {
    /////pausa o submit do formulario
    event.preventDefault()
    ////verifica se os campos estão vazios
    if(inputUser.value == '' || inputPass.value == '')
    {
        let errorMsg = `<span class="text-center erro">Não deixe os campos senha e usuário vazios.</span>
        <button class="btn btn-submit" type="submit">Cadastrar</button>`
        spanError.innerHTML = errorMsg
        return
    }
    ///verifica se já existe uma array salva,
    if(!localStorage.getItem('users'))
    {
        let errorMsg = `<span class="text-center erro">Usuario ou senha incorretos.</span>
        <button class="btn btn-submit" type="submit">Cadastrar</button>`
        spanError.innerHTML = errorMsg
        return
    }
    else
    {
        ////faz um filter para verificar se nome de usuario existe
        let users = JSON.parse(localStorage.getItem('users'))
        let retorno = users.find((value) => {
            return value.username === inputUser.value.toLowerCase()
        });
        ////se existir faz login
        if(retorno) {
            if(inputPass.value === retorno.password) {
                //////Objeto para criar sessão e saber quem está logado
                let sessionObjectUser = {
                    username: retorno.username,
                    password: retorno.password
                }
                /////criando sessão para verificar quem está logado para definir quais recados serão exibidos
                if(cotinueLogin.checked) localStorage.setItem('session', JSON.stringify(sessionObjectUser))
                sessionStorage.setItem('session', JSON.stringify(sessionObjectUser))
                window.location.replace("home.html")///////Redireciona para pagina de recados
            }
            else
            {
                let errorMsg = `<span class="text-center erro">Usuario ou senha incorretos.</span>
                <button class="btn btn-submit" type="submit">Cadastrar</button>`
                spanError.innerHTML = errorMsg
                return
            }
        }
        else
        {
            let errorMsg = `<span class="text-center erro">Usuario ou senha incorretos.</span>
            <button class="btn btn-submit" type="submit">Cadastrar</button>`
            spanError.innerHTML = errorMsg
            return
        }
    }
}
////////////////////////////////////////////////////////////////////