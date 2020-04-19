let calcularProbabilidad = function() {

    /*Creacion y llenado de objeto persona mediante recorrido de form inputs */
    let persona = {}
    const myInputElements = document.querySelectorAll('#formularioProbabilidad input')
    Array.from(myInputElements).forEach(elm => {
        if (elm.type == 'radio') {
            if (elm.checked) persona[elm.name] = elm.value
        } else {
            persona[elm.name] = elm.value
        }
    })

    let contagio = 0
    switch (persona.salidas) {
        case 'ninguna':
            break
        case '1 a 3':
            contagio += 30
            break
        case '4 a 10':
            contagio += 50
            break
        case 'mas de 10':
            contagio += 80
            break
        default:
            break

    }

    if (contagio <= 0) contagio = 0
    if (contagio > 100) contagio = 100

    let mensaje = `Señor ${persona.nombre} siga teninedo en cuenta las medidas propustas por las organizaciones de salud respecto a su aislamiento`

    document.getElementById('probabilidad').innerText = contagio + '%'
    document.getElementById('mensaje').innerText= mensaje
    document.querySelector('#results').style.display = "block"

}