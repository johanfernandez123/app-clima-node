require('dotenv').config();

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busqueda = require("./models/busquedas");

const main = async() => {
    console.clear();
    const busquedas = new Busqueda();

    let opt;


    do {
        console.clear();
         opt = await inquirerMenu();


         switch (opt) {
             case 1:

                //Mostrar mensaje
                const busqueda = await leerInput('Ciuda: ');
                
                //Buscar los lugares
                const lugares = await busquedas.ciudad(busqueda);
                
                //seleccionar lugar
                
                const id = await listarLugares(lugares);
                if(id === '0') continue;

                const lugarSelecionado = lugares.find(l => l.id === id) ;

                // Guardar en BD
                busquedas.agregarHistorial(lugarSelecionado.nombre)

                //Clima
              
                const climaCiudad = await busquedas.climaLugar(lugarSelecionado.lat,lugarSelecionado.lng)
                //mostrar resultados
                console.clear();
                console.log(`\n informacion de la ciudad \n`.green);
                console.log(`Ciudad:  `,lugarSelecionado.nombre.green);
                console.log(`Lag: `,lugarSelecionado.lat);
                console.log(`Lng: `,lugarSelecionado.lng);
                console.log(`Temperatura: `,climaCiudad.temp);
                console.log(`Maxima: `,climaCiudad.max);
                console.log(`Mainima: `,climaCiudad.min);
                console.log(`Como esta el clima: `,climaCiudad.desc.green);
            break;

            case 2:
            busquedas.historialCapitalizado.forEach((ciudad,i) => {
                const idx = `${i +1}.`.green
                console.log(`${idx} ${ciudad}`)
            });
            break;
         }
    
       if(opt !== 0) await pausa();
       
        
    } while (opt !== 0);

}

main();