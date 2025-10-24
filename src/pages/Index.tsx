import { useState, useEffect } from 'react';
import { UserList } from '@/components/UserManagement/UserList';
import { AddUserModal } from '@/components/UserManagement/AddUserModal';
import { ProfilePage } from '@/components/UserManagement/ProfilePage';
import { Header } from '@/components/UserManagement/Header';
import { toast } from 'sonner';

const STORAGE_KEY = 'user_management_app_data';

// Admin user profile
const adminUser = {
  id: 'admin',
  name: 'Admin User',
  email: 'admin@company.com',
  contact: '+91 9999999999',
};

const initialData = {
  users: [
    { id: '1', name: 'Dave Richards', email: 'dave@mail.com', contact: '+91 8332883854' },
    { id: '2', name: 'Abhishek Hari', email: 'hari@mail.com', contact: '+91 9876543210' },
    { id: '3', name: 'Nishta Gupta', email: 'nishta@mail.com', contact: '+91 7771112223' },
  ],
  profileDetails: {
    'admin': {
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@company.com',
      yearOfBirth: '1985',
      gender: 'Male',
      phone: '9999999999',
      alternatePhone: '',
      address: '456 Admin Street',
      pincode: '110001',
      domicileState: 'California',
      domicileCountry: 'USA',
      education: [
        {
          school: 'Business School',
          degree: 'Masters in Business Administration',
          course: 'Management',
          year: '2010',
          grade: 'A',
        },
      ],
      skills: 'Management, Leadership, Strategy',
      projects: 'User Management System',
      experience: [{ domain: 'Management', subDomain: 'Operations', tenure: '> 5 years' }],
      linkedin: 'linkedin.com/in/adminuser',
      resume: 'admin_resume.pdf',
    },
    '1': {
      firstName: 'Dave',
      lastName: 'Richards',
      email: 'dave@mail.com',
      yearOfBirth: '1990',
      gender: 'Male',
      phone: '8332883854',
      alternatePhone: '9876543210',
      address: '123 Main St',
      pincode: '500001',
      domicileState: 'Telangana',
      domicileCountry: 'India',
      education: [
        {
          school: 'Lincoln College',
          degree: 'Bachelors in Technology',
          course: 'Computer science engineering',
          year: '2012',
          grade: 'A+',
        },
      ],
      skills: 'React, Tailwind CSS, JavaScript',
      projects: 'User Management App',
      experience: [{ domain: 'Technology', subDomain: 'MERN Stack', tenure: '3 years' }],
      linkedin: 'linkedin.com/in/daverichards',
      resume: 'myresume.pdf',
    },
    '2': {},
    '3': {},
  },
};

const Index = () => {
  const [view, setView] = useState<'list' | 'profile'>('list');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [users, setUsers] = useState(initialData.users);
  const [profileDetails, setProfileDetails] = useState(initialData.profileDetails);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setUsers(parsed.users || initialData.users);
      setProfileDetails(parsed.profileDetails || initialData.profileDetails);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ users, profileDetails }));
  }, [users, profileDetails]);

  const handleAddUser = (userData: { name: string; email: string; contact: string }) => {
    const newUser = {
      id: Date.now().toString(),
      ...userData,
    };
    setUsers([...users, newUser]);
    setProfileDetails({ ...profileDetails, [newUser.id]: {} });
    toast.success('User added successfully!');
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((u) => u.id !== userId));
    const newProfileDetails = { ...profileDetails };
    delete newProfileDetails[userId];
    setProfileDetails(newProfileDetails);
    toast.success('User deleted successfully!');
  };

  const handleViewProfile = (userId: string) => {
    setSelectedUserId(userId);
    setView('profile');
  };

  const handleViewAdminProfile = () => {
    setSelectedUserId('admin');
    setView('profile');
  };

  const handleUpdateProfile = (userId: string, profile: any) => {
    setProfileDetails({ ...profileDetails, [userId]: profile });
    toast.success('Profile updated successfully!');
  };

  const handleUpdateUser = (userId: string, userData: Partial<typeof users[0]>) => {
    if (userId === 'admin') {
      // Admin user is not in the users array, so we don't update it
      return;
    }
    setUsers(users.map((u) => (u.id === userId ? { ...u, ...userData } : u)));
  };

  // Get selected user (either from users array or admin)
  const selectedUser = selectedUserId === 'admin' 
    ? adminUser 
    : users.find((u) => u.id === selectedUserId);
  
  const userWithDetails = selectedUser
    ? { ...selectedUser, details: profileDetails[selectedUser.id] }
    : null;

  if (view === 'profile' && userWithDetails) {
    return (
      <>
        <Header onViewProfile={handleViewAdminProfile} />
        <ProfilePage
          user={userWithDetails}
          onBack={() => setView('list')}
          onUpdateProfile={handleUpdateProfile}
          onUpdateUser={handleUpdateUser}
        />
      </>
    );
  }

  return (
    <>
      <Header onViewProfile={handleViewAdminProfile} />
      <UserList
        users={users}
        onViewProfile={handleViewProfile}
        onDeleteUser={handleDeleteUser}
        onAddUser={() => setIsAddModalOpen(true)}
      />
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </>
  );
};

export default Index;
