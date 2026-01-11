import React from 'react';

const About = () => {
  return (
    <section className="bg-gray-50 py-4">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <section className="text-center bg-[#DB995A] max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            About <span className="text-green-600">SmartHome Decor</span>
          </h2>
          <p className="mt-4 text-gray-600 text-lg md:text-xl leading-relaxed">
            Enjoy fast, reliable decoration services with real-time coordination and zero hassle.
            From home decoration to weddings and ceremonies — we deliver on time, every time.
          </p>
        </section>

        {/* Tabs / Links */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 text-lg font-semibold">
          <span className="cursor-pointer text-green-600 border-b-2 border-green-600 pb-1">
            Story
          </span>
          <span className="cursor-pointer text-gray-600 hover:text-green-600 transition">
            Mission
          </span>
          <span className="cursor-pointer text-gray-600 hover:text-green-600 transition">
            Success
          </span>
          <span className="cursor-pointer text-gray-600 hover:text-green-600 transition">
            Team & Others
          </span>
        </div>

        {/* Content Card */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>
            We started with a simple promise — to make decoration services fast,
            reliable, and stress-free. Over the years, our commitment to planning,
            coordination, and customer-first service has made us a trusted partner
            for thousands.
          </p>

          <p>
            Whether it’s a home makeover, wedding, or corporate event, our expert
            team works closely with clients to understand their vision and bring
            it to life with precision and creativity.
          </p>

          <p>
            With <span className="font-semibold text-green-600">SmartHome Decor</span>,
            you don’t just book a service — you get a complete experience from
            planning to execution, ensuring perfection in every detail.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h4 className="text-3xl font-bold text-green-600">5K+</h4>
            <p className="text-gray-600">Happy Clients</p>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-green-600">1K+</h4>
            <p className="text-gray-600">Events Completed</p>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-green-600">10+</h4>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div>
            <h4 className="text-3xl font-bold text-green-600">24/7</h4>
            <p className="text-gray-600">Support</p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-green-600 rounded-2xl p-10 text-center text-white">
          <h3 className="text-3xl font-bold">
            Ready to Transform Your Space?
          </h3>
          <p className="mt-3 text-green-100">
            Let’s bring your vision to life with expert planning and flawless execution.
          </p>

          <a
            href="/contact"
            className="inline-block mt-6 bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Contact Us
          </a>
        </div>

      </div>
    </section>
  );
};

export default About;
