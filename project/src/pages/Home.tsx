import React from 'react';
import { ArrowRight, Leaf, Sun, Droplets } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-4">
              Bring Nature Into Your Home
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
              Transform your space with our carefully curated selection of indoor and outdoor plants.
              Expert care guidance included with every purchase.
            </p>
            <a
              href="/catalog"
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Greenify?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Plant Selection</h3>
              <p className="text-gray-600">
                Carefully chosen varieties perfect for your space and lifestyle
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Care Guidance</h3>
              <p className="text-gray-600">
                Detailed care instructions and ongoing support
              </p>
            </div>
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Healthy Guarantee</h3>
              <p className="text-gray-600">
                30-day plant health guarantee on all purchases
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Plants */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Plants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Monstera Deliciosa",
                image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                price: "$45"
              },
              {
                name: "Snake Plant",
                image: "https://images.unsplash.com/photo-1593691509544-d6c29ec2d177?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                price: "$35"
              },
              {
                name: "Peace Lily",
                image: "https://images.unsplash.com/photo-1593691512429-5d42f232ce1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                price: "$30"
              }
            ].map((plant, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{plant.name}</h3>
                  <p className="text-green-600 font-bold">{plant.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                text: "The plants I received were in perfect condition. The care instructions were very helpful!"
              },
              {
                name: "Michael Chen",
                text: "Excellent customer service and beautiful, healthy plants. Highly recommended!"
              },
              {
                name: "Emma Davis",
                text: "My house looks amazing with these plants. Will definitely order more!"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home