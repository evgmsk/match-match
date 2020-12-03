/**
 * match-match-game
 */
import net from 'net'

//helper function with promise to find unused port
const freePortPromise = (port) => new Promise( (resolve, reject) => {
    const test_port = net.createServer()
        .once('error', err => {
            if (err.code !== 'EADDRINUSE')
                return reject(err);
            else
                return resolve(freePortPromise(port + 1))
        })
        .once('listening', () => {
            test_port.once('close', () => resolve(port)).close()
        })
        .listen(port);
});

export default freePortPromise
