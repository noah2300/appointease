import { FilterSection } from './FilterSection';
import { PriceRangeFilter } from './PriceRangeFilter';
import { TimeSlotFilter } from './TimeSlotFilter';
import { LanguageFilter } from './LanguageFilter';

const serviceTypes = [
  { id: '1', label: 'Hair Salon', count: 42 },
  { id: '2', label: 'Spa & Massage', count: 28 },
  { id: '3', label: 'Dental Care', count: 15 },
  { id: '4', label: 'Fitness', count: 33 },
  { id: '5', label: 'Home Services', count: 21 },
  { id: '6', label: 'Beauty & Wellness', count: 18 },
  { id: '7', label: 'Medical Services', count: 12 }
];

const locations = [
  { id: '1', label: 'City Center', count: 45 },
  { id: '2', label: 'North District', count: 32 },
  { id: '3', label: 'South District', count: 28 },
  { id: '4', label: 'East District', count: 15 },
  { id: '5', label: 'West District', count: 22 }
];

const ratings = [
  { id: '5', label: '5 stars', count: 30 },
  { id: '4', label: '4 stars', count: 150 },
  { id: '3', label: '3 stars', count: 192 },
  { id: '2', label: '2 stars', count: 12 },
  { id: '1', label: '1 star', count: 5 }
];

const facilities = [
  { id: '1', label: 'Parking', count: 605 },
  { id: '2', label: 'WiFi', count: 589 },
  { id: '3', label: 'Wheelchair Access', count: 181 },
  { id: '4', label: 'Air Conditioning', count: 452 },
  { id: '5', label: 'Waiting Area', count: 398 }
];

const genderPreference = [
  { id: 'any', label: 'No Preference', count: 450 },
  { id: 'male', label: 'Male Provider', count: 220 },
  { id: 'female', label: 'Female Provider', count: 335 }
];

const experienceLevels = [
  { id: '1', label: '0-2 years', count: 85 },
  { id: '2', label: '3-5 years', count: 156 },
  { id: '3', label: '5-10 years', count: 203 },
  { id: '4', label: '10+ years', count: 142 }
];

const languages = [
  { id: 'en', label: 'English', count: 586 },
  { id: 'es', label: 'Spanish', count: 245 },
  { id: 'fr', label: 'French', count: 124 },
  { id: 'zh', label: 'Chinese', count: 178 },
  { id: 'ar', label: 'Arabic', count: 92 }
];

const customerTypes = [
  { id: 'family', label: 'Family-Friendly', count: 312 },
  { id: 'senior', label: 'Senior Discount', count: 156 },
  { id: 'student', label: 'Student Discount', count: 189 },
  { id: 'child', label: 'Child-Friendly', count: 245 }
];

export function SearchFilters() {
  const handleFilterChange = (filterType: string, selectedIds: string[]) => {
    console.log(`${filterType} filter changed:`, selectedIds);
  };

  const handlePriceRangeChange = (range: { min: number; max: number }) => {
    console.log('Price range changed:', range);
  };

  return (
    <div className="space-y-1">
      <TimeSlotFilter 
        onSelectionChange={(slots) => handleFilterChange('timeSlots', slots)} 
      />

      <FilterSection
        title="Service Type"
        items={serviceTypes}
        onSelectionChange={(ids) => handleFilterChange('serviceType', ids)}
      />
      
      <FilterSection
        title="Location"
        items={locations}
        onSelectionChange={(ids) => handleFilterChange('location', ids)}
      />

      <PriceRangeFilter
        min={0}
        max={500}
        onChange={handlePriceRangeChange}
      />

      <FilterSection
        title="Rating"
        items={ratings}
        onSelectionChange={(ids) => handleFilterChange('rating', ids)}
      />

      <FilterSection
        title="Gender Preference"
        items={genderPreference}
        onSelectionChange={(ids) => handleFilterChange('gender', ids)}
      />

      <FilterSection
        title="Experience Level"
        items={experienceLevels}
        onSelectionChange={(ids) => handleFilterChange('experience', ids)}
      />

      <FilterSection
        title="Languages"
        items={languages}
        onSelectionChange={(ids) => handleFilterChange('languages', ids)}
      />

      <FilterSection
        title="Special Offers"
        items={customerTypes}
        onSelectionChange={(ids) => handleFilterChange('customerTypes', ids)}
      />

      <FilterSection
        title="Facilities"
        items={facilities}
        onSelectionChange={(ids) => handleFilterChange('facilities', ids)}
      />
    </div>
  );
}