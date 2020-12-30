// Inicialización
window.addEventListener("DOMContentLoaded", () =>{

    // Funciones
    const mostrarHora = () =>{
        let fecha = new Date();
        let diaMes = fecha.getDate();
        let mes = fecha.getMonth();
        let anno = fecha.getFullYear();
        let hora = fecha.getHours();
        let min = fecha.getMinutes();
        let sec = fecha.getSeconds();
        document.getElementById("hora").innerHTML = `${pad2(hora)}:${pad2(min)}:${pad2(sec)}`;
        document.getElementById("fecha").innerHTML = `${diaMes} / ${mes} / ${anno}`;
    };
    const dividirCoord = (valor) => Math.round(Number(valor)/8);
    const multiplicarCoord = (valor) => valor*8;
    const perimetro = (v1, v2) => ((v1*2) + (v2*2)) - 4;
    const area = (v1, v2) => v1*v2;
    const sumarCalcu = (v1, v2) => Number(v1) + Number(v2);
    const restarCalcu = (v1, v2) => v1 - v2;
    const multiCalcu = (v1, v2) => v1 * v2;
    const dividirCalcu = (v1, v2) => {
        let ret;
        if (v2 != 0){
            ret = v1 / v2;
        } else {
            ret = "No se puede dividir entre 0";
        }

        return ret;
    };

    function pad2(number) {   
        return (number < 10 ? '0' : '') + number  
    }

    function generar(param, l, a){
        if(param === "ok"){
            document.getElementById("result").innerHTML = `
            <div class="grid-item">Perímetro:</div>
            <div class="grid-item"><input type="text" id="per" class="input" value="${perimetro(l, a)}"readonly> bloques</div>
            <div class="grid-item">Área:</div>
            <div class="grid-item"><input type="text" id="area" class="input" value="${area(l, a)}"readonly> bloques.</div>
            `
        }
        else if(param==="errorPer"){
            document.getElementById("result").innerHTML = `
            <div class="grid-item text-danger style="grid-column: span 2;">Error: los campos largo y ancho no han de quedar vacíos y los valores han de ser mayores que 1.</div>            
            `
        }
        else if(param==="inicial"){
            document.getElementById("result").innerHTML = `
            <div class="grid-item" style="grid-column: span 2;">Introduzca valores mayores que 1 para largo y ancho.</div>
            `
        }
    }

    function limpiar(){
        document.getElementById("largo").value = "";
        document.getElementById("ancho").value = "";
        document.getElementById("per").value = "";
        document.getElementById("area").value = "";
    }

    function limpiarCalcu(){
        document.getElementById("calcu1").value = "";
        document.getElementById("calcu2").value = "";
        document.getElementById("resultCalcu").value = "";
    }

    function calcular(oper){
        let v1 = document.getElementById("calcu1").value;
        let v2 = document.getElementById("calcu2").value;
        let ret;
        if(oper === "+"){
            ret = document.getElementById("resultCalcu").value = sumarCalcu(v1, v2);
        } else if(oper === "-"){
            ret = document.getElementById("resultCalcu").value = restarCalcu(v1, v2);
        } else if(oper === "*"){
            ret = document.getElementById("resultCalcu").value = multiCalcu(v1, v2);
        } else if(oper === "/"){
            ret = document.getElementById("resultCalcu").value = dividirCalcu(v1, v2);
        }

        return ret;
    }

    function calcuPaneles(numUsuario) {
        let numBloques = null;
        let panResultantes = null;
        
        for (let i=0; numBloques === null; i++){
            if((Number(numUsuario) + Number(i)) % 16 === 0){
                numBloques = ((Number(numUsuario) + Number(i)) * 6) / 16;
                panResultantes = Number(numUsuario) + Number(i);
            }
        }
        return [numBloques, panResultantes];
    }
    
    // Acciones
    setInterval(mostrarHora, 100);
    mostrarHora();

    generar("inicial");

    // Eventos
    document.addEventListener("input", ev => {
        if(ev.target.matches("#owx")) document.getElementById("nx").value = dividirCoord(ev.target.value);
        else if(ev.target.matches("#owz")) document.getElementById("nz").value = dividirCoord(ev.target.value);
        else if(ev.target.matches("#owy")) document.getElementById("ny").value = document.getElementById("owy").value;
        else if(ev.target.matches("#nx")) document.getElementById("owx").value = multiplicarCoord(ev.target.value);
        else if(ev.target.matches("#nz")) document.getElementById("owz").value = multiplicarCoord(ev.target.value);
        else if(ev.target.matches("#ny")) document.getElementById("owy").value = document.getElementById("owy").value;
        else if(ev.target.matches("#panUsuario")) {
            let paneles = calcuPaneles(document.getElementById("panUsuario").value);

            document.getElementById("bloqNeces").value = paneles[0];
            document.getElementById("panResultantes").value = paneles[1];
        }
    });

    document.addEventListener("click", ev => {
        let operacion = document.getElementById("oper").value;

        if(ev.target.matches("#calcularPer")){
            let largo = document.getElementById("largo").value;
            let ancho = document.getElementById("ancho").value;

            if(largo > 1 && ancho > 1) generar("ok", largo, ancho);
            else generar("errorPer");
        }
        else if(ev.target.matches("#limpiarPer")){
            generar("inicial");
            limpiar();
        }
        else if(ev.target.matches("#limpiarCalcu")){
            limpiarCalcu();
        }
        else if(ev.target.matches("#calcularCalcu")) document.getElementById("resultCalcu").value = calcular(operacion);
    });
});