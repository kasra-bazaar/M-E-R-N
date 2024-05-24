import { useNavigate, useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import "./FormPlace.css";
import useForm from "../../hooks/useForm";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
export default function UpdatePlace() {
  const placeId = useParams().placeId;
  const { clearError, error, isLoading, sendRequest } = useHttp();
  const [loadedPlace, setLoadedPlace] = useState();
  const navigate = useNavigate();
  const { userId, token } = useAuth();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const getTitleAndDes = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_API}/places/${placeId}` ,'GET' ,null , { 
            Authorization : 'Bearer' + token
          }
        );

        setLoadedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        ("");
      }
    };
    getTitleAndDes();
  }, [setFormData, placeId, sendRequest , token]);

  if (!loadedPlace && !error) {
    return <h2>Could not find place !</h2>;
  }
  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `${import.meta.env.VITE_BACKEND_API}/places/${placeId}`,
        "PUT",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer" + token,
        }
      );
      navigate(`/${userId}/places`);
    } catch (err) {
      ("");
    }
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedPlace && (
        <form className="place-form " onSubmit={submitFormHandler}>
          <Input
            id="title"
            el="input"
            label="title"
            type="text"
            onInput={inputHandler}
            errorText="please enter a valid title !"
            validators={[VALIDATOR_REQUIRE()]}
            inputValue={loadedPlace.title}
            valid={true}
          />
          <Input
            id="description"
            el="textarea"
            label="description"
            type="text"
            onInput={inputHandler}
            errorText="please enter a valid description !"
            validators={[VALIDATOR_MINLENGTH(5)]}
            inputValue={loadedPlace.description}
            valid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {" "}
            UPDATE PLACE{" "}
          </Button>
        </form>
      )}
    </>
  );
}
