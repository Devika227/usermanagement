import { Edit2, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ExperienceFormProps {
  profile: any;
  setProfile: (profile: any) => void;
  isEditing: boolean;
  toggleEdit: () => void;
}

export const ExperienceForm = ({ profile, setProfile, isEditing, toggleEdit }: ExperienceFormProps) => {
  const experience = profile.experience || [{}];

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setProfile((prev: any) => ({ ...prev, experience: newExperience }));
  };

  return (
    <div className="space-y-8">
      {/* Work Experience */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-card-foreground">Work Experience</h2>
          <button
            onClick={toggleEdit}
            className={`p-2 rounded-full transition-all duration-200 ${
              isEditing
                ? 'bg-primary text-primary-foreground'
                : 'bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground'
            }`}
          >
            <Edit2 size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experience.map((exp: any, index: number) => (
            <div key={index} className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>Domain</Label>
                <Input
                  placeholder="e.g. Technology"
                  value={exp.domain || ''}
                  onChange={(e) => handleExperienceChange(index, 'domain', e.target.value)}
                  readOnly={!isEditing}
                  className={!isEditing ? 'bg-muted' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label>Sub-domain</Label>
                <Input
                  placeholder="e.g. MERN Stack"
                  value={exp.subDomain || ''}
                  onChange={(e) => handleExperienceChange(index, 'subDomain', e.target.value)}
                  readOnly={!isEditing}
                  className={!isEditing ? 'bg-muted' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label>Experience</Label>
                {isEditing ? (
                  <Select
                    value={exp.tenure || ''}
                    onValueChange={(value) => handleExperienceChange(index, 'tenure', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="< 1 year">{'< 1 year'}</SelectItem>
                      <SelectItem value="1-3 years">1-3 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="> 5 years">{'>'}5 years</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input value={exp.tenure || ''} readOnly className="bg-muted" />
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* LinkedIn and Resume */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-6">LinkedIn</h2>
          <div className="space-y-2">
            <Label>Profile URL</Label>
            <Input
              placeholder="linkedin.com/in/..."
              value={profile.linkedin || ''}
              onChange={(e) => setProfile((prev: any) => ({ ...prev, linkedin: e.target.value }))}
              readOnly={!isEditing}
              className={!isEditing ? 'bg-muted' : ''}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold text-card-foreground mb-6">Resume</h2>
          <div className="space-y-2">
            <Label>File</Label>
            <div className={`flex items-center justify-between p-3 border rounded-lg ${!isEditing ? 'bg-muted' : 'bg-background'}`}>
              <span className="text-sm">📄 {profile.resume || 'No file uploaded'}</span>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye size={16} />
                View
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
