"use client";
import Modal from "@/components/layout/Modal";
import { useFetch } from "@/hooks/useFetch";
import Image from "next/image";

function OrderDetails({ onClose, orderId }) {
  const { data, loading } = useFetch("/api/orders/" + orderId);
  return (
    <Modal onClose={onClose}>
      {loading ? (
        <h1>Loading Please Wait..</h1>
      ) : !data ? (
        <h2>Oops! Order Not Found</h2>
      ) : (
        <div>
          {data?.products?.map((product) => (
            <div>
              <Image
                src={product?.item.image}
                width={100}
                height={100}
                alt={product?.item.name}
                className="bg-gray-400 rounded-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

export default OrderDetails;
