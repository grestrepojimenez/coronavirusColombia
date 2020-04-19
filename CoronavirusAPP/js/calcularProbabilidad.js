let calcularProbabilidad = function() {

    let persona = {}
    const myInputElements = document.querySelectorAll('#formularioProbabilidad input')
    Array.from(myInputElements).forEach(elm => {
        persona[elm.name] = elm.value
    })

}

function verificarProbabilidad(persona) {

    let contagio = 0;
    switch (persona.ciudad) {
        case 'Roma':
        case 'Madrid':
            contagio += 90;
            break;
        case 'Medellín':
        case 'Bogotá':
            contagio += 65;
            break;
        default:
            contagio += 50;
            break;
    }

    // if(persona.enCuarentena){ contagio -=30 } else{ contagio *=2 }
    contagio = (persona.enCuarentena) ? contagio -= 30 : contagio *= 2 // Forma "corta" pero menos legible  de hacer un if else sería  (No la recomiendo)

    for (i = 0; i < persona.medidaHigiene.length; + i++) {
        switch (persona.medidaHigiene[i]) {
            case 'lavado de manos':
                contagio -= 20
                break;
            case 'cambio de tapabocas':
                contagio -= 15
                break;
            case 'Limpieza de domicilios':
                contagio -= 5
                break;
            default:
                break;
        }
    }

    if (contagio < 0) contagio = 0
    if (contagio > 0) contagio = 100
    return contagio;
}