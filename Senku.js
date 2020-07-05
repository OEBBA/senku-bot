console.log('Ten Billion');

var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

//getline
var text = fs.readFileSync("facts.txt").toString('utf-8');
var textByLine = text.split("\n")

var tip = fs.readFileSync("facts.txt").toString('utf-8');
var tipByLine = tip.split("\n")

const WolframAlphaAPI = require('wolfram-alpha-api');
const waApi = WolframAlphaAPI('L66ATQ-7YGXLW9UV4');

var T = new Twit(config.twitter);
var i = 0;


function random_from_array(images) {
    return images[Math.floor(Math.random() * images.length)];
}

function upload_random_image(images) {
    console.log('Opening an image...');
    var image_path = path.join(__dirname, '/images/' + random_from_array(images)),
        b64content = fs.readFileSync(image_path, { encoding: 'base64' });

    console.log('Uploading an image...');

    T.post('media/upload', { media_data: b64content }, function (err, data, response) {
        if (err) {
            console.log('ERROR:');
            console.log(err);
        }
        else {
            console.log('Image uploaded!');
            console.log('Now tweeting it...');

            var tweet = {
                status: '',
                media_ids: new Array(data.media_id_string)
            }

            tweet.status = textByLine[Math.floor(Math.random() * textByLine.length)];

            T.post('statuses/update', tweet, tweeted);

            function tweeted(err, data, response) {
                if (err) {
                    console.log("Something Went Wrong")
                } else console.log("It Worked")
            }
        }
    });
}

/*
const fs = require('fs');


var Twit = require('twit')


var T = new Twit({
    consumer_key: 'BSyHwxOGFs8LP2f02ZikWvpQt',
    consumer_secret: 'q2pzk976ZteowV1y87Cuw6iD0SVOHH305oIXsIjvBY7IemGmpe',
    access_token: '1239294115113832448-VIAwUMxIYlPZo8bT5TgupmU9ePasfo',
    access_token_secret: 'XCOPVGAa41VcQJkZg4r3zFmpSxu54YqZLo3U3Ldvr1ZHf',
})




var i = 0;

    
   
    setInterval(function () {
        
        

        
        console.log(tweet.status);
        i++
    }, 1000 *60*180);
   */




fs.readdir(__dirname + '/images', function (err, files) {
    if (err) {
        console.log(err);
    }
    else {
        var images = [];
        files.forEach(function (f) {
            images.push(f);
        });

        /*
          You have two options here. Either you will keep your bot running, and upload images using setInterval (see below; 10000 means '10 milliseconds', or 10 seconds), --
        */
    
        setInterval(function () {
            upload_random_image(images);
            i++;
        }, 1000 * 60 * 720);

        //Second Sequence

        function upload_random_tip(images) {
            console.log('Opening an image...');
            var image_path = path.join(__dirname, '/images/' + random_from_array(images)),
                b64content = fs.readFileSync(image_path, { encoding: 'base64' });

            console.log('Uploading an image...');

            T.post('media/upload', { media_data: b64content }, function (err, data, response) {
                if (err) {
                    console.log('ERROR:');
                    console.log(err);
                }
                else {
                    console.log('Image uploaded!');
                    console.log('Now tweeting it...');

                    var tweet = {
                        status: '',
                        media_ids: new Array(data.media_id_string)
                    }

                    tweet.status = tipByLine[Math.floor(Math.random() * tipByLine.length)];

                    T.post('statuses/update', tweet, tweeted);

                    function tweeted(err, data, response) {
                        if (err) {
                            console.log("Something Went Wrong")
                        } else console.log("It Worked")
                    }
                }
            });
        }

        upload_random_tip(images);
        i++;
     ]

        // upload_random_image(images);

        //Reply to questions(broken)

      /*  var stream = T.stream('statuses/filter', { track: ['#AskSenku'] })
        stream.on('tweet', function (tweet) {
            console.log(tweet.text)
            var question = tweet.text.replace('#AskSenku', '');
            waApi.getShort(question).then(
                function answer(result) {

                    tweet = {
                        in_reply_to_status_id: tweet.id_str,
                        auto_populate_reply_metadata: true,
                        status: ''
                    }

                    tweet.status = result;
                    console.log(result + ': answer');

                    T.post('statuses/update', tweet, tweeted);

                    function tweeted(err, data, response) {
                        if (err) {
                            console.log("Something Went Wrong")
                        } else console.log("It Worked")
                    }
                }, function notime(){
                    tweet = {
                        in_reply_to_status_id: tweet.id_str,
                        auto_populate_reply_metadata: true,
                        status: ''
                    }

                    tweet.status = "I have no time to answer something like this! I'm busy!";

                    T.post('statuses/update', tweet, tweeted);

                    function tweeted(err, data, response) {
                        if (err) {
                            console.log("Something Went Wrong")
                        } else console.log("No time")
                    }
                });

        })
    }*/
});
