export function IndiaFlag({ className = "h-4 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-label="India" role="img">
      <title>India</title>
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6.67" y="0" fill="#FF9933" />
      <rect width="30" height="6.67" y="13.33" fill="#138808" />
      <circle cx="15" cy="10" r="2.4" fill="none" stroke="#000080" strokeWidth="0.7" />
      <circle cx="15" cy="10" r="0.5" fill="#000080" />
    </svg>
  );
}

export function AustraliaFlag({ className = "h-4 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-label="Australia" role="img">
      <title>Australia</title>
      <rect width="30" height="20" fill="#012169" />
      <path d="M0,0 L12,8 M12,0 L0,8" stroke="#fff" strokeWidth="1.6" />
      <path d="M0,0 L12,8 M12,0 L0,8" stroke="#C8102E" strokeWidth="0.8" />
      <path d="M6,0 V8 M0,4 H12" stroke="#fff" strokeWidth="2.4" />
      <path d="M6,0 V8 M0,4 H12" stroke="#C8102E" strokeWidth="1.2" />
      <circle cx="22" cy="11" r="1.1" fill="#fff" />
      <circle cx="19.2" cy="14.2" r="0.7" fill="#fff" />
      <circle cx="24.8" cy="14.2" r="0.7" fill="#fff" />
      <circle cx="20.2" cy="16.8" r="0.55" fill="#fff" />
      <circle cx="23.8" cy="16.8" r="0.55" fill="#fff" />
      <circle cx="8.5" cy="14.5" r="0.7" fill="#fff" />
    </svg>
  );
}

export function TwinFlags({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} title="India × Australia">
      <IndiaFlag className="h-3.5 w-5 rounded-[1px] shadow-sm" />
      <span aria-hidden="true" className="text-[10px] uppercase tracking-[0.18em] opacity-50">
        ×
      </span>
      <AustraliaFlag className="h-3.5 w-5 rounded-[1px] shadow-sm" />
    </span>
  );
}
