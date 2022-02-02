import React from 'react';
import {Container} from 'react-bootstrap'




const Login = ({AUTH_URL}) => {
  return <Container className="d-flex justify-content-center align-items-center bg-dark" style={{minHeight: "100vh", minWidth: "100vw", backgroundColor: "--bs-gray-dark"}}>
      <a className="btn btn-success btn-lg" href={AUTH_URL}>Login with Spotify</a>
  </Container>
}



export default Login;
