import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: { name: string; email: string; contact: string }) => void;
}

export const AddUserModal = ({ isOpen, onClose, onAddUser }: AddUserModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');

  const handleAdd = () => {
    if (name && email && contact) {
      onAddUser({ name, email, contact });
      setName('');
      setEmail('');
      setContact('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-card rounded-xl w-full max-w-2xl shadow-2xl transform animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h3 className="text-2xl font-bold text-card-foreground">Add User</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name of the user</Label>
            <Input
              id="name"
              placeholder="Type here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Type here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                type="tel"
                placeholder="Type here"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-border flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </div>
      </div>
    </div>
  );
};
