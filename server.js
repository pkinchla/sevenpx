const fastify = require('fastify')({
  logger: { level: 'error' },
  pluginTimeout: 0,
});

const next = require('next');
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler(app);

app.prepare().then(() => {
  fastify.all('*', (req, reply) => {
    return handle(req.raw, reply.raw).then(() => {
      reply.hijack(true);
    });
  });

  fastify.listen({ port }, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
