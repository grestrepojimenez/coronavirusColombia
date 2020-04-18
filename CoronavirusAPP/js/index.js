let dataCoronavirus = dataExport

// fetch(
//         'https://www.datos.gov.co/resource/gt2j-8ykr.json?$limit=5000', {
//             method: 'GET',
//         })
//     .then((response) => {
//         return response.json();
//     })
//     .then((myJson) => {
//         data = myJson;
//         showData(myJson);
//     })
//     .catch((err) => {
//         console.log(err);
//     });



let showData = function(dataCoronavirus) {

    /* Tomar datos y ponerlos en html */
    document.getElementById('total').append(dataCoronavirus.length);
    document.getElementById('hombres').append(dataCoronavirus.filter(({ sexo }) => sexo == 'M').length);
    document.getElementById('mujeres').append(dataCoronavirus.filter(({ sexo }) => sexo == 'F').length);
    document.getElementById('recuperados').append(dataCoronavirus.filter(({ atenci_n }) => atenci_n == 'Recuperado').length);
    document.getElementById('muertes').append(dataCoronavirus.filter(({ atenci_n }) => atenci_n == 'Fallecido').length);
    document.getElementById('muertes-menores-50').append(dataCoronavirus.filter(({ atenci_n, edad }) => atenci_n == 'Fallecido' && edad < 50).length);



    /* Crear un nuevo objeto solo con los departamentos */
    departamentos = dataCoronavirus.map(({ departamento }) => departamento)

    /* Quitar duplicados */
    departamentos = departamentos.filter((item, indice) => departamentos.indexOf(item) === indice);
    // departamentos = [...new Set(departamentos)] // Otra forma de quitar duplicados

    /* Poner los elementos filtrados en un datalist */
    let datalistCiudades = document.getElementById('datalist-ciudades')
    departamentos.forEach((departamento) => {
        option = document.createElement('option');
        option.value = departamento;
        datalistCiudades.append(option);
    });


    mayores50Años = dataCoronavirus.filter(({ edad }) => edad >= 50).length;

    drawGraphs(dataCoronavirus)
}

let drawGraphs = function(dataCoronavirus) {


    /* Contagiados por dia */
    fechasContagio = dataCoronavirus.map(({ fecha_de_diagn_stico }) => fecha_de_diagn_stico)

    let indice = 0,
        dia = 0,
        contagios = 0
    let aumentoXdia = []

    fechasContagio.forEach(fecha => { // me permite filtrar los contagios por dia e irlos sumando exponencialmente
        if (fechasContagio.indexOf(fecha) === indice) {
            contagios++;
            aumentoXdia[dia] = contagios;
            dia++;
        } else {
            contagios++;
            aumentoXdia[dia] = contagios;
        }
        indice++;
    });

    /*dias transcurridos */
    let fechaIni = new Date('03/09/2020').getTime();
    let fechaFin = Date.now();
    dias = parseInt((fechaFin - fechaIni) / (1000 * 60 * 60 * 24)) //mlisegundos* segundos* minutos* horas* días
    dias = [...Array(aumentoXdia.length).keys()] // genera numeros del 1 al numero de dias.


    /* Creación  de grafica */

    aumentoXdia = aumentoXdia.filter((elm, index) => index % 3 == 0) // si quisiera reducir la resolucion de la grafica
    dias = dias.filter((elm, index) => index % 3 == 0) // si quisiera reducir la resolucion de la grafica

    let chart = new Chartist.Line('.ct-chart', {
        labels: dias,
        series: [
            // [12, 9, 7, 8, 5],
            aumentoXdia
        ]
    }, {
        fullWidth: true,
        chartPadding: {
            right: 40,
            top: 40
        }
    });


    
}

showData(dataCoronavirus)