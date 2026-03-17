import React from "react";

const featuredModules = [
  { id: 1, title: "Lights Control", description: "Turn on/off lights, dim, and change colors.", icon: "💡" },
  { id: 2, title: "Thermostat", description: "Adjust temperature and schedule heating/cooling.", icon: "🌡️" },
  { id: 3, title: "Security", description: "View live camera, control locks, and get alerts.", icon: "🔒" },
  { id: 4, title: "Appliances", description: "Control smart plugs and devices remotely.", icon: "🔌" },
  { id: 5, title: "Energy Monitoring", description: "Track electricity usage and save energy.", icon: "⚡" },
  { id: 6, title: "Voice Control", description: "Control devices using your voice commands.", icon: "🎤" },
];

const FeaturedSection = () => {
  return (
    <div className="py-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-8">SmartHomeDecor Features</h2>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {featuredModules.map((module) => (
          <div
            key={module.id}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-transparent hover:shadow-lg hover:border-green-700 transition-all duration-300"
          >
            <div className="text-5xl mb-4">{module.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{module.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;