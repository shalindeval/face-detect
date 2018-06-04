const Clarifai = require('clarifai')

const app = new Clarifai.App({
 apiKey: 'ec8b8027f37a4603a0ba8b10d5736100'
})

const handleApiCall = (req,res) =>{
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data=>{res.json(data); console.log(data)})
	.catch(err => res.json(err))

}

const handleImage = (req,res,db) =>{
	const {id} = req.body
	db('users').where({id})
	.increment('entries',1)
	.returning('entries')
	.then(response => res.json(response[0]))
	.catch(err => res.status(400).json("unable to update"))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall:handleApiCall
}