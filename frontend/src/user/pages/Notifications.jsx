export default function Notifications() {
  const notifications = [
    "Order placed successfully",
    "Pizza delivered",
    "New offer available"
  ];

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl mb-4">Notifications</h2>

      {notifications.map((n, i) => (
        <div key={i} className="bg-gray-800 p-3 mb-2 rounded">
          🔔 {n}
        </div>
      ))}
    </div>
  );
}
