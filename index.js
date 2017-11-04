let http = require('http'),
  httpProxy = require('http-proxy'),
  proxy = httpProxy.createProxyServer({});

proxy.on('error', (err, req, res) => {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Something went wrong. And we are reporting a custom error message.'+err);
});

http.createServer((req, res) => {
  let host = req.headers.host,
    ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log("client ip:" + ip + ", host:" + host);

  switch (host) {
    case 'thepan.co':
      proxy.web(req, res, {
        target: 'https://104.198.1.41'
      });
      break;
    default:
      res.writeHead(200, {
        'Content-Type': 'text/plain'
      });
      res.end('Welcome to my server!');
  }
}).listen(80);

