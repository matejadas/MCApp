// Inicialización
window.addEventListener("DOMContentLoaded", () =>{

    // FUNCIONES

    // Forzamos al reloj a mostrar siempre 2 cifras
    function pad2(number) {   
        return (number < 10 ? '0' : '') + number  
    }
    const mostrarHora = () =>{
        let fecha = new Date();
        let diaMes = fecha.getDate();
        let mes = fecha.getMonth()+1;
        let anno = fecha.getFullYear();
        let hora = fecha.getHours();
        let min = fecha.getMinutes();
        let sec = fecha.getSeconds();
        document.getElementById("hora").innerHTML = `${pad2(hora)}:${pad2(min)}:${pad2(sec)}`;
        document.getElementById("fecha").innerHTML = `${pad2(diaMes)} / ${pad2(mes)} / ${anno}`;
    };
    const dividirCoord = (valor) => {
        if (valor !== undefined && valor !== null){
            console.log(valor);
            Math.round(Number(valor)/8);
        } else {
            console.log("valor es undefined o null");
        }
    };
    const multiplicarCoord = (valor) => valor*8;
    const perimetro = (v1, v2) => ((v1*2) + (v2*2)) - 4;
    const area = (v1, v2) => v1*v2;

    function MostrarPerimetro(estado, largo, ancho){
        document.getElementById("result").style.visibility = "visible";

        switch(estado){
            case "ok":
                document.getElementById("result").innerHTML = 
                    "<p>Perímetro: <label id='resultPer'>" + perimetro(largo, ancho) + " bloques.</label></br>" +
                    "Área: <label id='resultArea'>" + area(largo, ancho) + " bloques.</label></p>";
                break;
            case "error":
                document.getElementById("result").innerHTML =
                    "<p>Parámetros no válidos: largo y ancho han de ser mayores que 1.</p>";
                break;
            default:
                document.getElementById("result").innerHTML = "";
                document.getElementById("result").style.visibility = "hidden";
        }
    }

    function limpiar(){
        document.getElementById("largo").value = "";
        document.getElementById("ancho").value = "";
        document.getElementById("result").innerHTML = "";
    }
    
    // Acciones
    setInterval(mostrarHora, 100);
    mostrarHora();
    MostrarPerimetro("nada");

    // TO-DO Poner flag para evitar recursividad -> ver chatGPT

    // Eventos
    document.addEventListener("input", ev => {
        if(ev.target.matches("#owx")) document.getElementById("nx").value = dividirCoord(ev.target.value);
        else if(ev.target.matches("#owz")) document.getElementById("nz").value = dividirCoord(ev.target.value);
        else if(ev.target.matches("#owy")) document.getElementById("ny").value = document.getElementById("owy").value;
        else if(ev.target.matches("#nx")) document.getElementById("owx").value = multiplicarCoord(ev.target.value);
        else if(ev.target.matches("#nz")) document.getElementById("owz").value = multiplicarCoord(ev.target.value);
        else if(ev.target.matches("#ny")) document.getElementById("owy").value = document.getElementById("owy").value;
    });

    document.addEventListener("click", ev => {
        // Perímetro
        if(ev.target.matches("#calcularPer")){
            let largo = document.getElementById("largo").value;
            let ancho = document.getElementById("ancho").value;

            if(largo > 1 && ancho > 1) MostrarPerimetro("ok", largo, ancho);
            else MostrarPerimetro("errorPer");
        }
        else if(ev.target.matches("#limpiarPer")){
            limpiar();
        }
    });
});
