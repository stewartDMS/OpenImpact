import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: string;
  timestamp: string;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'Open Impact API is running'
  });
}