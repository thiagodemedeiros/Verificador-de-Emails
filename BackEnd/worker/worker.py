import pika, json, os
from service.email_app import verificador_de_email
from dotenv import load_dotenv
load_dotenv()

RABBITMQ_URL = os.getenv("RABBITMQ_URL")

params = pika.URLParameters(RABBITMQ_URL)
connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue='fila_de_email', durable=True)

def callback(ch, method, properties, body):
    email = str(body.decode())

    resultado = verificador_de_email(email)

    if isinstance(resultado, set):
        resultado = next(iter(resultado))  # pega a string de dentro
    if isinstance(resultado, str):
        resultado = json.loads(resultado)


    body_bytes = json.dumps(resultado, ensure_ascii=False).encode('utf-8')

    ch.basic_publish(
        exchange='',
        routing_key=properties.reply_to,
        properties=pika.BasicProperties(
            correlation_id=properties.correlation_id
        ),
        body=body_bytes
    )

    ch.basic_ack(delivery_tag=method.delivery_tag)


channel.basic_consume(queue='fila_de_email', on_message_callback=callback, auto_ack=False)

print("Worker started. Waiting for messages...")
channel.start_consuming()
