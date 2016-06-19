// connect to database
require('./db');

var mongoose = require('mongoose');

var faqs = {};

// Frequently Asked Questions
var FAQSchema = new mongoose.Schema({
  id: Number,
  question: String,
  answer: String
});
var FAQModel = mongoose.model('faqs', FAQSchema);

faqs.webSafeFAQ = function(faq) {
  return {id: faq.id,
    question: faq.question,
      answer: faq.answer};
}


/***** FAQ *****/

faqs.updateFAQs = function(newFAQs, callback) {
  // remove all old faqs
  FAQModel.remove({}, function(e) {
    if (e) {
      console.log("error removing faqs:", e);
      callback(e);
    }
    else {
      FAQModel.collection.insert(newFAQs, {}, function(err, faqs) {
        if (err) { console.log("error updating faqs:", err); }
        else {
          callback(null, faqs);        
        }
      });
    }
  });
};

// return array of all faq questions
faqs.getAllFAQs = function(callback) {
  FAQModel.find(function(err, res) {
    if (err) {
      callback(err);
    }
    else {
      var faqs = [];
      for (var i = 0; i < res.length; i++) {
        faqs.push(faqs.webSafeFAQ(res[i]));
      }
      callback(null, faqs);
    }
  });
};

// delete a faq question with the given id
faqs.deleteFAQ = function(id, callback) {
  FAQModel.remove({id: id}, function (e) {
    callback(e);
  });
};


module.exports = faqs;
