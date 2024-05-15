const fs = require('fs')
const path = require('path')

const loadRoutes = (dir, router) => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            const subRouter = express.Router();
            router.use(`/${file}`, subRouter);
            loadRoutes(fullPath, subRouter);
        } else if (stat.isFile() && file.endsWith('.js')) {
            const route = require(fullPath);
            const routePath = file === 'index.routes.js' ? '/' : `/${file.replace('.routes.js', '')}`;
            router.use(routePath, route);
        }
    });
};

module.exports = loadRoutes