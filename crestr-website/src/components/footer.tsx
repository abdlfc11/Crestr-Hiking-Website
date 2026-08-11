// Footer.tsx

import "../styles/components/footer.css";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroup {
  heading: string;
  links: FooterLink[];
}

interface FooterProps {
  linkGroups?: FooterLinkGroup[];
}

const defaultLinkGroups: FooterLinkGroup[] = [
  {
    heading: "Product",
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "/#feature-section" },
      { label: "About", href: "/#about-section" },
      { label: "Docs", href: "https://docs.crestr.co.uk" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Ko-fi", href: "https://ko-fi.com/abdulsultan/" },
      { label: "Liberapay", href: "https://liberapay.com/abd_ulll16/" },
    ],
  },
];

export default function Footer({ linkGroups = defaultLinkGroups }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer id="footer">
      <div id="footer-inner">
        <div id="footer-top">
          <div id="footer-brand">
            <img
              id="footer-logo-image"
              src="https://images.crestr.co.uk/Crest-Logo.png"
              alt="Crestr"
            />
            <p className="footer-blurb">
              A free, open-source hiking route planner for Cumbria.
            </p>
          </div>

          {linkGroups.map((group) => (
            <div className="footer-link-group" key={group.heading}>
              <p className="footer-link-group-heading">{group.heading}</p>
              <ul className="footer-link-list">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a className="footer-link" href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div id="footer-bottom">
          <p className="footer-copyright">
            &copy; {year} Abdul · Released under the MIT License
          </p>
        </div>
      </div>
    </footer>
  );
}