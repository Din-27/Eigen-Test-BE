const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const { version } = require('../../../../../package.json')

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Technical Test PT EIGEN TRI MATHEMA',
			version
		},
	},
	apis: ['./src/http/routes/*.routes.js']
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
	app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
