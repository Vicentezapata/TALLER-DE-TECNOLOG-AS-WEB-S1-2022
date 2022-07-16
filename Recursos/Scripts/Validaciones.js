
//AL INICIAR GATILLARA Esto
$( document ).ready(function() {
    obtenerDatos()
});

function llamarMensaje() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Deseas ir a la pagina de contacto?',
        text: "En caso de no querer realizar la accion presionar cancelar!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, redirigeme!',
        cancelButtonText: 'No, Cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            var url = "Paginas/Contacto.html";
            $(location).attr('href',url);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
}
function valorMonetario(){
    Swal.fire({
        title: 'Indique la moneda del dia que sea obtener ',
        text: 'Ejemplo: uf, ivp, dolar, dolar_intercambio, euro, ipc, utm, imacec, tpm, libra_cobre, tasa_desempleo, bitcoin',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Revisar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: (moneda) => {
          return fetch(`https://mindicador.cl/api/${moneda}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Peticion fallida: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        valMonetario = result.value.codigo
        filaTAbla = ""
        for (var indice = 0; indice < result.value.serie.length; indice++) {
            var fecha = result.value.serie[indice].fecha.split("T")[0]
            var valor = result.value.serie[indice].valor
            var filaTAbla =filaTAbla+ '<tr>'
                            + '<td class="prc-25">'+fecha+'</td>'
                            +  '<td class="prc-25">$'+valor+'</td>'
                            '</tr>'
        }
        if (result.isConfirmed) {

            Swal.fire({
                title: 'Valor monetario: '+valMonetario,
                icon: 'info',
                html:
                  'Los valores economicos del mes son:' +
                  '<table class="table table-dark table-striped table-bordered align-middle " id="tabla-cocteles">'+
                  '<tr class="table-light">'+
                    '<th class="prc-25">Fecha</th>'+
                    '<th class="prc-25">Valor</th>'+
                  '</tr>'+
                  filaTAbla+
                  '</table>',
                showCloseButton: true,
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText:
                  '<i class="fa fa-thumbs-up"></i> Aceptar!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                cancelButtonText:
                  '<i class="fa fa-thumbs-down">Cerrar</i>',
                cancelButtonAriaLabel: 'Thumbs down'
              })
        }
      })
}
function obtenerDatos() {
    $.ajax('https://62aa6b263b3143855447182a.mockapi.io/Cocteles', {
        type: 'GET',  // http method
        success: function (data, status, xhr) {
            for (var indice = 0; indice < data.length; indice++) {
                var nombreCoctel = data[indice].nombreCoctel
                var avatar = data[indice].avatar
                var receta = data[indice].receta
                var precio = data[indice].precio
                var filaTAbla = '<tr>'
                                + '<td class="prc-25">'+nombreCoctel+'</td>'
                                +  '<td class="prc-25">'+receta+'</td>'
                                +   '<td class="prc-25">'+precio+'</td>'
                                +   '<td class="prc-25"><img src="'+avatar+'" alt="" style="width: 131px"></td>'
                                '</tr>'
                console.log(filaTAbla)
                $("#tabla-cocteles").append(filaTAbla)

            }
        },
        error: function (jqXhr, textStatus, errorMessage) {
            alert("No me pude conectar a la api: error"+errorMessage+" estado:"+textStatus  )
        }
    });
}
function sumar(numero1, numero2) {
    resultado = numero1 + numero2
    alert("El resultado es: " + resultado)
}

//RECORDAR QUE PARA LLAMAR FUNCIONES DEBES USAR ATRIBUTO ONCLICK
//EJEMPLO <button onclick="sumar(1,21)">SUMAR</button>
//<button class="btn btn-secondary w-100" type="button" onclick="validarDatos()">Enviar</button>
function validarDatos() {
    nombre = document.getElementById("nombre").value
    apellido = document.getElementById("apellido").value
    edad = parseInt(document.getElementById("edad").value)
    direccion = document.getElementById("direccion").value
    mensaje = "nombre:" + nombre + "apellido:" + apellido + "edad:" + edad + "direccion:" + direccion
    errores = 0
    msjError = ""
    if(nombre.length <3){
        document.getElementById("errorNombre").style.display="block"
        errores++
        msjError = msjError+" El largo del nombre debe ser superior a 3"
    }else{
        document.getElementById("errorNombre").style.display="none"
    }
    if(edad<18){
        document.getElementById("errorEdad").style.display="block"
        errores++
        msjError = msjError+" No cumple con la edad minima"

    }else{
        document.getElementById("errorEdad").style.display="none"
    }
    if(errores>0){
        document.getElementById("box-send").append("Uno de los campos es invalido")
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campos invalidos errores detectados: '+errores +"\n"+msjError,
            footer: '<a href="">Why do I have this issue?</a>'
        })
        return false
    }else{
        var form = document.querySelector('.pageclip-form')
        Pageclip.form(form, {
        onSubmit: function (event) { },
        onResponse: function (error, response) { },
        successTemplate: '<span>Thank you!</span>'
        })

        var data = {
            name: 'Billy Jean',
            email: 'billy@example.com'
          }
          Pageclip.send('KROHShNYpz4mUkB2Na3Dj2V8n7BHvR3H', 'RegistroUsuarios', data, function (error, response) {
            console.log('saved?', !!error, '; response:', error || response)
          })
        return true
    }

}
