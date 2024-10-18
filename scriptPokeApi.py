import requests
import requests

url = 'https://pokeapi.co/api/v2/pokemon-form/'
response = requests.get(url)

if response.status_code == 200:

    responseJson = response.json()
    
    url_php = 'https://tusitio.com/archivo_php.php'
    
    # Enviar los datos a PHP mediante POST
    responsePhp = requests.post(url_php, data=datos_api)
    
    if response_php.status_code == 200:
        print("Datos enviados a PHP correctamente.")
    else:
        print(f"Error al enviar los datos a PHP: {response_php.status_code}")
else:
    print(f"Error al hacer la solicitud a la API: {response.status_code}")
