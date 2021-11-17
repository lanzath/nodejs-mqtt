## Instruções de tópicos e mensagems para comunicação com o dispositivo.

#### Controle de Relé:
- Tópico: `its/165063/relay`

**Mensagens**:
```js
  { n: "relay", vs: "NO" } // comando relé on
  { n: "relay", vs: "NC" } // comando relé off
  { n: "relay", u: "/" vs: "NC", t: 500 } // comando para que o relé volte ao estado anterior depois de x segundo
```

#### Configurações
- Tópico: `its/165063/sys/config`

**Mensagens**
```js
{ sampling_period: 300 } // configura o tempo de amostragem em x segundos

/*
*  0 - enviará a leitura de todos os sensores após cada ciclo de leitura de dados
*  1 - Enviará a leitura dos sensores, mas só enviará eventos do relé e contato seco caso apresentarem mudança de status
*  7 - Somente enviará a leitura dos sensores que apresentarem variação significativa
*/
{ data_control: 0 }
```

#### Informações
- Tópico: `its/165063/sys/info`

**Mensagens**
```js
{ n: "info", u: "/", vb: true } // recebe as configurações atuais do dispositivo
{ n: "read_all", u: "/", vb: true } // recebe mensagem com todos os dados dos sensores
{ n: "map_devices", u: "/", vb: true } // atualiza a lista de dispositivos mapeados, removendo os que não encontroue adicionando os novos, caso haja
```

- Tópico: `its/165063/sys/reboot`

**Mensagens**
```js
{ n: "reboot", u: "/", vb: true } // reinicia o dispositivo
```