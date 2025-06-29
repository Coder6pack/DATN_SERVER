import { Injectable } from '@nestjs/common'
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'
import { CreateOrderBodyType, GetOrderListQueryType, UpdateOrderBodyType } from 'src/routes/order/order.model'
import { OrderRepo } from 'src/routes/order/order.repo'
import { OrderGateway } from 'src/websockets/order.gateway'

@Injectable()
@WebSocketGateway({ namespace: 'orders' })
export class OrderService {
	@WebSocketServer()
	server: Server
	constructor(
		private readonly orderRepo: OrderRepo,
		private readonly orderGateway: OrderGateway,
	) {}
	async listManage(query: GetOrderListQueryType) {
		return this.orderRepo.listManage(query)
	}

	async list(userId: number, query: GetOrderListQueryType) {
		return this.orderRepo.list(userId, query)
	}

	async create(userId: number, body: CreateOrderBodyType) {
		const result = await this.orderRepo.create(userId, body)
		return result
	}

	cancel(userId: number, orderId: number) {
		return this.orderRepo.cancel(userId, orderId)
	}

	detailManage(orderId: number) {
		return this.orderRepo.detailManage(orderId)
	}

	detail(userId: number, orderId: number) {
		return this.orderRepo.detail(userId, orderId)
	}

	async update({ userId, orderId, body }: { userId: number; orderId: number; body: UpdateOrderBodyType }) {
		const data = await this.orderRepo.update({
			userId,
			orderId,
			body,
		})
		if (data) {
			this.orderGateway.emitOrderEvent({
				status: 'success',
			})
		}
		return this.orderRepo.update({
			userId,
			orderId,
			body,
		})
	}
}
