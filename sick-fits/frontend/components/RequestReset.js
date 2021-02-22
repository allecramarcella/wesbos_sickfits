import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import useForm from "../lib/useForm";
import DisplayError from "./ErrorMessage";
import Form from "./styles/Form";
import { CURRENT_USER_QUERY } from "./User";


const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION ($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset(){
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  const [signup, { data, error, loading }] = useMutation(REQUEST_RESET_MUTATION , {
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
      <h2>Request a Password Reset</h2>
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
      {data?.sendUserPasswordResetLink === null && (
        <p>Succes! Check your email for a link!</p>
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
       
        <button type="submit">Request Reset</button>
      </fieldset>
    </Form>
  );
}