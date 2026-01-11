import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const steps = ["placed", "confirmed", "preparing", "out_for_delivery", "delivered"];

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`/api/orders/${id}`).then(res => setOrder(res.data.data));
  }, []);

  if (!order) return <p>Loading...</p>;

  const currentStep = steps.indexOf(order.orderStatus);

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl mb-4">Order Timeline</h2>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full ${index <= currentStep ? "bg-green-500" : "bg-gray-600"}`} />
            <span>{step.replaceAll("_", " ").toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
