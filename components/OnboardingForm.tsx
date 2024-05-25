"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "@headlessui/react";
import { addUserRecord } from "@/app/(loggedin)/welcome/actions";
import { useRouter } from "next/navigation";

interface OnboardingFormValues {
  name: string;
  block_no: string;
  unit_no: string;
  preferences: string;
  strengths: string;
}

const OnboardingForm: React.FC = () => {
  const router = useRouter();
  const initialValues: OnboardingFormValues = {
    name: "",
    block_no: "",
    unit_no: "",
    preferences: "",
    strengths: "",
  };

  const validate = (values: OnboardingFormValues) => {
    const errors: Partial<OnboardingFormValues> = {};

    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.block_no) {
      errors.block_no = "Block number is required";
    }
    if (!values.unit_no) {
      errors.unit_no = "Unit number is required";
    }
    if (!values.preferences) {
      errors.preferences = "Please introduce yourself!";
    }

    if (!values.strengths) {
      errors.strengths = "Please provide your strengths";
    }

    return errors;
  };

  const submitHandler = async (values: OnboardingFormValues) => {
    try {
      await addUserRecord({
        name: values.name,
        block_no: values.block_no,
        unit_no: values.unit_no,
        preferences: values.preferences,
        strengths: values.strengths,
      });

      console.info("Successfully updated user metadata");
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='mt-2 w-96 p-4 shadow-xl'>
      <h1 className='mb-4 text-2xl font-bold'>Onboarding Page</h1>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={submitHandler}
      >
        {({ isSubmitting }) => (
          <Form className='space-y-4'>
            <div className='flex flex-col'>
              <label htmlFor='name' className='mb-2 font-medium'>
                Name
              </label>
              <Field
                type='text'
                id='name'
                name='name'
                className='rounded border border-gray-300 p-2'
              />
              <ErrorMessage
                name='name'
                component='div'
                className='mt-1 text-red-500'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='block_no' className='mb-2 font-medium'>
                Block Number
              </label>
              <Field
                type='text'
                id='block_no'
                name='block_no'
                className='rounded border border-gray-300 p-2'
              />
              <ErrorMessage
                name='block_no'
                component='div'
                className='mt-1 text-red-500'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='unit_no' className='mb-2 font-medium'>
                Unit Number
              </label>
              <Field
                type='text'
                id='unit_no'
                name='unit_no'
                className='rounded border border-gray-300 p-2'
              />
              <ErrorMessage
                name='unit_no'
                component='div'
                className='mt-1 text-red-500'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='preferences' className='mb-2 font-medium'>
                Tell us more about yourself in 2-3 sentences: What do you like?
                What do you do in your free time?
              </label>
              <Field
                type='text'
                id='preferences'
                name='preferences'
                className='rounded border border-gray-300 p-2'
                as='textarea'
              />
              <ErrorMessage
                name='preferences'
                component='div'
                className='mt-1 text-red-500'
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='strengths' className='mb-2 font-medium'>
                Please share your strengths in 2-3 sentences: What skills,
                talents, or experiences do you excel at?
              </label>
              <Field
                type='text'
                id='strengths'
                name='strengths'
                className='rounded border border-gray-300 p-2'
                as='textarea'
              />
              <ErrorMessage
                name='strengths'
                component='div'
                className='mt-1 text-red-500'
              />
            </div>
            <div className='flex justify-end'>
              <Button type='submit' disabled={isSubmitting} className='primary'>
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      {/* <LogMeIn /> */}
    </div>
  );
};

export default OnboardingForm;

// const LogMeIn = () => {
// 	return (
// 		<button
// 			onClick={async () => {
// 				const sb = createClient();

// 				await sb.auth.signInWithPassword({
// 					email: "user1@testing.com",
// 					password: "testing123",
// 				});

// 				const loggedInUser = await sb.auth.getUser();
// 				console.log("Logged In user details: ", loggedInUser);
// 			}}
// 		>
// 			Login
// 		</button>
// 	);
// };
