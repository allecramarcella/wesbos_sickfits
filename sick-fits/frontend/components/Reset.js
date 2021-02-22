import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";


const RESET_MUTATION = gql`
  mutation RESET_MUTATION ($email: String!, $password: String!, $token: String!) {
    redeemUserPasswordResetToken(
      email: $email, 
      token: $token, 
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }){
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token: token,
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION , {
    variables: inputs, 
  })

  const succesfulError = data?.redeemUserPasswordResetToken?.code 
  ? data?.redeemUserPasswordResetToken 
  : undefined;

  async function handleSubmit(e){
    e.preventDefault();
    const res = await reset().catch(console.error);
    resetForm();
    // send the email and password to the graphqlAPI

  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <DisplayError error={error || succesfulError} />
      <fieldset disabled={loading} aria-busy={loading}>
      {data?.redeemUserPasswordResetToken === null && (
        <p>Succes! You can now sign in</p>
      )}
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
       
        <button type="submit">Reset Password</button>
      </fieldset>
    </Form>
  );
}