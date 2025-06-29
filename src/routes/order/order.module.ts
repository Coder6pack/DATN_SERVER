import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderRepo } from './order.repo'
import { OrderController } from 'src/routes/order/order.controller'
import { BullModule } from '@nestjs/bullmq'
import { PAYMENT_QUEUE_NAME } from 'src/shared/constants/queue.constant'
import { OrderProducer } from 'src/routes/order/order.producer'
import { OrderGateway } from 'src/websockets/order.gateway'

@Module({
	imports: [
		BullModule.registerQueue({
			name: PAYMENT_QUEUE_NAME,
		}),
	],
	providers: [OrderService, OrderRepo, OrderProducer, OrderGateway],
	controllers: [OrderController],
})
export class OrderModule {}
