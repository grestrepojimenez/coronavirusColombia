let datosCoronavirus = datosExportados

fetch(
        'https://www.datos.gov.co/resource/gt2j-8ykr.json?$limit=5000', {
            method: 'GET',
        })
    .then((respuesta) => {
        return respuesta.json();
    })
    .then((myJson) => {
        datosCoronavirus = myJson;
        mostrarDatos(myJson);
    })
    .catch((err) => {
        console.log(err);
    });

let crearDataList = function(arrayList, where) {
    /* Poner los elementos filtrados en un datoslist */
    let contenedorDataList = document.getElementById(where)
    arrayList.forEach((elm) => {
        option = document.createElement('option');
        option.value = elm;
        contenedorDataList.append(option);
    });
}

let mostrarDatos = function(datosCoronavirus) {

    /* Tomar datos y ponerlos en html */
    document.getElementById('total').append(datosCoronavirus.length);
    document.getElementById('hombres').append(datosCoronavirus.filter(({ sexo }) => sexo == 'M').length);
    document.getElementById('mujeres').append(datosCoronavirus.filter(({ sexo }) => sexo == 'F').length);
    document.getElementById('recuperados').append(datosCoronavirus.filter(({ atenci_n }) => atenci_n == 'Recuperado').length);
    document.getElementById('muertes').append(datosCoronavirus.filter(({ atenci_n }) => atenci_n == 'Fallecido').length);
    document.getElementById('muertes-menores-50').append(datosCoronavirus.filter(({ atenci_n, edad }) => atenci_n == 'Fallecido' && edad < 50).length);


    /* Crear un nuevo objeto solo con los departamentos */
    departamentos = datosCoronavirus.map(({ departamento }) => departamento)
        /* Quitar duplicados */
    departamentos = departamentos.filter((item, indice) => departamentos.indexOf(item) === indice);
    // departamentos = [...new Set(departamentos)] // Otra forma de quitar duplicados
    crearDataList(departamentos, 'datalist-departamentos')

    paises = ['argentina', 'brazil', 'chile', 'china', 'ecuador', 'italy', 'korea-south', 'mexico', 'spain', 'sweden']
    crearDataList(paises, 'datalist-paises')

    dibujarGraficas(datosCoronavirus)
}

let dibujarGraficas = function(datosCoronavirus, newSet = []) {

    /* Contagiados por dia */
    fechasContagio = datosCoronavirus.map(({ fecha_de_diagn_stico }) => fecha_de_diagn_stico)

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

    dias = [...Array(aumentoXdia.length).keys()] // genera numeros del 1 al numero de dias.

    /* Creación  de grafica */
    newSet = newSet.slice(0, aumentoXdia.length)

    /* Reducir resolucion de grafica */
    newSet = newSet.filter((elm, index) => index % 3 == 0)
    aumentoXdia = aumentoXdia.filter((elm, index) => index % 3 == 0)
    dias = dias.filter((elm, index) => index % 3 == 0)


    let datos = [aumentoXdia, newSet]

    var chart = new Chartist.Line('.ct-chart', {
        labels: dias,
        series: datos
    }, {
        fullWidth: true,
        chartPadding: {
            right: 40,
            top: 40
        }
    });


}

let compararGraficas = function(country) {

    if (country !== '') {
        fetch("https://api.covid19api.com/country/" + country + "/status/confirmed?from=2020-01-01T00:00:00Z&to=2020-04-18T00:00:00Z", {
                "method": "GET",
            })
            .then(respuesta => {
                return respuesta.json();
            })
            .then((datosComparacion) => {
                reportes = datosComparacion.filter((elm) => elm.Cases > 1).map((elm) => { return { day: elm.Date, total: elm.Cases } })
                diaCero = reportes[0].day;
                reportes = reportes.map((elm) => elm.total)
                dibujarGraficas(datosCoronavirus, reportes)
            })
            .catch(err => {
                console.log(err);
            });
    }
}

// mostrarDatos(datosCoronavirus)

let agregarEventos = function() {

    let comparador = document.querySelector('input[name="pais-comparacion"]')
    comparador.addEventListener('change', () => compararGraficas(comparador.value))
    comparador.addEventListener('click', () => compararGraficas(comparador.value = ''))

}

agregarEventos()