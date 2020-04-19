 /* Verificar la cantidad de contagiados dia a dia */
 diasIndividuales.filter((fecha, indice) => {
     if (diasIndividuales.indexOf(fecha) === indice) {
         contagiadosXdia[i] = 1;
         i++;
     } else {
         contagiadosXdia[i - 1] += 1;
     }
     return diasIndividuales.indexOf(fecha) === indice;
 })



 /*dias transcurridos */
 let fechaIni = new Date('03/09/2020').getTime();
 let fechaFin = Date.now();
 dias = parseInt((fechaFin - fechaIni) / (1000 * 60 * 60 * 24)) //mlisegundos* segundos* minutos* horas* días



 /* API Covid-193.p No sirvio pues solo arroja los ultimos 21 días */

 //https://rapidapi.com/api-sports/api/covid-193?endpoint=apiendpoint_dfb9e52d-bd90-48ec-a571-8b78610a736d


 let compararGraficas = function() {


     fetch("https://covid-193.p.rapidapi.com/history?country=colombia", {
             "method": "GET",
             "headers": {
                 "x-rapidapi-host": "covid-193.p.rapidapi.com",
                 "x-rapidapi-key": "0ba5efb597mshc67210c6808827bp12c0e9jsndfefcb162528"
             }
         })
         .then(respuesta => {
             return respuesta.json();
         })
         .then((myJson) => {
             dibujarComparacion(myJson.response);
         })
         .catch(err => {
             console.log(err);
         });


 }


 let dibujarComparacion = function(datosComparacion) {
     Reportes = datosComparacion.map((elm) => { return { day: elm.day, total: elm.cases.total } })

     casosXdia = [];
     /* Eliminar varios reportes de un mismo dia, dejar solo uno para hacer la grafica */
     for (i = 1; i < Reportes.length; i++) {
         if (Reportes[i].day != Reportes[i - 1].day) {
             casosXdia.push(Reportes[i])
         }
     }
     console.log(casosXdia)
 }



 /* -----------Obtener Paises ---------------*/

 let obtenerPaises = function(params) {

     fetch("https://api.covid19api.com/countries", {
             "method": "GET",
         })
         .then(respuesta => {
             return respuesta.json();
         })
         .then((data) => {
             paises = data.map(({ Slug }) => Slug)
             console.log(paises)

         })
         .catch(err => {
             console.log(err);
         });


 }

 