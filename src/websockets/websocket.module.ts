import { Module } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'
import { PaymentGateway } from './payment.gateway'
import { OrderGateway } from './order.gateway'

@Module({
	imports: [ChatGateway, PaymentGateway, OrderGateway],
})
export class WebsocketModule {}
