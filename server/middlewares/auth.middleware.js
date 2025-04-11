const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader?.split(' ')[1];

	if (!token) return res.status(401).json({ message: 'Token missing' });

	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(403).json({ message: 'Invalid token' });
	}
}

module.exports = { authMiddleware };