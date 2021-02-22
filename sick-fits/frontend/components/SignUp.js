import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import { CURRENT_USER_QUERY } from "./User";


const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    createUser(data: {
      email: $email,
      name: $name,
      password: $password,
    }) {
      id
      email
      name
    }
  }
`;

export default function SignUp(){
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    name: '',
    password: '',
  });

  const [signup, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs, 
    // refetch the currently logged in users
    // refetchQueries: [{ query: CURRENT_USER_QUERY}],
  })

  async function handleSubmit(e){
    e.preventDefault();
    const res = await signup().catch(console.error);
    resetForm();
    // send the email and password to the graphqlAPI

  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up For Your Account</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
      {data?.createUser && <p> Signed up with {data.createUser.eamil} - Please Go Head and Sign in!</p>}
        <label htmlFor="name">
          Your Name
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up!</button>
      </fieldset>
    </Form>
  );
}