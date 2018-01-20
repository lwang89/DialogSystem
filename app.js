/*
 * this aims to bulid a weather checking or forcasting chatbot.
 *
 */

'use strict';

const RedisServer = require('redis-server');

// Simply pass the port that you want a Redis server to listen on.
//const server = new RedisServer(6379);

// server.open((err) => {
//   if (err === null) {
//     // You may now connect a client to the Redis
//     // server bound to `server.port` (e.g. 6379).
//   }
// });
// Imports dependencies and set up http server
const
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  app = express().use(body_parser.json()); // creates express http server
//var RedisStore = require('connect-redis')(express);
const DateDiff = require('date-diff');
const weather = require('./weather.js');
// const redis = require('redis');

app.use(cookieParser());
// app.use(session({secret: "Shh, its a secret!"}));

app.use(session({
    secret: 'ssssssss',
    // name: cookie_name,
    //  store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
var sess;
global.session = {
             "time" : null,
             "greetings" : null,
             "contact" : null,
             "location": null,
             "weather": {}
            };
const PAGE_ACCESS_TOKEN = "EAAC8iZAUCVqkBADahe63LyijJ4C24TZAMPEkGbZBVKQKzLiUi74vGz5ictXXHSBZBC127y0ZCgf3pAldqowvE5Kc0Ttkmwc5b8zY2TTnICS482wZBLRQHSbHexC5N3msD1eJttV4ZA1kYaMqQZBO5R6o5hSKD2Tgsvi8Bj7te7zZC1SwdqZBgM8tlSwU90GmijDcMZD"


// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {
  // Parse the request body from the POST
  let body = req.body;
  console.log('body : '+(body));
  // sess=req.session;
  // sess.username;
  // sess.contact;
  // sess.time;
  // sess.location;

  //console.log('##########' + typeof sess.username);
  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Get the webhook event. entry.messaging is an array, but
      // will only ever contain one event, so we get index 0
      let webhook_event = entry.messaging[0];
      //console.log(req.session.secret);
      let entity = webhook_event.message.nlp.entities

      //add these infos to a temp place
      if (typeof entity.datetime != 'undefined' && entity.datetime.length > 0 ) {
        //query.time = entity.datetime[0].value;
        console.log(global.session);
        if(typeof global.session.time == 'undefined' || global.session.time == null) {
          //sess.time = entity.datetime[0].value;
        //   global.session.time = entity.datetime[0].value;
        //   console.log("1111111111the the time we got is: " + entity.datetime[0].value);
        //   console.log("1111111111the time saved in the session is: " + global.session.time);
        // } else if (global.session.time == null) {
          //sess.time = entity.datetime[0].value;
          global.session.time = entity.datetime[0].value;
          console.log("2222222222222the time saved in the session is: " + global.session.time);
        } else {
          //we have save time from the dialog
          console.log("3333333the time saved in the session is: " + global.session.time);
        }
      }

      if (typeof entity.greetings != 'undefined' && entity.greetings.length > 0 ) {
        global.session.greetings = entity.greetings[0].value;
      }
      //console.log(query.greetings);

      if (typeof entity.contact != 'undefined' && entity.contact.length > 0 ) {
        global.session.contact = entity.contact[0].value;
      }


      if (typeof entity.location != 'undefined' && entity.location.length > 0 ) {
        global.session.location = entity.location[0].value;
      }

//         console.log('type: ' + typeof query.time);
//         console.log('type: ' + typeof query.location);
//         console.log('true or false: ' + query.time != null);
//         console.log('true or false: ' + query.location != null);
//         console.log('true or false: ' + query.time != null && query.location != null);

      generateWeatherResponse(global.session, webhook_event);


    });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});

// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {

  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = "ojasdgjkajga";

  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Check if a token and mode were sent
  if (mode && token) {

    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// Handles messages events
function handleMessage(sender_psid, received_message,query) {

  let response;

  // Check if the message contains text
  if (received_message.text) {

    // Create the payload for a basic text message
    //this part we will response first, then add nlg part to generate a sentence.
    console.log("the weather we get is: " + JSON.stringify(query));
    response = {
      "text": `You sent the message: "${received_message.text}. The temp today is ${query.weather.main.temp}". sent from Leon's local machine.`
    }
    //console.log('pos tagger is working now!!!!');
  } else if (received_message.attachments) {

    // Gets the URL of the message attachment
    let attachment_url = received_message.attachments[0].payload.url;

    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": [{
            "title": "Is this the right picture?",
            "subtitle": "Tap a button to answer.",
            "image_url": attachment_url,
            "buttons": [
              {
                "type": "postback",
                "title": "Yes!",
                "payload": "yes",
              },
              {
                "type": "postback",
                "title": "No!",
                "payload": "no",
              }
            ],
          }]
        }
      }
    }
  }

  // Sends the response message
  callSendAPI(sender_psid, response);

}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {

  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  // Set the response based on the postback payload
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') {
    response = { "text": "Oops, try sending another image." }
  }
  // Send the message to acknowledge the postback
  callSendAPI(sender_psid, response);

}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {

  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  });

}

function firstEntity(nlp, name) {
  return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
}

function generateWeatherResponse(query, webhook_event) {
  if (query.time != null && query.location != null)  {
    //TODO query map api
    let now = new Date();
    let timestamp = Date.parse(query.time);
    let queryDate = new Date(timestamp);
    // console.log('now:' + now);
    // console.log('query: ' + queryDate);
    let diff = new DateDiff(now, queryDate);
    console.log(diff.days());

    if (diff.days() <= 5)  {
      //TODO
      weather.getWeather(query.location).then(function(resp) {
        global.session.weather = resp;
        //console.log("query's weather is: " + JSON.stringify(query.weather));

        // Get the sender PSID
        let sender_psid = webhook_event.sender.id;
        console.log('Sender PSID: ' + sender_psid);

        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function

        if (webhook_event.message) {
          handleMessage(sender_psid, webhook_event.message,global.session);
        } else if (webhook_event.postback) {
          handlePostback(sender_psid, webhook_event.postback);
        }
      }, function(err) {
        console.log(err);
      });
    }
    //console.log('**************');
  }
}
