export const filterProducts = (queries, products) => {
	let filterProducts = products.rows
	const { categories, categoryForId } = queries

	let newCategories

	if (categories) {
		newCategories = JSON.parse(categories)
	}

	if (categoryForId) {
		filterProducts = filterProducts.filter(
			product => product.categoryForId === categoryForId
		)
	}

	if (newCategories && newCategories.length) {
		filterProducts = filterProducts.filter(product => {
			const candidate = categories.some(
				category => category === product.categoryId
			)

			if (candidate) return product
		})
	}

	products.rows = filterProducts

	return products
}
