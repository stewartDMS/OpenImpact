import type { NextApiRequest, NextApiResponse } from 'next';

interface CompanyFilingsResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * API endpoint for fetching company filings data
 * Supports SEC EDGAR and other regulatory filing sources
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CompanyFilingsResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed. Use GET.' 
    });
  }

  try {
    const { source = 'sec', company, cik, form_type } = req.query;

    // Basic validation
    if (!company && !cik) {
      return res.status(400).json({
        success: false,
        error: 'Either company name or CIK number is required'
      });
    }

    // Mock SEC EDGAR API response for demonstration
    if (source === 'sec') {
      const filings = [
        {
          form_type: form_type || '10-K',
          filing_date: '2023-12-31',
          company_name: company || 'Sample Corporation',
          cik: cik || '0001234567',
          document_url: 'https://sec.gov/sample-filing.html',
          description: 'Annual Report'
        },
        {
          form_type: '10-Q',
          filing_date: '2023-09-30',
          company_name: company || 'Sample Corporation',
          cik: cik || '0001234567',
          document_url: 'https://sec.gov/sample-q3-filing.html',
          description: 'Quarterly Report Q3'
        }
      ];

      return res.status(200).json({
        success: true,
        data: {
          source: 'SEC EDGAR (mock data)',
          company: company || 'Sample Corporation',
          filings: filings.filter(f => !form_type || f.form_type === form_type)
        }
      });
    }

    return res.status(400).json({
      success: false,
      error: `Filing source '${source}' not implemented yet. Available: sec`
    });

  } catch (error) {
    console.error('Company filings API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
