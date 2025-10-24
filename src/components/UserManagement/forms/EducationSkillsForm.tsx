import { Edit2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

interface EducationSkillsFormProps {
  profile: any;
  setProfile: (profile: any) => void;
  isEditing: boolean;
  toggleEdit: () => void;
}

export const EducationSkillsForm = ({ profile, setProfile, isEditing, toggleEdit }: EducationSkillsFormProps) => {
  const education = profile.education || [{}];

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setProfile((prev: any) => ({ ...prev, education: newEducation }));
  };

  return (
    <div className="space-y-8">
      {/* Education Details */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-card-foreground">Education Details</h2>
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
          {education.map((edu: any, index: number) => (
            <div key={index} className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label>School / College</Label>
                <Input
                  placeholder="e.g. Lincoln College"
                  value={edu.school || ''}
                  onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                  readOnly={!isEditing}
                  className={!isEditing ? 'bg-muted' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label>Highest degree or equivalent</Label>
                <Input
                  placeholder="e.g. Bachelors in Technology"
                  value={edu.degree || ''}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  readOnly={!isEditing}
                  className={!isEditing ? 'bg-muted' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label>Course</Label>
                <Input
                  placeholder="e.g. Computer science engineering"
                  value={edu.course || ''}
                  onChange={(e) => handleEducationChange(index, 'course', e.target.value)}
                  readOnly={!isEditing}
                  className={!isEditing ? 'bg-muted' : ''}
                />
              </div>

              <div className="space-y-2">
                <Label>Year of completion</Label>
                {isEditing ? (
                  <Select
                    value={edu.year || ''}
                    onValueChange={(value) => handleEducationChange(index, 'year', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 20 }, (_, i) => 2024 - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input value={edu.year || ''} readOnly className="bg-muted" />
                )}
              </div>

              <div className="space-y-2">
                <Label>Grade</Label>
                <Input
                  placeholder="Enter here"
                  value={edu.grade || ''}
                  onChange={(e) => handleEducationChange(index, 'grade', e.target.value)}
                  readOnly={!isEditing}
                  className={!isEditing ? 'bg-muted' : ''}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Skills & Projects */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold text-card-foreground mb-6">Skills & Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Skills</Label>
            <Input
              placeholder="Enter here"
              value={profile.skills || ''}
              onChange={(e) => setProfile((prev: any) => ({ ...prev, skills: e.target.value }))}
              readOnly={!isEditing}
              className={!isEditing ? 'bg-muted' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label>Projects</Label>
            <Input
              placeholder="Enter here"
              value={profile.projects || ''}
              onChange={(e) => setProfile((prev: any) => ({ ...prev, projects: e.target.value }))}
              readOnly={!isEditing}
              className={!isEditing ? 'bg-muted' : ''}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
