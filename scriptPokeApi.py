import requests
import requests

url = 'https://pokeapi.co/api/v2/pokemon-form/'
response = requests.get(url)

if response.status_code == 200:

    print("Conectado")
else:
    print(f"Error al hacer la solicitud a la API: {response.status_code}")
