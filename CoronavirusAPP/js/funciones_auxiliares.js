 
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