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

	deleteProduct(id) {
		this.products = this.products.filter((prod) => prod.id !== id);
	}

	updateProduct(id, title, price, thumbnail) {
		this.products.forEach((prod) => {
			if (prod.id === id) {
				prod.title = title || prod.title;
				prod.price = price || prod.price;
				prod.thumbnail = thumbnail || prod.thumbnail;
			}
		});
	}
}

module.exports = {
	Product,
};
