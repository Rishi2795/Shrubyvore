import { Link } from 'react-router-dom';
import { Leaf, Sprout, Sun, Droplets, ArrowRight } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

const Home = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section
        className="relative h-[600px] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Cultivate Your Green Thumb with Confidence
            </h1>
            <p className="text-xl mb-8">
              Your comprehensive guide to indoor and outdoor gardening. Join our community of plant enthusiasts and transform your space into a thriving garden.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
            >
              Explore Plant Almanac
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Journey to Garden Mastery</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover everything you need to know about plant care, from soil requirements to seasonal maintenance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Sprout className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Comprehensive Plant Guides</h3>
              <p className="text-gray-600">
                Detailed care instructions for hundreds of indoor and outdoor plants, tailored to your growing conditions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Sun className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Seasonal Care Tips</h3>
              <p className="text-gray-600">
                Stay informed about the best practices for each season, ensuring your plants thrive year-round.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Droplets className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalized Plant Care</h3>
              <p className="text-gray-600">
                Track your plants' needs and get customized care reminders based on your local climate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Shrubyvore</h2>
              <p className="text-xl text-gray-600 mb-6">
                We're passionate about making gardening accessible to everyone. Whether you're a seasoned gardener or just starting your plant journey, Shrubyvore provides the knowledge and tools you need to succeed.
              </p>
              <p className="text-xl text-gray-600 mb-8">
                Our community of plant enthusiasts and expert gardeners are here to help you every step of the way, sharing tips, answering questions, and celebrating your gardening victories.
              </p>
              {!isSignedIn && (
                <Link
                  to="/sign-up"
                  className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Join Our Community
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80"
                alt="Garden"
                className="rounded-lg shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=800&q=80"
                alt="Indoor plants"
                className="rounded-lg shadow-md mt-8"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
