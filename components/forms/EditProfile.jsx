"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import EditableImage from "./EditableImage";

export default function EdiProfile({ onSubmit, data }) {
  const formik = useFormik({
    initialValues: {
      name: data.name || "",
      city: data.city || "",
      streetAddress: data.streetAddress || "",
      phoneNumber: data.phoneNumber || "",
      image: data.image || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(3, "too short"),
      city: Yup.string().min(3, "too short"),
      phoneNumber: Yup.number("Phone number should be a Number")
        .positive()
        .min(1000000000, "Phone should contain 10 digits")
        .max(9999999999, "Phone should contain 10 digits"),
      streetAddress: Yup.string().min(10, "too short"),
      imageUrl: Yup.mixed(),
    }),
    onSubmit: (values) => onSubmit(values),
  });
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start max-w-[725px] mx-auto my-6 gap-5">
      <EditableImage
        link={formik.values.image}
        setLink={(link) => formik.setFieldValue("image", link)}
      />
      <form
        className="flex flex-col gap-1 flex-1 w-full"
        onSubmit={formik.handleSubmit}
      >
        <label htmlFor="name">Full Name</label>
        <input
          className="p-2 focus:border-red-500 border outline-none bg-gray-200 rounded-md"
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <span className="text-sm text-red-500">
          {formik.touched.name && formik.errors.name
            ? formik.errors.name
            : null}
        </span>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          className="p-2 focus:border-red-500 border outline-none bg-gray-200 rounded-md"
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter your phone number"
        />
        <span className="text-sm text-red-500">
          {formik.touched.phoneNumber && formik.errors.phoneNumber
            ? formik.errors.phoneNumber
            : null}
        </span>
        <label htmlFor="city">City</label>
        <input
          className="p-2 focus:border-red-500 border outline-none bg-gray-200 rounded-md"
          type="text"
          id="city"
          placeholder="Enter your city"
          value={formik.values.city}
          name="city"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <span className="text-sm text-red-500">
          {formik.touched.city && formik.errors.city
            ? formik.errors.city
            : null}
        </span>
        <label htmlFor="streetAddress">Street Address</label>
        <input
          className="p-2 focus:border-red-500 border outline-none bg-gray-200 rounded-md"
          type="text"
          id="streetAddress"
          placeholder="Enter your streetd address"
          value={formik.values.streetAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="streetAddress"
        />
        <span className="text-sm text-red-500">
          {formik.touched.streetAddress && formik.errors.streetAddress
            ? formik.errors.streetAddress
            : null}
        </span>
        <button
          className="bg-red-500 text-white mt-4 px-6 rounded-md py-2 flex items-center justify-center gap-1"
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  );
}
