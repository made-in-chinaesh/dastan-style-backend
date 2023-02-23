import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { RolesController } from './roles.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from './models/roles.model'
import { User } from '../users/models/users.model'
import { TokensModule } from '../tokens/tokens.module'

@Module({
	imports: [SequelizeModule.forFeature([Role, User]), TokensModule],
	providers: [RolesService],
	controllers: [RolesController],
	exports: [RolesService],
})
export class RolesModule {}
