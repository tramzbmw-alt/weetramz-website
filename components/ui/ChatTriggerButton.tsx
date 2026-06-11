"use client";

export default function ChatTriggerButton({ className, children }: { className?: string; children: React.ReactNode }) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent("wtzchat:open"));
  }
  return (
    <button type="button" onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
