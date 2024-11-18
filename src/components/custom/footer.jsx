import mobile9Logo from "../../../src/assets/images/9mobile-logo.png";
import airtelLogo from "../../../src/assets/images/airtel-logo.png";
import gloLogo from "../../../src/assets/images/glo-logo.png";
import mtnLogo from "../../../src/assets/images/mtn-logo.png";

const Footer = () => {
  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/#how-to-play", text: "How to play" },
    { href: "/#FAQ", text: "FAQs" },
    { href: "mailto:stephenon56@gmail.com", text: "Contact us" },
  ];

  const telecomLogos = [
    { name: "MTN", height: "h-11", path: mtnLogo },
    { name: "Airtel", height: "h-10", path: airtelLogo },
    { name: "9mobile", height: "h-12", path: mobile9Logo },
    { name: "Glo", height: "h-12", path: gloLogo },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "733547" },
    { name: "Twitter", icon: "733579" },
    { name: "LinkedIn", icon: "733561" },
    { name: "Instagram", icon: "733558" },
  ];

  return (
    <footer className="flex flex-col items-center bg-gradient-to-b from-blue-900 to-indigo-950 text-white min-h-[500px]">
      {/* Available On Section */}
      <h4 className="pt-16 pb-8 font-serif text-xl text-gray-200 tracking-wide">
        Available on
      </h4>

      {/* Telecom Logos */}
      <div className="flex justify-center gap-6 flex-wrap px-4">
        {telecomLogos.map((logo) => (
          <div
            key={logo.name}
            className={`flex ${logo.height} backdrop-blur-sm rounded-lg p-2 transition-all`}
          >
            <img
              alt={`${logo.name} Logo`}
              src={logo.path}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Navigation Links */}
      <nav className="flex w-[70%] mx-auto md:w-[50%] justify-evenly py-12 flex-wrap gap-6">
        {navLinks.map((link) => (
          <a
            key={link.text}
            href={link.href}
            className="font-serif text-gray-200 hover:text-white transition-colors duration-200"
          >
            {link.text}
          </a>
        ))}
      </nav>

      {/* Contact Information */}
      <div className="text-center space-y-2 mb-8">
        <p className="text-sm text-gray-200">
          Contact:{" "}
          <a
            className="text-blue-300 hover:text-blue-200 font-semibold transition-colors"
            href="mailto:enquiries@africawinner.ng"
          >
            enquiries@africawinner.ng
          </a>
        </p>
        <p className="text-sm text-gray-200">
          © {new Date().getFullYear()} All rights reserved by Game Evo
        </p>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center gap-6 mb-20">
        {socialLinks.map((social) => (
          <div
            key={social.name}
            className="flex w-10 h-10 backdrop-blur-sm rounded-full items-center justify-center 
                   transition-all duration-200 cursor-pointer"
          >
            <img
              alt={`Share on ${social.name}`}
              src={`https://cdn-icons-png.flaticon.com/512/733/${social.icon}.png`}
              className="object-contain h-6 w-6"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      <p className="text-sm mb-2 font-light">Flair Technologies Limited</p>
    </footer>
  );
};

export default Footer;
