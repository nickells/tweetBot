var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/newDb')

var chatSchema = mongoose.Schema({
	messages: Array,
  date: Date
})

var Chat = mongoose.model('Chat', chatSchema)

module.exports={
	Chat: Chat
}