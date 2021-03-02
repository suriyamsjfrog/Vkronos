const jwt = require('jsonwebtoken');

async function auth(req, res) {
	let token = req.header('x-auth-token');
	console.log('testing token');
	console.log(token);
	if (!token)
		return res.status(403).json({
			auth: 'No token sent'
		});
	try {
		var result = jwt.verify(token, 'secret');
		req.body.user_name = result.user_name;
		req.body.login_time=result.login_time;
		req.body.email_=result.email_;
		console.log('Here inside auth/auth : user type is  : ', result.type);
		console.log(result.type);
		let val=1;
		return val;
	} catch (err) {
	console.log("Tokenexpired");
	let v=0;
	return v;
	}
}
module.exports = auth;