const redis=require('redis')

const client=redis.createClient({PORT:3000, host: "192.168.42.12"});


client.on('connect', () => {
    console.log('Client Connected to Redis')
})

client.on('ready', () => {
    console.log('Client Connected to Redis and ready to use')
})

client.on('error', (error) =>{
    console.log(error.message)
})

client.on('end', () => {
    console.log('Client disconnected form Redis')
})

process.on('SIGINT', () => {
    client.quit()
})

module.exports={client}