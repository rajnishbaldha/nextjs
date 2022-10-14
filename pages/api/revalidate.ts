import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
console.log('Revalidating Rajnish');
let revalidated = false;
try {
  await res.revalidate('/post');
  revalidated = true;
} catch (error) {
  console.log(error);
}

  res.status(200).json({ revalidated })
}

