import React from "react";

const FooterSection = () => {
  return (
    <footer className="text-center py-9 px-2 bg-black/5 text-gray-700">
      <p>&copy; {new Date().getFullYear()} Mohammed Aydan. All rights reserved.</p>
    </footer>
  );
};

export default FooterSection;
