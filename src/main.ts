import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'process';
import { connect as mqttConnection } from 'mqtt';

const rl = readline.createInterface({ input, output });

const client = mqttConnection('mqtt://teste.gholias.com:1884');
const requestTopic = 'its/165063/sys/info';
const responseTopic = 'its_dados';

// Mensagem para recebimento de todos os sensores na resposta.
const message = JSON.stringify({ n: 'read_all', u: '/', vb: true });

client.on('connect', () => {
  console.log('Conectado em mqtt://teste.gholias.com:1884');

  // Se inscreve nos tópicos
  client.subscribe(requestTopic);
  client.subscribe(responseTopic);

  client.publish(requestTopic, message, { qos: 0, retain: false });

  client.on('message', (topic, payload) => {
    // Converte a payload (buffer) em string para que se possa ser convertido em objeto depois.
    const response = payload.toString();
    console.log(`\nTópico: ${topic} \nMensagem: ${payload}`);

    // Exibe em formato de tabela o objeto mensagem.
    console.table(JSON.parse(response));
  });
});

rl.question('Press [Enter] anytime to exit...\n\n', () => process.exit());
