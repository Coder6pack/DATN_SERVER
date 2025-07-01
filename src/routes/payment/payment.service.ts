import { Injectable } from '@nestjs/common'
import { PaymentRepo } from 'src/routes/payment/payment.repo'
import { WebhookPaymentBodyType } from 'src/routes/payment/payment.model'
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { PaymentGateway } from 'src/websockets/payment.gateway'

@Injectable()
@WebSocketGateway({ namespace: 'payment' })
export class PaymentService {
	@WebSocketServer()
	server: Server
	constructor(
		private readonly paymentRepo: PaymentRepo,
		private readonly paymentGateway: PaymentGateway,
	) {}

	async receiver(body: WebhookPaymentBodyType) {
		const userId = await this.paymentRepo.receiver(body)
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
