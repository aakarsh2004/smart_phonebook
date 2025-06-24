import { Contact, InsertContact } from "@shared/schema";

export const DEFAULT_CONTACTS: Contact[] = [
  // Family Contacts
  {
    id: 1,
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@gmail.com",
    tag: "family",
    favorite: true,
    createdAt: new Date("2024-01-15"),
    lastCalled: new Date("2024-06-20"),
  },
  {
    id: 2,
    name: "Priya Sharma",
    phone: "+91 87654 32109",
    email: "priya.sharma@yahoo.com",
    tag: "family",
    favorite: true,
    createdAt: new Date("2024-02-10"),
    lastCalled: new Date("2024-06-18"),
  },
  {
    id: 3,
    name: "Amit Singh",
    phone: "+91 76543 21098",
    email: "amit.singh@hotmail.com",
    tag: "family",
    favorite: false,
    createdAt: new Date("2024-03-05"),
  },
  {
    id: 4,
    name: "Sunita Devi",
    phone: "+91 65432 10987",
    email: "sunita.devi@gmail.com",
    tag: "family",
    favorite: true,
    createdAt: new Date("2024-03-20"),
    lastCalled: new Date("2024-06-15"),
  },
  {
    id: 5,
    name: "Vikram Gupta",
    phone: "+91 54321 09876",
    email: "vikram.gupta@outlook.com",
    tag: "family",
    favorite: false,
    createdAt: new Date("2024-04-01"),
  },
  
  // Work Contacts
  {
    id: 6,
    name: "Dr. Neha Agarwal",
    phone: "+91 98123 45670",
    email: "neha.agarwal@hospital.com",
    tag: "work",
    favorite: true,
    createdAt: new Date("2024-01-20"),
    lastCalled: new Date("2024-06-19"),
  },
  {
    id: 7,
    name: "Rohit Verma",
    phone: "+91 87012 34569",
    email: "rohit.verma@techcorp.in",
    tag: "work",
    favorite: false,
    createdAt: new Date("2024-02-15"),
  },
  {
    id: 8,
    name: "Anjali Patel",
    phone: "+91 76901 23458",
    email: "anjali.patel@company.co.in",
    tag: "work",
    favorite: true,
    createdAt: new Date("2024-03-10"),
    lastCalled: new Date("2024-06-17"),
  },
  {
    id: 9,
    name: "Suresh Reddy",
    phone: "+91 65890 12347",
    email: "suresh.reddy@business.com",
    tag: "work",
    favorite: false,
    createdAt: new Date("2024-03-25"),
  },
  {
    id: 10,
    name: "Kavita Joshi",
    phone: "+91 54789 01236",
    email: "kavita.joshi@startup.in",
    tag: "work",
    favorite: false,
    createdAt: new Date("2024-04-05"),
  },
  
  // Friends
  {
    id: 11,
    name: "Arjun Kapoor",
    phone: "+91 98234 56781",
    email: "arjun.kapoor@gmail.com",
    tag: "friends",
    favorite: true,
    createdAt: new Date("2024-01-10"),
    lastCalled: new Date("2024-06-21"),
  },
  {
    id: 12,
    name: "Sneha Kulkarni",
    phone: "+91 87123 45672",
    email: "sneha.kulkarni@yahoo.in",
    tag: "friends",
    favorite: true,
    createdAt: new Date("2024-02-05"),
    lastCalled: new Date("2024-06-16"),
  },
  {
    id: 13,
    name: "Ravi Mehta",
    phone: "+91 76012 34563",
    email: "ravi.mehta@hotmail.com",
    tag: "friends",
    favorite: false,
    createdAt: new Date("2024-02-20"),
  },
  {
    id: 14,
    name: "Pooja Nair",
    phone: "+91 65901 23454",
    email: "pooja.nair@gmail.com",
    tag: "friends",
    favorite: true,
    createdAt: new Date("2024-03-15"),
    lastCalled: new Date("2024-06-14"),
  },
  {
    id: 15,
    name: "Karan Thakur",
    phone: "+91 54890 12345",
    email: "karan.thakur@outlook.com",
    tag: "friends",
    favorite: false,
    createdAt: new Date("2024-04-10"),
  },
  {
    id: 16,
    name: "Divya Rao",
    phone: "+91 43789 01234",
    email: "divya.rao@yahoo.com",
    tag: "friends",
    favorite: false,
    createdAt: new Date("2024-04-15"),
  },
  {
    id: 17,
    name: "Abhishek Jain",
    phone: "+91 32678 90123",
    email: "abhishek.jain@gmail.com",
    tag: "friends",
    favorite: true,
    createdAt: new Date("2024-04-20"),
    lastCalled: new Date("2024-06-13"),
  },
  {
    id: 18,
    name: "Ritika Bansal",
    phone: "+91 21567 89012",
    email: "ritika.bansal@hotmail.com",
    tag: "friends",
    favorite: false,
    createdAt: new Date("2024-04-25"),
  },
  
  // Other Contacts
  {
    id: 19,
    name: "Pizza Palace",
    phone: "+91 98000 12345",
    email: "orders@pizzapalace.in",
    tag: "other",
    favorite: false,
    createdAt: new Date("2024-02-28"),
  },
  {
    id: 20,
    name: "Cab Service",
    phone: "+91 87999 23456",
    email: "booking@cabservice.com",
    tag: "other",
    favorite: true,
    createdAt: new Date("2024-03-12"),
    lastCalled: new Date("2024-06-12"),
  },
  {
    id: 21,
    name: "Home Repair",
    phone: "+91 76888 34567",
    email: "service@homerepair.in",
    tag: "other",
    favorite: false,
    createdAt: new Date("2024-03-18"),
  },
  {
    id: 22,
    name: "Medical Store",
    phone: "+91 65777 45678",
    email: "info@medstore.com",
    tag: "other",
    favorite: false,
    createdAt: new Date("2024-04-08"),
  },
  
  // More Family
  {
    id: 23,
    name: "Deepak Agarwal",
    phone: "+91 94567 89123",
    email: "deepak.agarwal@gmail.com",
    tag: "family",
    favorite: true,
    createdAt: new Date("2024-01-25"),
    lastCalled: new Date("2024-06-11"),
  },
  {
    id: 24,
    name: "Meera Sinha",
    phone: "+91 83456 78912",
    email: "meera.sinha@yahoo.in",
    tag: "family",
    favorite: false,
    createdAt: new Date("2024-02-12"),
  },
  {
    id: 25,
    name: "Ramesh Pandey",
    phone: "+91 72345 67891",
    email: "ramesh.pandey@hotmail.com",
    tag: "family",
    favorite: true,
    createdAt: new Date("2024-02-25"),
    lastCalled: new Date("2024-06-10"),
  },
  
  // More Work Contacts
  {
    id: 26,
    name: "Sanjay Malhotra",
    phone: "+91 91234 56789",
    email: "sanjay.malhotra@enterprise.in",
    tag: "work",
    favorite: false,
    createdAt: new Date("2024-03-01"),
  },
  {
    id: 27,
    name: "Rekha Tiwari",
    phone: "+91 80123 45678",
    email: "rekha.tiwari@solutions.com",
    tag: "work",
    favorite: true,
    createdAt: new Date("2024-03-14"),
    lastCalled: new Date("2024-06-09"),
  },
  {
    id: 28,
    name: "Manish Dubey",
    phone: "+91 79012 34567",
    email: "manish.dubey@consulting.in",
    tag: "work",
    favorite: false,
    createdAt: new Date("2024-03-28"),
  },
  
  // More Friends
  {
    id: 29,
    name: "Swati Chandra",
    phone: "+91 68901 23456",
    email: "swati.chandra@gmail.com",
    tag: "friends",
    favorite: true,
    createdAt: new Date("2024-01-30"),
    lastCalled: new Date("2024-06-08"),
  },
  {
    id: 30,
    name: "Gaurav Mishra",
    phone: "+91 57890 12345",
    email: "gaurav.mishra@yahoo.com",
    tag: "friends",
    favorite: false,
    createdAt: new Date("2024-02-18"),
  },
  {
    id: 31,
    name: "Nisha Gupta",
    phone: "+91 46789 01234",
    email: "nisha.gupta@outlook.com",
    tag: "friends",
    favorite: true,
    createdAt: new Date("2024-03-03"),
    lastCalled: new Date("2024-06-07"),
  },
  {
    id: 32,
    name: "Vinay Kumar",
    phone: "+91 35678 90123",
    email: "vinay.kumar@hotmail.com",
    tag: "friends",
    favorite: false,
    createdAt: new Date("2024-03-16"),
  },
  {
    id: 33,
    name: "Simran Kaur",
    phone: "+91 24567 89012",
    email: "simran.kaur@gmail.com",
    tag: "friends",
    favorite: true,
    createdAt: new Date("2024-03-30"),
    lastCalled: new Date("2024-06-06"),
  },
  {
    id: 34,
    name: "Harsh Agrawal",
    phone: "+91 13456 78901",
    email: "harsh.agrawal@yahoo.in",
    tag: "friends",
    favorite: false,
    createdAt: new Date("2024-04-12"),
  },
  
  // Additional Contacts to reach 45-50
  {
    id: 35,
    name: "Grocery Store",
    phone: "+91 98111 22233",
    email: "orders@grocery.in",
    tag: "other",
    favorite: false,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: 36,
    name: "Bank Manager",
    phone: "+91 87222 33344",
    email: "manager@bank.co.in",
    tag: "other",
    favorite: true,
    createdAt: new Date("2024-02-01"),
    lastCalled: new Date("2024-06-05"),
  },
  {
    id: 37,
    name: "Electrician",
    phone: "+91 76333 44455",
    email: "service@electric.com",
    tag: "other",
    favorite: false,
    createdAt: new Date("2024-02-14"),
  },
  {
    id: 38,
    name: "Plumber",
    phone: "+91 65444 55566",
    email: "help@plumbing.in",
    tag: "other",
    favorite: false,
    createdAt: new Date("2024-02-28"),
  },
  {
    id: 39,
    name: "Aarti Bhardwaj",
    phone: "+91 94555 66677",
    email: "aarti.bhardwaj@gmail.com",
    tag: "family",
    favorite: true,
    createdAt: new Date("2024-01-08"),
    lastCalled: new Date("2024-06-04"),
  },
  {
    id: 40,
    name: "Nikhil Sood",
    phone: "+91 83666 77788",
    email: "nikhil.sood@techstart.in",
    tag: "work",
    favorite: false,
    createdAt: new Date("2024-03-22"),
  },
  {
    id: 41,
    name: "Preeti Saxena",
    phone: "+91 72777 88899",
    email: "preeti.saxena@design.com",
    tag: "work",
    favorite: true,
    createdAt: new Date("2024-04-03"),
    lastCalled: new Date("2024-06-03"),
  },
  {
    id: 42,
    name: "Tarun Bhatia",
    phone: "+91 61888 99900",
    email: "tarun.bhatia@gmail.com",
    tag: "friends",
    favorite: false,
    createdAt: new Date("2024-02-07"),
  },
  {
    id: 43,
    name: "Ritu Malhotra",
    phone: "+91 50999 00011",
    email: "ritu.malhotra@yahoo.com",
    tag: "friends",
    favorite: true,
    createdAt: new Date("2024-03-11"),
    lastCalled: new Date("2024-06-02"),
  },
  {
    id: 44,
    name: "Laundry Service",
    phone: "+91 98000 11122",
    email: "pickup@laundry.in",
    tag: "other",
    favorite: false,
    createdAt: new Date("2024-04-06"),
  },
  {
    id: 45,
    name: "Gym Trainer",
    phone: "+91 87111 22233",
    email: "fitness@gym.com",
    tag: "other",
    favorite: true,
    createdAt: new Date("2024-03-07"),
    lastCalled: new Date("2024-06-01"),
  },
  {
    id: 46,
    name: "Coaching Center",
    phone: "+91 76222 33344",
    email: "admission@coaching.in",
    tag: "other",
    favorite: false,
    createdAt: new Date("2024-04-18"),
  },
  {
    id: 47,
    name: "Travel Agent",
    phone: "+91 65333 44455",
    email: "bookings@travel.co.in",
    tag: "other",
    favorite: false,
    createdAt: new Date("2024-02-22"),
  },
  {
    id: 48,
    name: "Insurance Agent",
    phone: "+91 54444 55566",
    email: "policies@insurance.com",
    tag: "other",
    favorite: true,
    createdAt: new Date("2024-03-04"),
    lastCalled: new Date("2024-05-31"),
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
  
  // Indian phone number format
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  
  // US phone number format
  if (cleaned.length === 10) {
    return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // US phone number with country code
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
}

export function getTimeAgo(date: Date | string | undefined): string {
  if (!date) return "Never called";
  
  const now = new Date();
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const diffInMinutes = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60));
  
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
