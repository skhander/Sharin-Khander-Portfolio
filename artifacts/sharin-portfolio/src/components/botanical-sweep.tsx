export function BotanicalSweep({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 720 220"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute z-0 text-white ${className}`}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.4" opacity=".36">
        <path d="M-18 153C71 131 111 47 207 48c87 1 91 82 178 86 112 5 155-77 353-51" />
        <path d="M36 139c-7-19-23-29-42-28m75 10c-2-22-15-36-32-43m75 1c7-20 22-31 41-34m18 7c-7-20-4-37 9-52m27 11c8-19 22-29 41-32m-1 71c20-18 40-22 59-13m-4 39c11-21 27-31 47-32m23 39c18-14 36-16 55-7m16 4c13-20 30-29 51-28m17-9c20-13 39-14 58-4m17 11c17-12 36-13 55-4"
        />
        <path d="M-2 111c20-8 36 1 41 28-22 0-36-9-41-28Zm36 28c-1-23 10-37 34-41 2 23-9 37-34 41Zm41-18c19-14 38-11 53 10-20 11-38 8-53-10Zm75-55c-19-13-24-31-13-54 20 13 25 31 13 54Zm26-16c-1-23 10-37 34-41 2 23-9 37-34 41Zm36-8c17-17 36-18 55-3-16 17-35 19-55 3Zm28 56c15-19 34-24 55-13-13 20-31 25-55 13Zm43 31c8-22 24-32 48-29-7 22-23 33-48 29Zm56 9c14-19 33-24 55-13-13 20-31 25-55 13Zm75-9c10-21 28-29 51-23-9 22-26 30-51 23Zm57-20c16-18 35-21 56-8-15 19-33 22-56 8Zm69-14c12-20 31-26 53-17-11 21-29 27-53 17Z" />
      </g>
    </svg>
  );
}