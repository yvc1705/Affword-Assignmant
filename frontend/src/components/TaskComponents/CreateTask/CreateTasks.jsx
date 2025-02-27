import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Container, TextField, Button, Typography } from "@mui/material";

const TaskSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string()
    .min(10, "Description must be 10 characters at minimum")
    .required("Description is required"),
  status: Yup.string().required("Status is required"),
});

function CreateTasks() {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Create Task
      </Typography>
      <Formik
        initialValues={{
          name: "",
          description: "",
          status: "",
        }}
        validationSchema={TaskSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await axios.post("http://localhost:5000/api/tasks", values);
            alert("Task created successfully!");
          } catch (error) {
            console.error(error);
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleChange, values }) => (
          <Form>
            <TextField
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              value={values.name}
              onChange={handleChange}
            />
            <ErrorMessage name="name" component="div" />

            <TextField
              label="Description"
              name="description"
              fullWidth
              margin="normal"
              value={values.description}
              onChange={handleChange}
            />
            <ErrorMessage name="description" component="div" />

            <TextField
              label="Status"
              name="status"
              fullWidth
              margin="normal"
              value={values.status}
              onChange={handleChange}
            />
            <ErrorMessage name="status" component="div" />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              sx={{ mt: 3 }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default CreateTasks;
