import { useState } from "react";
import useForm from "../../hooks/useForm";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./Auth.css";
import useAuth from "../../hooks/useAuth";

import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import useHttp from "../../hooks/useHttp";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import { useNavigate } from "react-router-dom";
export default function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const switchModeHandler = () => {
    if (isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: "asdasdad",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prev) => !prev);
  };
  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const response = await sendRequest(
          `${import.meta.env.VITE_BACKEND_API}/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        login(response.userId, response.token);
        navigate("/");
      } catch (err) {
        ("");
      }
    } else {
      try {
        const formData = new FormData();

        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        console.log(formData);
        const response = await sendRequest(
          `${import.meta.env.VITE_BACKEND_API}/users/signup`,
          "POST",
          formData
        );

        login(response.userId, response.token);
        navigate("/");
      } catch (err) {
        ("");
      }
    }
  };

  return (
    <>
      {error && <ErrorModal error={error} onClear={clearError} />}
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              el="input"
              type="text"
              label="name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="enter a valid name"
              onInput={inputHandler}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              center
              onInput={inputHandler}
              id="image"
              errorText="Please select a valid Image"
            />
          )}
          <Input
            id="email"
            el="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="enter a valid email address"
            onInput={inputHandler}
          />
          <Input
            id="password"
            el="input"
            type="password"
            label="password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="enter a valid password"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          {isLoginMode ? "Switch to Signup" : "Switch to Login"}
        </Button>
      </Card>
    </>
  );
}
