const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Lecturer = require('../models/Lecturer');
const Student = require('../models/Student');
const SECRET_KEY = process.env.SECRET_KEY;

exports.login = async (req, res) => {
	try {
		const { username, password, type } = req.body;
		const UserModel = type === "lecturer" ? Lecturer : Student;

		const user = await UserModel.findOne({ username });
		if (!user) return res.status(401).json({ message: 'User not found' });

		const isPasswordCorrect = bcrypt.compareSync(password, user.password);
		if (!isPasswordCorrect) return res.status(401).json({ message: 'Wrong password' });

		const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
		res.json({ token });

	} catch (err) {
		console.error('Login error:', err);
		res.status(500).json({ message: 'Internal server error' });
	}
};