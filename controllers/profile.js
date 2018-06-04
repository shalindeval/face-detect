const handleProfile = (req,res,db) =>{
	const {id} = req.params;
	db.select('*').from('users').where({'id':id})
	.then(response=>{
		if(response.length){
			res.json(response[0])
		}else{
			res.status(400).json("not found")
		}
	})
	.catch(err=> res.status('400').json("not found"))
}

module.exports = {
	handleProfile: handleProfile
}