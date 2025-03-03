export function htmlController(req, res) {
  const name = req.query.name || 'World';
  const html = [
    '<html><body>',
    `<h1>Hello ${name}!</h1>`,
    '</body></html>'
  ].join('\n');

  res.send(html);
}
