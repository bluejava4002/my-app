import { Queue, Worker } from 'bullmq'

const redisUrl = new URL(process.env.REDIS_URL ?? 'redis://localhost:6379')

const connection = {
  host: redisUrl.hostname,
  port: Number(redisUrl.port) || 6379,
  password: redisUrl.password || undefined,
  username: redisUrl.username || undefined,
  maxRetriesPerRequest: null,
  tls: redisUrl.protocol === 'rediss:' ? {} : undefined,
}

export const emailQueue = new Queue('emails', { connection })

export const emailWorker = new Worker(
  'emails',
  async (job) => {
    console.log(`Traitement du job: ${job.name}`)
    console.log(`Données:`, job.data)

    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log(`Email envoyé à ${job.data.email} !`)
  },
  { connection }
)

emailWorker.on('completed', (job) => {
  console.log(`Job ${job.id} terminé !`)
})

emailWorker.on('failed', (job, err) => {
  console.error(`Job ${job?.id} échoué:`, err)
})
