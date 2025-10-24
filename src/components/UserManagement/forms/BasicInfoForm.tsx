import { Phone, Edit2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';

interface BasicInfoFormProps {
  profile: any;
  setProfile: (profile: any) => void;
  isEditing: boolean;
  toggleEdit: () => void;
}

export const BasicInfoForm = ({ profile, setProfile, isEditing, toggleEdit }: BasicInfoFormProps) => {
  const handleChange = (field: string, value: string) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-card-foreground">Basic Details</h2>
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
        <div className="space-y-2">
          <Label>First name</Label>
          <Input
            placeholder="e.g. John"
            value={profile.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            readOnly={!isEditing}
            className={!isEditing ? 'bg-muted' : ''}
          />
        </div>

        <div className="space-y-2">
          <Label>Last name</Label>
          <Input
            placeholder="e.g. Doe"
            value={profile.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            readOnly={!isEditing}
            className={!isEditing ? 'bg-muted' : ''}
          />
        </div>

        <div className="space-y-2">
          <Label>Email ID</Label>
          <Input
            type="email"
            placeholder="e.g. mrnobody@mail.com"
            value={profile.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            readOnly={!isEditing}
            className={!isEditing ? 'bg-muted' : ''}
          />
        </div>

        <div className="space-y-2">
          <Label>Year of birth</Label>
          {isEditing ? (
            <Select value={profile.yearOfBirth || ''} onValueChange={(value) => handleChange('yearOfBirth', value)}>
              <SelectTrigger>
                <SelectValue placeholder="YYYY" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 50 }, (_, i) => 2010 - i).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input value={profile.yearOfBirth || ''} readOnly className="bg-muted" />
          )}
        </div>

        <div className="space-y-2">
          <Label>Gender</Label>
          {isEditing ? (
            <Select value={profile.gender || ''} onValueChange={(value) => handleChange('gender', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input value={profile.gender || ''} readOnly className="bg-muted" />
          )}
        </div>

        <div className="space-y-2">
          <Label>Phone number</Label>
          <div className="relative">
            <Phone size={16} className="absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="8332883854"
              value={profile.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              readOnly={!isEditing}
              className={`pl-10 ${!isEditing ? 'bg-muted' : ''}`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Alternate Phone no</Label>
          <Input
            placeholder="e.g. 9876543210"
            value={profile.alternatePhone || ''}
            onChange={(e) => handleChange('alternatePhone', e.target.value)}
            readOnly={!isEditing}
            className={!isEditing ? 'bg-muted' : ''}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Address</Label>
          <Textarea
            placeholder="Enter here"
            value={profile.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
            readOnly={!isEditing}
            className={!isEditing ? 'bg-muted' : ''}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Pincode</Label>
          <Input
            placeholder="Enter here"
            value={profile.pincode || ''}
            onChange={(e) => handleChange('pincode', e.target.value)}
            readOnly={!isEditing}
            className={!isEditing ? 'bg-muted' : ''}
          />
        </div>

        <div className="space-y-2">
          <Label>Domicile state</Label>
          {isEditing ? (
            <Select value={profile.domicileState || ''} onValueChange={(value) => handleChange('domicileState', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Telangana">Telangana</SelectItem>
                <SelectItem value="California">California</SelectItem>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Karnataka">Karnataka</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input value={profile.domicileState || ''} readOnly className="bg-muted" />
          )}
        </div>

        <div className="space-y-2">
          <Label>Domicile country</Label>
          {isEditing ? (
            <Select value={profile.domicileCountry || ''} onValueChange={(value) => handleChange('domicileCountry', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="USA">USA</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input value={profile.domicileCountry || ''} readOnly className="bg-muted" />
          )}
        </div>
      </div>
    </Card>
  );
};
