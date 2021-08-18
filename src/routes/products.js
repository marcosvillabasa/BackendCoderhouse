const express = require('express');
const router = express.Router();
const { Product } = require('../../Product');

const products = new Product();


router.get('/', (req, res) => {
	res.render('main.pug', { products: products.getAllProducts() }); // Se muestra la plantilla hello.pug
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
