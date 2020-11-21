const auth = require('basic-auth');
const compare = require('tsscmp');

const check = (name, pass) => {
    let valid = true; // Simple method to prevent short-circuit and use timing-safe compare   
    valid = compare(name, 'admin') && valid;
    valid = compare(pass, 'admin') && valid;

    return valid;
};

const basicAuth = (request, response, next) => {
    const credentials = auth(request);
    if (credentials && check(credentials.name, credentials.pass)) {
        return next();
    }

    response.set('WWW-Authenticate', 'Basic realm="my website"');
    return response.status(401).send("🙅🏻 nope");
};

module.exports = basicAuth;