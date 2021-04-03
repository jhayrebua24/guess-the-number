import { submitApplication } from "config";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { storeStorage } from "helpers";
import * as yup from "yup";
import { useNumberContext } from "./context";

const applicantId = process.env.REACT_APP_APPLICANT_ID || "";
const REQUIRED = "This field is required";
const validationSchema = yup.object().shape({
  packUrl: yup.string().trim().required(REQUIRED),
  applicantId: yup.string().trim().required(REQUIRED),
  gameId: yup.string().trim().required(REQUIRED),
  packInstructions: yup.string().trim().required(REQUIRED),
});

function SucessForm(): JSX.Element {
  const { gameId, setIsFinished, setGameId } = useNumberContext();

  if (!gameId || !applicantId) return <div />;

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-green-500 text-4xl font-semibold">
        CONGRATULATIONS!
      </h1>
      <h1 className="text-green-400 text-2xl">You guessed it right!</h1>
      <Formik
        initialValues={{
          applicantId,
          gameId,
          packUrl: "",
          packInstructions: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) =>
          submitApplication(values)
            .then((res) => {
              console.log(res);
              setIsFinished(false);
              setGameId("");
              storeStorage("gameId", "");
            })
            .catch((err) => console.log(err))
        }
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-screen-sm mt-12">
            <Field
              type="text"
              name="packUrl"
              className="p-4 bg-gray-100 rounded border w-full"
              placeholder="Pack URL"
            />
            <span className="text-red-500">
              <ErrorMessage name="packUrl" />
            </span>
            <Field
              type="text"
              name="packInstructions"
              placeholder="Pack Instructions"
              className="p-4 bg-gray-100 rounded border w-full mt-4"
            />
            <span className="text-red-500">
              <ErrorMessage name="packInstructions" />
            </span>
            <button
              type="submit"
              disabled={isSubmitting}
              className="p-4 bg-green-400 text-white rounded w-full hover:bg-green-500 mt-4"
            >
              {isSubmitting ? "SUBMITTING" : "SUBMIT"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SucessForm;
