import styled from "styled-components";
import Head from "next/head";
import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login() {
  const whatsappLogo =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2042px-WhatsApp.svg.png";

  const signIn = () => {
    signInWithPopup(auth, provider).catch(alert);
  };

  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>

      <LoginContainer>
        <Logo src={whatsappLogo} />
        <Button onClick={signIn} variant="outlined">
          Sign in with Google
        </Button>
        <Useindesktop>*Use In Desktop Mode to Access Proper Layout</Useindesktop>
      </LoginContainer>
    </Container>
  );
}

export default Login;

const Useindesktop = styled.div`
font-size: x-small;
margin-top: 15px;
`
const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;

  @media (max-width: 768px) {
    /* Adjust styles for screens up to 768px wide */
    height: auto;
    padding: 20px;
    margin-top: 50%;
  }
`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    /* Adjust styles for screens up to 768px wide */
    padding: 20px;
  }
`;

const Logo = styled.img`
  height: 200px;
  width: 200px;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    /* Adjust styles for screens up to 768px wide */
    height: 100px;
  width: 100px;
  }
`;

