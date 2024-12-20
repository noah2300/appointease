import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { BookingModal } from './BookingModal';
import { ServiceRating } from './ServiceRating';
import { useAuth } from '../../contexts/AuthContext';

interface ServiceCardProps {
  image?: string;
  title?: string;
  rating?: number;
  reviews?: number;
  location?: string;
  category?: string;
  price?: number;
}

export function ServiceCard({
  image = "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  title = "Professional Service",
  rating = 4.8,
  reviews = 120,
  location = "New York, NY",
  category = "Hair Salon",
  price = 75
}: ServiceCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="h-48 w-full object-cover"
          />
          <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-1 text-xs font-medium">
            {category}
          </span>
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{title}</h3>
          <div className="mt-1 flex items-center">
            <ServiceRating rating={rating} />
            <span className="ml-2 text-sm text-gray-600">
              ({reviews} reviews)
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-600">📍 {location}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-semibold">${price}</span>
            <Button 
              onClick={handleBookNow}
              size="sm"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        serviceTitle={title}
        price={price}
      />
    </>
  );
}