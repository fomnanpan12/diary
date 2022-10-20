const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
   email: {
      type : String,
    },
   dlog: {
      type : String,
   },
   created: { type: Date, default: Date.now },
});

const Diary = new mongoose.model('Diary',diarySchema);
module.exports = Diary;
