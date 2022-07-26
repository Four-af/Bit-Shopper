import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
// import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
// import { useHistory } from "react-router-dom";
// import { loginSuccess } from "../redux/userRedux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const configContentType = {
    headers: { "Content-type": "application/json" },
  };

  
  // const dispatch = useDispatch();
  // const { isFetching, error } = useSelector((state) => state.user);
  // const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    // login(dispatch, { userName: userName, password: password });
    // !isFetching ? <>loading</> : history.push("/");
    // e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          userName: userName,
          // email: email,
          password: password,
        },
        configContentType
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    // setName("");
    setUserName("");
    // setEmail("");
    setPassword("");
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            label="userName"
            placeholder="userName"
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            label="password"
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" onClick={handleClick}>
            {/* <Redirect to="/" /> */}
            LOGIN
          </Button>
          Submit
          {/* {!error ? (
            <Error>Something went wrong...</Error>
          ) : (
            <>four on all fours</>
          )} */}
          <Link>DO YOU NOT REMEMBER THE PASSWORD?</Link>
          <Link to="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
