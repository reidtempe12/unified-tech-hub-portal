import type { PackageOption } from '../data/packages';

interface PackageCompareProps {
  selectedPackages: PackageOption[];
}

export function PackageCompare({ selectedPackages }: PackageCompareProps) {
  if (selectedPackages.length === 0) {
    return (
      <div className="compare-card">
        <h2>Compare packages</h2>
        <p>Select up to 4 options from any category to see side-by-side details and pricing.</p>
      </div>
    );
  }

  return (
    <div className="compare-card">
      <div className="compare-card__header">
        <h2>Comparison table</h2>
        <span>{selectedPackages.length} items selected</span>
      </div>
      <div className="compare-grid">
        {selectedPackages.map((pkg) => (
          <div key={pkg.id} className="compare-item">
            <div className="compare-item__header">
              <p>{pkg.category.toUpperCase()}</p>
              <h3>{pkg.title}</h3>
              <span>{pkg.price}</span>
            </div>
            <ul>
              {pkg.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <div className="compare-item__details">
              {Object.entries(pkg.details).map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
