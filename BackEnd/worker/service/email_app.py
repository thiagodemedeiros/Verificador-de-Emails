def verificador_de_email(email:str):
    import requests, json, os
    from service.prompts import prompt, prompt2
    from dotenv import load_dotenv
    load_dotenv()

    key_openrouter = os.getenv("key_openrouter")
    key_gemini = os.getenv("key_gemini")

    # allenai/molmo-2-8b:free
    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {key_openrouter}",
        },
        data=json.dumps({
            "model": "xiaomi/mimo-v2-flash:free",
            "messages": [
            {
                "role": "user",
                "content": f"{prompt}\n{email}\n{prompt2}"
            }
            ]
        })
    )

    if response.status_code != 200:
        print("Problema com a api do openrouter, usando o google")
        from google import genai
        from google.genai.errors import ClientError
        try:
            client = genai.Client(api_key=key_gemini)
            response = client.models.generate_content(
                model="gemini-3-flash-preview", contents=f"{prompt}\n{email}\n{prompt2}"
            )
            texto = json.loads(response.model_dump_json())
            resposta = texto['candidates'][0]['content']['parts'][0]['text'][8:-4]
            texto = json.loads(resposta)
        except:
            print("Limite de cota atingido. Tente novamente mais tarde.")
            return {"resposta_texto": "Limite de cota atingido. Tente novamente mais tarde."}
        
        try:
            resposta_da_api_convertida_em_json = json.loads(response)
        except json.JSONDecodeError:
            resposta_da_api_convertida_em_json = {"resposta_texto": response}
        except:
            resposta_da_api_convertida_em_json = response.text

        return resposta_da_api_convertida_em_json

    try:
        resposta_da_api = response.json()['choices'][0]['message']['content']
    except:
        resposta_da_api = response.json()

    try:
        resposta_da_api_convertida_em_json = json.loads(resposta_da_api)
    except json.JSONDecodeError:
        resposta_da_api_formatada = resposta_da_api[8:-4]
        resposta_da_api_convertida_em_json = {resposta_da_api_formatada}
    except:
        resposta_da_api_convertida_em_json = resposta_da_api.text

    return resposta_da_api_convertida_em_json