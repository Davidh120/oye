// top 3 canciones

var topAudios = [];

$(document).ready(function () {
	$.ajax({
		url: "http://127.0.0.1:5500/datos.json",
	}).done(function (respuesta) {
		var canciones = respuesta.canciones;

		for (var i = 0; i < canciones.length; i++) {
			topAudios.push(canciones[i]);
		}

		topAudios = topAudios.sort(function (x, y) {
			if (x.reproducciones < y.reproducciones) {
				return 1;
			}
			return -1;
		});

		var html = "";

		for (var j = 0; j < 3; j++) {
			html += `
              <tr>
              <th class="d-none d-sm-block">${topAudios[j].nombre}</th>
              <td class="text-left"><audio src="audios/${topAudios[j].ruta}" controls="" preload="auto"></audio></td>
              </tr>
              `;
		}

		document.getElementById("datosTopCanciones").innerHTML = html;
	});
});

// buscador filtro

$(document).ready(function () {
	buscador = document.getElementById("buscador");
	contenedor = document.getElementById("canciones");
	filtroBusquedad();
});

function filtroBusquedad() {
	$.ajax({
		url: "http://127.0.0.1:5500/datos.json",
	}).done(function (respuesta) {
		canciones = respuesta.canciones;
		contenedor.innerHTML = "";
		if (buscador.value == "") {
			for (var i = 0; i < canciones.length; i++) {
				contenedor.innerHTML += `
				<div class="col-12 col-md-6 col-lg-4 my-2 pr-auto pr-lg-1" class="tarjeta">
                  <div class="card bg-secondary" style="width: 100%;">
                    <img src="../images/icon_${canciones[i].icono}.svg" style="width:50%; height: 6em;" class="card-img-top m-auto" alt="...">
                    <div class="card-body bg-white rounded-bottom">
                     <h2 class="card-text text-center">${canciones[i].nombre}</h2>
                     <audio src="../audios/${canciones[i].ruta}" controls preload="auto" style="width: 100%;"></audio>
                    </div>
                  </div>
                </div>
				`;
			}
		} else {
			for (var i = 0; i < canciones.length; i++) {
				if (canciones[i].nombre.indexOf(buscador.value) != -1) {
					contenedor.innerHTML += `
				<div class="col-12 col-md-6 col-lg-4 my-2 pr-auto pr-lg-1" class="tarjeta">
                  <div class="card bg-secondary" style="width: 100%;">
                    <img src="../images/icon_${canciones[i].icono}.svg" style="width:50%; height: 6em;" class="card-img-top m-auto" alt="...">
                    <div class="card-body bg-white rounded-bottom">
                     <h2 class="card-text text-center">${canciones[i].nombre}</h2>
                     <audio src="../audios/${canciones[i].ruta}" controls preload="auto" style="width: 100%;"></audio>
                    </div>
                  </div>
                </div>
				`;
				}
			}
		}
	});
}

// validacion formularios
// inicio sesion

function validar(formulario) {
	if (formulario.correo.value.trim().length == 0) {
		alert("Correo: Campo obligatorio");
		return false;
	}

	var re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!re.test(formulario.correo.value)) {
		alert("Email inválido");
		return false;
	}

	if (formulario.contraseña.value.trim().length == 0) {
		alert("Contraseña obligatoria");
		return false;
	}

	alert("Se ha iniciado sesixon correctamente!");

	return true;
}

// registro

function validarRegistro(registro) {
	var re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!re.test(registro.correo.value)) {
		document.getElementById("errorCorreo").innerHTML =
			"Email invalido <br>";
		return false;
	} else {
		document.getElementById("errorCorreo").innerHTML = "";
	}

	if (registro.contraseña.value.trim().length < 8) {
		document.getElementById("errorContraseña").innerHTML =
			"Contraseña inválida, mínimo 8 caracteres <br>";
		return false;
	} else {
		document.getElementById("errorContraseña").innerHTML = "";
	}

	if (registro.contraseña.value != registro.confirmacion.value) {
		document.getElementById("errorConfirmacion").innerHTML =
			"Confirmación no coincide con la contraseña <br>";
		return false;
	} else {
		document.getElementById("errorConfirmacion").innerHTML = "";
	}

	if (registro.genero.value == "") {
		document.getElementById("errorGenero").innerHTML =
			"Debe seleccionar un género <br>";
		return false;
	} else {
		document.getElementById("errorGenero").innerHTML = "";
	}

	if (registro.edad.value == "") {
		document.getElementById("errorEdad").innerHTML =
			"<br> Debe seleccionar un rango de edad";
		return false;
	} else {
		document.getElementById("errorEdad").innerHTML = "";
	}

	if (!registro.terminos.checked) {
		document.getElementById("errorTerminos").innerHTML =
			"Debe aceptar los términos <br>";
		return false;
	} else {
		document.getElementById("errorTerminos").innerHTML = "";
	}

	alert("Registro exitoso!");

	return true;
}
