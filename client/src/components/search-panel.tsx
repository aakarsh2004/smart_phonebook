import { useState, useEffect } from 'react';
import { Search, Mic, Plus, Download, MicIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useVoiceSearch } from '@/hooks/use-voice-search';
import { Contact } from '@shared/schema';
import { ContactTrie } from '@/lib/trie';
import { getInitials, getAvatarColor } from '@/lib/contacts';

interface SearchPanelProps {
  contacts: Contact[];
  trie: ContactTrie;
  onSearch: (query: string) => void;
  onFilterByTag: (tag: string) => void;
  onAddContact: () => void;
  onExportContacts: () => void;
  activeFilter: string;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function SearchPanel({
  contacts,
  trie,
  onSearch,
  onFilterByTag,
  onAddContact,
  onExportContacts,
  activeFilter,
  searchQuery,
  setSearchQuery,
}: SearchPanelProps) {
  const [suggestions, setSuggestions] = useState<Contact[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { isListening, isSupported, startListening } = useVoiceSearch({
    onResult: (transcript) => {
      setSearchQuery(transcript);
      onSearch(transcript);
    },
    onError: (error) => {
      console.error('Voice search error:', error);
    },
  });

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = trie.search(searchQuery);
      setSuggestions(results.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, trie]);

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const handleSuggestionClick = (contact: Contact) => {
    setSearchQuery(contact.name);
    setShowSuggestions(false);
    onSearch(contact.name);
  };

  const getTagCounts = () => {
    const counts = contacts.reduce((acc, contact) => {
      acc[contact.tag] = (acc[contact.tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      all: contacts.length,
      favorites: contacts.filter(c => c.favorite).length,
      ...counts,
    };
  };

  const tagCounts = getTagCounts();

  return (
    <div className="bg-card rounded-xl shadow-sm border p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Search Contacts</h2>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            value={searchQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Search by name or number..."
            className="pl-10 pr-12"
          />
          
          {isSupported && (
            <Button
              variant="ghost"
              size="sm"
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-auto ${
                isListening ? 'text-red-500 animate-pulse' : 'text-muted-foreground hover:text-primary'
              }`}
              onClick={startListening}
              disabled={isListening}
            >
              <Mic className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {isListening && (
          <div className="mt-2 flex items-center text-red-500 text-sm animate-pulse">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
            <span>Listening...</span>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="mb-6 bg-popover rounded-lg border shadow-lg max-h-64 overflow-y-auto">
          {suggestions.map((contact) => (
            <div
              key={contact.id}
              className="p-3 hover:bg-muted cursor-pointer border-b last:border-b-0 flex items-center space-x-3 animate-slide-up"
              onClick={() => handleSuggestionClick(contact)}
            >
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getAvatarColor(contact.name)} flex items-center justify-center text-white text-sm font-medium`}>
                {getInitials(contact.name)}
              </div>
              <div className="flex-1">
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-muted-foreground">{contact.phone}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Filter by Tags</h3>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={activeFilter === 'all' ? 'default' : 'secondary'}
            className="cursor-pointer"
            onClick={() => onFilterByTag('all')}
          >
            All <span className="ml-1 bg-background/20 px-1 rounded text-xs">{tagCounts.all}</span>
          </Badge>
          <Badge
            variant={activeFilter === 'favorites' ? 'default' : 'secondary'}
            className="cursor-pointer"
            onClick={() => onFilterByTag('favorites')}
          >
            ⭐ Favorites <span className="ml-1 bg-background/20 px-1 rounded text-xs">{tagCounts.favorites || 0}</span>
          </Badge>
          <Badge
            variant={activeFilter === 'family' ? 'default' : 'secondary'}
            className="cursor-pointer"
            onClick={() => onFilterByTag('family')}
          >
            Family <span className="ml-1 bg-background/20 px-1 rounded text-xs">{tagCounts.family || 0}</span>
          </Badge>
          <Badge
            variant={activeFilter === 'work' ? 'default' : 'secondary'}
            className="cursor-pointer"
            onClick={() => onFilterByTag('work')}
          >
            Work <span className="ml-1 bg-background/20 px-1 rounded text-xs">{tagCounts.work || 0}</span>
          </Badge>
          <Badge
            variant={activeFilter === 'friends' ? 'default' : 'secondary'}
            className="cursor-pointer"
            onClick={() => onFilterByTag('friends')}
          >
            Friends <span className="ml-1 bg-background/20 px-1 rounded text-xs">{tagCounts.friends || 0}</span>
          </Badge>
          <Badge
            variant={activeFilter === 'other' ? 'default' : 'secondary'}
            className="cursor-pointer"
            onClick={() => onFilterByTag('other')}
          >
            Other <span className="ml-1 bg-background/20 px-1 rounded text-xs">{tagCounts.other || 0}</span>
          </Badge>
        </div>
      </div>

      <Button onClick={onAddContact} className="w-full mb-6">
        <Plus className="mr-2 h-4 w-4" />
        Add New Contact
      </Button>

      <div className="pt-6 border-t">
        <div className="grid grid-cols-2 gap-4 text-center mb-4">
          <div>
            <div className="text-2xl font-bold">{contacts.length}</div>
            <div className="text-xs text-muted-foreground">Total Contacts</div>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {contacts.filter(c => c.lastCalled).length}
            </div>
            <div className="text-xs text-muted-foreground">Recent Calls</div>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onExportContacts}
        >
          <Download className="mr-2 h-4 w-4" />
          Export Contacts
        </Button>
      </div>
    </div>
  );
}
