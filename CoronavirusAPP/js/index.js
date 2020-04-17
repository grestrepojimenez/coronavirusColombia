let data
          fetch(
            "https://www.datos.gov.co/resource/gt2j-8ykr.json?$limit=5000",
            {
              method: "GET",
            })
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
            data =myJson;
            showData(myJson);
             })
            .catch((err) => {
              console.log(err);
            });

            
let showData = (dataCoronavirus) => {
    
    /* Tomar datos y ponerlos en html */
    document.getElementById("total").append(dataCoronavirus.length); 
    document.getElementById("hombres").append(dataCoronavirus.filter( ({sexo})=> sexo == 'M').length); 
    document.getElementById("mujeres").append(dataCoronavirus.filter(({sexo})=> sexo == 'F').length); 
    document.getElementById("mayores50").append(dataCoronavirus.filter(({edad})=> edad >= 50).length); 
    document.getElementById("menores50").append(dataCoronavirus.filter(({edad})=> edad < 50).length); 
    document.getElementById("recuperados").append(dataCoronavirus.filter(({atenci_n})=> atenci_n == 'Recuperado').length); 
    document.getElementById("muertes").append(dataCoronavirus.filter(({atenci_n})=> atenci_n == 'Fallecido').length); 

    /* Crear un nuevo objeto solo con los departamentos */
     departamentos = dataCoronavirus.map(({ departamento }) => departamento)
    
    /* Quitar duplicados */
    departamentos = departamentos.filter((item, indice) => departamentos.indexOf(item) === indice);
    // departamentos = [...new Set(departamentos)] // Otra forma de quitar duplicados

    /* Poner los elementos filtrados en un datalist */
    let datalistCiudades = document.getElementById("datalist-ciudades")
    departamentos.forEach((departamento) => {
      option = document.createElement("option");
      option.value =  departamento;
        datalistCiudades.append(option);
    });
 

    
/* Explicación de como remover duplicados 
function removeDuplicates(array){
 let new = []
 for(let val of array) {
  if (!isExist(new, val)) 
  new.push(val)
 }
 return new
}

function isExist (arr, val){
 for (let i of arr){
  if (i == val) return true
 }
 return false
}
*/



}