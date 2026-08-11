export type PackageCategory = 'plans' | 'devices' | 'cloud' | 'entertainment';

export interface PackageOption {
  id: string;
  title: string;
  price: string;
  highlights: string[];
  details: Record<string, string>;
  category: PackageCategory;
}

const packageData: Record<PackageCategory, PackageOption[]> = {
  plans: [
    {
      id: 'plan-start',
      title: 'Starter Mobility',
      price: '$35/mo',
      highlights: ['Unlimited calls', '10GB data', 'Global roaming add-on'],
      details: {
        'Lines': 'Up to 3 lines',
        'Support': '24/7 chat support',
        'Onboarding': 'Dedicated setup specialist'
      },
      category: 'plans'
    },
    {
      id: 'plan-scale',
      title: 'Scale Business',
      price: '$70/mo',
      highlights: ['Unlimited data', 'Priority support', 'Device protection'],
      details: {
        'Lines': 'Up to 10 lines',
        'Support': 'Priority phone + email',
        'Analytics': 'Usage insights dashboard'
      },
      category: 'plans'
    },
    {
      id: 'plan-enterprise',
      title: 'Enterprise Connect',
      price: '$115/mo',
      highlights: ['Custom SLA', 'On-site training', 'Security tools'],
      details: {
        'Lines': 'Unlimited lines',
        'Support': 'Dedicated account team',
        'IT': 'Mobile device management'
      },
      category: 'plans'
    }
  ],
  devices: [
    {
      id: 'device-pro-12',
      title: 'Pro Device Suite',
      price: '$199/device',
      highlights: ['5G ready', 'Extended warranty', 'Loaner devices'],
      details: {
        'Warranty': '2 years premium',
        'Monitoring': 'Remote device diagnostics',
        'Integration': 'Corporate provisioning'
      },
      category: 'devices'
    },
    {
      id: 'device-lite',
      title: 'Lightweight Tablets',
      price: '$99/device',
      highlights: ['Rugged build', 'Group deployment', 'Security updates'],
      details: {
        'Warranty': '1 year',
        'Accessories': 'Optional docking station',
        'OS': 'Managed OS images'
      },
      category: 'devices'
    },
    {
      id: 'device-crew',
      title: 'Field Crew Kit',
      price: '$145/device',
      highlights: ['Solar charging pack', 'GPS tracking', 'Offline sync'],
      details: {
        'Connectivity': '4G fallback',
        'Tracking': 'Live asset location',
        'Data': 'Encrypted local storage'
      },
      category: 'devices'
    }
  ],
  cloud: [
    {
      id: 'cloud-basic',
      title: 'Cloud Store Basic',
      price: '$12/mo',
      highlights: ['1TB storage', 'Backup automation', 'File sharing'],
      details: {
        'Storage': '1TB',
        'Access': 'Role-based permissions',
        'Sync': 'Auto file sync'
      },
      category: 'cloud'
    },
    {
      id: 'cloud-business',
      title: 'Cloud Store Business',
      price: '$28/mo',
      highlights: ['5TB storage', 'Audit logs', 'Collaborative workspaces'],
      details: {
        'Storage': '5TB',
        'Compliance': 'Data residency controls',
        'Collaboration': 'Shared team folders'
      },
      category: 'cloud'
    },
    {
      id: 'cloud-premium',
      title: 'Cloud Store Premium',
      price: '$60/mo',
      highlights: ['Unlimited file versions', 'Advanced security', 'Geo-redundancy'],
      details: {
        'Storage': 'Unlimited',
        'Security': 'Encryption at rest + transit',
        'Recovery': 'Point-in-time restore'
      },
      category: 'cloud'
    }
  ],
  entertainment: [
    {
      id: 'ent-sport',
      title: 'Live Sports Pack',
      price: '$18/mo',
      highlights: ['Premium sports channels', 'Event highlights', 'Team alerts'],
      details: {
        'Channels': '10+ sports networks',
        'Streaming': 'HD and 4K',
        'Notifications': 'Live score alerts'
      },
      category: 'entertainment'
    },
    {
      id: 'ent-stream',
      title: 'Streaming Plus',
      price: '$25/mo',
      highlights: ['Top shows', 'Multi-screen support', 'Content library'],
      details: {
        'Library': '5000+ titles',
        'Screens': 'Up to 4 devices',
        'Quality': 'Adaptive streaming'
      },
      category: 'entertainment'
    },
    {
      id: 'ent-premiere',
      title: 'Premiere Cinema',
      price: '$32/mo',
      highlights: ['New releases', 'Studio bundles', 'Corporate licenses'],
      details: {
        'New releases': 'Weekly premieres',
        'Licensing': 'Business-friendly terms',
        'Support': '24/7 concierge'
      },
      category: 'entertainment'
    }
  ]
};

export default packageData;
