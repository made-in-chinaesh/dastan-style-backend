require('pg')
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { SequelizeModule } from '@nestjs/sequelize'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'
import { AuthModule } from './auth/auth.module'
import { BasketsModule } from './baskets/baskets.module'
import { BasketProducts } from './baskets/models/basket-products.model'
import { Basket } from './baskets/models/baskets.model'
import { Category } from './categories/categories.model'
import { CategoriesModule } from './categories/categories.module'
import { CategoryFor } from './category-for/category-for.model'
import { CategoryForModule } from './category-for/category-for.module'
import { FilesModule } from './files/files.module'
import { ProductImages } from './product-images/product-images.model'
import { ProductImagesModule } from './product-images/product-images.module'
import { ProductInfo } from './product-infos/product-info.model'
import { ProductInfosModule } from './product-infos/product-infos.module'
import { ProductSizes } from './products/models/product-sizes.model'
import { Product } from './products/models/products.model'
import { ProductsModule } from './products/products.module'
import { Review } from './reviews/models/reviews.model'
import { ReviewsModule } from './reviews/reviews.module'
import { Role } from './roles/models/roles.model'
import { UserRoles } from './roles/models/user-roles.model'
import { RolesModule } from './roles/roles.module'
import { Size } from './sizes/sizes.model'
import { SizesModule } from './sizes/sizes.module'
import { TokensModule } from './tokens/tokens.module'
import { User } from './users/models/users.model'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		UsersModule,
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'postgres',
			password: 'bekaroot',
			database: 'chat',
			models: [
				User,
				Product,
				Category,
				CategoryFor,
				Size,
				ProductSizes,
				Role,
				UserRoles,
				ProductInfo,
				Basket,
				BasketProducts,
				ProductImages,
				Review,
			],
			autoLoadModels: true,
		}),
		JwtModule.register({}),
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		}),
		TokensModule,
		AuthModule,
		ProductsModule,
		CategoriesModule,
		FilesModule,
		CategoryForModule,
		RolesModule,
		SizesModule,
		ProductInfosModule,
		BasketsModule,
		ProductImagesModule,
		ReviewsModule,
	],
})
export class AppModule {}
