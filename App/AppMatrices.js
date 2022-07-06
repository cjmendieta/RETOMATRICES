//Listamos los archivos del directorio
const fs = require("fs");
let filenames = fs.readdirSync('Input');
filenames.forEach((file) => {
    let rutaarchivo = `Input/${file}`;
    leerArchivo(rutaarchivo);
});

function leerArchivo(nombrearchivo) {
    // validamos que exista el archivo
    fs.stat(nombrearchivo, function(error) {
        if (error) {
          console.log("El archivo no existe");
          throw error;
        } 
      });

      //Leemos el archivo
    fs.readFile(nombrearchivo, 'utf8', (error, datos) => {
        if (error) throw error;

        //Generamos la matriz con los datos del archivo
        let matriz = datos.split('\n').map(x => {
            return x.replace('\r', '').split(',').map(x => {
                return x.trim();
            });
        });

        //Recorremos la matriz
        let subcadenasencontradas = [];
        for (let row = 0; row < matriz.length; row++) {
            for (var col = 0; col < matriz[row].length; col++) {

                //busqueda horizontal
                const subcadenah = buscarcadenamatriz(row, col, matriz[row][col], 'horizontal');
                if (subcadenah.length > 1) {
                    subcadenasencontradas.push(subcadenah);
                }
                //busqueda vertical
                const subcadenav = buscarcadenamatriz(row, col, matriz[row][col], 'vertical');
                if (subcadenav.length > 1) {
                    subcadenasencontradas.push(subcadenav);
                }
                //busqueda diagonal derecha
                const subcadena = buscarcadenamatriz(row, col, matriz[row][col], 'diagonalderecha');
                if (subcadena.length > 1) {
                    subcadenasencontradas.push(subcadena);
                }

                //busqueda diagonal izquierda
                const subcadenadi = buscarcadenamatriz(row, col, matriz[row][col], 'diagonalizquierda');
                if (subcadenadi.length > 1) {
                    subcadenasencontradas.push(subcadenadi);
                }
            }
        }
    
        function buscarcadenamatriz(row, col, valor, tipobusqueda, concidencia = false) {
            let cadenaencontrada = '';
            let x, y = 0;
            if (tipobusqueda === 'horizontal') {
                x = row;
                y = col + 1;
            }
            if (tipobusqueda === 'vertical') {
                x = row + 1;
                y = col;
            }
            if (tipobusqueda === 'diagonalderecha') {
                x = row + 1;
                y = col + 1;
            }
            if (tipobusqueda === 'diagonalizquierda') {
                x = row - 1;
                y = col + 1;
            }
            if (x >= 0 && y >= 0 && x < matriz.length && y < matriz.length) {
                if (matriz[x][y] == valor) {
                    if (!concidencia) {
                        cadenaencontrada = valor + matriz[x][y];
                        concidencia = true;
                    } else {
                        cadenaencontrada += matriz[x][y];
                    }
                    cadenaencontrada += buscarcadenamatriz(x, y, valor, tipobusqueda, concidencia);
                }
            }
            return cadenaencontrada;
        };
        
        //Impresion de resultados
        console.log("====================================================================================");
        console.log("Archivo leido: ", nombrearchivo);
        const cadenasordenadas = subcadenasencontradas.sort((x,y) => y.length - x.length);
        const cadenasmaslargas = cadenasordenadas.filter(item => item.length === cadenasordenadas[0].length);
        console.log('De la siguiente matris: ');
        console.log(datos);
        if(cadenasmaslargas.length > 1){
            console.log('Estas son las cadenas mas largas: ');
            cadenasmaslargas.forEach(cadena => console.log(cadena));
        }else{
            console.log('Esta es la cadena mas larga: ', cadenasmaslargas[0]);
        }

    });
}
