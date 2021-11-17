import { connect as mqttConnection, MqttClient } from 'mqtt';

const RESPONSE_TOPIC = 'its_dados';

export class MqttService {
  public client!: MqttClient;

  constructor(connection: string) {
    this.client = mqttConnection(connection);
  }

  public mqttConnect(requestTopic: string, msg: object): void {
    this.client.on('connect', () => {
      console.log('Conectado em mqtt://teste.gholias.com:1884');

      // Se inscreve nos tópicos
      this.client.subscribe(requestTopic);
      this.client.subscribe(RESPONSE_TOPIC);

      this.client.publish(requestTopic, JSON.stringify(msg), { qos: 0, retain: false });

      this.client.on('message', (topic, payload) => {
        // Converte a payload (buffer) em string para que se possa ser convertido em objeto depois.
        const response = payload.toString();
        console.log(`\nTópico: ${topic} \nMensagem: ${payload}`);

        // Exibe em formato de tabela o objeto mensagem.
        console.table(JSON.parse(response));
      });
    });
  }
}
