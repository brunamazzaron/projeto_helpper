//criando um array
var dados = []

//edição e excluisão
function ApagaRegistro(id){
    let _confirm = confirm("Você quer excluir?")

    if(_confirm){
        for(let i = 0; i < dados.length; i++)
        if(dados[i].ID == id){
            dados.splice(i,1)
        }
    }

    PopulaTabela()
}

function EditarRegistro(id){
    $("#modalRegistro").modal("show")

    dados.forEach(function(item){
        if(item.ID == id){
            $("#hdID").val(item.ID)
            $("#nome").val(item.nome)
            $("#email").val(item.email)
            $("#telefone").val(item.telefone)
            $("#cpf").val(item.cpf)
            $("#cep").val(item.cep)
            $("#logradouro").val(item.logradouro)
            $("#numero").val(item.numero)
            $("#bairro").val(item.bairro)
            $("#cidade").val(item.cidade)
            $("#estado").val(item.estado)
        }
    })
}

function PopulaTabela(){
    if(Array.isArray(dados)){

        //transformar em texto
        localStorage.setItem("__dados__", JSON.stringify(dados))

        $("#tblDados tbody").html("")
        
        dados.forEach(function(item){
            //template string ``
            $("#tblDados tbody").append(`<tr>
                <td>${item.ID}</td>
                <td>${item.nome}</td>
                <td>${item.email}</td>
                <td>${item.telefone}</td>
                <td>${item.cpf}</td>
                <td>${item.cep}</td>
                <td>${item.logradouro}</td>
                <td>${item.numero}</td>
                <td>${item.bairro}</td>
                <td>${item.cidade}</td>
                <td>${item.estado}</td>
                <td><button type="button" class="btn btn-editar btn-primary"><i class="far fa-edit" onclick="javascript: EditarRegistro(${item.ID})"></i></button></td>
                <td><button type="button" class="btn btn-dark"><i class="far fa-trash-alt" onclick="javascript: ApagaRegistro(${item.ID})"></button></td>
            </tr>`)
        })
    }
};

$(function() {
    //Executa ao carregar o brownser
    dados = JSON.parse(localStorage.getItem("__dados__")) || []

    if(dados){
        PopulaTabela()
    }

    $("#btnSalvar").click(function() {
        //Evento click do botão salvar

        let _id = $("#hdID").val()
        let nome = $("#nome").val()
        let email = $("#email").val()
        let telefone = $("#telefone").val()
        let cpf = $("#cpf").val()
        let cep = $("#cep").val()
        let logradouro = $("#logradouro").val()
        let numero = $("#numero").val()
        let bairro = $("#bairro").val()
        let cidade = $("#cidade").val()
        let estado = $("#estado").val()

        let registro = {}

        registro.nome = nome
        registro.email = email
        registro.telefone = telefone
        registro.cpf = cpf
        registro.cep = cep
        registro.logradouro = logradouro
        registro.numero = numero
        registro.bairro = bairro
        registro.cidade = cidade
        registro.estado = estado

        if(!_id || _id == "0"){
            if(dados.length == "0"){
                registro.ID = 1
            }else{
                registro.ID = dados[dados.length - 1].ID + 1
            }
            //Armazenar o conteudo
            dados.push(registro)
        }else{
            dados.forEach(function(item){
                if (item.ID == _id){
                    item.nome = nome
                    item.email = email
                    item.telefone = telefone
                    item.cpf = cpf
                    item.cep = cep
                    item.logradouro = logradouro
                    item.numero = numero
                    item.bairro = bairro
                    item.cidade = cidade
                    item.estado = estado
                }
            })
        }


        alert("Registro salvo!")
        //fechar a tabela
        $("#modalRegistro").modal("hide")

        //limpar os campos
        $("#hdID").val("0")
        $("#nome").val("")
        $("#email").val("")
        $("#cpf").val("")
        $("#telefone").val("")
        $("#cpf").val("")
        $("#cep").val("")
        $("#logradouro").val("")
        $("#numero").val("")
        $("#cidade").val("")
        $("#estado").val("")

        PopulaTabela()
    })
})