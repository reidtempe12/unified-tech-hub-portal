import type { PackageOption } from '../data/packages';

interface PackageCardProps {
  pkg: PackageOption;
  selected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function PackageCard({ pkg, selected, onToggle, disabled = false }: PackageCardProps) {
  return (
    <article className={`package-card ${selected ? 'package-card--selected' : ''}`}>
      <div className="package-card__header">
        <div>
          <p className="package-card__category">{pkg.category.toUpperCase()}</p>
          <h2>{pkg.title}</h2>
        </div>
        <span className="package-card__price">{pkg.price}</span>
      </div>

      <ul className="package-card__highlights">
        {pkg.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>

      <div className="package-card__details">
        {Object.entries(pkg.details).map(([label, value]) => (
          <div key={label} className="package-card__detail-row">
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <button className="package-card__select" onClick={onToggle} type="button" disabled={disabled}>
        {selected ? 'Remove from compare' : disabled ? 'Limit reached' : 'Add to compare'}
      </button>
    </article>
  );
}
