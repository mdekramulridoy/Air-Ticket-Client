import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex-col gap-6 items-center justify-center flex container mx-auto p-8 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold text-center mb-4">About Us</h1>
      <p className="text-lg mb-6 text-center">
        Welcome to our platform! We are dedicated to providing you with the best
        visa solutions for your travel and study needs. Whether you are looking
        for student, tourist, or business visas, we are here to help you
        navigate the process with ease.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>
            Our mission is to simplify the visa application process for
            travelers and students across the world. With up-to-date information
            and personalized support, we strive to make your visa journey as
            smooth and efficient as possible.
          </p>
        </div>
        <div className="text-lg">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="list-disc list-inside">
            <li>Comprehensive visa information and resources</li>
            <li>Easy-to-use platform with personalized recommendations</li>
            <li>Expert support to guide you every step of the way</li>
            <li>
              Up-to-date details on visa fees, processing times, and application
              methods
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg">
          We believe in making visa applications easier, faster, and more
          accessible for everyone. Thank you for choosing us as your trusted
          partner on your journey.
        </p>
      </div>
    </div>
  );
};

export default About;
