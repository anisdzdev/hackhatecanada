const helper = require('../utils/helper')
const schemes = require('../models/mongoose');
const {performance} = require('perf_hooks');
const config = require('../../../config');

const dataset = ["Jews"]

module.exports.check = async (req, res) => {
  let link = await schemes.Link.findOne({url: req.params.url})
  if (link == null){
    //send request to start new crawling job
    return res.status(404).send();
  }
  res.status(200).json(link);
}

module.exports.analyse = async (req, res) => {
  let link = await schemes.Link.findOne({url: req.body.url})
  if (link != null)
    return res.status(200).send({message: 'Page was already in database', link})

  const contents = await helper.get_web_content(req.body.url)
  if(contents == null)
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
    })
    link.save();
    const endTime = performance.now()
    res.status(201).json({ time_taken: endTime - startTime, is_harmful: true, url: req.body.url });
  }
  const endTime = performance.now()
  res.status(200).json({ time_taken: endTime - startTime, is_harmful: false, url: req.body.url });
};

module.exports.report = async (req, res) => {
  let link = await schemes.Link.findOne({url: req.body.url})
  if (link != null) {
    if (!link.is_reported) {
      return res.status(200).send({message: 'Page was already in database', link})
    }
    let times = link.times_reported + 1
    if(req.body.words)
      req.body.words.map(word => {
        if(link.hate_words.indexOf(word) === -1){
          link.hate_words.push(word)
          if(times > config.minTimesReportedToConsiderTrue)
            dataset.push(word)
        }
      })
    link = await schemes.Link.findOneAndUpdate({url: req.body.url}, {times_reported: times, hate_words: link.hate_words}, {new: true})
    return res.status(200).send({message: `Reported website for the ${times}th time`, link})
  } else {
    link = schemes.Link({
      url: req.body.url,
      is_harmful: true,
      hate_words: req.body.words ? req.body.words : [],
      last_updated: new Date(),
      is_reported: true,
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