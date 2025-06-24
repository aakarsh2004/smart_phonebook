import { useState, useEffect, useMemo } from 'react';
import { Plus, BookOpen, Moon, Sun, Download, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useTheme } from '@/components/theme-provider';
import { ContactTrie } from '@/lib/trie';
import { DEFAULT_CONTACTS, exportContacts, importContacts } from '@/lib/contacts';
import { Contact, InsertContact, CallLog } from '@shared/schema';
import { SearchPanel } from '@/components/search-panel';
import { ContactList } from '@/components/contact-list';
import { CallModal } from '@/components/call-modal';
import { ContactModal } from '@/components/contact-modal';
import { useToast } from '@/hooks/use-toast';

export default function Phonebook() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  const [contacts, setContacts] = useLocalStorage<Contact[]>('phonebook-contacts', DEFAULT_CONTACTS);
  const [callLogs, setCallLogs] = useLocalStorage<CallLog[]>('phonebook-call-logs', []);
  
  // Debug: Log contact count on load
  useEffect(() => {
    console.log(`Loaded ${contacts.length} contacts from storage`);
  }, [contacts.length]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [callingContact, setCallingContact] = useState<Contact | null>(null);

  // Initialize Trie with contacts
  const trie = useMemo(() => {
    const newTrie = new ContactTrie();
    contacts.forEach(contact => newTrie.insert(contact));
    return newTrie;
  }, [contacts]);

  // Filter contacts based on search and tag filter
  const filteredContacts = useMemo(() => {
    let filtered = contacts;

    // Apply search filter
    if (searchQuery.trim()) {
      const searchResults = trie.search(searchQuery);
      filtered = searchResults;
    }

    // Apply tag filter
    if (activeFilter === 'favorites') {
      filtered = filtered.filter(contact => contact.favorite);
    } else if (activeFilter !== 'all') {
      filtered = filtered.filter(contact => contact.tag === activeFilter);
    }

    return filtered;
  }, [contacts, searchQuery, activeFilter, trie]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterByTag = (tag: string) => {
    setActiveFilter(tag);
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setShowContactModal(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setShowContactModal(true);
  };

  const handleSaveContact = (contactData: InsertContact) => {
    if (editingContact) {
      // Update existing contact
      const updatedContacts = contacts.map(c =>
        c.id === editingContact.id
          ? { ...contactData, id: editingContact.id, createdAt: editingContact.createdAt }
          : c
      );
      setContacts(updatedContacts);
      toast({
        title: "Contact updated",
        description: `${contactData.name} has been updated successfully.`,
      });
    } else {
      // Add new contact
      const newContact: Contact = {
        ...contactData,
        id: Date.now(),
        createdAt: new Date(),
      };
      setContacts(prev => [...prev, newContact]);
      toast({
        title: "Contact added",
        description: `${contactData.name} has been added to your contacts.`,
      });
    }
  };

  const handleDeleteContact = (contact: Contact) => {
    setContacts(prev => prev.filter(c => c.id !== contact.id));
    toast({
      title: "Contact deleted",
      description: `${contact.name} has been removed from your contacts.`,
      variant: "destructive",
    });
  };

  const handleToggleFavorite = (contact: Contact) => {
    const updatedContacts = contacts.map(c =>
      c.id === contact.id ? { ...c, favorite: !c.favorite } : c
    );
    setContacts(updatedContacts);
    toast({
      title: contact.favorite ? "Removed from favorites" : "Added to favorites",
      description: `${contact.name} has been ${contact.favorite ? 'removed from' : 'added to'} favorites.`,
    });
  };

  const handleCall = (contact: Contact) => {
    setCallingContact(contact);
    setShowCallModal(true);
  };

  const handleCallEnd = (contact: Contact, duration: number) => {
    // Update last called time
    const updatedContacts = contacts.map(c =>
      c.id === contact.id ? { ...c, lastCalled: new Date() } : c
    );
    setContacts(updatedContacts);

    // Add to call log
    const newCallLog: CallLog = {
      id: Date.now(),
      contactId: contact.id,
      duration,
      timestamp: new Date(),
      type: 'outgoing',
    };
    setCallLogs(prev => [...prev, newCallLog]);

    toast({
      title: "Call ended",
      description: `Call with ${contact.name} lasted ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')}`,
    });
  };

  const handleExportContacts = () => {
    exportContacts(contacts);
    toast({
      title: "Contacts exported",
      description: "Your contacts have been exported successfully.",
    });
  };

  const handleImportContacts = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const importedContacts = await importContacts(file);
      setContacts(prev => {
        const existingIds = new Set(prev.map(c => c.id));
        const newContacts = importedContacts.filter(c => !existingIds.has(c.id));
        return [...prev, ...newContacts];
      });
      toast({
        title: "Contacts imported",
        description: `${importedContacts.length} contacts have been imported successfully.`,
      });
    } catch (error) {
      toast({
        title: "Import failed",
        description: "Failed to import contacts. Please check the file format.",
        variant: "destructive",
      });
    }
    
    // Reset file input
    event.target.value = '';
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-card shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="text-white h-4 w-4" />
              </div>
              <h1 className="text-xl font-bold">Smart Phonebook</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <label htmlFor="import-file">
                <Button variant="ghost" size="sm" className="cursor-pointer" asChild>
                  <div>
                    <Upload className="h-4 w-4" />
                  </div>
                </Button>
              </label>
              <input
                id="import-file"
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImportContacts}
              />
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleExportContacts}
              >
                <Download className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Search Panel */}
          <div className="lg:col-span-4">
            <SearchPanel
              contacts={contacts}
              trie={trie}
              onSearch={handleSearch}
              onFilterByTag={handleFilterByTag}
              onAddContact={handleAddContact}
              onExportContacts={handleExportContacts}
              activeFilter={activeFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          {/* Contacts List */}
          <div className="lg:col-span-8">
            <ContactList
              contacts={filteredContacts}
              onCall={handleCall}
              onEdit={handleEditContact}
              onDelete={handleDeleteContact}
              onToggleFavorite={handleToggleFavorite}
            />
          </div>
        </div>
      </div>

      {/* Floating Action Button (Mobile) */}
      <Button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg lg:hidden"
        onClick={handleAddContact}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Modals */}
      <ContactModal
        isOpen={showContactModal}
        contact={editingContact}
        onClose={() => setShowContactModal(false)}
        onSave={handleSaveContact}
      />

      <CallModal
        isOpen={showCallModal}
        contact={callingContact}
        onClose={() => setShowCallModal(false)}
        onCallEnd={handleCallEnd}
      />
    </div>
  );
}
