"use client";
import UserActionsLayout from "@/components/layout/UserActionsLayout";
import { useProfile } from "@/context/ProfileProvider";
import { Edit } from "@mui/icons-material";
import { Field, Form, Formik } from "formik";
import { signOut, useSession } from "next-auth/react";
import * as Yup from "yup";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const session = useSession();
  const { loading, data } = useProfile();
  const profileSchema = Yup.object({
    name: Yup.string().min(3, "too short").required("Name cannot be empty"),
    city: Yup.string().min(3, "too short").required("City cannot be empty"),
    phoneNumber: Yup.number("Phone number should be a Number")
      .positive()
      .required("Phone Number cannot be empty")
      .min(1000000000, "Phone should contain 10 digits")
      .max(9999999999, "Phone should contain 10 digits"),
    streetAddress: Yup.string()
      .min(10, "too short")
      .required("Street Address cannot be empty"),
  });
  if (loading || session.status === "loading") return <div>Please wait..</div>;
  if (session.status === "unauthenticated") {
    return router.push("/login/?callbackUrl=/profile");
  }
  return (
    <UserActionsLayout>
      <Formik
        initialValues={{
          name: data.name,
          city: data?.city || "",
          streetAddress: data?.streetAddress || "",
          phoneNumber: data?.phoneNumber || "",
        }}
        validationSchema={profileSchema}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-1 max-w-[520px] mx-auto my-6">
            <label htmlFor="name">Full Name</label>
            <Field
              className="p-2 focus:border-red-500 border outline-none border-gray-400 rounded-md"
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
            />
            <span className="text-sm text-red-500">
              {touched.name && errors.name ? errors.name : null}
            </span>
            <label htmlFor="phoneNumber">Phone Number</label>
            <Field
              className="p-2 focus:border-red-500 border outline-none border-gray-400 rounded-md"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
            />
            <span className="text-sm text-red-500">
              {touched.phoneNumber && errors.phoneNumber
                ? errors.phoneNumber
                : null}
            </span>
            <label htmlFor="city">City</label>
            <Field
              className="p-2 focus:border-red-500 border outline-none border-gray-400 rounded-md"
              type="text"
              id="city"
              placeholder="Enter your city"
              name="city"
            />
            <span className="text-sm text-red-500">
              {touched.city && errors.city ? errors.city : null}
            </span>
            <label htmlFor="streetAddress">Street Address</label>
            <Field
              className="p-2 focus:border-red-500 border outline-none border-gray-400 rounded-md"
              type="text"
              id="streetAddress"
              placeholder="Enter your streetd address"
              name="streetAddress"
            />
            <span className="text-sm text-red-500">
              {touched.streetAddress && errors.streetAddress
                ? errors.streetAddress
                : null}
            </span>
            <button
              className="border border-red-500 mt-4 px-6 rounded py-3 flex items-center justify-center gap-1"
              type="submit"
            >
              <Edit /> Update Profile
            </button>
            <button
              type="button"
              onClick={() =>
                signOut({ callbackUrl: "/login/?callbackUrl=/profile" })
              }
              className="bg-red-500 text-white mt-4 px-6 rounded py-3"
            >
              Logout
            </button>
          </Form>
        )}
      </Formik>
    </UserActionsLayout>
  );
}
