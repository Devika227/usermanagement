import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BasicInfoForm } from './forms/BasicInfoForm';
import { EducationSkillsForm } from './forms/EducationSkillsForm';
import { ExperienceForm } from './forms/ExperienceForm';

interface UserData {
  id: string;
  name: string;
  email: string;
  contact: string;
  details?: any;
}

interface ProfilePageProps {
  user: UserData;
  onBack: () => void;
  onUpdateProfile: (userId: string, profile: any) => void;
  onUpdateUser: (userId: string, user: Partial<UserData>) => void;
}

export const ProfilePage = ({ user, onBack, onUpdateProfile, onUpdateUser }: ProfilePageProps) => {
  const [profile, setProfile] = useState(user.details || {});
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);

  useEffect(() => {
    setProfile(user.details || {});
  }, [user]);

  const handleSave = () => {
    onUpdateProfile(user.id, profile);
    onUpdateUser(user.id, {
      name: `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || user.name,
      email: profile.email || user.email,
      contact: profile.phone ? `+91 ${profile.phone}` : user.contact,
    });
    setIsEditingBasic(false);
    setIsEditingEducation(false);
    setIsEditingExperience(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-muted">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-8">
        {/* Header */}
        <div className="mb-8 pt-4">
          <Button variant="ghost" onClick={onBack} className="gap-2 mb-4">
            <ArrowLeft size={20} />
            Back to Users
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            {(isEditingBasic || isEditingEducation || isEditingExperience) && (
              <Button onClick={handleSave}>Save Changes</Button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="education">Education & Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <BasicInfoForm
              profile={profile}
              setProfile={setProfile}
              isEditing={isEditingBasic}
              toggleEdit={() => setIsEditingBasic(!isEditingBasic)}
            />
          </TabsContent>

          <TabsContent value="education">
            <EducationSkillsForm
              profile={profile}
              setProfile={setProfile}
              isEditing={isEditingEducation}
              toggleEdit={() => setIsEditingEducation(!isEditingEducation)}
            />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceForm
              profile={profile}
              setProfile={setProfile}
              isEditing={isEditingExperience}
              toggleEdit={() => setIsEditingExperience(!isEditingExperience)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
