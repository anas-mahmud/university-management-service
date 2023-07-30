import path from 'path'
import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
const { combine, timestamp, label, printf, prettyPrint } = format

// custom log format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const data = new Date(timestamp)
  const hour = data.getHours()
  const minutes = data.getMinutes()
  const seconds = data.getSeconds()
  return `${data.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'University Management' }),
    timestamp(),
    myFormat,
    // prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'UM-%DATE%-success.log',
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'University Management !!' }),
    timestamp(),
    myFormat,
    prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'UM-%DATE%-error.log',
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { errorLogger, logger }
