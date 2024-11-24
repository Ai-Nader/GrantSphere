import { ExternalLink, Mail, Phone } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SocialLink {
  url: string;
  label: string;
  icon: React.ReactNode;
}

interface ClientSummaryProps {
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  website?: string;
}

export function ClientSummary({
  name,
  email,
  phone,
  linkedin,
  twitter,
  facebook,
  website,
}: ClientSummaryProps) {
  const socialLinks: SocialLink[] = [
    { url: linkedin, label: 'LinkedIn', icon: <span className="i-lucide-linkedin" /> },
    { url: twitter, label: 'Twitter', icon: <span className="i-lucide-twitter" /> },
    { url: facebook, label: 'Facebook', icon: <span className="i-lucide-facebook" /> },
    { url: website, label: 'Website', icon: <span className="i-lucide-globe" /> },
  ].filter((link): link is SocialLink & { url: string } => Boolean(link.url));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Client Information Summary
      </h3>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Contact Details
          </h4>
          <div className="space-y-2">
            <p className="text-gray-900 dark:text-white font-medium">{name}</p>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Mail className="h-4 w-4 mr-2" />
              <a href={`mailto:${email}`} className="hover:text-fundspoke-600 dark:hover:text-fundspoke-400">
                {email}
              </a>
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <Phone className="h-4 w-4 mr-2" />
              <a href={`tel:${phone}`} className="hover:text-fundspoke-600 dark:hover:text-fundspoke-400">
                {phone}
              </a>
            </div>
          </div>
        </div>

        {socialLinks.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Online Presence
            </h4>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-fundspoke-600 dark:hover:text-fundspoke-400"
                >
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}