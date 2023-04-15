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
    const dividirCoord = (valor) => Math.round(Number(valor)/8);
    const multiplicarCoord = (valor) => valor*8;
    const perimetro = (v1, v2) => ((v1*2) + (v2*2)) - 4;
    const area = (v1, v2) => v1*v2;



    function limpiar(){
        document.getElementById("largo").value = "";
        document.getElementById("ancho").value = "";
        document.getElementById("per").value = "";
        document.getElementById("area").value = "";
    }
    
    // Acciones
    setInterval(mostrarHora, 100);
    mostrarHora();

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

            if(largo > 1 && ancho > 1) generar("ok", largo, ancho);
            else generar("errorPer");
        }
        else if(ev.target.matches("#limpiarPer")){
            limpiar();
        }
    });
});
