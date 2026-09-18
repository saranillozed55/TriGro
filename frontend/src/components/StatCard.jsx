import { Link } from "react-router-dom";

export default function StatCard({ label, value, to }) {
  return (
    <Link
      to={to}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex-1 hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer"
    >
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </Link>
  );
}