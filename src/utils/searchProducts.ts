import { Product } from '../products/models/products.model'

export const searchProducts = (products: Product[], query: string) => {
	const searchedProducts = products.filter(product => {
		const productName = product.name.toUpperCase()
		const searchQuery = query.toUpperCase()
		if (productName.includes(searchQuery)) {
			return product
		}
	})

	return searchedProducts
}
