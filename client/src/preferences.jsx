import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Preferences() {
  const navigate = useNavigate();

  const cuisines = ["Italian", "Indian", "Bangladeshi", "Mexican", "Thai", "Chinese"];
  const allergies = ["No Allergy", "Peanuts", "Dairy", "Seafood", "Gluten", "Soy"];
  const spiceLevels = ["No Spicy", "Spicy", "Kill-me-spicy"];

  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [selectedSpice, setSelectedSpice] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("userPreferences");
    if (saved) {
      const prefs = JSON.parse(saved);
      setSelectedCuisine(prefs.cuisine || "");
      setSelectedAllergies(prefs.allergies || []);
      setSelectedSpice(prefs.spice || "");
    }
  }, []);

  const toggleAllergy = (a) => {
    if (a === "No Allergy") {
      setSelectedAllergies(["No Allergy"]);
    } else {
      setSelectedAllergies((prev) => {
        const noAllergyRemoved = prev.filter((x) => x !== "No Allergy");
        return noAllergyRemoved.includes(a)
          ? noAllergyRemoved.filter((x) => x !== a)
          : [...noAllergyRemoved, a];
      });
    }
  };

  const handleSave = () => {
    if (!selectedCuisine) return alert("Please select a cuisine.");
    if (!selectedSpice) return alert("Please select a spice level.");

    const preferences = {
      cuisine: selectedCuisine,
      allergies: selectedAllergies,
      spice: selectedSpice,
    };
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    alert("✅ Preferences saved!");
    navigate("/order");
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-[#ffb36b] to-[#ff914d] flex flex-col items-center py-16 text-white">
      <h1 className="text-5xl italic font-semibold mb-10 drop-shadow-lg">
        Select Your Preferences 🍱
      </h1>

      <div className="flex flex-wrap justify-center gap-12 w-full max-w-6xl text-black">
        {/* Cuisine */}
        <div className="bg-[#fff6ee] rounded-3xl shadow-xl p-8 w-80 transition hover:shadow-2xl">
          <h2 className="text-2xl font-semibold italic mb-4 text-center text-[#ff7a00]">
            Cuisine
          </h2>
          <div className="flex flex-col gap-2">
            {cuisines.map((c) => (
              <label key={c} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="cuisine"
                  checked={selectedCuisine === c}
                  onChange={() => setSelectedCuisine(c)}
                />
                {c}
              </label>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-[#fff6ee] rounded-3xl shadow-xl p-8 w-80 transition hover:shadow-2xl">
          <h2 className="text-2xl font-semibold italic mb-4 text-center text-[#ff7a00]">
            Allergies
          </h2>
          <div className="flex flex-col gap-2">
            {allergies.map((a) => (
              <label key={a} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedAllergies.includes(a)}
                  onChange={() => toggleAllergy(a)}
                />
                {a}
              </label>
            ))}
          </div>
        </div>

        {/* Spice Level */}
        <div className="bg-[#fff6ee] rounded-3xl shadow-xl p-8 w-80 transition hover:shadow-2xl">
          <h2 className="text-2xl font-semibold italic mb-4 text-center text-[#ff7a00]">
            Spice Level
          </h2>
          <div className="flex flex-col gap-2">
            {spiceLevels.map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="spice"
                  checked={selectedSpice === s}
                  onChange={() => setSelectedSpice(s)}
                />
                {s}
              </label>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="mt-12 bg-[#ff9a4b] text-white py-4 px-12 rounded-full italic text-lg hover:bg-[#ff7a00] transition-all shadow-md hover:shadow-lg"
      >
        Save Preferences & Proceed →
      </button>
    </div>
  );
}
