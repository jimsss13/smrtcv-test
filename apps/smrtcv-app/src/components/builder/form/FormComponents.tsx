"use client";

import React, { memo } from "react";

/**
 * Properties for the InputGroup component.
 */
interface InputGroupProps {
  /** The label for the input. */
  label: string;
  /** The current value of the input. */
  value?: string;
  /** Optional placeholder text. */
  placeholder?: string;
  /** Callback function triggered when the input value changes. */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Optional additional CSS classes. */
  className?: string;
  /** Optional input type (default is "text"). */
  type?: string;
}

/**
 * A standardized input component for the resume builder forms.
 * 
 * @param props - The component properties.
 */
export const InputGroup = memo(({ 
  label, 
  value, 
  placeholder, 
  onChange, 
  className = "",
  type = "text"
}: InputGroupProps) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {label}
    </label>
    <input
      type={type}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
    />
  </div>
));

InputGroup.displayName = "InputGroup";

/**
 * Properties for the TextAreaGroup component.
 */
interface TextAreaGroupProps {
  /** The label for the textarea. */
  label: string;
  /** The current value of the textarea. */
  value: string;
  /** Optional placeholder text. */
  placeholder?: string;
  /** Callback function triggered when the textarea value changes. */
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  /** Optional additional CSS classes. */
  className?: string;
}

/**
 * A standardized textarea component for the resume builder forms.
 * 
 * @param props - The component properties.
 */
export const TextAreaGroup = memo(({ 
  label, 
  value, 
  placeholder, 
  onChange, 
  className = "" 
}: TextAreaGroupProps) => (
  <div className={`space-y-1.5 ${className}`}>
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
      {label}
    </label>
    <textarea
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      className="flex min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y shadow-sm"
    />
  </div>
));

TextAreaGroup.displayName = "TextAreaGroup";
