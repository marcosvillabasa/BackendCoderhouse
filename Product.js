class Product {
	products = [];

	getAllProducts() {
		return this.products;
	}

	save(product) {
		this.products.push({ id: this.products.length + 1, ...product });
	}

	getByID(id) {
		return this.products.find((prod) => prod.id === id);
	}
}

module.exports = {
	Product,
};
