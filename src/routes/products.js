const express = require('express');
const router = express.Router();
const { Product } = require('../../Product');

const products = new Product();


router.get('/', (req, res) => {
	// if (products.getAllProducts().length === 0) {
	// 	// res.status(400).json({
	// 	// 	ok: false,
	// 	// 	msg: 'There are no products',
	// 	// });
	// 	res.render('main')
	// }
	// res.json({
	// 	msg: 'Products',
	// 	data: products.getAllProducts(),
	// });
	res.render('main', {products: products.getAllProducts()})
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(400).json({
			ok: false,
			msg: 'Id invalid',
		});
	}
	const prod = products.getByID(parseInt(id));
	if (prod === undefined) {
		res.status(400).json({
			ok: false,
			msg: 'Product not found',
		});
	}
	res.status(200).json({
		msg: 'Product by id',
		data: prod,
	});
});

router.post('/save', (req, res) => {
	console.log(req.body)
	const { title, price, thumbnail } = req.body;
	if (!title || !price || !thumbnail) {
		res.status(400).json({
			ok: false,
			msg: 'Incomplete fields',
		});
	}
	products.save({ title, price, thumbnail });
	res.redirect('/api/products')
});

router.put('/update/:id', (req, res) => {
	const { title, price, thumbnail } = req.body;
	const { id } = req.params
	if (!id) {
		res.status(400).json({
			ok: false,
			msg: 'Id invalid',
		});
	}
	products.updateProduct(parseInt(req.params.id), title, price, thumbnail);
	res.status(201).json({
		ok: true,
		data: products,
	});
});

router.delete('/delete/:id', (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(400).json({
			ok: false,
			msg: 'Id invalid',
		});
	}
	products.deleteProduct(parseInt(id));
	res.status(201).json({
		ok: true,
		data: products,
	});
});

module.exports = router;
