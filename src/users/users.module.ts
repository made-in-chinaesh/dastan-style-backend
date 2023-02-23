import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './models/users.model'
import { UsersController } from './users.controller'
import { Role } from '../roles/models/roles.model'
import { UserRoles } from '../roles/models/user-roles.model'
import { RolesModule } from '../roles/roles.module'
import { TokensModule } from '../tokens/tokens.module'
import { BasketsModule } from '../baskets/baskets.module'

@Module({
	imports: [
		SequelizeModule.forFeature([User, Role, UserRoles]),
		TokensModule,
		RolesModule,
		BasketsModule,
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
