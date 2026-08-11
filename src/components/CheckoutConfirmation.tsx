interface CheckoutConfirmationProps {
  itemCount: number;
  totalAmount: number;
  onClose: () => void;
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
}

export function CheckoutConfirmation({ itemCount, totalAmount, onClose }: CheckoutConfirmationProps) {
  return (
    <div className="confirmation-overlay" role="dialog" aria-modal="true">
      <div className="confirmation-card">
        <p className="eyebrow">Order confirmed</p>
        <h2>Checkout complete</h2>
        <p className="confirmation-card__text">
          Your technology build request is ready for processing. Our team will follow up with the exact delivery and onboarding details.
        </p>

        <div className="confirmation-summary">
          <div>
            <span>Packages selected</span>
            <strong>{itemCount}</strong>
          </div>
          <div>
            <span>Estimated total</span>
            <strong>{formatPrice(totalAmount)}</strong>
          </div>
        </div>

        <button type="button" className="primary-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
