import { useMemo, useState, type FormEvent } from 'react';
import type { PackageOption } from '../data/packages';

interface QuoteSummaryProps {
  selectedPackages: PackageOption[];
  onClear: () => void;
  onCheckout: () => void;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

export function QuoteSummary({ selectedPackages, onClear, onCheckout }: QuoteSummaryProps) {
  const [company, setCompany] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const subtotal = useMemo(
    () =>
      selectedPackages.reduce((sum, pkg) => sum + Number(pkg.price.replace(/[^0-9.]/g, '')), 0),
    [selectedPackages]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPackages.length) return;
    setSubmitted(true);
  };

  return (
    <aside className="quote-panel">
      <div className="quote-panel__header">
        <h2>Quote build summary</h2>
        <span className="quote-panel__badge">{selectedPackages.length} items</span>
      </div>

      <p className="quote-panel__text">
        Create a tailored quote for your chosen services. Manage pricing, package mix, and request a fast response.
      </p>

      <div className="quote-summary">
        <div>
          <p className="quote-summary__label">Estimated monthly total</p>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        <div>
          <p className="quote-summary__label">Package categories</p>
          <strong>{new Set(selectedPackages.map((pkg) => pkg.category)).size}</strong>
        </div>
      </div>

      {selectedPackages.length === 0 ? (
        <div className="quote-empty">
          <p>No selections yet. Add packages to compare and request a quote.</p>
        </div>
      ) : (
        <div className="quote-list">
          {selectedPackages.map((pkg) => (
            <div key={pkg.id} className="quote-list__item">
              <div>
                <p>{pkg.title}</p>
                <span>{pkg.category}</span>
              </div>
              <strong>{pkg.price}</strong>
            </div>
          ))}
        </div>
      )}

      {submitted ? (
        <div className="quote-success">
          <h3>Quote requested</h3>
          <p>We received your request and will reach out to you at {contactEmail || 'your email'}.</p>
        </div>
      ) : (
        <form className="quote-form" onSubmit={handleSubmit}>
          <label>
            Company or team name
            <input
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              placeholder="Acme Corp"
              required
            />
          </label>

          <label>
            Contact email
            <input
              type="email"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
              placeholder="team@acme.com"
              required
            />
          </label>

          <label>
            Notes
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add any business priorities or deployment details"
            />
          </label>

          <div className="quote-form__actions">
            <button type="submit" disabled={!selectedPackages.length} className="primary-button">
              Request quote
            </button>
            <button type="button" className="secondary-button" onClick={onClear}>
              Clear selection
            </button>
          </div>
          <button
            type="button"
            className="secondary-button checkout-button"
            onClick={onCheckout}
            disabled={!selectedPackages.length}
          >
            Proceed to checkout
          </button>
        </form>
      )}
    </aside>
  );
}
