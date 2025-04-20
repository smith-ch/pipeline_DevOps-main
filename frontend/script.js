document.getElementById('btn-test').addEventListener('click', async () => {
    try {
      const response = await fetch('http://localhost:3000/api/saludo');
      const data = await response.json();
      document.getElementById('resultado').textContent = data.mensaje;
    } catch (error) {
      document.getElementById('resultado').textContent = 'Error en la conexión con el backend';
    }
  });
  