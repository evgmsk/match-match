/**
 * match-match-game
 */
//import path from 'path'
import SC from '../configs/server-conf'
import paths from "../configs/paths"
import opn from 'opn'
import express from "express"
import config from '../webpack.config';
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import freePort from './free-port' //helper function to find unused port
const compiler = webpack(config());
const app = express();

// Wrap for the 'app.listen' which takes unused port from 'freePort'
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

app.use(devMiddleware(compiler, {
    stats: 'minimal',
    publicPath: '/',
}));

app.use(hotMiddleware(compiler, {
    path: '/__webpack_hmr'
}));

app.get('*', function(req, res) {
    res.sendFile(paths.htmlDevPath);
});

freePort(SC.port).then(listen, err => console.log(err));