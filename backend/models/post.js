var mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://gurungabit:90ECxjuAy0wxmvdw@cluster0-rcldy.mongodb.net/AngularApp',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log('Connected to DB!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

const postSchema = mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String, require: true }
});

module.exports = mongoose.model('Post', postSchema);
