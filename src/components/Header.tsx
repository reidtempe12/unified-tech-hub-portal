interface HeaderProps {
  className?: string;
}

export function Header({ className = '' }: HeaderProps) {
  return (
    <header className={`header ${className}`.trim()}>
      <div className="brand">
        <span className="brand-mark">U</span>
        <div>
          <p className="brand-title">Unified Tech Hub</p>
          <p className="brand-subtitle">Package comparisons for modern businesses</p>
        </div>
      </div>
      <button className="action-button">Get a quote</button>
    </header>
  );
}
