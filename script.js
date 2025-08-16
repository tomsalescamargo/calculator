const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]


//BOTÕES

document.querySelectorAll('.charKey').forEach(function(charKeyBtn){   
    //Seleciona todos os botões, e usa o método forEach para aplicar a função em todos os botões


    charKeyBtn.addEventListener("click" , function() {

        const value = charKeyBtn.dataset.value    //Pegar o data-value de cada botão
        input.value = input.value + value         // Adiciona o data-value no input
    })
})


//BOTÃO CLEAR

document.getElementById("clear").addEventListener("click" , function() {

    input.value = ""
    input.focus()   // focar no input
})


//BOTÃO IGUAL

document.getElementById("equal").addEventListener("click" , function(ev) {

    calculate()

    const button = document.getElementById("copyToClipboard")
    button.innerText = "Copy"
    button.classList.remove("success")
})


//TECLADO

input.addEventListener("keydown" , function(ev) {

    ev.preventDefault()
    if (allowedKeys.includes(ev.key)) {     //ev.key = tecla associada ao evento(tecla que o usuário pressionou)
        input.value = input.value + ev.key
        return
    }

    if (ev.key === "Backspace") {
        input.value = input.value.slice(0 , -1) // Corta a string , pega da posição 0 até o último caractere da string(que não é incluso no slice)
    }

    if (ev.key === "Enter") {
        calculate()
    }
})


//FUNÇÃO PARA CALCULAR

function calculate() {

    resultInput.value = 'ERROR'
    resultInput.classList.add("error") //Caso o eval não dê certo, é o que fica na página

    const result = eval(input.value)   
    resultInput.value = result
    resultInput.classList.remove("error")
    
    // avaliar o parâmetro e roda o código JavaScript do parâmetro
    // pode passar uma string com código JavaScript válido para ser executada

    /*No caso dessa calculadora, o método eval é uma boa alternativa, pois há uma restrição
    no que pode ou não ser escrito no input. Porém deve-se tomar muito cuidado utilizando esse método,
    pois pode ser executado qualquer tipo de código JavaScript, podendo comprometer alguma informação
    sensível da página*/
}


//BOTÃO COPY

document.getElementById("copyToClipboard").addEventListener('click' , function(ev){

    const button = ev.currentTarget
    if (button.innerText === "Copy") {
        button.innerText = "Copied!"
        button.classList.add("success")  //atribuir uma classe success(já definida no css) , para o estilo ser alterado

        navigator.clipboard.writeText(resultInput.value) //navigator: propriedade do window  
        //navigator escreve o texto na área de transferência
    } else{
        button.innerText = "Copy"
        button.classList.remove("success")
    }
})


// MUDAR TEMA

document.getElementById("themeSwitcher").addEventListener("click" , function() {

    if (main.dataset.theme === "dark") {    //se o data-theme for dark , trocará para:

        root.style.setProperty('--bg-color' , '#f1f5f9')    // propriedade / valor
        root.style.setProperty('--border-color' , '#aaa')
        root.style.setProperty('--font-color' , '#212529')
        root.style.setProperty('--primary-color' , '#26834a')
        main.dataset.theme = "light"
    } else{
        root.style.setProperty('--bg-color' , '#212529')
        root.style.setProperty('--border-color' , '#666')
        root.style.setProperty('--font-color' , '#f1f5f9')
        root.style.setProperty('--primary-color' , '#4dff91')
        main.dataset.theme = "dark"
    }
})





