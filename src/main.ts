import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import envConfig from './shared/config'
// import { WebSocketAdapter } from './websockets/websocket.adapter'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	app.enableCors({
		// origin: 'http://localhost:3000', // Chỉ định origin của client
		origin: 'https://fashion-store-three-gamma.vercel.app', // Chỉ định origin của client
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	})
	// app.useWebSocketAdapter(new WebSocketAdapter(app))
	await app.listen(envConfig.PORT)
}
bootstrap()
