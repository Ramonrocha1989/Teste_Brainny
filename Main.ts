import prompt from "prompt-sync";
import fs from 'fs';
import { Client } from './ClassClient'

const data = fs.readFileSync('./data.json', 'utf-8');
const list: [] = JSON.parse(data);

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
    console.log(counterNomes);
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