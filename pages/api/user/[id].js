import fetch from 'isomorphic-unfetch';

export default async (req, res) => {
  const { id } = req.query;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  const data = await response.json();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ ...data }));
};
