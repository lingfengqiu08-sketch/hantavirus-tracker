export type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className = "size-8" }: LogoMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="16" fill="#F8FAFC" />
      <path
        d="M32 6.5 50 13.4v14.2c0 13.5-7.5 24.4-18 29.8-10.5-5.4-18-16.3-18-29.8V13.4L32 6.5Z"
        fill="#0F766E"
      />
      <path
        d="M32 12.2 44.7 17v10.4c0 9.9-5 17.9-12.7 22.3-7.7-4.4-12.7-12.4-12.7-22.3V17L32 12.2Z"
        fill="#ECFDF5"
      />
      <polygon points="21.5 39.8 18.5 36.2 30 26.7 33 30.3" fill="#0F766E" />
      <polygon points="29.7 30 33.3 27 38.8 33.5 35.2 36.5" fill="#0F766E" />
      <polygon points="38.7 36.5 35.3 33.5 43.8 24 47.2 27" fill="#0F766E" />
      <circle cx="20" cy="38" r="3.4" fill="#D97706" stroke="#ECFDF5" strokeWidth="1.8" />
      <circle cx="31.5" cy="28.5" r="3.4" fill="#D97706" stroke="#ECFDF5" strokeWidth="1.8" />
      <circle cx="45.5" cy="25.5" r="3.4" fill="#D97706" stroke="#ECFDF5" strokeWidth="1.8" />
    </svg>
  );
}
