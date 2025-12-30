'use client';

import { useState, useCallback } from 'react';

/**
 * Interface representing the disclosure state and management methods.
 */
export interface Disclosure {
  /** Current open state. */
  isOpen: boolean;
  /** Method to set state to true. */
  onOpen: () => void;
  /** Method to set state to false. */
  onClose: () => void;
  /** Method to toggle the current state. */
  onToggle: () => void;
}

/**
 * Hook for managing the open/close state of UI elements like modals, accordions, and menus.
 * 
 * Provides a boolean state and methods to open, close, and toggle that state.
 * 
 * @param initialState - The initial open state (defaults to false)
 * @returns An object containing the disclosure state and management methods
 * 
 * @example
 * const { isOpen, onOpen, onClose } = useDisclosure();
 */
export const useDisclosure = (initialState: boolean = false): Disclosure => {
  const [isOpen, setIsOpen] = useState(initialState);

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  };
};
