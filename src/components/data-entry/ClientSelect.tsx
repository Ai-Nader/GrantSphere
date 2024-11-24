import { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, Check, User } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Client {
  id: string;
  name: string;
  company: string;
}

interface ClientSelectProps {
  selectedClient: Client | null;
  onSelect: (client: Client) => void;
}

const clients: Client[] = [
  { id: "1", name: "John Morrison", company: "Morrison Enterprises" },
  { id: "2", name: "Sarah Williams", company: "Williams & Co" },
  { id: "3", name: "Michael Chang", company: "Chang Industries" },
  { id: "4", name: "Emma Davis", company: "Davis Solutions" },
  { id: "5", name: "Robert Wilson", company: "Wilson Group" },
];

export function ClientSelect({ selectedClient, onSelect }: ClientSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(search.toLowerCase()) ||
    client.company.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between px-4 py-2 text-left",
          "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg",
          "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        )}
      >
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-fundspoke-100 dark:bg-fundspoke-900 flex items-center justify-center mr-3">
            <User className="h-4 w-4 text-fundspoke-600 dark:text-fundspoke-400" />
          </div>
          <div>
            {selectedClient ? (
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  {selectedClient.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedClient.company}
                </div>
              </div>
            ) : (
              <div className="text-gray-500 dark:text-gray-400">Select a client</div>
            )}
          </div>
        </div>
        <ChevronDown className={cn(
          "h-5 w-5 text-gray-400 transition-transform",
          isOpen && "transform rotate-180"
        )} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clients..."
                className={cn(
                  "w-full pl-9 pr-3 py-2 text-sm",
                  "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md",
                  "focus:outline-none focus:ring-2 focus:ring-fundspoke-500"
                )}
              />
            </div>
          </div>

          <div className="max-h-60 overflow-auto">
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => {
                    onSelect(client);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={cn(
                    "w-full flex items-center px-4 py-2 text-left",
                    "hover:bg-gray-50 dark:hover:bg-gray-700",
                    selectedClient?.id === client.id && "bg-fundspoke-50 dark:bg-fundspoke-900/20"
                  )}
                >
                  <div className="h-8 w-8 rounded-full bg-fundspoke-100 dark:bg-fundspoke-900 flex items-center justify-center mr-3">
                    <User className="h-4 w-4 text-fundspoke-600 dark:text-fundspoke-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {client.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {client.company}
                    </div>
                  </div>
                  {selectedClient?.id === client.id && (
                    <Check className="h-5 w-5 text-fundspoke-600 dark:text-fundspoke-400" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                No clients found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}