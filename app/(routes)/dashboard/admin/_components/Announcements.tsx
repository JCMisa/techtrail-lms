import React from "react";

const announcements = [
  {
    id: 1,
    title: "lorem ipsum dolor sit amet",
    time: "12:00 PM - 2:00 PM",
    description:
      "lorem ipsum dolor sit amet in id dolor sit amet tempor incididunt",
  },
  {
    id: 2,
    title: "lorem ipsum dolor sit amet in id dolor sit amet tempor incididunt",
    time: "12:00 PM - 2:00 PM",
    description:
      "lorem ipsum dolor sit amet in id dolor sit amet tempor incididunt et accusam et accusam et et et et et et et et et et et et et et",
  },
  {
    id: 3,
    title: "lorem ipsum dolor",
    time: "12:00 PM - 2:00 PM",
    description:
      "lorem ipsum dolor sit amet in id dolor sit amet tempor incididunt et just e settore et",
  },
];

const Announcements = () => {
  return (
    <div className="bg-dark p-4 rounded-xl">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {announcements.map((item, index) => (
          <div key={item.id || index} className="bg-dark-100 rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-light">{item.title}</h2>
              <span className="text-xs text-gray-300 bg-dark-100 rounded-md px-1 py-1">
                {item.time}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
