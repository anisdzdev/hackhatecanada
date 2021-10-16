const helper = require('../utils/helper')
const schemes = require('../models/mongoose');
const { performance } = require('perf_hooks');
const config = require('../../../config');

const dataset = ["Jews"]

let bulkContainer;

module.exports.check = async (req, res) => {
  let link = await schemes.Link.findOne({ url: req.query.url })
  if (link == null) {
    //send request to start new crawling job
    return res.status(404).send();
  }
  res.status(200).json(link);
}

module.exports.analyse = async (req, res) => {
  let link = await schemes.Link.findOne({ url: req.body.url })
  if (link != null)
    return res.status(200).send({ message: 'Page was already in database', link })

  const contents = await helper.get_web_content(req.body.url)
  if (contents == null)
    return res.status(500).send("Could not successfully load this web page")

  const startTime = performance.now()
  if (new RegExp(dataset.join("|")).test(contents)) {
    link = schemes.Link({
      url: req.body.url,
      is_harmful: true,
      hate_words: [],
      last_updated: new Date(),
      is_reported: false,
      times_reported: 0
    });

    if (bulkContainer) {
      bulkContainer.insert(link);
      if (bulkContainer.length >= 50) {
        bulkContainer.execute((error, result) => {
          if (error) {
            console.log('Error happened while performing the operations to the database.')
          } else {
            // We reset the bulk container, to create a new one.
            bulkContainer = null;
          }
        });
      }
    } else {
      // If we don't have a bulkContainer defined, we create one and add then add the operation to it.
      bulkContainer = schemes.Link.collection.initializeUnorderedBulkOp();
      bulkContainer.insert(link);
    }

    const endTime = performance.now()
    res.status(201).json({ time_taken: endTime - startTime, is_harmful: true, url: req.body.url });
  } else {
    link = schemes.Link({
      url: req.body.url,
      is_harmful: false,
      hate_words: [],
      last_updated: new Date(),
      is_reported: false,
      times_reported: 0
    });
    link.save();
    const endTime = performance.now()
    res.status(200).json({ time_taken: endTime - startTime, is_harmful: false, url: req.body.url });
  }
};

module.exports.report = async (req, res) => {
  let link = await schemes.Link.findOne({ url: req.body.url })
  if (link != null) {
    if (!link.is_reported) {
      return res.status(200).send({ message: 'Page was already in database', link })
    }
    let times = link.times_reported + 1
    if(times > config.minTimesReportedToConsiderTrue)
      link.is_harmful = true
    if(req.body.words)
      req.body.words.map(word => {
        if (link.hate_words.indexOf(word) === -1) {
          link.hate_words.push(word)
          if (times > config.minTimesReportedToConsiderTrue)
            dataset.push(word)
        }
      })
    link = await schemes.Link.findOneAndUpdate({ url: req.body.url }, { times_reported: times, hate_words: link.hate_words }, { new: true })
    return res.status(200).send({ message: `Reported website for the ${times}th time`, link })
  } else {
    link = schemes.Link({
      url: req.body.url,
      is_harmful: true,
      hate_words: req.body.words ? req.body.words : [],
      last_updated: new Date(),
      is_reported: false,
      times_reported: 1
    })
    link.save();
    res.status(201).json(link);
  }

};

module.exports.reset = async (res) => {
  await schemes.Link.deleteMany({})
  res.send("Cleared Database !")
};