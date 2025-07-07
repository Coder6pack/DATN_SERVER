import { Module } from '@nestjs/common'
import { PaymentGateway } from './payment.gateway'
import { OrderGateway } from './order.gateway'
import { ChatGateway } from './chat.gateway'

@Module({
	imports: [PaymentGateway, OrderGateway, ChatGateway],
})
export class WebsocketModule {}
