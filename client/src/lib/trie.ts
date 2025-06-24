import { Contact } from "@shared/schema";

export class TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  contacts: Set<Contact>;

  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
    this.contacts = new Set();
  }
}

export class ContactTrie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(contact: Contact): void {
    // Insert name words
    const nameWords = contact.name.toLowerCase().split(' ');
    nameWords.forEach(word => {
      this.insertWord(word, contact);
    });

    // Insert phone number digits
    const phoneDigits = contact.phone.replace(/\D/g, '');
    this.insertWord(phoneDigits, contact);

    // Insert email if exists
    if (contact.email) {
      const emailParts = contact.email.toLowerCase().split('@');
      emailParts.forEach(part => {
        this.insertWord(part, contact);
      });
    }
  }

  private insertWord(word: string, contact: Contact): void {
    let node = this.root;
    
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
      node.contacts.add(contact);
    }
    
    node.isEndOfWord = true;
  }

  search(prefix: string): Contact[] {
    if (!prefix.trim()) return [];
    
    const node = this.findNode(prefix.toLowerCase());
    if (!node) return [];

    return Array.from(node.contacts);
  }

  private findNode(prefix: string): TrieNode | null {
    let node = this.root;
    
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return null;
      }
      node = node.children.get(char)!;
    }
    
    return node;
  }

  delete(contact: Contact): void {
    // Remove from name words
    const nameWords = contact.name.toLowerCase().split(' ');
    nameWords.forEach(word => {
      this.deleteFromWord(word, contact);
    });

    // Remove from phone number
    const phoneDigits = contact.phone.replace(/\D/g, '');
    this.deleteFromWord(phoneDigits, contact);

    // Remove from email if exists
    if (contact.email) {
      const emailParts = contact.email.toLowerCase().split('@');
      emailParts.forEach(part => {
        this.deleteFromWord(part, contact);
      });
    }
  }

  private deleteFromWord(word: string, contact: Contact): void {
    const nodes: TrieNode[] = [];
    let node = this.root;
    
    // Collect all nodes in the path
    nodes.push(node);
    for (const char of word) {
      if (!node.children.has(char)) return;
      node = node.children.get(char)!;
      nodes.push(node);
    }

    // Remove contact from all nodes in the path
    nodes.forEach(n => n.contacts.delete(contact));
  }

  // Fuzzy search with edit distance tolerance
  fuzzySearch(query: string, maxDistance: number = 1): Contact[] {
    const results = new Set<Contact>();
    const lowerQuery = query.toLowerCase();
    
    this.fuzzySearchHelper(this.root, '', lowerQuery, 0, maxDistance, results);
    
    return Array.from(results);
  }

  private fuzzySearchHelper(
    node: TrieNode,
    currentWord: string,
    query: string,
    distance: number,
    maxDistance: number,
    results: Set<Contact>
  ): void {
    if (distance > maxDistance) return;

    // If we've processed the entire query and we're within distance tolerance
    if (currentWord.length >= query.length - maxDistance) {
      node.contacts.forEach(contact => results.add(contact));
    }

    for (const [char, childNode] of node.children) {
      const newWord = currentWord + char;
      
      if (currentWord.length < query.length) {
        const queryChar = query[currentWord.length];
        
        if (char === queryChar) {
          // Exact match
          this.fuzzySearchHelper(childNode, newWord, query, distance, maxDistance, results);
        } else {
          // Substitution
          this.fuzzySearchHelper(childNode, newWord, query, distance + 1, maxDistance, results);
        }
        
        // Insertion (skip character in query)
        this.fuzzySearchHelper(node, currentWord, query.substring(1), distance + 1, maxDistance, results);
      }
      
      // Deletion (skip character in trie)
      this.fuzzySearchHelper(childNode, newWord, query, distance + 1, maxDistance, results);
    }
  }
}
