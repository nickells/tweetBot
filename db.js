var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/newDb')

var postSchema = mongoose.Schema({
	title: {type: String, required: true},
	text: {type: String, required: true},
})

var Post = mongoose.model('Post', postSchema)

module.exports={
	Post: Post
}