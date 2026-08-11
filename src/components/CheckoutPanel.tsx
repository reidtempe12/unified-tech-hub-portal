import { useMemo, useState, type FormEvent } from 'react';
import type { PackageOption } from '../data/packages';

interface CheckoutPanelProps {
  selectedPackages: PackageOption[];
  onCancel: () => void;
  onComplete: () => void;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

export function CheckoutPanel({ selectedPackages, onCancel, onComplete }: CheckoutPanelProps) {
  const [billingName, setBillingName] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [company, setCompany] = useState('');
  const [priority, setPriority] = useState('Standard');

  const totalAmount = useMemo(
    () => selectedPackages.reduce((sum, pkg) => sum + Number(pkg.price.replace(/[^0-9.]/g, '')), 0),
    [selectedPackages]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!billingEmail || !billingName) return;
    onComplete();
  };

  return (
    <div className="checkout-panel">
      <div className="checkout-panel__header">
        <div>
          <p className="eyebrow">Secure checkout</p>
          <h2>Finalize your custom package order</h2>
        </div>
        <button className="secondary-button" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>

      <div className="checkout-summary">
        <p className="checkout-summary__label">Selected packages</p>
        <ul>
          {selectedPackages.map((pkg) => (
            <li key={pkg.id}>
              <span>{pkg.title}</span>
              <strong>{pkg.price}</strong>
            </li>
          ))}
        </ul>
        <div className="checkout-summary__total">
          <span>Total estimate</span>
          <strong>{formatPrice(totalAmount)}</strong>
        </div>
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Billing name
          <input
            value={billingName}
            onChange={(event) => setBillingName(event.target.value)}
            placeholder="Jane Doe"
            required
          />
        </label>

        <label>
          Billing email
          <input
            type="email"
            value={billingEmail}
            onChange={(event) => setBillingEmail(event.target.value)}
            placeholder="jane@company.com"
            required
          />
        </label>

        <label>
          Company name
          <input value={company} onChange={(event) => setCompany(event.target.value)} placeholder="Acme Corp" />
        </label>

        <label>
          Delivery priority
          <select value={priority} onChange={(event) => setPriority(event.target.value)}>
            <option>Standard</option>
            <option>Priority</option>
            <option>Expedited</option>
          </select>
        </label>

        <button type="submit" className="primary-button">
          Complete checkout
        </button>
      </form>
    </div>
  );
}
