import type { NextApiRequest, NextApiResponse } from 'next';
/**
 * Stub for fetching open data (e.g., World Bank).
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // TODO: Implement open data API integration
  res.status(200).json({ message: "Open data endpoint (to be implemented)" });
}
