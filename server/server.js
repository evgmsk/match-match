/**
 * match-match-game
 */
import SC from '../configs/server-conf'
import paths from "../configs/paths"
import freePort from './free-port'
import opn from 'opn'
import express from "express"
const app = express();

// Wrap for the 'app.listen' which takes unused por from 'freePort'
const listen = (port) =>
    app.listen(port, function(err) {
        if(err) {
            console.log(err);
            return
        }
        let url = `${SC.protocol}${SC.host}:${port}`;
        opn(url);
        console.log(`Listening at ${url}`);
    });

app.use(express.static(paths.prodPath));

app.get('*', function(req, res) {
    res.sendFile(paths.htmlProdPath);
});

freePort(SC.port).then(listen, err => console.log(err));