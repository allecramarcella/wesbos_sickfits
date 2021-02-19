import Link from "next/link";
import SignOut from "./Signout";
import NavStyles from './styles/NavStyles'
import { useUser } from "./User";

export default function Nav() {
  const user = useUser();

  return (
    <NavStyles>
      <Link href='/products'>products</Link>
      {
        user && (
          <>
          <Link href='/sell'>Sell</Link>
          <Link href='/orders'>Orders</Link>
          <Link href='/account'>Account</Link> 
          <SignOut />
          </>
        )
      }

      {
        !user && (
          <>
            <Link href='/signin'>Sing In</Link>
          </>
        )
      }

    </NavStyles>
  );
}
