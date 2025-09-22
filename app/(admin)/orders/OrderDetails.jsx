"use client";
import Modal from "@/components/layout/Modal";
import { useFetch } from "@/hooks/useFetch";
import { CurrencyRupee, ExpandLess, ExpandMore } from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";

function OrderDetails({ onClose, orderId }) {
  const { data, loading } = useFetch("/api/orders/" + orderId);
  return (
    <Modal onClose={onClose} title="Order Details">
      {loading ? (
        <h1>Loading Please Wait..</h1>
      ) : !data ? (
        <h2>Oops! Order Not Found</h2>
      ) : (
        <div className="w-full">
          {data?.items?.map((item) => (
            <OrderItem data={item} key={item._id} />
          ))}
          <div className="my-3 bg-slate-200 p-3">
            <div className="flex justify-between my-2 text-lg">
              <span>Net Amount</span>
              <span
                className={`flex items-center ${
                  data.offer ? "line-through" : ""
                }`}
              >
                <CurrencyRupee />
                {data?.amount}
              </span>
            </div>
            {data.offer && (
              <>
                <div className="flex justify-between my-2 text-lg">
                  <span>Discount</span>
                  <span className="flex items-center">
                    <CurrencyRupee />-
                    {Math.ceil(
                      calculateDiscount(
                        data.amount,
                        data.offer.deduction,
                        data.offer.deductionInPercentage
                      )
                    )}
                  </span>
                </div>
                <div className="flex justify-end my-2 text-lg">
                  <span className="flex items-center">
                    <CurrencyRupee />
                    {data?.amount -
                      calculateDiscount(
                        data.amount,
                        data?.offer?.deduction,
                        data?.offer?.deductionInPercentage
                      )}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

export default OrderDetails;

function OrderItem({ data }) {
  const [showMore, setShowMore] = useState(false);
  const addOns = getAddOn(data.item.addOns, data.selectedAddOns);
  const size = getSize(data.item.sizes, data.selectedSize);
  const price = getPrice(data.item.price, size, addOns);
  return (
    <div className="w-full p-3 rounded-lg bg-slate-100 my-2">
      <div className="w-full flex items-center gap-2">
        <Image
          src={data?.item.image}
          width={100}
          height={100}
          alt={data?.item.name}
          className="bg-gray-400 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="mb-1">{data?.item.name}</h3>
          <span className="flex items-center">
            <CurrencyRupee />
            {price * data?.quantity}
          </span>
        </div>
        <button
          onClick={() => setShowMore((p) => !p)}
          className="border border-gray-500 rounded-full p-2"
        >
          {showMore ? <ExpandLess /> : <ExpandMore />}
        </button>
      </div>
      {showMore && (
        <div className="my-2">
          <h3 className="font-semibold my-1">Size</h3>
          <div className="flex justify-between capitalize">
            <span>{size?.name || "small"}</span>
            <span className="flex items-center">
              <CurrencyRupee />
              {size?.extraPrice + data?.item?.price || data?.item?.price}
            </span>
          </div>
          <h3 className="font-semibold my-1">AddOns</h3>
          {addOns?.map((addOn) => (
            <div
              className="flex justify-between capitalize my-1"
              key={addOn._id}
            >
              <span>{addOn?.name}</span>
              <span className="flex items-center">
                <CurrencyRupee />
                {addOn?.extraPrice}
              </span>
            </div>
          ))}
          <div className="flex justify-between capitalize my-1">
            <span className="font-semibold">Qty</span>
            <span className="flex items-center">{data?.quantity}</span>
          </div>
          <hr className="bg-black my-1" />
          <div className="flex justify-between capitalize my-1">
            <span className="font-semibold">Total</span>
            <span className="flex items-center">
              <CurrencyRupee />
              {price * data?.quantity}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function getAddOn(addOns, selectedAddOns) {
  return addOns?.filter((addOn) => selectedAddOns.includes(addOn._id));
}
function getSize(sizes, selectedSize) {
  return sizes?.find((size) => size._id === selectedSize);
}
function getPrice(basePrice, size, addOns) {
  console.log(basePrice, size, addOns);
  let price = basePrice;
  if (size) {
    price += size?.extraPrice;
  }
  for (const addOn of addOns) {
    price += addOn?.extraPrice;
  }
  return price;
}

function calculateDiscount(price, discount, percentage) {
  if (!percentage) return discount;
  return price * (discount / 100);
}
