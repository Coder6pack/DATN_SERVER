import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway({
	cors: {
		origin: 'https://fashion-store-three-gamma.vercel.app', // Chỉ định rõ origin của client Next.js
		methods: ['GET', 'POST'],
		credentials: true,
	},
})
export class OrderGateway {
	@WebSocketServer()
	server: Server

	// afterInit(server: Server) {
	//   console.log('WebSocket server initialized')
	// }

	handleConnection(client: Socket, ...args: any[]) {
		console.log(`Client connected: ${client.id}`)
	}

	handleDisconnect(client: Socket) {
		console.log(`Client disconnected: ${client.id}`)
	}

	emitOrderEvent(paymentData: { status: string }) {
		this.server.emit('orders', paymentData)
	}
}
