import { useMemo, useState } from 'react';
import packageData from './data/packages';
import { PackageCard } from './components/PackageCard';
import { PackageCompare } from './components/PackageCompare';
import { CheckoutConfirmation } from './components/CheckoutConfirmation';
import { CheckoutPanel } from './components/CheckoutPanel';
import { Header } from './components/Header';
import { QuoteSummary } from './components/QuoteSummary';

const categories = ['plans', 'devices', 'cloud', 'entertainment'] as const;
type Category = (typeof categories)[number];

function App() {
  const [activeTab, setActiveTab] = useState<Category>('plans');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const packages = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    return packageData[activeTab].filter((pkg) => {
      if (!normalizedTerm) return true;
      const text = [pkg.title, ...pkg.highlights, ...Object.values(pkg.details)]
        .join(' ')
        .toLowerCase();
      return text.includes(normalizedTerm);
    });
  }, [activeTab, searchTerm]);

  const selectedPackages = useMemo(
    () => Object.values(packageData).flat().filter((pkg) => selectedIds.includes(pkg.id)),
    [selectedIds]
  );

  const selectionLimitReached = selectedIds.length >= 4;

  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const [completedOrder, setCompletedOrder] = useState({ itemCount: 0, totalAmount: 0 });

  const openCheckout = () => setCheckoutOpen(true);
  const closeCheckout = () => setCheckoutOpen(false);
  const completeCheckout = () => {
    setCompletedOrder({ itemCount: selectedPackages.length, totalAmount: selectedTotal });
    setCheckoutOpen(false);
    setSelectedIds([]);
    setConfirmationOpen(true);
  };

  const closeConfirmation = () => setConfirmationOpen(false);

  const selectedTotal = selectedPackages.reduce(
    (sum, pkg) => sum + Number(pkg.price.replace(/[^0-9.]/g, '')),
    0
  );

  const toggleSelection = (packageId: string) => {
    setSelectedIds((current) => {
      if (current.includes(packageId)) {
        return current.filter((id) => id !== packageId);
      }
      if (current.length >= 4) {
        return current;
      }
      return [...current, packageId];
    });
  };

  return (
    <div className="app-shell">
      <Header className="sticky-header" />
      <main className="content">
        <section className="panel panel--hero">
          <div>
            <p className="eyebrow">Unified Tech Hub</p>
            <h1>Compare and manage service packages with confidence.</h1>
            <p className="intro">
              Build custom packages for mobile, devices, cloud storage, and entertainment across every business need.
            </p>
          </div>
        </section>

        <section className="panel panel--navigation panel--search-bar">
          <div className="tab-list" role="tablist" aria-label="Package categories">
            {categories.map((category) => (
              <button
                key={category}
                className={category === activeTab ? 'tab tab--active' : 'tab'}
                role="tab"
                aria-selected={category === activeTab}
                onClick={() => setActiveTab(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <div className="search-panel">
            <label className="search-panel__label" htmlFor="package-search">
              Search packages
            </label>
            <input
              id="package-search"
              className="search-panel__input"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title, feature, or detail"
            />
            <p className="search-panel__hint">
              {selectedIds.length} selected · {selectionLimitReached ? 'Selection limit reached' : 'Select up to 4 packages'}
            </p>
          </div>
        </section>

        <section className="panel panel--grid">
          {packages.length ? (
            packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                selected={selectedIds.includes(pkg.id)}
                onToggle={() => toggleSelection(pkg.id)}
                disabled={!selectedIds.includes(pkg.id) && selectionLimitReached}
              />
            ))
          ) : (
            <div className="empty-state">
              <h2>No matching packages</h2>
              <p>Try a different search term or switch categories to explore more service bundles.</p>
            </div>
          )}
        </section>

        <section className="panel panel--compare quote-layout">
          <div>
            <PackageCompare selectedPackages={selectedPackages} />
          </div>
          <QuoteSummary
            selectedPackages={selectedPackages}
            onClear={() => setSelectedIds([])}
            onCheckout={openCheckout}
          />
        </section>

        {checkoutOpen && (
          <div className="checkout-overlay" role="dialog" aria-modal="true">
            <div className="checkout-drawer">
              <CheckoutPanel
                selectedPackages={selectedPackages}
                onCancel={closeCheckout}
                onComplete={completeCheckout}
              />
            </div>
          </div>
        )}

        {confirmationOpen && (
          <CheckoutConfirmation
            itemCount={completedOrder.itemCount}
            totalAmount={completedOrder.totalAmount}
            onClose={closeConfirmation}
          />
        )}

        {selectedPackages.length > 0 && (
          <div className="mobile-checkout-bar">
            <div>
              <p>{selectedPackages.length} selected</p>
              <strong>${selectedTotal.toFixed(2)} estimated</strong>
            </div>
            <button className="primary-button" type="button" onClick={openCheckout}>
              Checkout
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
