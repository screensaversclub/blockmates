"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@headlessui/react";
import { addUserRecord } from "@/app/(loggedin)/welcome/actions";
import { createClient } from "@/utils/supabase/client";

interface OnboardingFormValues {
  block_no: string;
  unit_no: string;
  name: string;
}

const OnboardingForm: React.FC = () => {
  const initialValues: OnboardingFormValues = {
    block_no: "",
    unit_no: "",
    name: "",
  };

  const validate = (values: OnboardingFormValues) => {
    const errors: Partial<OnboardingFormValues> = {};

    if (!values.block_no) {
      errors.block_no = "Block number is required";
    }

    if (!values.unit_no) {
      errors.unit_no = "Unit number is required";
    }

    if (!values.name) {
      errors.name = "Name is required";
    }

    return errors;
  };

  const submitHandler = async (values: OnboardingFormValues) => {
    console.log("Form values:", values);

    try {
      await addUserRecord({
        name: values.name,
        block_no: values.block_no,
        unit_no: values.unit_no,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-3 mt-4 border border-gray-200 rounded-lg shadow-lg">
      <h1 className="mb-4 text-2xl font-bold">Onboarding Page</h1>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={submitHandler}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="block_no" className="mb-2 font-medium">
                Block Number
              </label>
              <Field
                type="text"
                id="block_no"
                name="block_no"
                className="p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="block_no"
                component="div"
                className="mt-1 text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="unit_no" className="mb-2 font-medium">
                Unit Number
              </label>
              <Field
                type="text"
                id="unit_no"
                name="unit_no"
                className="p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="unit_no"
                component="div"
                className="mt-1 text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2 font-medium">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="mt-1 text-red-500"
              />
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <LogMeIn />
    </div>
  );
};

export default OnboardingForm;

// mockittt login
const LogMeIn = () => {
  return (
    <button
      onClick={async () => {
        const sb = createClient();

        await sb.auth.signInWithPassword({
          email: "user1@testing.com",
          password: "testing123",
        });

        const loggedInUser = await sb.auth.getUser();
        console.log("Logged In user details: ", loggedInUser);
      }}
    >
      Login
    </button>
  );
};
