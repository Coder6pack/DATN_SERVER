import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'
import { z } from 'zod'
const env = process.env.NODE_ENV
const envFilename = `.env.${env}`
if (!env) {
	console.log(`Bạn chưa cung cấp biến môi trường NODE_ENV (ví dụ: development, production)`)
	console.log(`Phát hiện NODE_ENV = ${env}`)
	process.exit(1)
}
console.log(`Phát hiện NODE_ENV = ${env}, vì thế app sẽ dùng file môi trường là ${envFilename}`)
if (!fs.existsSync(path.resolve(envFilename))) {
	console.log(`Không tìm thấy file môi trường ${envFilename}`)
	console.log(`Lưu ý: App không dùng file .env, ví dụ môi trường là development thì app sẽ dùng file .env.development`)
	console.log(`Vui lòng tạo file ${envFilename} và tham khảo nội dung ở file .env.example`)
	process.exit(1)
}
console.log('env', env)

// Chắc chắn rằng đọc file .env
config({
	path: envFilename,
})

// Kiểm tra xem đã có file .env chưa
if (!fs.existsSync(path.resolve('.env'))) {
	console.log('Không tìm thấy file .env')
	process.exit(1)
}

const configSchema = z.object({
	DATABASE_URL: z.string(),
	ACCESS_TOKEN_SECRET: z.string(),
	ACCESS_TOKEN_EXPIRES_IN: z.string(),
	REFRESH_TOKEN_SECRET: z.string(),
	REFRESH_TOKEN_EXPIRES_IN: z.string(),
	PAYMENT_API_KEY: z.string(),
	ADMIN_NAME: z.string(),
	ADMIN_EMAIL: z.string(),
	ADMIN_PASSWORD: z.string(),
	ADMIN_PHONE_NUMBER: z.string(),
	OTP_EXPIRES_IN: z.string(),
	RESEND_OTP_API_KEY_SECRET: z.string(),
	GOOGLE_OAUTH_CLIENT_ID: z.string(),
	GOOGLE_OAUTH_CLIENT_SECRET: z.string(),
	GOOGLE_OAUTH_REDIRECT_URI: z.string(),
	GOOGLE_OAUTH_REDIRECT_CLIENT: z.string(),
	APP_NAME: z.string(),
	PREFIX_STATIC_ENDPOINT: z.string(),
	S3_BUCKET_NAME: z.string(),
	S3_REGION: z.string(),
	S3_ACCESS_KEY: z.string(),
	S3_SECRET_KEY: z.string(),
	S3_ENDPOINT: z.string(),
})
const configServer = configSchema.safeParse(process.env)

if (!configServer.success) {
	console.log('Các giá trị khai báo trong file .env không hợp lệ')
	console.error(configServer.error)
	process.exit(1)
}
const envConfig = configServer.data
export default envConfig
