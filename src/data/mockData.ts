
// Mock Event Data
export const mockRiskEvents = [
  {
    id: 1,
    title: 'Severe Flooding',
    location: 'Taiwan',
    latitude: 23.7,
    longitude: 121.0,
    riskLevel: 'High',
    categories: ['Natural Disaster', 'Supply Chain'],
    affectedSectors: ['Semiconductors', 'Electronics'],
    timestamp: '2025-05-10T09:30:00Z',
    description: 'Severe flooding has affected major manufacturing regions in Taiwan, potentially disrupting semiconductor production.'
  },
  {
    id: 2,
    title: 'Trade Sanctions',
    location: 'Russia',
    latitude: 55.8,
    longitude: 37.6,
    riskLevel: 'High',
    categories: ['Political', 'Economic'],
    affectedSectors: ['Energy', 'Finance'],
    timestamp: '2025-05-11T14:15:00Z',
    description: 'New trade sanctions imposed on Russia affecting oil and gas exports to European markets.'
  },
  {
    id: 3,
    title: 'Labor Strike',
    location: 'United States',
    latitude: 40.7,
    longitude: -74.0,
    riskLevel: 'Medium',
    categories: ['Labor', 'Supply Chain'],
    affectedSectors: ['Transportation', 'Logistics'],
    timestamp: '2025-05-12T08:45:00Z',
    description: 'Major port workers have begun a strike affecting shipping operations on the East Coast.'
  },
  {
    id: 4,
    title: 'Political Unrest',
    location: 'Brazil',
    latitude: -15.8,
    longitude: -47.9,
    riskLevel: 'Medium',
    categories: ['Political', 'Social'],
    affectedSectors: ['Agriculture', 'Mining'],
    timestamp: '2025-05-09T11:20:00Z',
    description: 'Growing political protests in major cities raising concerns about stability and economic policy.'
  },
  {
    id: 5,
    title: 'Drought Conditions',
    location: 'Australia',
    latitude: -25.3,
    longitude: 133.8,
    riskLevel: 'Medium',
    categories: ['Natural Disaster', 'Agricultural'],
    affectedSectors: ['Agriculture', 'Food Production'],
    timestamp: '2025-05-08T03:10:00Z',
    description: 'Worsening drought conditions affecting agricultural output and water supplies.'
  },
  {
    id: 6,
    title: 'Cybersecurity Breach',
    location: 'European Union',
    latitude: 50.9,
    longitude: 10.3,
    riskLevel: 'High',
    categories: ['Technology', 'Security'],
    affectedSectors: ['Banking', 'Technology'],
    timestamp: '2025-05-12T15:30:00Z',
    description: 'Major cybersecurity breach affecting multiple financial institutions across European countries.'
  },
  {
    id: 7,
    title: 'Infrastructure Failure',
    location: 'India',
    latitude: 28.6,
    longitude: 77.2,
    riskLevel: 'Medium',
    categories: ['Infrastructure', 'Energy'],
    affectedSectors: ['Power Generation', 'Manufacturing'],
    timestamp: '2025-05-11T09:40:00Z',
    description: 'Power grid failures affecting multiple industrial regions leading to production delays.'
  },
  {
    id: 8,
    title: 'Shipping Disruption',
    location: 'Suez Canal',
    latitude: 30.0,
    longitude: 32.5,
    riskLevel: 'High',
    categories: ['Transportation', 'Supply Chain'],
    affectedSectors: ['Shipping', 'Retail', 'Energy'],
    timestamp: '2025-05-10T12:15:00Z',
    description: 'Major vessel blockage causing significant delays in global shipping routes and supply chains.'
  },
  {
    id: 9,
    title: 'Regulatory Change',
    location: 'European Union',
    latitude: 50.9,
    longitude: 4.4,
    riskLevel: 'Low',
    categories: ['Regulatory', 'Compliance'],
    affectedSectors: ['Technology', 'Data Services'],
    timestamp: '2025-05-09T14:50:00Z',
    description: 'New data protection regulations announced that will impact technology companies operating in the EU.'
  },
  {
    id: 10,
    title: 'Currency Devaluation',
    location: 'Argentina',
    latitude: -34.6,
    longitude: -58.4,
    riskLevel: 'Medium',
    categories: ['Economic', 'Financial'],
    affectedSectors: ['Banking', 'Imports/Exports'],
    timestamp: '2025-05-08T16:25:00Z',
    description: 'Significant currency devaluation affecting import costs and financial stability.'
  }
];

// Mock Stock Data
export const mockStocks = [
  {
    ticker: 'TSMC',
    company: 'Taiwan Semiconductor',
    price: 142.35,
    change: -3.42,
    volume: 12500000,
    riskScore: 85
  },
  {
    ticker: 'GAZP',
    company: 'Gazprom',
    price: 3.27,
    change: -6.89,
    volume: 9800000,
    riskScore: 92
  },
  {
    ticker: 'WMT',
    company: 'Walmart Inc.',
    price: 68.43,
    change: -1.23,
    volume: 7500000,
    riskScore: 45
  },
  {
    ticker: 'NVDA',
    company: 'NVIDIA Corporation',
    price: 1023.12,
    change: 2.18,
    volume: 15600000,
    riskScore: 30
  },
  {
    ticker: 'CYBR',
    company: 'CyberArk Software',
    price: 247.89,
    change: 5.43,
    volume: 2300000,
    riskScore: 25
  },
  {
    ticker: 'VALE',
    company: 'Vale S.A.',
    price: 12.56,
    change: -2.34,
    volume: 8900000,
    riskScore: 58
  },
  {
    ticker: 'BHP',
    company: 'BHP Group',
    price: 58.72,
    change: -1.65,
    volume: 4300000,
    riskScore: 62
  }
];

// Mock News Data
export const mockNews = [
  {
    id: 1,
    title: 'Severe Floods Disrupt Semiconductor Production in Taiwan',
    source: 'Reuters',
    summary: 'Heavy rainfall has caused significant flooding in key manufacturing regions of Taiwan, affecting operations at major semiconductor fabrication plants. Industry experts expect delays in chip production that could impact global supply chains.',
    url: '#',
    timestamp: '2025-05-10T09:35:00Z',
    categories: ['Natural Disaster', 'Technology']
  },
  {
    id: 2,
    title: 'New Sanctions Target Russian Energy Sector',
    source: 'Bloomberg',
    summary: 'The United States and European Union have announced a new round of sanctions targeting Russia\'s energy sector, including restrictions on technology transfers and financial transactions with major oil and gas companies.',
    url: '#',
    timestamp: '2025-05-11T14:20:00Z',
    categories: ['Political', 'Energy']
  },
  {
    id: 3,
    title: 'Port Workers Strike Enters Third Day on East Coast',
    source: 'AP News',
    summary: 'The strike by port workers along the U.S. East Coast has entered its third day with no signs of resolution. Shipping companies report growing backlogs and retailers warn of potential inventory shortages if the situation continues.',
    url: '#',
    timestamp: '2025-05-12T08:50:00Z',
    categories: ['Labor', 'Logistics']
  },
  {
    id: 4,
    title: 'Political Protests Spread to Major Brazilian Cities',
    source: 'Al Jazeera',
    summary: 'Anti-government protests have spread to several major cities in Brazil as citizens express concerns over economic policies and corruption allegations. The demonstrations have disrupted transportation and commercial activities in affected areas.',
    url: '#',
    timestamp: '2025-05-09T11:25:00Z',
    categories: ['Political', 'Social']
  },
  {
    id: 5,
    title: 'Australia Declares Emergency Due to Worsening Drought',
    source: 'BBC News',
    summary: 'Australian authorities have declared a state of emergency in several agricultural regions as drought conditions reach critical levels. Crop yields are expected to decline significantly, potentially affecting global grain markets.',
    url: '#',
    timestamp: '2025-05-08T03:15:00Z',
    categories: ['Environment', 'Agriculture']
  },
  {
    id: 6,
    title: 'Major Cyber Attack Targets European Banking System',
    source: 'Financial Times',
    summary: 'A sophisticated cyber attack has compromised systems at multiple European financial institutions, leading to temporary service disruptions and security concerns. Authorities are investigating the source of the attack.',
    url: '#',
    timestamp: '2025-05-12T15:35:00Z',
    categories: ['Cybersecurity', 'Finance']
  }
];

// Mock AI Predictions
export const mockPredictions = [
  {
    id: 1,
    text: 'Expect semiconductor prices to rise by 8-12% over the next 4 weeks due to production disruptions in Taiwan',
    confidence: 87,
    impact: 'High',
    timeframe: '1 month',
    relatedEvents: [1]
  },
  {
    id: 2,
    text: 'European natural gas prices likely to increase by 15-20% following new sanctions on Russian energy companies',
    confidence: 82,
    impact: 'High',
    timeframe: '2 weeks',
    relatedEvents: [2]
  },
  {
    id: 3,
    text: 'US retail sector expected to face inventory shortages if port strike continues beyond one week',
    confidence: 75,
    impact: 'Medium',
    timeframe: '1-2 weeks',
    relatedEvents: [3]
  },
  {
    id: 4,
    text: 'Increased investment in cybersecurity solutions anticipated following major European banking breach',
    confidence: 91,
    impact: 'Medium',
    timeframe: 'Immediate',
    relatedEvents: [6]
  }
];

// Knowledge Graph - Countries to Industries/Companies
export const knowledgeGraph = {
  Taiwan: {
    industries: ['Semiconductors', 'Electronics', 'Computer Hardware'],
    companies: ['TSMC', 'Foxconn', 'ASUS', 'Acer'],
    riskFactors: ['Natural Disasters', 'China Relations', 'Supply Chain Dependency']
  },
  Russia: {
    industries: ['Oil & Gas', 'Mining', 'Defense'],
    companies: ['Gazprom', 'Rosneft', 'Lukoil', 'Norilsk Nickel'],
    riskFactors: ['Sanctions', 'Political Stability', 'Currency Volatility']
  },
  'United States': {
    industries: ['Technology', 'Finance', 'Healthcare', 'Defense'],
    companies: ['Apple', 'Microsoft', 'JP Morgan', 'Pfizer'],
    riskFactors: ['Regulatory Changes', 'Labor Disputes', 'Political Polarization']
  },
  Brazil: {
    industries: ['Agriculture', 'Mining', 'Oil & Gas'],
    companies: ['Petrobras', 'Vale', 'JBS', 'Banco do Brasil'],
    riskFactors: ['Political Instability', 'Deforestation Concerns', 'Currency Fluctuations']
  },
  Australia: {
    industries: ['Mining', 'Agriculture', 'Finance'],
    companies: ['BHP', 'Rio Tinto', 'Commonwealth Bank', 'Woolworths'],
    riskFactors: ['Climate Events', 'China Trade Relations', 'Commodity Prices']
  }
};
