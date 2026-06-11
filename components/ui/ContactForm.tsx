"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
        </div>
        <h3 className="font-bold text-gray-900 mb-2">Message sent!</h3>
        <p className="text-sm text-gray-600">We'll get back to you as soon as possible.</p>
        <button onClick={() => setStatus("idle")} className="mt-4 text-sm font-bold hover:underline" style={{ color: "#2657f2" }}>Send another message</button>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none transition-colors";
  const inputStyle = { "--focus-border": "#2657f2" } as React.CSSProperties;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">First Name</label>
          <input name="firstName" value={form.firstName} onChange={handleChange}
            className={inputClass} style={inputStyle} placeholder="Travis" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Last Name</label>
          <input name="lastName" value={form.lastName} onChange={handleChange}
            className={inputClass} style={inputStyle} placeholder="Ramsey" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email <span className="text-red-400">*</span></label>
        <input name="email" type="email" value={form.email} onChange={handleChange}
          className={inputClass} style={inputStyle} placeholder="you@example.com" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Phone</label>
        <input name="phone" type="tel" value={form.phone} onChange={handleChange}
          className={inputClass} style={inputStyle} placeholder="(555) 000-0000" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Message <span className="text-red-400">*</span></label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={5}
          className={`${inputClass} resize-none`} style={inputStyle}
          placeholder="Tell us how we can help..." />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-500">Something went wrong. Please try again or call us directly.</p>
      )}
      <button
        type="submit"
        disabled={status === "sending" || !form.email || !form.message}
        className="w-full py-3 btn-gold disabled:opacity-40 disabled:cursor-not-allowed font-bold text-sm rounded-lg"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      <p className="text-xs text-gray-400 text-center">We typically respond within 1 business day.</p>
    </form>
  );
}
