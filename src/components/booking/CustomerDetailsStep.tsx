import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { BookingFormData } from './ServiceBookingModal';

interface CustomerDetailsStepProps {
  customerDetails: BookingFormData['customerDetails'];
  onNext: (data: Partial<BookingFormData>) => void;
  onBack: () => void;
}

export function CustomerDetailsStep({
  customerDetails,
  onNext,
  onBack,
}: CustomerDetailsStepProps) {
  const [details, setDetails] = useState(customerDetails);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!details.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!details.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^(\+44|0)[0-9]{10}$/.test(details.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Please enter a valid UK mobile number';
    }

    if (details.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!details.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext({ customerDetails: details });
    }
  };

  const handleInputChange = (field: keyof typeof details, value: string) => {
    setDetails(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleCheckboxChange = (field: keyof typeof details, checked: boolean) => {
    setDetails(prev => ({ ...prev, [field]: checked }));
    // Clear error when user checks the box
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center">
        <h4 className="font-medium text-foreground mb-1 md:mb-2 text-sm md:text-base">Your Details</h4>
        <p className="text-xs md:text-sm text-muted-foreground">
          Please provide your contact information
        </p>
      </div>

      <Card>
        <CardContent className="p-3 md:p-6 space-y-3 md:space-y-4">
          {/* Full Name */}
          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="fullName" className="text-xs md:text-sm">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              value={details.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              className={`h-8 md:h-10 text-xs md:text-sm ${errors.fullName ? 'border-red-500' : ''}`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Mobile Number */}
          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="mobile" className="text-xs md:text-sm">
              Mobile Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="mobile"
              value={details.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              placeholder="e.g. 07123456789"
              className={`h-8 md:h-10 text-xs md:text-sm ${errors.mobile ? 'border-red-500' : ''}`}
            />
            {errors.mobile && (
              <p className="text-xs text-red-500">{errors.mobile}</p>
            )}
          </div>

          {/* Email (Optional) */}
          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="email" className="text-xs md:text-sm">Email Address (Optional)</Label>
            <Input
              id="email"
              type="email"
              value={details.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
              className={`h-8 md:h-10 text-xs md:text-sm ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Notes (Optional) */}
          <div className="space-y-1 md:space-y-2">
            <Label htmlFor="notes" className="text-xs md:text-sm">Special Requests or Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={details.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Any special requests, preferences, or notes..."
              rows={2}
              className="text-xs md:text-sm resize-none"
            />
          </div>

          {/* Terms Agreement */}
          <div className="space-y-2 md:space-y-3 pt-2 md:pt-4 border-t">
            <div className="flex items-start space-x-2 md:space-x-3">
              <Checkbox
                id="agreeToTerms"
                checked={details.agreeToTerms || false}
                onCheckedChange={(checked) => 
                  handleCheckboxChange('agreeToTerms', checked as boolean)
                }
                className={`w-3 h-3 md:w-4 md:h-4 mt-0.5 ${errors.agreeToTerms ? 'border-red-500' : ''}`}
              />
              <div className="space-y-1">
                <Label 
                  htmlFor="agreeToTerms" 
                  className="text-xs md:text-sm font-normal cursor-pointer"
                >
                I agree to the{' '}
                <a href="/terms-and-conditions" className="text-primary underline hover:text-primary/80 transition-colors">terms and conditions</a>{' '}
                and{' '}
                <a href="/privacy-policy" className="text-primary underline hover:text-primary/80 transition-colors">privacy policy</a>
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                {errors.agreeToTerms && (
                  <p className="text-xs text-red-500">{errors.agreeToTerms}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} size="sm" className="text-xs md:text-sm">
          Back
        </Button>
        <Button onClick={handleNext} size="sm" className="px-4 md:px-8 text-xs md:text-sm">
          Next: Payment & Confirmation
        </Button>
      </div>
    </div>
  );
}