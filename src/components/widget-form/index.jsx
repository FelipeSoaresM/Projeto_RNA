import React, { useCallback, useEffect, useState } from "react";
//import TextField from "@mui/material/TextField";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import medications from "../../locales/medications";
import { questionsPart1, questionsPart2 } from "../../locales/questions";
import * as pt_BR from "../../locales/pt-BR";
import Loader from "../widget-loader/loader";
import "../../style/form.scss";
import SelectWithPlaceholder from "../widget-select";

export default function MyForm() {
  const [isLoading, setIsLoading] = useState(true);

  const [age, setAge] = useState("");
  const [questions, setQuestions] = useState({});
  const [selectedMedication, setSelectedMedication] = useState("");
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [ageError, setAgeError] = useState(false);
  const [questionErrors, setQuestionErrors] = useState({});
  const [medicationError, setMedicationError] = useState(false);
  const [genderError, setGenderError] = useState(false);

  const handleQuestionChange = (event, questionNumber, questionTitle) => {
    const { value } = event.target;
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [`question${questionNumber}`]: {
        title: questionTitle,
        value: value,
      },
    }));

    setQuestionErrors((prevErrors) => ({
      ...prevErrors,
      [`question${questionNumber}`]: false,
    }));
  };

  const handleMedicationChange = (event) => {
    setSelectedMedication(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    const genderValue = selectedGender === "male" ? 0 : 1;
    setGender(genderValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const unansweredQuestions = findUnansweredQuestions();

    if (unansweredQuestions.length === 0) {
      const itemsToSend = {
        Sexo: gender,
        Idade: age,
        Classificação: questions.question1?.value,
        ITU_repetição: questions.question2?.value,
        Hospitalização_Previa: questions.question3?.value,
        Permanencia_UTI: questions.question4?.value,
        Uso_previo_antibiotico: questions.question5?.value,
        Qual_antibiotico: selectedMedication,
        Procedimento_trato_genital: questions.question6?.value,
        Cateter_vesical: questions.question7?.value,
        Doenca_Renal_Vesical_estrutural: questions.question8?.value,
        Casa_repouso: questions.question9?.value,
        IRC: questions.question10?.value,
        Cardiopatia: questions.question11?.value,
        Hepatopatia: questions.question12?.value,
        Diabetes: questions.question13?.value,
        Ostomias: questions.question14?.value,
        Demencia: questions.question15?.value,
        DST: questions.question16?.value,
        Doenca_pulmonar_cronica: questions.question17?.value,
        Gestante: questions.question18?.value,
        Neoplasias: questions.question19?.value,
      };
      console.log("lista: ", itemsToSend);
      // try {
      //   const response = await fetch("sua/api/endpoint", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(itemsToSend),
      //   });

      //   if (!response.ok) {
      //     throw new Error("Erro ao enviar os dados para a API");
      //   }

      //   const responseData = await response.json();
      //   console.log("Resposta da API:", responseData);

      // } catch (error) {
      //   console.error(`Erro ao enviar os dados para a API: ${error.message}`);
      // }
    } else {
      validateGender();
      validateAge();
      validateMedication();
      unansweredQuestions.forEach((question) => {
        if (question.startsWith("question")) {
          const questionNumber = question.substring(8);
          setQuestionErrors((prevErrors) => ({
            ...prevErrors,
            [`question${questionNumber}`]: true,
          }));
        }
      });
    }
  };

  const findUnansweredQuestions = () => {
    const unansweredQuestions = [];
    for (let i = 1; i <= 19; i++) {
      const questionTitle = `question${i}`;
      if (
        !questions[questionTitle]?.value &&
        questions[questionTitle]?.value !== 0
      ) {
        unansweredQuestions.push(questionTitle);
      }
    }
    return unansweredQuestions;
  };

  const handleClearForm = () => {
    setAge("");
    setQuestions({});
    setSelectedMedication("");
    setGender("");
    setErrorMessage("");
  };

  const validateGender = useCallback(() => {
    if (gender === "" || gender === null || gender === undefined) {
      setGenderError(true);
    } else {
      setGenderError(false);
    }
  }, [gender]);

  useEffect(() => {
    if (gender !== "") {
      validateGender();
    }
  }, [gender, validateGender]);

  const validateAge = useCallback(() => {
    if (age === "" || age === null || age === undefined) {
      setAgeError(true);
    } else {
      setAgeError(false);
    }
  }, [age]);

  useEffect(() => {
    if (age !== "") {
      validateAge();
    }
  }, [age, validateAge]);

  const validateMedication = useCallback(() => {
    if (
      selectedMedication === "" ||
      selectedMedication === null ||
      selectedMedication === undefined
    ) {
      setMedicationError(true);
    } else {
      setMedicationError(false);
    }
  }, [selectedMedication]);

  useEffect(() => {
    if (selectedMedication !== "") {
      validateMedication();
    }
  }, [selectedMedication, validateMedication]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(delay);
    }, 3000);
  }, []);

  return (
    <div className="form-container">
      {isLoading && <Loader />}
      <div className="container-header">
        <div className="header-rna">
          <h1>{pt_BR.textRnaTitle}</h1>
          <h2>{pt_BR.textRnaSubtitle}</h2>
          <span>{pt_BR.TextInfoRna}</span>
        </div>
      </div>

      <form className="container" onSubmit={handleSubmit}>
        <div className="questions-container">
          <div className="box-title-questions">
            <span>{pt_BR.textTitleQuestions}</span>
          </div>
          <div className="container-box-one">
            <div className="select-age_gender_medications">
              <Box className="container-select">
                <span className="title">{pt_BR.textGender}</span>
                <SelectWithPlaceholder
                  id="gender"
                  value={gender}
                  onChange={handleGenderChange}
                  placeholder={pt_BR.textSelectGender}
                  options={[
                    { value: "", label: pt_BR.textSelectGender },
                    { value: 1, label: pt_BR.textMale },
                    { value: 0, label: pt_BR.textFemale },
                  ]}
                  error={genderError || gender === null || gender === undefined}
                />
              </Box>

              <Box className="container-select">
                <span className="title">{pt_BR.textEnterYourAge}</span>
                <SelectWithPlaceholder
                  id="age"
                  value={age}
                  onChange={handleAgeChange}
                  placeholder={pt_BR.textSelectYourAge}
                  options={[
                    { value: "", label: pt_BR.textSelectYourAge },
                    ...Array.from({ length: 101 }, (_, i) => ({
                      value: i,
                      label: i,
                    })),
                  ]}
                  error={ageError || age === null || age === undefined}
                />
              </Box>

              <Box className="container-select">
                <span className="title">{pt_BR.textSelectMedication}</span>
                <SelectWithPlaceholder
                  id="selectedMedication"
                  value={selectedMedication}
                  onChange={handleMedicationChange}
                  placeholder={pt_BR.textSelectMedicationOption}
                  options={[
                    { value: "", label: pt_BR.textSelectMedicationOption },
                    ...medications.map((medication, index) => ({
                      value: index,
                      label: medication,
                    })),
                  ]}
                  error={
                    medicationError ||
                    selectedMedication === null ||
                    selectedMedication === undefined
                  }
                />
              </Box>
            </div>

            <div className="questions-table-one">
              {questionsPart1.map((question) => (
                <Box key={question.number} className="container-select">
                  <span className="title">{question.title}</span>
                  <SelectWithPlaceholder
                    value={questions[`question${question.number}`]?.value || ""}
                    onChange={(event) =>
                      handleQuestionChange(
                        event,
                        question.number,
                        question.title
                      )
                    }
                    placeholder={pt_BR.textReponseSelect}
                    options={[
                      { value: "", label: pt_BR.textReponseSelect },
                      { value: 1, label: pt_BR.textYes },
                      { value: 0, label: pt_BR.textNo },
                    ]}
                    error={questionErrors[`question${question.number}`]}
                    questionNumber={question.number}
                    questionTitle={question.title}
                  />
                </Box>
              ))}
            </div>
          </div>

          <div className="container-box-two">
            <div className="questions-table-two">
              {questionsPart2.map((question) => (
                <Box key={question.number} className="container-select">
                  <span className="title">{question.title}</span>
                  <SelectWithPlaceholder
                    value={questions[`question${question.number}`]?.value || ""}
                    onChange={(event) =>
                      handleQuestionChange(
                        event,
                        question.number,
                        question.title
                      )
                    }
                    placeholder={pt_BR.textReponseSelect}
                    options={[
                      { value: "", label: pt_BR.textReponseSelect },
                      { value: 1, label: pt_BR.textYes },
                      { value: 0, label: pt_BR.textNo },
                    ]}
                    error={questionErrors[`question${question.number}`]}
                    questionNumber={question.number}
                    questionTitle={question.title}
                  />
                </Box>
              ))}
            </div>
          </div>
          <div className="error-message">
            {errorMessage && <p>{errorMessage}</p>}
          </div>
          <div className="container-buttons">
            <Box>
              <Button
                className="btn-container clean"
                variant="contained"
                onClick={handleClearForm}
              >
                <span>{pt_BR.textClearForm}</span>
              </Button>
            </Box>
            <Button className="btn-container send" type="submit">
              <span>{pt_BR.textSubmit}</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
