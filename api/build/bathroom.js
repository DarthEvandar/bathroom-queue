"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cors = require("cors");
var express = require("express");
var person_1 = require("./person");
var queue_1 = require("./queue");
var app = express();
app.use(cors());
app.use(express.json());
var queue = new queue_1.Queue();
app.post('/add/:name', function (req, res) {
    queue.add(new person_1.Person(req.params.name));
    res.send({
        success: true
    });
});
app.delete('/delete', function (req, res) {
    queue.remove();
    res.send({
        success: true
    });
});
app.get('/queue', function (req, res) {
    res.send({
        queue: queue.getQueue()
    });
});
app.get('/', function (req, res) {
    res.send('Bathroom API Working');
});
app.listen(8081, function () {
    console.log('Listening on 8081');
    setTimeout(function () {
        queue.cleanUp();
        console.log('cleaned up');
    }, 5000);
});
//# sourceMappingURL=bathroom.js.map