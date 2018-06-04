const handleregister = (req,res,db,bcrypt) => {

	const {email,password,name} = req.body
	if(!email || !password || !name){
		 return res.status(400).json("Fields can't be empty")
	}

	const hash = bcrypt.hashSync(req.body.password,8)
		db.transaction(trx=>{
			trx.insert({
				email: req.body.email,
				hash: hash
			})
			.into('login')
			.returning('email')
			.then(loginEmail =>{
				 db('users')
				.returning('*')
				.insert({
					email: loginEmail[0],
					name: req.body.name,
					joined: new Date()
				}).then(user =>{
				console.log["these: " + user]
				res.json(user[0])
			}).catch(err => res.status(400).json(err))
			.then(trx.commit)
			.catch(trx.rollback)
		
			})
	}).catch(err=>res.status(400).json("unable to register"))
}

module.exports = {
	handleregister: handleregister
}