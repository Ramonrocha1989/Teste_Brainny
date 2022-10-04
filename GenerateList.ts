import { faker } from '@faker-js/faker';
import fs from 'fs';

faker.locale = 'pt_BR'

let DataList = [];

function GenerateList(){
    const name = faker.name.findName();
    const birthDate = faker.date.birthdate({ min: 1910, max: 2006, mode: "year"});
    const gender = faker.name.gender();
    const lastPurchaseDate = faker.date.between('2010-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z')
    const lastPurchase = faker.random.numeric(2);

    return { name, birthDate, gender, lastPurchaseDate, lastPurchase };
}

for(let i = 0; i <= 1000; i++){
    DataList.push(GenerateList());
}

const dataJson = JSON.stringify(DataList);

fs.writeFile('data.json', dataJson, (err) => {
    if(err){
        console.log(err , "Erro");
    }
    else{
        console.log("Dados Gerados com Sucesso");
    }
})