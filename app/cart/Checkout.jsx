"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { CurrencyRupee } from "@mui/icons-material";
import { useProfile } from "@/context/ProfileProvider";
import { reset } from "@/store/cartSlice";

export default function Checkout({ amount }) {
  const { status } = useSession();
  const { data, loading } = useProfile();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const state = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.number("Phone number should be a Number")
      .positive()
      .required("Phone Number cannot be empty")
      .min(1000000000, "Phone should contain 10 digits")
      .max(9999999999, "Phone should contain 10 digits"),
    city: Yup.string().required("City cannot be empty"),
    streetAddress: Yup.string()
      .required("Street address cannot be empty")
      .min(10, "too short!"),
  });

  if (status === "unauthenticated" || loading)
    return (
      <div className="bg-gray-200 px-4 rounded-md py-3">
        <h3 className="my-3 text-gray-900 uppercase font-semibold">Checkout</h3>
        <p>Please Login with your account. to procceed checkout.</p>
        <Link
          className="bg-red-600 text-white w-full p-3 rounded-md uppercase mt-2 hover:bg-red-500 transition-colors flex items-center justify-center"
          href={`/login?callbackUrl=${pathname}`}
        >
          Pay <CurrencyRupee />
          {amount}
        </Link>
      </div>
    );
  return (
    <div className="bg-gray-200 px-4 rounded-md py-3">
      <h3 className="my-3 text-gray-900 uppercase font-semibold">Checkout</h3>
      <Formik
        initialValues={{
          phoneNumber: data.phoneNumber || "",
          city: data.city || "",
          streetAddress: data.streetAddress || "",
          couponCode: searchParams.get("coupon-code") || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          const promise = new Promise((resolve, reject) => {
            axios
              .post("/api/payment/create-payment-intent", {
                products: state,
                streetAddress: values.streetAddress,
                phoneNumber: values.phoneNumber,
                city: values.city,
                couponCode: values.couponCode,
              })
              .then((res) => {
                if (res.data?.url) {
                  resolve();
                  dispatch(reset());
                  window.location.href = res.data.url;
                } else {
                  reject("Payment failed, please try letter!");
                }
              })
              .catch((err) => {
                reject(err.response.data);
              });
          });
          toast.promise(promise, {
            error: (err) => `${err}`,
            success: `Redirecting to payment...`,
            loading: "Preparing your order, please wait...",
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-2">
            <label className="text-gray-700" htmlFor="phoneNumber">
              Phone no.
            </label>
            <Field
              className="px-2 py-2 rounded-md focus:outline-red-600"
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="+91 123567890"
            />
            <span className="text-sm text-red-500">
              {touched.phoneNumber && errors.phoneNumber
                ? errors.phoneNumber
                : null}
            </span>
            <label className="text-gray-700" htmlFor="city">
              City
            </label>
            <Field
              className="px-2 py-2 rounded-md focus:outline-red-600"
              type="tel"
              name="city"
              id="city"
              placeholder="Jaipur"
            />
            <span className="text-sm text-red-500">
              {touched.city && errors.city ? errors.city : null}
            </span>
            <label className="text-gray-700" htmlFor="streetAddress">
              Street Address
            </label>
            <Field
              className="px-2 py-2 rounded-md focus:outline-red-600"
              type="tel"
              name="streetAddress"
              id="streetAddress"
              placeholder="Your street address"
            />
            <span className="text-sm text-red-500">
              {touched.streetAddress && errors.streetAddress
                ? errors.streetAddress
                : null}
            </span>
            <Field
              className="px-2 py-2 rounded-md focus:outline-red-600"
              type="tel"
              name="couponCode"
              id="couponCode"
              placeholder="Enter Coupen Code"
            />
            <button
              className="bg-red-600 text-white w-full p-3 rounded-md uppercase mt-2 hover:bg-red-500 transition-colors flex items-center justify-center"
              type="submit"
            >
              Pay <CurrencyRupee />
              {amount}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
