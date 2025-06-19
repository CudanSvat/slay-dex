let pairs = [
  {
    id: 1,
    name: 'Dogecoin 2.0',
    address: '0x123...abc',
    logo: '',
    description: 'The ultimate meme coin',
    status: 'approved',
  },
  {
    id: 2,
    name: 'Pepe Stark',
    address: '0x456...def',
    logo: '',
    description: 'Frog on Starknet',
    status: 'approved',
  },
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ pairs });
  } else if (req.method === 'POST') {
    const { address, name, logo, description } = req.body;
    if (!address || !name) {
      return res.status(400).json({ error: 'address and name required' });
    }
    const newPair = {
      id: Date.now(),
      address,
      name,
      logo: logo || '',
      description: description || '',
      status: 'pending',
    };
    pairs.push(newPair);
    res.status(201).json({ pair: newPair });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 