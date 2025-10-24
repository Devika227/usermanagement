import { User, Eye, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface UserData {
  id: string;
  name: string;
  email: string;
  contact: string;
}

interface UserListProps {
  users: UserData[];
  onViewProfile: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onAddUser: () => void;
}

export const UserList = ({ users, onViewProfile, onDeleteUser, onAddUser }: UserListProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-muted">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">User Management</h1>
            <p className="text-muted-foreground">Manage and view user profiles</p>
          </div>
          <Button onClick={onAddUser} className="gap-2">
            <Plus size={20} />
            Add User
          </Button>
        </div>

        {/* User Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <Card key={user.id} className="p-6 hover:shadow-lg transition-all duration-300 border-border bg-card">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-full bg-accent">
                  <User className="text-accent-foreground" size={24} />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => onViewProfile(user.id)}
                    className="p-2 rounded-lg bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-2">{user.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">{user.email}</p>
              <p className="text-sm text-muted-foreground">{user.contact}</p>
            </Card>
          ))}
        </div>

        {users.length === 0 && (
          <div className="text-center py-16">
            <User size={64} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl text-muted-foreground">No users yet. Add your first user to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};
