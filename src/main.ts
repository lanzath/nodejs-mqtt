import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'process';
import { connect as mqttConnection } from 'mqtt';

const rl = readline.createInterface({ input, output });

const client = mqttConnection('mqtt://broker.hivemq.com');
const requestTopic = 'its/165063/sys/info';
const responseTopic = 'its_dados';

const message = JSON.stringify({ n: 'read_all', u: '/', vb: true });


// Se inscreve no tópico
client.on('connect', () => {
  console.log('Connected to mqtt://broker.hivemq.com');

  client.subscribe(requestTopic);
  client.subscribe(responseTopic);

  client.publish(requestTopic, message, { qos: 0, retain: false });

  client.on('message', (topic, payload) => {
    console.log(`\ntopic: ${topic} \npayload: ${payload}`);
  })
});

client.on('message', (topic, payload) => console.log('voltou payload ' + payload.toString() + '\n no tópico ' + topic));

// const data: Response[] = [
//   { bn: 165063, bt: 1637075109 },
//   { n: 'battery', u: '%EL', v: 74.7 },
//   { n: 'rssi', u: 'dBW', v: -125 },
//   { n: 'ext_pwr', vb: true },
//   { n: 'update', vb: true },
//   { n: 'c1_status', vb: false },
//   { n: 'c2_status', vb: false },
//   { n: 'relay', vs: 'NC' },
//   { n: '288fd1ec09000096', u: 'Cel', v: 24.8 },
//   { n: 'emc_e1_curr', u: 'A', v: 0 },
//   { n: 'emc_e2_curr', u: 'A', v: 0.0004 },
//   { n: 'emc_e3_curr', u: 'A', v: 0.0003 },
//   { n: 'emc_e4_curr', u: 'A', v: 0.0003 },
// ];

// console.table(data);

// rl.question('Press [Enter] to exit...', () => process.exit());
