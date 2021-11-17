import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'process';
import { MqttService } from './mqttService';

const rl = readline.createInterface({ input, output });

const connection = 'mqtt://teste.gholias.com:1884';

const topic = 'its/165063/sys/reboot';
const message = { n: 'reboot', u: '/', vb: true };

const mqttService = new MqttService(connection);
mqttService.mqttConnect(topic, message);

rl.question('Aperte [Enter] para sair...\n\n', () => process.exit());

// TODO: Implementar sistema de interação via CLI
