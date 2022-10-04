import prompt from "prompt-sync";
import fs from 'fs';
import { Client } from './ClassClient'

const data = fs.readFileSync('./data.json', 'utf-8');
const list: Client[] = JSON.parse(data);

let tec = prompt();
let option = -1;

while (option != 0) {
    console.log('+================================================================+');
    console.log('|                    TESTE BRAINNY                               |');
    console.log('|________________________________________________________________|');
    console.log('| 1. Listar pela inicial do nome                                 |');
    console.log('| 2. Padrão: "Cliente: NOME_DO_CLIENTE"                          |');
    console.log('| 3. Padrão: "Cliente INDEX: NOME_DO_CLIENTE"                    |');
    console.log('| 4. Total de registros por letra                                |');
    console.log('| 5. Nomes dos clientes                                          |');
    console.log('| 6. Primeiro nome dos clientes                                  |');
    console.log('| 7. Digite a letra para saber o primeiro nome dos clientes      |');
    console.log('| 8. Clientes maiores de 18 anos                                 |');
    console.log('| 9. Procura pelo nome                                           |');
    console.log('| 10. Total de vendas em R$                                      |');
    console.log('| 11. Clientes que não compram a mais de 1 ano                   |');
    console.log('| 12. Clientes com mais de 15 compras                            |');
    console.log('| 13. Adiciona cliente                                           |');
    console.log('| 0. Sair                                                        |');
    console.log('|________________________________________________________________|');

    option = parseInt(tec('Ecolha uma opção: '));

    switch (option) {
        case 1:
            const letterInitial = tec('Digite a letra para filtrar: ');
            getNameByInitial(letterInitial)
            break;
        case 2:
            listNames();
            break;
        case 3:
            listNamesWithIndex();
            break;
        case 4:
            const letter = tec('Digite a letra para saber o número total: ');
            search(letter)
            break;
        case 5:
            returnName();
            break;
        case 6:
            returnFirstName()
            break;
        case 7:
            const letterFirstName = tec('Digite a letra para saber o primeiro nome: ');
            returnFirstNameCaracter(letterFirstName)
            break;
        case 8:
            searchAdultUser()
            break
        case 9:
            const nameList = tec('Digite o nome que deseja procurar: ');
            nameInTheList(nameList)
            break
        case 10:
            salesAmount()
            break
        case 11:
            searchClient()
            break
        case 12:
            clientsMorePurchase();
            break
        case 13:
            const name = tec('Digite o nome: ');
            const data = tec('Digite de nascimento no formato yyyy-mm-dd: ');
            const gender = tec('Digite o gênero: ');
            const datalastpurchase = tec('Digite a data da ultima compra no formato yyyy-mm-dd: ');
            const countpurchase = tec('Digite quantidade de compra: ');
            inserir(name, data, gender, datalastpurchase, countpurchase)
            break
        default:
            break
    }


}

function getNameByInitial(character: string) {
    list.filter((client: Client) => {
        const search = character.toUpperCase().replace(new RegExp("/" + character + "/"), 'replacement')
        const firstName = client.name.split(" ");
        if (firstName[0].match(search)) {
            console.log(client);
        }
    })
}

function listNames() {
    list.map((i: Client) => console.log(`Cliente: ${i.name}`))
}

function listNamesWithIndex() {
    list.forEach((cliente: Client, index) => console.log(`Cliente ${index}: ${cliente.name}`))
}

function search(caracter: string) {
    var counter = 0;
    const counterNomes = list.reduce((previousValue, client: Client) => {
        const search = caracter.toUpperCase().replace(new RegExp("/" + caracter + "/"), 'replacement')
        const firstName = client.name.split(" ");
        if (firstName[0].match(search)) {
            counter++;
        }
        return counter
    }, {})
    console.log(`Total de Registros  é ${counterNomes}`);
}

function returnName() {
    list.map((i: Client) => console.log(i.name));
}

function returnFirstName() {
    list.filter((client: Client) => {
        var firstName = client.name.split(" ")
        console.log(firstName[0]);
    })
}

function returnFirstNameCaracter(caracter: string) {
    list.filter((client: Client) => {
        const search = caracter.toUpperCase().replace(new RegExp("/" + caracter + "/"), 'replacement')
        const firstName = client.name.split(" ");
        if (firstName[0].match(search)) {
            console.log(firstName[0]);
        }
    })
}

function searchAdultUser() {
    return list.filter((client: Client) => {
        const birthDate = new Date(client.birthDate).getTime();
        const today = new Date().getTime();
        const milissegundos = today - birthDate;
        const seconds = milissegundos / 1000;
        const minutes = seconds / 60;
        const hours = minutes / 60;
        const days = hours / 24;
        const months = days / 30;
        const years = months / 12;

        if (years >= 18) {
            console.log(`Cliente: ${client.name} tem ${Math.trunc(years)} anos de idade`)
        }
    })
}

function nameInTheList(caracter: string) {
    var message = '';
    const names = list.reduce((previousValue, client: Client) => {
        const search = caracter.replace(new RegExp("/" + caracter + "/"), 'replacement')
        const firstName = client.name.split(" ");
        if (firstName[0].match(search)) {
            message = `${caracter} está na lista`;
        }
        return message;
    }, {})
    if (names) {
        console.log(names);
    } else {
        console.log(`${caracter} não esta na lista`)
    }
}

function salesAmount(): ReturnType<any> {
    const totalValue = JSON.parse(data)?.reduce(
        (sum: number, e: any) => sum + parseInt(e?.lastPurchase),
        0,
    )
    console.log(`Total de vendas: R$${totalValue.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`);
}

function calculatelastPurchaseDate(lastPurchaseDateCliente: Date) {
    const data = new Date(lastPurchaseDateCliente);
    const todayDate = new Date();
    const todayYear = todayDate.getFullYear();
    const birthdayThisYear = new Date(data.getDay(), data.getMonth(), todayYear);
    var lastPurchaseDate = todayYear - data.getFullYear();

    if (birthdayThisYear > todayDate) {
        lastPurchaseDate--;
    }

    return lastPurchaseDate;
}

function searchClient() {
    list.filter((client: Client) => {
        const convertedDate = calculatelastPurchaseDate(client.lastPurchaseDate)
        if (convertedDate > 1) {
            console.log(`Cliente: ${client.name} está ${convertedDate} anos sem comprar`)
        }
    })
}

function clientsMorePurchase() {
    list.filter((client: Client) => {
        if ((client.lastPurchase) > 15) {
            console.log(`Cliente: ${client.name} ja realizou ${client.lastPurchase} compras`)
        }
    })
}


function inserir(name: string, birthDate: string, gender: string, lastPurchaseDate: string, countPurchase: string) {
    const client: Client = {
        name: name,
        birthDate: new Date(birthDate),
        gender: gender,
        lastPurchaseDate: new Date(lastPurchaseDate),
        countPurchase: countPurchase,
        lastPurchase: 1
    };
    list.unshift(client);
    console.log(`${client.name} foi adicionado a lista`)  
    console.log(list);
    
    
}






