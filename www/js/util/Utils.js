var DELIMITADOR_DATA_SQL = '-';
var DELIMITADOR_DATA = '/';


function gerarHash() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
}

function formatarDateToDateSQL(data) {
    if (data == null || data == undefined || data == "") {
        return "";
    }

    if (typeof data === "string")
        return data;

    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();

    if (("" + mes).length < 2)
        mes = '0' + mes;
    if (("" + dia).length < 2)
        dia = '0' + dia;

    return ano + DELIMITADOR_DATA_SQL + mes + DELIMITADOR_DATA_SQL + dia;
}

function formatarDateToString(data, delimitador) {
    if (data == null || data == undefined || data == "") {
        return "";
    }

    if (typeof data === "string")
        return data;

    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();

    if (("" + mes).length < 2)
        mes = '0' + mes;
    if (("" + dia).length < 2)
        dia = '0' + dia;

    // var result = null;

    if (delimitador === DELIMITADOR_DATA_SQL)
        return ano + delimitador + mes + delimitador + dia;
    else
        return dia + delimitador + mes + delimitador + ano;

}

function formatarDatetimeToString(dataHora, delimitador) {
    if (dataHora == null || dataHora == undefined || dataHora == "") {
        return "";
    }

    if (typeof dataHora === "string")
        return dataHora;

    var dia = dataHora.getDate();
    var mes = dataHora.getMonth() + 1;
    var ano = dataHora.getFullYear();

    if (("" + mes).length < 2)
        mes = '0' + mes;
    if (("" + dia).length < 2)
        dia = '0' + dia;

    var hora = dataHora.getHours();
    var minutos = dataHora.getMinutes();

    if (("" + hora).length < 2)
        hora = '0' + hora;
    if (("" + minutos).length < 2)
        minutos = '0' + minutos;

    if (delimitador === DELIMITADOR_DATA_SQL)
        return ano + delimitador + mes + delimitador + dia + " " + hora + ":" + minutos;
    else
        return dia + delimitador + mes + delimitador + ano + " " + hora + ":" + minutos;

}

function formatarHourToString(hora) {
    if (isEmpty(hora)) {
        return "";
    }

    if (typeof hora === "string")
        return hora;

    var h = hora.getHours();
    var minutos = hora.getMinutes();

    if (("" + h).length < 2)
        h = '0' + h;
    if (("" + minutos).length < 2)
        minutos = '0' + minutos;

    return h + ":" + minutos;
}

function converterStringToDate(data, delimitador) {
    if (isEmpty(data)) {
        return "";
    }
    var split = data.split(delimitador);
    var objetoDate = null;

    if (delimitador === DELIMITADOR_DATA_SQL)
        objetoDate = new Date(parseInt(split[0]), parseInt(split[1]) - 1, parseInt(split[2]));
    else
        objetoDate = new Date(parseInt(split[2]), parseInt(split[1]) - 1, parseInt(split[0]));

    return objetoDate;
}

function converterStringToDateUTC(data, delimitador) {
    if (isEmpty(data)) {
        return "";
    }
    var split = data.split(delimitador);
    var objetoDate = null;

    if (delimitador === DELIMITADOR_DATA_SQL)
        objetoDate = new Date(Date.UTC(parseInt(split[0]), parseInt(split[1]) - 1, parseInt(split[2])));
    else
        objetoDate = new Date(Date.UTC(parseInt(split[2]), parseInt(split[1]) - 1, parseInt(split[0])));

    return objetoDate;
}

/**
 * 
 * formato da data : "2010-01-12 01:02"
 * @param {type} dataHora
 * @param {type} delimitador
 * @returns {undefined}
 */
function converterStringToDatetime(dataHora, delimitador) {

    if (isEmpty(dataHora)) {
        return "";
    }

    var splitData = dataHora.substring(0, 10).split(delimitador);
    var splitHora = dataHora.substring(11, 16).split(':');

    //  var d = converterStringToDate(dataHora.substring(0, 10));
    var objetoDate = new Date(Date.UTC(parseInt(splitData[0]), parseInt(splitData[1]) - 1, parseInt(splitData[2])));
    objetoDate.setHours(parseInt(splitHora[0]));
    objetoDate.setMinutes(parseInt(splitHora[1]));
    objetoDate.setSeconds(0);

    return new Date(objetoDate.getUTCFullYear(), objetoDate.getUTCMonth(), objetoDate.getUTCDate(), objetoDate.getHours(), objetoDate.getMinutes(), objetoDate.getSeconds());
    //return objetoDate;
}

function obterDiaSemanaPorExtenso(data, delimitador) {
    if (data == null || data == undefined || data == "") {
        return "";
    }

    var diaSemana = [
        "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"
    ];
    var _data = null;
    if (typeof data === 'string') {
        _data = converterStringToDateUTC(data, delimitador);
    }

    return diaSemana[ _data.getDay() ];
}

function obterMesPorExtenso(data, delimitador) {
    if (data == null || data == undefined || data == "") {
        return "";
    }

    var meses = [
        "Janeiro", "Fevereiro", "Março",
        "Abril", "Maio", "Junho", "Julho",
        "Agosto", "Setembro", "Outubro",
        "Novembro", "Dezembro"
    ];
    var _data = data.split(delimitador);

    return meses[parseInt(_data[1]) - 1];
}

function obterDataPorExtenso(data, delimitador) {
    var dataOriginal = angular.copy(data);
    if (isEmpty(data)) {
        return "";
    }

    if (typeof data !== 'string') {
        data = formatarDateToString(data, delimitador);
    }
    var splitData = data.split(delimitador);

    var diaData = null;
    if (delimitador === DELIMITADOR_DATA_SQL)
        diaData = splitData[2];
    else
        diaData = splitData[0];

    return obterDiaSemanaPorExtenso(data, delimitador) + ", " + diaData + ' de ' + obterMesPorExtenso(data, delimitador);
}

function isEmailInvalido(email) {
    if (email === null)
        return true;

    var str = email;
    var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (filtro.test(str)) {
        return false;
    } else {
        return true;
    }
}

function formatarTextoPrimeriaLetraMaiuscula(texto) {
    return texto.replace(/(^|\s)[a-z]/g, function (f) {
        return f.toUpperCase();
    });
}

function isEmpty(val) {
    return (val === undefined || val === 'undefined' || val == null || val.length <= 0 || (!val)) ? true : false;
}

function isNotEmpty(val) {
    return !(val === undefined || val === 'undefined' || val == null || val.length <= 0 || (!val)) ? true : false;
}

function toString(val) {
    return (val === undefined || val === 'undefined' || val == null || val.length <= 0 || (!val)) ? "" : new String(val).toString();
}

function toNull(val) {
    return (val === undefined || val === 'undefined' || val == null || val.length <= 0 || (!val)) ? null : val;
}

function toNumber(val) {
    return (val === undefined || val === 'undefined' || val == null || val.length <= 0 || (!val)) ? 0 : val;
}

function isCpfValido(cpf) {

    isValido = true;

    if (cpf.length == 0) {
        return isValido
    } else {
        var cpf = cpf.replace(/\D/g, '');

        if (cpf.length <= 11) {

            // Elimina CPFs invalidos conhecidos
            if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") {
                isValido = false;
            }

            // Valida 1o digito
            add = 0;
            for (i = 0; i < 9; i++) {
                add += parseInt(cpf.charAt(i)) * (10 - i);
            }

            rev = 11 - (add % 11);

            if (rev == 10 || rev == 11) {
                rev = 0;
            }

            if (rev != parseInt(cpf.charAt(9))) {
                isValido = false;
            }

            // Valida 2o digito
            add = 0;
            for (i = 0; i < 10; i++) {
                add += parseInt(cpf.charAt(i)) * (11 - i);
            }

            rev = 11 - (add % 11);

            if (rev == 10 || rev == 11) {
                rev = 0;
            }

            if (rev != parseInt(cpf.charAt(10))) {
                isValido = false;
            }

            return isValido;

        }
    }
}


function isDataValida(cData) {
    var data = cData;
    var tam = data.length;
    if (tam != 10) {
        return false;
    }
    var dia = data.substr(0, 2);
    var mes = data.substr(3, 2);
    var ano = data.substr(6, 4);

    if (ano < 1980) {
        return false;
    }
    if (ano > 2050) {
        return false;
    }

    switch (mes) {
        case '01':
            if (dia <= 31)
                return (true);
            break;
        case '02':
            if (dia <= 29)
                return (true);
            break;
        case '03':
            if (dia <= 31)
                return (true);
            break;
        case '04':
            if (dia <= 30)
                return (true);
            break;
        case '05':
            if (dia <= 31)
                return (true);
            break;
        case '06':
            if (dia <= 30)
                return (true);
            break;
        case '07':
            if (dia <= 31)
                return (true);
            break;
        case '08':
            if (dia <= 31)
                return (true);
            break;
        case '09':
            if (dia <= 30)
                return (true);
            break;
        case '10':
            if (dia <= 31)
                return (true);
            break;
        case '11':
            if (dia <= 30)
                return (true);
            break;
        case '12':
            if (dia <= 31)
                return (true);
            break;
    }
    {
        return false;
    }
    return true;
}

function calcularAnoNascimento(idade) {
    return moment(new Date()).subtract(idade, "years").format("YYYY");
}

function calcularIdade(dataNascimento) {
    // dataNascimento = "1983-04-02";
    if (isEmpty(dataNascimento))
        return "";
    
    var data = dataNascimento;
    var split = dataNascimento.split('/');
    if (split.length == 3){
        data = split[2]+"-"+split[1]+"-"+split[0];
    }
    
    return Math.floor(moment(new Date()).diff(moment(data), 'years', true));
}

function diferencaEntreDatas(dataIni, dataFim){
    
    var timeDiff = Math.abs(dataFim.getTime() - dataIni.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
}

function converterEmNumeros(valorStr) {
    var str = new String(valorStr);
    
    if (isEmpty(str))
        return "";
    
   if (str === parseInt(new String(str), 10))
        return str;
    
    return parseInt(str.replace(/[\D]+/g, ''));
}

function formatarValorMonetario(valor){
    var vl = 0;
    
    if (typeof valor === "string")
        vl = converterEmNumeros(valor);
        
    if (!isEmpty(vl))
        return vl.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    return;
}

function obterValorSobrePorcentagem(valorRenda, percentual){
    var renda = 0;
    var porcentagem = 0;
    
    if (typeof valorRenda === 'string') 
        renda = parseFloat(valorRenda.replace(",","."));
    else
        renda = valorRenda;
    
     if (typeof percentual === 'string') 
        porcentagem = parseFloat(percentual.replace(",","."));
    else
        porcentagem = percentual;
    
    return ((renda * porcentagem)/100);
}

function obterNumeroAbsoluto(numero){
    if (numero < 0)
        return numero*-1;
    return numero;
}

function obterAgregadosFilter(value, index) {
    var valid = true;
    if ((parseInt(value.parentesco) == 6 || parseInt(value.parentesco) == 7) 
            && (parseInt(value.idade) <= 24)) { // Filho e Filha
        valid = false;
    }
    value.habilitado = true;
    return valid;
}

function obterFilhosAte24AnosFilter(value, index) {
    var valid = false;
    if ((parseInt(value.parentesco) == 6 || parseInt(value.parentesco) == 7) 
            && (parseInt(value.idade) <= 24)) { // Filho e Filha
        valid = true;
        value.habilitado = true;
    }
    
    return valid;
}

function obterFilhosAte14AnosFilter(value, index) {
    var valid = false;
    if ((parseInt(value.parentesco) == 6 || parseInt(value.parentesco) == 7) 
            && (parseInt(value.idade) <= 14)) { // Filho e Filha
        valid = true;
        value.habilitado = true;
    }
    
    return valid;
}

function obterValorRenda(faixaDeRenda, porcentagemTotalUsar){
    
    try {
        return FaixaDeRendaEnum.properties[faixaDeRenda].renda;
        
    }catch(erro){
        // Opção não quis informar, usa o valor (pergunta 7)
        // acha o valor da renda
        return eval(100 * faixaDeRenda / porcentagemTotalUsar);
    }
    
}

function diferencaHoras(horaInicial, horaFinal) {
 
    s = horaInicial.split(':');
    e = horaFinal.split(':');

    min = e[1]-s[1];
    hour_carry = 0;
    if(min < 0){
        min += 60;
        hour_carry += 1;
    }
    hour = e[0]-s[0]-hour_carry;
    
    if (("" + hour).length < 2)
        hour = '0' + hour;
    if (("" + min).length < 2)
        min = '0' + min;
    
    diff = hour + ":" + min;

    return diff;
}

