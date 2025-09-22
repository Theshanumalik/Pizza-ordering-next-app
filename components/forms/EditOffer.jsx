"use client";
import { useFormik } from "formik";
import * as yup from "yup";

function EditOffer({ onSubmit, data }) {
  const formik = useFormik({
    initialValues: {
      expiry: data?.expiry || "",
      description: data?.description || "",
      deduction: data?.deduction || "",
      minOrderAmount: data?.minOrderAmount || "",
      deductionInPercentage: data?.deductionInPercentage || true,
      maxUseCount: data?.maxUseCount || "",
      couponCode: data?.couponCode || "",
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
    validationSchema: yup.object({
      expiry: yup
        .date()
        .required("expiry date must be provided!")
        .test({
          test: (value) => {
            let selectedDate = new Date(value);
            if (selectedDate > Date.now()) {
              return true;
            }
            return false;
          },
          message: "Cannot select past date",
        }),
      couponCode: yup.string().required("Coupen Code cannot be empty!"),
      description: yup.string().required("description cannot be empty!"),
      couponCode: yup.string().required("Coupen Code cannot be empty!"),
      maxUseCount: yup.number().max(1000).required(),
      deduction: yup.number().required(),
      deductionInPercentage: yup.boolean().required(),
    }),
  });
  return (
    <div className="max-w-lg mx-auto my-8">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="couponCode">Enter a coupen code</label>
        <input
          type="text"
          name="couponCode"
          id="couponCode"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.couponCode}
          className="p-2 border rounded-md bg-gray-200"
        />
        <span className="text-sm text-red-500">
          {formik.touched.couponCode && formik.errors.couponCode
            ? formik.errors.couponCode
            : null}
        </span>
        <label htmlFor="description">Enter offer description</label>
        <textarea
          name="description"
          id="description"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.description}
          className="p-2 border rounded-md bg-gray-200"
        />
        <span className="text-sm text-red-500">
          {formik.touched.description && formik.errors.description
            ? formik.errors.description
            : null}
        </span>
        <label htmlFor="expiry">Enter expiry date</label>
        <input
          type="datetime-local"
          name="expiry"
          id="expiry"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.expiry}
          className="p-2 border rounded-md bg-gray-200"
        />
        <span className="text-sm text-red-500">
          {formik.touched.expiry && formik.errors.expiry
            ? formik.errors.expiry
            : null}
        </span>
        <label htmlFor="maxUseCount">Enter maximum number usablity</label>
        <input
          type="text"
          name="maxUseCount"
          id="maxUseCount"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.maxUseCount}
          className="p-2 border rounded-md bg-gray-200"
        />
        <span className="text-sm text-red-500">
          {formik.touched.maxUseCount && formik.errors.maxUseCount
            ? formik.errors.maxUseCount
            : null}
        </span>
        <label htmlFor="minOrderAmount">Enter minimum order amount</label>
        <input
          type="text"
          name="minOrderAmount"
          id="minOrderAmount"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.minOrderAmount}
          className="p-2 border rounded-md bg-gray-200"
        />
        <span className="text-sm text-red-500">
          {formik.touched.minOrderAmount && formik.errors.minOrderAmount
            ? formik.errors.minOrderAmount
            : null}
        </span>
        <label htmlFor="deduction">Enter deduction amount</label>
        <input
          type="text"
          name="deduction"
          id="deduction"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.deduction}
          className="p-2 border rounded-md bg-gray-200"
        />
        <span className="text-sm text-red-500">
          {formik.touched.deduction && formik.errors.deduction
            ? formik.errors.deduction
            : null}
        </span>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="deductionInPercentage"
            checked={formik.values.deductionInPercentage}
            id="deductionInPercentage"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="deductionInPercentage">deduction in percentage</label>
        </div>
        <button className="bg-red-500 rounded-full mt-2 p-2 text-white">
          Create Offer
        </button>
      </form>
    </div>
  );
}

export default EditOffer;
