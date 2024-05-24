import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = ({ center, id, onInput, errorText }) => {
  const [file, setFile] = useState();
  const [isValid, setIsValid] = useState(false);
  const [prevFile, setPrevFile] = useState();
  const filePickerRef = useRef();
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPrevFile(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);
  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
      
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${center && "center"}`}>
        <div className="image-upload__preview">
          {prevFile ? (
            <img src={prevFile} alt="Preview" />
          ) : (
            "Please Choose an Image !"
          )}
        </div>
        {!isValid && <p>{errorText}</p>}
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
ImageUpload.propTypes = {
  center: PropTypes.any,
  id: PropTypes.string,
  errorText: PropTypes.string,
  onInput: PropTypes.func,
};
