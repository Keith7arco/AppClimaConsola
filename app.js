import { 
    inquirerMenu, 
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarCheckList
} from './helpers/inquirer.js';
import dotenv from 'dotenv'
import { Busquedas } from './models/busqueda.js';


//GUARDO COMO VARIBLE DE ENTORNO EL KEY DE LA API
dotenv.config()

const main = async ()=>{
    const busquedas= new Busquedas();
    let opt;
    do{
        opt=await inquirerMenu();
        switch(opt){
            case 1:
                //Ingresar Lugar
                const termino=await leerInput('Ciudad: ');
                //Buscar Ciudad
                const lugares=await busquedas.ciudad(termino);
                //Seleccionar Lugar
                const id = await listarLugares(lugares);
                if(id==='0')continue;

                //Guardar DB
                const lugarSel = lugares.find(l=>l.id===id)
                busquedas.agregarHistorial(lugarSel.nombre);
                //Clima
                const climaLugar = await busquedas.climaLugar(lugarSel.lat,lugarSel.lon)
                //RESULTADOS
                console.log('\nInformacion de la ciudad\n'.red);
                console.log('Ciudad: ',lugarSel.nombre);
                console.log('Latitud: ',lugarSel.lat);
                console.log('Longitud: ',lugarSel.lon);
                console.log('Temperatura: ',climaLugar.temp);
                console.log('Minima: ',climaLugar.min);
                console.log('Maxima: ',climaLugar.max);
                console.log('Descripcion: ',climaLugar.desc);
            break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar,i)=>{
                    const idx = `${i + 1}.`.red;
                    console.log(`${idx} ${lugar} `);
                })
            break;

        }
        console.log('\n');
        if(opt!==0)await pausa();
    }while(opt!==0)

}   
main();