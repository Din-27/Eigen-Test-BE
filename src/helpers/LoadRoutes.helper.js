const fs = require('fs')
const path = require('path');
const swaggerDocs = require('../http/middlewares/swagger.middleware');

const loadRoutes = (dir, router) => {
    swaggerDocs(router);
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            const subRouter = express.Router();
            router.use(`/api/v1/${file}`, subRouter);
            loadRoutes(fullPath, subRouter);
        } else if (stat.isFile() && file.endsWith('.js')) {
            const route = require(fullPath);
            const routePath = file === 'index.routes.js' ? '/' : `/${file.replace('.routes.js', '')}`;
            router.use(`/api/v1${routePath}`, route);
        }
    });
};

module.exports = loadRoutes