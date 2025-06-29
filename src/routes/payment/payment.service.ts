import { Injectable } from '@nestjs/common'
import { PaymentRepo } from 'src/routes/payment/payment.repo'
import { WebhookPaymentBodyType } from 'src/routes/payment/payment.model'
import { SharedWebsocketRepository } from 'src/shared/repositories/shared-websocket.repo'
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { generateRoomUserId } from 'src/shared/helpers'
import { PaymentGateway } from 'src/websockets/payment.gateway'

@Injectable()
@WebSocketGateway({ namespace: 'payment' })
export class PaymentService {
	@WebSocketServer()
	server: Server
	constructor(
		private readonly paymentRepo: PaymentRepo,
		private readonly sharedWebsocketRepository: SharedWebsocketRepository,
		private readonly paymentGateway: PaymentGateway,
	) {}

	async receiver(body: WebhookPaymentBodyType) {
		const userId = await this.paymentRepo.receiver(body)
		// this.server.to(generateRoomUserId(userId)).emit('payment', {
		// 	status: 'success',
		// })
		// try {
		// 	const websockets = await this.sharedWebsocketRepository.findMany(userId)
		// 	websockets.forEach((ws) => {
		// 		this.server.to(ws.id).emit('payment', {
		// 			status: 'success',
		// 		})
		// 	})
		// } catch (error) {
		// 	console.log(error)
		// }
		if (userId) {
			this.paymentGateway.emitPaymentEvent({
				status: 'success',
			})
		}
		return {
			message: 'Payment received successfully',
		}
	}
}
