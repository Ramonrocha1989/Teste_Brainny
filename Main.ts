import prompt from "prompt-sync";
import fs from 'fs';
import { Client } from './ClassClient'

const data = fs.readFileSync('./data.json', 'utf-8');
const list: [] = JSON.parse(data);

let tec = prompt();
let option = -1;

while (option != 9) {
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
    console.log('| 9. Sair                                                        |');
    console.log('|________________________________________________________________|');

    option = parseInt(tec('Ecolha uma opção: '));

    switch (option) {
        case 1:
            const letterInitial = tec('Digite a letra para filtrar: ');
            getNameByInitial(letterInitial)
            break;
        case 2:

            break;
        case 3:

            break;
        case 4:

            break;
        case 5:

            break;
        case 6:

            break;
        case 7:

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