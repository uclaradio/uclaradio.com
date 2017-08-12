// connect to database
require('./db');

const mongoose = require('mongoose');

const faqs = {};

// Frequently Asked Questions
const FAQSchema = new mongoose.Schema({
  id: Number,
  question: String,
  answer: String,
});
const FAQModel = mongoose.model('faqs', FAQSchema);

faqs.webSafeFAQ = function(faq) {
  return {
    id: faq.id,
    question: faq.question,
    answer: faq.answer,
  };
};

/** *** FAQ **** */

faqs.updateFAQs = function(newFAQs, callback) {
  // remove all old faqs
  FAQModel.remove({}, e => {
    if (e) {
      console.log('error removing faqs:', e);
      callback(e);
    } else {
      FAQModel.collection.insert(newFAQs, {}, (err, allFAQs) => {
        if (err) {
          console.log('error updating faqs:', err);
        } else {
          callback(null, allFAQs);
        }
      });
    }
  });
};

// return array of all faq questions
faqs.getAllFAQs = function(callback) {
  FAQModel.find((err, res) => {
    if (err) {
      callback(err);
    } else {
      const allFAQs = [];
      for (let i = 0; i < res.length; i++) {
        allFAQs.push(faqs.webSafeFAQ(res[i]));
      }
      callback(null, allFAQs);
    }
  });
};

// delete a faq question with the given id
faqs.deleteFAQ = function(id, callback) {
  FAQModel.remove({ id }, e => {
    callback(e);
  });
};

module.exports = faqs;
