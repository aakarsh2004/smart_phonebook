import { Contact, InsertContact } from "@shared/schema";

export const DEFAULT_CONTACTS: Contact[] = [
  {
    id: 1,
    name: "John Doe",
    phone: "+1 (555) 123-4567",
    email: "john@example.com",
    tag: "work",
    favorite: true,
    createdAt: new Date("2024-01-15"),
    lastCalled: new Date("2024-06-20"),
  },
  {
    id: 2,
    name: "Alice Smith",
    phone: "+1 (555) 987-6543",
    email: "alice@example.com",
    tag: "family",
    favorite: false,
    createdAt: new Date("2024-02-10"),
  },
  {
    id: 3,
    name: "Michael Johnson",
    phone: "+1 (555) 456-7890",
    email: "mike@example.com",
    tag: "friends",
    favorite: false,
    createdAt: new Date("2024-03-05"),
    lastCalled: new Date("2024-06-15"),
  },
  {
    id: 4,
    name: "Sarah Wilson",
    phone: "+1 (555) 321-0987",
    email: "sarah@company.com",
    tag: "work",
    favorite: false,
    createdAt: new Date("2024-03-20"),
  },
  {
    id: 5,
    name: "David Brown",
    phone: "+1 (555) 654-3210",
    email: "david@example.com",
    tag: "family",
    favorite: true,
    createdAt: new Date("2024-04-01"),
    lastCalled: new Date("2024-06-18"),
  },
];

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarColor(name: string): string {
  const colors = [
    "from-blue-400 to-purple-500",
    "from-green-400 to-blue-500",
    "from-purple-400 to-pink-500",
    "from-yellow-400 to-orange-500",
    "from-pink-400 to-red-500",
    "from-indigo-400 to-blue-500",
    "from-teal-400 to-green-500",
    "from-orange-400 to-red-500",
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

export function getTimeAgo(date: Date | undefined): string {
  if (!date) return "Never called";
  
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
}

export function exportContacts(contacts: Contact[]): void {
  const dataStr = JSON.stringify(contacts, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `contacts_${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

export function importContacts(file: File): Promise<Contact[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const contacts = JSON.parse(e.target?.result as string);
        resolve(contacts);
      } catch (error) {
        reject(new Error('Invalid JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
