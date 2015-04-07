function validarUsuario() {
	console.log(document.getElementById("usuario").innerHTML);
		console.log(document.getElementById("contrasenya").innerHTML);
    if(document.getElementById("usuario").value == "camarero" && document.getElementById("contrasenya").value == "123")
	{
		window.location.href = "mesas.html";
	}
	else
	{
		alert("User o Pass invalido");
	}
}