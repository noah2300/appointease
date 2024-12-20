import { Search, Filter, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ServiceCard } from '../components/features/ServiceCard';
import { SearchFilters } from '../components/features/SearchFilters';
import { useState } from 'react';

const services = [
  {
    id: 1,
    title: "Classic Haircut & Styling",
    category: "Hair Salon",
    rating: 4.8,
    reviews: 156,
    location: "Manhattan, NY",
    price: 75,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Deep Tissue Massage",
    category: "Spa & Massage",
    rating: 4.9,
    reviews: 203,
    location: "Brooklyn, NY",
    price: 120,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Dental Check-up",
    category: "Dental Care",
    rating: 4.7,
    reviews: 89,
    location: "Queens, NY",
    price: 150,
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export function SearchPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for services or providers..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <Button 
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden"
        >
          <Filter className="mr-2 h-5 w-5" />
          Filters
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-4 rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(false)}
                className="md:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <SearchFilters />
          </div>
        </div>

        {/* Results Grid */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              {services.length} results found
            </p>
            <select className="rounded-md border border-gray-300 px-3 py-1">
              <option>Sort by: Recommended</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
            </select>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(service => (
              <ServiceCard
                key={service.id}
                title={service.title}
                category={service.category}
                rating={service.rating}
                reviews={service.reviews}
                location={service.location}
                price={service.price}
                image={service.image}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}