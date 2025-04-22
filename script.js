const serviciosPorOficina = {
  "Santo Domingo": ["Apertura de cuenta", "Préstamos personales", "Atención al cliente"],
  "Santiago": ["Inversiones", "Gestión de tarjetas", "Consulta de movimientos"],
  "Puerto Plata": ["Remesas", "Cambio de divisas", "Servicio al cliente"]
};

const oficinaSelect = document.getElementById("oficina");
const servicioSelect = document.getElementById("servicio");
const form = document.getElementById("appointmentForm");
const resultado = document.getElementById("resultado");

oficinaSelect.addEventListener("change", () => {
  const oficina = oficinaSelect.value;
  servicioSelect.innerHTML = '<option value="">-- Selecciona un servicio --</option>';

  if (serviciosPorOficina[oficina]) {
    serviciosPorOficina[oficina].forEach(servicio => {
      const option = document.createElement("option");
      option.value = servicio;
      option.textContent = servicio;
      servicioSelect.appendChild(option);
    });
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      const nombre = document.querySelector('input[name="nombre"]').value;
      const correo = document.querySelector('input[name="correo"]').value;
      const oficina = document.querySelector('select[name="oficina"]').value;
      const servicio = document.querySelector('select[name="servicio"]').value;
      const fecha = document.querySelector('input[name="fecha"]').value;
      const hora = document.querySelector('input[name="hora"]').value;

      resultado.innerHTML = `
        <h3>¡Cita confirmada!</h3>
        <p>${nombre}, tu cita para el servicio <strong>${servicio}</strong> en la oficina de 
        <strong>${oficina}</strong> ha sido programada para el día <strong>${fecha}</strong> a 
        las <strong>${hora}</strong>.</p>
        <p>Te enviaremos un recordatorio a <strong>${correo}</strong>.</p>
      `;

      resultado.classList.remove("hidden");
      form.classList.add("hidden");
      form.reset();
    } else {
      response.json().then(data => {
        alert(data.error || "Ocurrió un error al enviar tu cita.");
      });
    }
  }).catch(error => {
    console.error("Error al enviar el formulario:", error);
    alert("No se pudo conectar con el servidor. Intenta más tarde.");
  });
});
