const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Lecturer = require('../models/Lecturer');
const Student = require('../models/Student');
const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res) => {
	try {
		const { email, password, type } = req.body;
		const UserModel = type === "lecturer" ? Lecturer : Student;

		const user = await UserModel.findOne({ email });
		if (!user) return res.status(401).json({ message: 'User not found' });

		const isPasswordCorrect = bcrypt.compareSync(password, user.password);
		if (!isPasswordCorrect) return res.status(401).json({ message: 'Wrong password' });

		const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
		res.json({ token });

	} catch (err) {
		console.error('Login error:', err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const changePassword= async (req, res) => {
	try {
		const { email, oldPassword, newPassword, type } = req.body;
	
		const UserModel = type === 'lecturer' ? Lecturer : Student;
		const user = await UserModel.findOne({ email });
	
		if (!user) return res.status(404).json({ message: 'User not found' });
	
		const isPasswordCorrect = bcrypt.compareSync(oldPassword, user.password);
		if (!isPasswordCorrect) {
		  return res.status(401).json({ message: 'Incorrect old password' });
		}
	
		const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
		user.password = hashedNewPassword;
		await user.save();
	
		res.json({ message: 'Password changed successfully' });
	} catch (err) {
		console.error('Change password error:', err);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const signup= async(req, res)=>{
	try {
		const { name, email, password, type, id=0 } = req.body;
		const UserModel = type === 'lecturer' ? Lecturer : Student;

		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
		  return res.status(400).json({ message: 'Email already exists' });
		}
	
		const hashedPassword = bcrypt.hashSync(password, 10);
		
		const newUser = type=="lecturer"? new Lecturer({
		  name,
		  email,
		  password: hashedPassword,
		  role: 'lecturer' 
		}):
		new Student({
			_id: id,
			name,
			email,
			password: hashedPassword,
			role: 'student'
		})

	
		await newUser.save();
	
		res.status(201).json({ message: 'User registered successfully' });
	  } catch (err) {
		console.error('Register error:', err);
		res.status(500).json({ message: 'Internal server error' });
	  }
}

module.exports={changePassword, login, signup}