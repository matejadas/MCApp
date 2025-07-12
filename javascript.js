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

    /*function mostrarPerimetro(estado, largo, ancho){
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
    }*/

    function mostrarPerimetro (estado, largo, ancho){
        const result = document.getElementById("result");
        
        result.innerHTML = "";
        result.style.visibility = "visible";

        if(estado === "ok"){
            // Creamos el <p>, vacío
            const p = document.createElement("p");

            // Creamos etiquetas de texto
            const labelPer = document.createElement("label");
            
            labelPer.id = "resultPer";
            labelPer.textContent = `${perimetro(largo, ancho)} bloques.`;

            const labelArea = document.createElement("label");
            
            labelArea.id = "resultArea";
            labelArea.textContent = `${area(largo, ancho)} bloques.`;

            // Construimos el contenido del p
            p.append("Perímetro: ", labelPer, document.createElement("br"));
            p.append("Área: ", labelArea);

            // Lo añadimos al result
            result.appendChild(p);
        } else if(estado === "errorPer") {
            const p = document.createElement("p");

            p.textContent = "Parámetros no válidos: largo y ancho han de ser mayores que 1";
            result.appendChild(p);
        } else {
            result.style.visibility = "hidden";
        }
    }

    function limpiarPer(){
        document.getElementById("largo").value = "";
        document.getElementById("ancho").value = "";
        document.getElementById("result").innerHTML = "";
    }
    
    // Acciones
    // setInterval(mostrarHora, 100);
    // mostrarHora();
    mostrarPerimetro("");

    // Eventos
    let flagRecursividad = false;

    document.addEventListener("input", ev => {
        // Evitamos que al actualizarse un campo al hacer input en otro se actualice a su vez el primero, creando así un bucle.
        if (flagRecursividad) return;

        flagRecursividad = true;

        if(ev.target.matches("#owx")) document.getElementById("nx").value = dividirCoord(ev.target.value);
        else if(ev.target.matches("#owz")) document.getElementById("nz").value = dividirCoord(ev.target.value);
        else if(ev.target.matches("#owy")) document.getElementById("ny").value = document.getElementById("owy").value;
        else if(ev.target.matches("#nx")) document.getElementById("owx").value = multiplicarCoord(ev.target.value);
        else if(ev.target.matches("#nz")) document.getElementById("owz").value = multiplicarCoord(ev.target.value);
        else if(ev.target.matches("#ny")) document.getElementById("owy").value = document.getElementById("owy").value;

        flagRecursividad = false;
    });

    document.addEventListener("click", ev => {
        // Perímetro
        if(ev.target.matches("#calcularPer")){
            let largo = document.getElementById("largo").value;
            let ancho = document.getElementById("ancho").value;

            if(largo > 1 && ancho > 1) mostrarPerimetro("ok", largo, ancho);
            else mostrarPerimetro("errorPer");
        }
        else if(ev.target.matches("#limpiarPer")){
            limpiarPer();
        }
    });
});
