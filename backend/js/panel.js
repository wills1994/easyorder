var botonAlternar = document.getElementById('alternar');

botonAlternar.onclick = function() {
    var panel = document.getElementById('panel');
    panel.classList.toggle('panel-invisible');
    
    var contenedor = document.getElementById('contenedor');
    contenedor.classList.toggle('contenedor-expandido');
    
    return false;
}
