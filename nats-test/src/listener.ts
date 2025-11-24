import nats, { Message } from 'node-nats-streaming'
import { randomBytes } from 'crypto';

console.clear()

const stan = nats.connect(
  'ticketing', randomBytes(4).toString('hex'), {
      url: 'http://localhost:4222'
  }
);

stan.on('connect', ()=>{
  console.log('listener! conneted to nats :)');

  stan.on('close', ()=>{
    console.log('NATS connection closed!');
    process.exit()
  })

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)


  const supscription = stan.subscribe(
    'ticket:created',
    'litenerQueueGroup',
    options
  );

  supscription.on('message', (msg: Message)=>{
    const data = msg.getData();
    if(typeof data === 'string'){
      console.log(`Recieved event number`, msg.getSequence(), `with data `, JSON.parse(data))
    }

    msg.ack()
  })

})

process.on("SIGINT", ()=> stan.close());
process.on("SIGTERM", ()=> stan.close());