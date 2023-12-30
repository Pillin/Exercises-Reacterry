import React, { useState } from "react";
import styled from "styled-components";

const EmailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const SignUpForm = () => {
  const [state, setState] = useState({});
  const [error, setError] = useState({});

  const isValid = () => {
    const newErrors = {};

    if (!state.firstName) {
      newErrors.firstName = "First name cannot be empty";
    }

    if (!state.lastName) {
      newErrors.lastName = "Last name cannot be empty";
    }

    if (!(state.email || "").match(EmailRegex)) {
      newErrors.email = "Invalid email address";
    }

    if ((state.password || "").length < 8) {
      newErrors.password = "Password must be greater than 7 characters";
    }

    if (state.confirmPassword && state.confirmPassword !== state.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setError(newErrors);

    return !(Object.entries(newErrors).length > 0);
  };

  const handleChange = ({ target: { name, value } }) => {
    const newState = { ...state };
    newState[name] = value;

    setState(newState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValid()) return;

    console.log("Form submitted successfully");
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <input
          data-testid="first-name-id"
          type="text"
          name="firstName"
          placeholder="First Name"
          value={state.firstName}
          onChange={handleChange}
        />
        <p data-testid="first-name-error-id" className="error">
          {error.firstName}
        </p>
        <input
          data-testid="last-name-id"
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={state.lastName}
          onChange={handleChange}
        />
        <p data-testid="last-name-error-id" className="error">
          {error.lastName}
        </p>
        <input
          data-testid="email-id"
          type="email"
          name="email"
          placeholder="Email Address"
          value={state.email}
          onChange={handleChange}
        />
        <p data-testid="email-error-id" className="error">
          {error.email}
        </p>
        <input
          data-testid="password-id"
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        />
        <p data-testid="password-error-id" className="error">
          {error.password}
        </p>
        <input
          data-testid="confirm-password-id"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={state.confirmPassword}
          onChange={handleChange}
        />
        <p data-testid="confirm-password-error-id" className="error">
          {error.confirmPassword}
        </p>
        <button type="submit">Sign Up</button>
      </form>
    </Wrapper>
  );
};

export default SignUpForm;

const Wrapper = styled.div`
  margin-top: 24px;
  font-family: sans-serif;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  input {
    padding: 8px 12px;
    font-size: 18px;
    margin-bottom: 6px;
    width: clamp(200px, 40%, 400px);
  }

  button {
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    background-color: #333;
    color: #fff;
    cursor: pointer;
    margin-top: 24px;

    &:hover {
      opacity: 0.8;
    }
  }

  .error {
    margin: 0 0 24px 0;
    color: red;
  }
`;
