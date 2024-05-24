import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import "./FormPlace.css";
import Button from "../../shared/components/FormElements/Button";
import useForm from "../../hooks/useForm";
import useHttp from "../../hooks/useHttp";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

export default function NewPlace() {
  const { clearError, error, isLoading, sendRequest } = useHttp();
  const navigate = useNavigate();
  const { userId, token } = useAuth();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("creator", userId);
      formData.append("image", formState.inputs.image.value);

      await sendRequest(`${import.meta.env.VITE_BACKEND_API}/places`, "POST", formData, {
        Authorization: "Bearer" + token,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ErrorModal onClear={clearError} error={error} />
      {isLoading && <LoadingSpinner asOverlay />}
      <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input
          id="title"
          el="input"
          type="text"
          label="title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <ImageUpload
          center
          id="image"
          onInput={inputHandler}
          errorText="please provide an image"
        />
        <Input
          id="description"
          el="textarea"
          type="text"
          label="description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description ( at least 5 char )"
          onInput={inputHandler}
        />
        <Input
          id="address"
          el="input"
          type="text"
          label="address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </>
  );
}
