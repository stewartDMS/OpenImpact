import type { NextApiRequest, NextApiResponse } from 'next';

interface OpenDataResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * API endpoint for fetching open data from various sources
 * Currently supports World Bank indicators as a starting point
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OpenDataResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use GET.' 
    });
  }

  try {
    const { source = 'worldbank', indicator, country } = req.query;

    // Basic validation
    if (source === 'worldbank' && !indicator) {
      return res.status(400).json({
        success: false,
        error: 'World Bank requests require an indicator parameter'
      });
    }

    // Mock World Bank API response for demonstration
    if (source === 'worldbank') {
      const mockData = {
        indicator: indicator,
        country: country || 'global',
        value: Math.floor(Math.random() * 1000),
        year: 2023,
        source: 'World Bank API (mock data)',
        description: `Mock indicator data for ${indicator}`
      };

      return res.status(200).json({
        success: true,
        data: mockData
      });
    }

    // Default response for unsupported sources
    return res.status(400).json({
      success: false,
      error: `Data source '${source}' not implemented yet. Available: worldbank`
    });

  } catch (error) {
    console.error('Open data API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
