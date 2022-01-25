//modulos externos
import chalk from 'chalk';
import inquirer from 'inquirer';

//modulos internos
import fs from 'fs';

operation();

function operation(){
    inquirer.prompt([{
            type:'list',
            name:'action',
            message:'O que deseja fazer?',
            choices:[
                'Criar conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
    }])
    .then((resp) => {
        switch(resp['action']){
            case 'Criar conta':
                creatAccount();
                break;
            case 'Consultar saldo':
                getAccountBalance()
                break;
            case 'Depositar':
                movimentarConta(true);
                break;
            case 'Sacar':
                movimentarConta(false)
                break;
            case 'Sair':
                console.log(chalk.bgBlue.black('Obrigado por utiilzar o Accounts'));
                process.exit();
                break;
            default:
                console.log('teste')
        }
        
    })
    .catch((err) => console.log(err));
}


function movimentarConta(entrada){
    inquirer.prompt([{
        name:'accountName',
        message:'Qual nome de conta deseja realizar a operação?'
    }])
    .then((resp) => {
        const accountName = resp['accountName'];
        if(!existsAccount(accountName)){
            return movimentarConta()
        }

        inquirer.prompt([{
            name: 'amount',
            message: `Digite o valor da operação.`
        }])
        .then((resp) =>{
            const amount = resp['amount'];
            realizarOperacao(accountName, amount, entrada)
        })
        .catch();
    })
    .catch()
}

function realizarOperacao(accountName, ammount, entrada){
    const account = getAccount(accountName);
    
    if(!ammount){
        console.log('Ocorreu um erro, tente novamente mais tarde.');
        return deposit();
    }

    if(entrada){
        account.balance = parseFloat(ammount) + parseFloat(account.balance);
    } else {
        if(parseFloat(ammount) > parseFloat(account.balance)){
            console.log(chalk.bgRed.black('Saldo insuficiente. Tente outro valor'))
            return movimentarConta(entrada);
        }
        account.balance = parseFloat(account.balance) - parseFloat(ammount);
    }

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(account), (err) => console.log(err))

    console.log(chalk.green(`Foi movimentado R$ ${ammount} na conta ${accountName}`));

    return operation();

}

function creatAccount(){
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
    console.log(chalk.green('Defina as configurações da sua conta a seguir.'))
    buildAccount();
}

function buildAccount(){
    inquirer.prompt([{
        name:'accountName',
        message: 'Digite um nome para a sua conta'
    }])
    .then((resp) =>{
        const accountName = resp['accountName'];
        console.log(accountName);

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(existsAccount(accountName)){
            console.log(chalk.bgRed.black('Esta conta ja existe'))
            buildAccount();
            return;
        }
        
        fs.writeFileSync(`accounts/${accountName}.json`, `{"balance":0}`, (err) => {console.log(err)})
        console.log(chalk.green('Parabéns sua conta foi criada!!!'));

        return operation();
    })
    .catch((err) => {console.log(err)});
}

function existsAccount(accountName){
    if(fs.existsSync(`accounts/${accountName}.json`)){
        return true;
    }
    console.log(chalk.bgRed.black('Esta conta não existe'))
    return false;
}

function getAccountBalance(){
    inquirer.prompt([{
        name:'accountName',
        message:'Qual nome de conta deseja consultar o saldo?'
    }])
    .then((resp) => {
        const accountName = resp['accountName'];
        if(!existsAccount(accountName)){
            return getAccountBalance()
        }
        const account = getAccount(accountName);

        console.log(chalk.bgBlue.black(`O saldo da sua conta é de: R$ ${account.balance}`))
        return operation();

    })
    .catch()
}

function getAccount(accountName){
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding:'utf8',
        flag:'r'
    });

    return JSON.parse(accountJson);
}