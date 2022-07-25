const Router = require('express').Router;
const router = new Router();
var { Readability } = require('@mozilla/readability');
var { JSDOM } = require('jsdom');


router.route('/').get((req, res) => {
    res.json({
        message: "Welcome to 🚀 Mozilla Readability API! Endpoint: /parser; POST here an HTML body and it will return a parsed article. Don't forget your Content-Types, which should be text/html.",
    });
});

router.route('/parser').post(async (req, res) => {
    let result = { message: "No HTML was provided. Make sure you include your UTF-8 HTML as POST body. If so, make sure you set 'Content-Type: text/html' in headers." };
    let rbody = String(req.body);
    //console.log(`Body: ${req.body}`);
    //console.log(`Body len: ${req.body.length}`);
    //console.log(`StringBody len: ${rbody.length}`);
    if (req.body) {
        try {
            doc = new JSDOM(req.body);
            let reader = new Readability(doc.window.document);
            result = reader.parse();
            if (req.headers.url) {
            	result.url = req.headers.url
            }
            
        } catch (error) {
            result = { error: true, messages: error.message };
        }
    }
    return res.json(result);
});

module.exports = router;
