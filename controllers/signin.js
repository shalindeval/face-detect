
const handleSignIn = (req,res,db,bcrypt) => {
	const {email,password} = req.body;

	if(!email || !password){
		 return res.status(400).json("Fields can't be empty")
	}

	db.select('*').from('login').where('email','=',email)
	.then(user =>{

		const isValid = bcrypt.compareSync(password,user[0].hash)
		if(isValid){
			db.select('*').from('users').where({email})
			.then(user=>{
				res.json(user[0])
			})
			.catch(err=>res.status(400).json("not found here"))
		}else{
			res.status(400).json("unable to login")
		}
	})
	.catch(err=>res.status(400).json("not found"))
}

module.exports = {
	handleSignIn: handleSignIn
}