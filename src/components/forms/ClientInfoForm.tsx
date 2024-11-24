import { useState } from 'react';
import { User, Mail, Phone, Globe, Linkedin, Twitter, Facebook } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface ClientInfo {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  twitter: string;
  facebook: string;
  website: string;
}

interface ClientInfoFormProps {
  clientId: string;
  initialData?: Partial<ClientInfo>;
  onSave: (data: ClientInfo) => void;
}

export function ClientInfoForm({ clientId, initialData, onSave }: ClientInfoFormProps) {
  const [formData, setFormData] = useState<ClientInfo>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    linkedin: initialData?.linkedin || '',
    twitter: initialData?.twitter || '',
    facebook: initialData?.facebook || '',
    website: initialData?.website || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof ClientInfo) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Main Information
            </label>
            <div className="space-y-4">
              <Input
                placeholder="Client Name"
                value={formData.name}
                onChange={handleChange('name')}
                icon={<User className="h-4 w-4" />}
                required
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange('email')}
                icon={<Mail className="h-4 w-4" />}
                required
              />
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange('phone')}
                icon={<Phone className="h-4 w-4" />}
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Social Media & Website
            </label>
            <div className="space-y-4">
              <Input
                type="url"
                placeholder="LinkedIn Profile"
                value={formData.linkedin}
                onChange={handleChange('linkedin')}
                icon={<Linkedin className="h-4 w-4" />}
              />
              <Input
                type="url"
                placeholder="Twitter Profile"
                value={formData.twitter}
                onChange={handleChange('twitter')}
                icon={<Twitter className="h-4 w-4" />}
              />
              <Input
                type="url"
                placeholder="Facebook Profile"
                value={formData.facebook}
                onChange={handleChange('facebook')}
                icon={<Facebook className="h-4 w-4" />}
              />
              <Input
                type="url"
                placeholder="Website URL"
                value={formData.website}
                onChange={handleChange('website')}
                icon={<Globe className="h-4 w-4" />}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">
          Save Client Information
        </Button>
      </div>
    </form>
  );
}