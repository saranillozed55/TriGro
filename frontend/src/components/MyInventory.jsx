

export default function MyInventory() {
    const items = [
    { name: "Eggs", emoji: "🥚", qty: 12 },
    { name: "Milk", emoji: "🥛", qty: 2 },
    { name: "Apples", emoji: "🍎", qty: 8 },
    ];
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <h2 className="text-lg font-semibold mb-4">My Inventory</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.name} className="flex items-end">
            <span className="flex items-center gap-2">
              <span>{item.emoji}</span>
              <span>{item.name}</span>
            </span>
            <span className="flex-1 border-b border-dotted border-gray-300 mx-2 mb-1"></span>
            <span className="font-medium">{item.qty}</span>
          </div>
        ))}
      </div>
    </div>
  );
}