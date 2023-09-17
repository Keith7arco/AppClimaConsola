import inquirer from 'inquirer'
import colors from 'colors';

const questions=[
    {
        type:'list',
        name:'opcion',
        message:'¿Que desea hacer?',
        choices: [
            {
                value:1,
                name:`${' 1. '.blue}Buscar Ciudad.`
            },
            {
                value:2,
                name:`${' 2. '.blue}Historial.`
            },
            {
                value:0,
                name:`${' 0. '.blue}Salir.\n`
            }
        ]
    }
];


const inquirerMenu = async()=>{
    
    console.clear();
    console.log('========================'.white);
    console.log(' Seleccione una Opcion'.yellow);
    console.log('========================\n'.white);

    //Desestructuracion del objeto
    const { opcion }=await inquirer.prompt(questions);
    return opcion;
}

const pausa = async()=>{

    const question=[
        {
            type:'input',
            name:'enter',
            message:`Presione ${'ENTER'.yellow} para continuar`
        }
    ]

    await inquirer.prompt(question);
}

const leerInput= async(message)=>{
    const question=[
        {
            type:'input',
            name:'desc',
            message,
            validate(value){
                if(value.length===0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]
    const { desc } =await inquirer.prompt(question);
    return desc;
}

const listarLugares = async(lugares = [])=>{
    //MAP retorna un nuevo arreglo pero transformandolo a hijos,osea a lo que quiero.
    const choices= lugares.map( (lugar,i) =>{
        const idx = `${i+1}.`.yellow;
        //Configurandolo como lo quiero mapear.
        return {
            value:lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value:'0',
        name:'0.'.red + ' Cancelar'
    });

    const preguntas = [
        {
            type:'list',
            name:'id',
            message:'Seleccione el lugar.',
            choices
        }
    ]
    const { id }=await inquirer.prompt(preguntas);
    return id;
}

const confirmar=async(message)=>{
    const pregunta = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarCheckList = async(tareas = [])=>{
    //MAP retorna un nuevo arreglo pero transformandolo a hijos,osea a lo que quiero.
    const choices= tareas.map( (tarea,i) =>{
        const idx = `${i+1}.`.green;
        //Configurandolo como lo quiero mapear.
        return {
            value:tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked:(tarea.completadoEn)? true:false
        }
    });

    const pregunta = [
        {
            type:'checkbox',
            name:'ids',
            message:'Selecciones',
            choices
        }
    ]
    const { ids }=await inquirer.prompt(pregunta);
    return ids;
}




export {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarCheckList
}