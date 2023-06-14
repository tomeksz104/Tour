import { useState } from "react";

const useMobileMenu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileMenuDismissed, setMobileMenuDismissed] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDismissMobileMenu = () => {
    setMobileMenuDismissed(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setMobileMenuDismissed(false);
    }, 400);
  };

  return {
    isMobileMenuOpen,
    mobileMenuDismissed,
    handleMobileMenuToggle,
    handleDismissMobileMenu,
  };
};

export default useMobileMenu;
