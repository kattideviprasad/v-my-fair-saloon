"use client";

import { useState } from "react";
import { serviceSlug } from "@/lib/service-slugs";

interface ContactFormProps {
  variant?: "booking" | "training";
  className?: string;
  /** Slug from ?service=<slug>, e.g. "nails". Only sets the dropdown's starting value; unknown slugs are ignored. */
  defaultService?: string;
}

const serviceOptions = [
  "Hair Care & Styling",
  "Skin & Facials",
  "Grooming & Waxing",
  "Nails",
  "Bridal & Event Makeup",
  "Spa & Wellness",
  "Other",
];

const trainingOptions = [
  "Hairstyling",
  "Beauty & Skincare",
  "Bridal Makeup",
  "Nail Art",
  "General Enquiry",
];

export function ContactForm({ variant = "booking", className = "", defaultService }: ContactFormProps) {
  const isTraining = variant === "training";
  const preselected =
    !isTraining && defaultService
      ? serviceOptions.filter((o) => o !== "Other").find((o) => serviceSlug(o) === defaultService) ?? ""
      : "";
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    interest: preselected,
    date: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let waMessage = "";
    if (isTraining) {
      waMessage = `Hi, I'm ${formData.name}. I'm interested in learning ${formData.interest || "more about your training programs"}. ${formData.message ? "Additional info: " + formData.message : ""}`.trim();
    } else {
      waMessage = `Hi, I'd like to book an appointment.\n\nName: ${formData.name}\nService: ${formData.interest || "General"}\n${formData.date ? "Preferred date: " + formData.date : ""}\n${formData.message ? "Notes: " + formData.message : ""}`.trim();
    }

    const waUrl = `https://wa.me/918247458328?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`} id={`form-${variant}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${variant}-name`} className="field-label">
            Your Name
          </label>
          <input
            type="text"
            id={`${variant}-name`}
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full name"
            className="input"
          />
        </div>
        <div>
          <label htmlFor={`${variant}-phone`} className="field-label">
            Phone Number
          </label>
          <input
            type="tel"
            id={`${variant}-phone`}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+91 XXXXX XXXXX"
            className="input"
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${variant}-interest`} className="field-label">
          {isTraining ? "What would you like to learn?" : "Service Interested In"}
        </label>
        <select
          id={`${variant}-interest`}
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select an option</option>
          {(isTraining ? trainingOptions : serviceOptions).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {!isTraining && (
        <div>
          <label htmlFor={`${variant}-date`} className="field-label">
            Preferred Date
          </label>
          <input
            type="date"
            id={`${variant}-date`}
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input"
          />
        </div>
      )}

      <div>
        <label htmlFor={`${variant}-message`} className="field-label">
          {isTraining ? "Anything else you'd like us to know?" : "Additional Notes"}
        </label>
        <textarea
          id={`${variant}-message`}
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={isTraining ? "Tell us about your experience level, availability, etc." : "Any preferences or special requests"}
          className="input"
          rows={3}
        />
      </div>

      <button type="submit" className="btn btn-primary w-full sm:w-auto" id={`${variant}-submit`}>
        {isTraining ? "Send Enquiry via WhatsApp" : "Book via WhatsApp"}
      </button>

      <p className="text-small">
        This will open WhatsApp with a pre-filled message. You can edit it before sending.
      </p>
    </form>
  );
}
