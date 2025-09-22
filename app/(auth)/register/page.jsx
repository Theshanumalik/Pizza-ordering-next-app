"use client";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const registerSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "too short")
      .max(20, "too large")
      .required("cannot be empty"),
    email: Yup.string().email("Invalid email").required("cannot be empty"),
    password: Yup.string().min(5, "too short").required("cannot be empty"),
  });
  return (
    <>
      <h1 className="my-4 text-xl font-medium">Create new account</h1>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={registerSchema}
        onSubmit={(values, props) => {
          const promise = new Promise((resolve, reject) => {
            props.setSubmitting(true);
            axios
              .post("/api/register", values)
              .then((res) => {
                if (res.status === 200) {
                  resolve();
                  signIn("credentials", {
                    email: values.email,
                    password: values.password,
                    redirect: true,
                    callbackUrl: searchParams.get("callbackUrl") || "/",
                  });
                } else {
                  reject();
                }
              })
              .catch((err) => reject(err.response.data))
              .finally(() => props.setSubmitting(false));
          });

          toast.promise(promise, {
            error: (err) => `${err}`,
            success: "Registration successfull, logging in..",
            loading: "Validating information, please wait..",
          });
        }}
      >
        {({ errors, touched, isSubmitting, isValid }) => (
          <Form className="flex flex-col gap-2 p-2">
            <label htmlFor="name" className="text-gray-700 text-sm">
              Enter Name
            </label>
            <Field
              type="text"
              name="name"
              id="name"
              placeholder="John Doe"
              className="border border-gray-500 rounded-md px-3 p-2 focus:border-red-500 outline-none"
            />
            <span className="text-sm text-red-500">
              {touched.name && errors.name ? errors.name : null}
            </span>
            <label htmlFor="email" className="text-gray-700 text-sm">
              Enter Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="john@example.com"
              className="border border-gray-500 rounded-md px-3 p-2 focus:border-red-500 outline-none"
            />
            <span className="text-sm text-red-500">
              {touched.email && errors.email ? errors.email : null}
            </span>
            <label htmlFor="password" className="text-gray-700 text-sm">
              Choose Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className="border border-gray-500 rounded-md px-3 p-2 focus:border-red-500 outline-none"
            />
            <span className="text-sm text-red-500">
              {touched.password && errors.password ? errors.password : null}
            </span>
            <button
              type="submit"
              className="bg-red-500 p-2 px-6 text-white rounded-full mt-2 active:bg-red-400 transition-colors disabled:cursor-not-allowed disabled:bg-red-300"
              disabled={isSubmitting || !isValid}
            >
              Register
            </button>
            <p className="text-sm">
              Already have an account?
              <Link href="/login" className="underline text-blue-600">
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
}
