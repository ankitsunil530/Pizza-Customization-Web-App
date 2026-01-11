import { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector(s => s.auth);
  const [name, setName] = useState(user.name);

  const saveProfile = () => {
    alert("Profile updated (API pending)");
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl mb-4">My Profile</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 text-black w-full"
      />

      <button onClick={saveProfile} className="mt-3 bg-green-600 px-4 py-2 rounded">
        Save Changes
      </button>
    </div>
  );
}
