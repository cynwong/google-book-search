const axios = require('axios');
const router = require("express").Router();

// Matches with "/api/search/:searchTerm"
router
	.route("/:searchTerm")
	.get((req,res) => {
		const { searchTerm } = req.params;

		axios.get(
			process.env.GOOGLE_API,
			{
				params: { q: searchTerm }, 
				headers: {
					'Content-Type': 'application/json',
				}
			}
		).then(({ data })=> {
			const response = data.items.map(({
				id,
				volumeInfo: {
					title,
					authors,
					description,
					imageLinks,
					infoLink: link
				}
			}) => {
				return {
					id, 
					title,
					authors,
					description,
					image: imageLinks ? imageLinks.thumbnail : '',
					link
				}
			});
			res.status(200).json(response);

		}).catch((err) => {
			console.error(err);
			res
				.status(500)
				.json({ message: 'Something went wrong. Try again later.'});
		})
	});


module.exports = router;
