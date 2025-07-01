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
		origin: ['https://fashion-store-three-gamma.vercel.app', 'http://localhost:3000'],
		methods: ['GET', 'POST'],
		credentials: true,
	},
})
export class PaymentGateway {
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

	@SubscribeMessage('send-money')
	handleEvent(@MessageBody() data: string): string {
		this.server.emit('receive-money', {
			data: `Money: ${data}`,
		})
		return data
	}
	emitPaymentEvent(paymentData: { status: string }) {
		this.server.emit('payment', paymentData)
	}
}
