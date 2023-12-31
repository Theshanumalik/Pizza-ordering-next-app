"use client";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("cannot be empty"),
    password: Yup.string().min(5, "too short").required("cannot be empty"),
  });
  return (
    <>
      <h1 className="my-4 text-xl font-medium">Welcome Back!</h1>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values, props) => {
          const promise = new Promise((resolve, reject) => {
            props.setSubmitting(true);
            signIn("credentials", {
              email: values.email,
              password: values.password,
              redirect: false,
            })
              .then((res) => {
                if (res?.error) {
                  return reject(res.error);
                }
                resolve();
                window.location.href = searchParams.get("callbackUrl") || "/";
              })
              .finally(() => props.setSubmitting(false));
          });
          toast.promise(promise, {
            error: (err) => `${err}`,
            success: `Logged in successfully, redirecting to ${
              searchParams.get("callbackUrl") || "/"
            }`,
            loading: "Logging in, please wait...",
          });
        }}
      >
        {({ errors, touched, isValid, isSubmitting }) => (
          <Form className="flex flex-col gap-2 p-2">
            <label htmlFor="email" className="text-gray-700 text-sm">
              Enter email
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
              Choose password
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
              className="bg-red-500 p-2 px-6 w-full text-white rounded-full mt-2 active:bg-red-400 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
              disabled={isSubmitting || !isValid}
            >
              Login
            </button>
            <div className="flex items-center gap-3 my-2">
              <span className="flex-1 h-[1px] bg-slate-400"></span>
              OR
              <span className="flex-1 h-[1px] bg-slate-400"></span>
            </div>
            <button
              type="button"
              className="border border-red-500 p-2 px-6 rounded-full"
              onClick={() => {
                signIn("google", {
                  callbackUrl: searchParams.get("callbackUrl") || "/",
                });
              }}
            >
              Sign in with Google
            </button>
            <Link
              href="/register"
              className="border border-red-500 p-2 px-6 rounded-full text-center"
            >
              Create New Account
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
}
