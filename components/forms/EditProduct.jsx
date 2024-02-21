import React, { useState } from "react";
import EditableImage from "./EditableImage";
import { useFormik } from "formik";
import * as yup from "yup";
import EditExtras from "./EditExtras";

export default function EditProduct({ data, onSubmit }) {
  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      description: data?.description || "",
      price: data?.price || "",
      category: data?.catagory || "",
      sizes: data?.sizes || [],
      image: data?.imageUrl || "",
      addOns: data?.addOns || [],
    },
    validationSchema: yup.object({
      name: yup.string().min(3, "too short").required("cannot be empty!"),
      description: yup
        .string()
        .min(3, "too short")
        .required("cannot be empty!"),
      category: yup.string().min(3, "too short").required("cannot be empty!"),
      image: yup.string().required("cannot be empty!"),
      price: yup
        .number()
        .positive("cannot be negative")
        .required("cannot be empty!"),
    }),
    onSubmit: (values) => onSubmit(values),
  });
  return (
    <div className="px-3 my-6">
      <div className="flex sm:flex-row flex-col items-center sm:items-start gap-5">
        <EditableImage
          link={formik.values.imageUrl}
          setLink={(link) => formik.setFieldValue("image", link)}
        />
        <form
          className="flex flex-1 flex-col gap-1 w-full"
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            className="p-2 focus:border-red-500 border outline-none bg-gray-200 rounded-md"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="name"
          />
          <span className="text-sm text-red-500">
            {formik.touched.name && formik.errors.name
              ? formik.errors.name
              : null}
          </span>
          <label htmlFor="description">Description</label>
          <textarea
            className="p-2 focus:border-red-500 border outline-none bg-gray-200 rounded-md"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="description"
            id="description"
          />
          <span className="text-sm text-red-500">
            {formik.touched.description && formik.errors.description
              ? formik.errors.description
              : null}
          </span>
          <label htmlFor="price">Price</label>
          <input
            className="p-2 focus:border-red-500 border outline-none bg-gray-200 rounded-md"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="price"
            name="price"
          />
          <span className="text-sm text-red-500">
            {formik.touched.price && formik.errors.price
              ? formik.errors.price
              : null}
          </span>
          <label htmlFor="category">Category</label>
          <select
            className="p-2 focus:border-red-500 border outline-none bg-gray-200 rounded-md"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="category"
          >
            <option value="">Select Category</option>
            <option value="non veg">Non veg</option>
            <option value="veg">Veg</option>
          </select>
          <span className="text-sm text-red-500">
            {formik.touched.category && formik.errors.category
              ? formik.errors.category
              : null}
          </span>
          <EditExtras
            extras={formik.values.sizes}
            title={"Additional Sizes"}
            setExtras={(v) => formik.setFieldValue("sizes", v)}
          />
          <EditExtras
            extras={formik.values.addOns}
            title={"Add Ons"}
            setExtras={(v) => formik.setFieldValue("addOns", v)}
          />
          <button
            type="submit"
            className="bg-red-500 rounded-full p-2 text-white"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
