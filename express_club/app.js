const express = require('express')
const { getBlogList, getBlogMembers, updatenew, createNew, updateBlog, deleteBlog } = require("./src/controllers/blog");
const app = express()
const fs = require('fs')
const querystring = require('querystring');

const cors = require('cors')

const corsOptions = {
    origin: 1
};
app.use(cors(corsOptions));

app.get('/list', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    const list = getBlogList(1);
    if (list) {
        list.then(listdata => {
            res.end(
                JSON.stringify(listdata)
            )
        })
        return;
    }
})
app.get('/list/body', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    const list = getBlogList(2);
    if (list) {
        list.then(listdata => {
            res.end(
                JSON.stringify(listdata)
            )
        })
        return;
    }
})
app.get('/list/fixtures', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    const list = getBlogList(3);
    if (list) {
        list.then(listdata => {
            res.end(
                JSON.stringify(listdata)
            )
        })
        return;
    }
})

app.get('/list/clubs', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    const list = getBlogList(4);
    if (list) {
        list.then(listdata => {
            res.end(
                JSON.stringify(listdata)
            )
        })
        return;
    }
})
app.get('/list/teams', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    const list = getBlogList(5);
    if (list) {
        list.then(listdata => {
            res.end(
                JSON.stringify(listdata)
            )
        })
        return;
    }
})

app.post('/list/members', express.json(), function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST');
    const list = getBlogMembers(req.body);
    if (list) {
        list.then(listdata => {
            res.end(
                JSON.stringify(listdata)
            )
        })
        return;
    }
})


app.post('/list/members/update', express.json(), function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST');
    const list = updateBlog(req.body);
    if (list) {
        list.then(listdata => {
            res.send('1')
            // res.end(
            //     JSON.stringify(listdata)
            // )
        })
        return;
    }

})
app.post('/list/delete', express.json(), function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST');
    const list = deleteBlog(req.body.ID, req.body.database);
    if (list) {
        list.then(listdata => {
            res.end('1')
        })
        return;
    }
})
app.post('/list/update', express.json(), function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST');
    
    const list = updatenew(req.body);
    
    if (list) {
        list.then(listdata => {
            // console.log(listdata)
            res.end('1')
        })
        return;
    }
})
app.post('/list/new', express.json(), function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST');
    // console.log(req.body)
    const list = createNew(req.body);
    if (list) {
        list.then(listdata => {
            res.end('1')
        })
        return;
    }
})
app.listen(5000, () => {
    console.log('running at 5000')
})