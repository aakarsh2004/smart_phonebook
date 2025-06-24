import { useState } from 'react';
import { Phone, Edit, Trash2, Star, SortAsc, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Contact } from '@shared/schema';
import { getInitials, getAvatarColor, getTimeAgo } from '@/lib/contacts';

interface ContactListProps {
  contacts: Contact[];
  onCall: (contact: Contact) => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onToggleFavorite: (contact: Contact) => void;
}

export function ContactList({
  contacts,
  onCall,
  onEdit,
  onDelete,
  onToggleFavorite,
}: ContactListProps) {
  const [sortBy, setSortBy] = useState<'name' | 'recent'>('name');

  const sortedContacts = [...contacts].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      // Sort by last called, with never called contacts at the end
      if (!a.lastCalled && !b.lastCalled) return a.name.localeCompare(b.name);
      if (!a.lastCalled) return 1;
      if (!b.lastCalled) return -1;
      return new Date(b.lastCalled).getTime() - new Date(a.lastCalled).getTime();
    }
  });

  const getTagColor = (tag: string) => {
    const colors = {
      work: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      family: 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
      friends: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
      other: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
    };
    return colors[tag as keyof typeof colors] || colors.other;
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Contacts</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSortBy(sortBy === 'name' ? 'recent' : 'name')}
            >
              <SortAsc className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="divide-y">
        {sortedContacts.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <div className="text-4xl mb-2">📇</div>
            <p>No contacts found</p>
            <p className="text-sm">Try adjusting your search or add a new contact</p>
          </div>
        ) : (
          sortedContacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 hover:bg-muted/50 transition-colors animate-slide-up"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getAvatarColor(contact.name)} flex items-center justify-center text-white font-bold text-lg`}>
                      {getInitials(contact.name)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background"></div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{contact.name}</h3>
                      {contact.favorite && (
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      )}
                    </div>
                    <p className="text-muted-foreground">{contact.phone}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={`text-xs ${getTagColor(contact.tag)}`}>
                        {contact.tag}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {getTimeAgo(contact.lastCalled)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                    onClick={() => onCall(contact)}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    onClick={() => onEdit(contact)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-yellow-500"
                    onClick={() => onToggleFavorite(contact)}
                  >
                    <Star className={`h-4 w-4 ${contact.favorite ? 'fill-current text-yellow-400' : ''}`} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => onDelete(contact)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {contacts.length > 10 && (
        <div className="p-4 text-center border-t">
          <Button variant="ghost" className="text-primary">
            Load More Contacts
          </Button>
        </div>
      )}
    </div>
  );
}
