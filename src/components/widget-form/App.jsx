import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import medications from "../../locales/medications";
import { questionsPart1, questionsPart2 } from "../../locales/questions";
import * as pt_BR from "../../locales/pt-BR";
import Loader from "../widget-loader/loader";
import "../../style/form.scss";

export default function MyForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [questions, setQuestions] = useState({});
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [gender, setGender] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleQuestionChange = (event) => {
    const { name, value } = event.target;
    const questionValue = value === "yes" ? 1 : 0;
    setQuestions({
      ...questions,
      [name]: { value: questionValue },
    });
  };

  const handleMedicationChange = (event) => {
    setSelectedMedication(event.target.value);
  };

  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    const genderValue = selectedGender === "male" ? 0 : 1;
    setGender(genderValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const unansweredQuestions = [];
    for (let i = 1; i <= 19; i++) {
      if (
        !questions[`question${i}`]?.value &&
        questions[`question${i}`]?.value !== 0
      ) {
        unansweredQuestions.push(`Questão ${i}`);
      }
    }
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

      //   setErrorMessage("");
      // } catch (error) {
      //   setErrorMessage(`Erro ao enviar os dados para a API: ${error.message}`);
      // }
    } else {
      setErrorMessage(
        `Por favor, responda as seguintes perguntas: ${unansweredQuestions.join(
          ", "
        )}`
      );
    }
  };

  const handleClearForm = () => {
    setName("");
    setAge("");
    setQuestions({});
    setSelectedMedication("");
    setGender("");
    setErrorMessage("");
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(delay);
    }, 3000);
  }, []);

  return (
    <div className="form-container">
      {isLoading && <Loader />}
      <div className="header-rna">
        <h1>{pt_BR.textRnaTitle}</h1>
      </div>
      <form className="questions-container" onSubmit={handleSubmit}>
        {/* <div className="container-input-name">
          <p>{pt_BR.textEnterName}</p>
          <TextField
            placeholder={pt_BR.textEnterYourName}
            value={name}
            onChange={handleNameChange}
            className="input-name"
          />
        </div> */}
        <div className="select-age_gender">
          <Box>
            <p>{pt_BR.textEnterYourAge}</p>
            <Select
              value={age}
              onChange={handleAgeChange}
              displayEmpty
              className="age-select"
            >
              <MenuItem disabled value="">
                {pt_BR.textSelectYourAge}
              </MenuItem>
              {[...Array(101).keys()].map((age) => (
                <MenuItem key={age} value={age}>
                  {age}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box>
            <p>{pt_BR.textGender}</p>
            <Select
              value={gender}
              onChange={handleGenderChange}
              displayEmpty
              placeholder={pt_BR.textSelectGender}
            >
              <MenuItem disabled value="">
                {pt_BR.textSelectGender}
              </MenuItem>
              <MenuItem value="male">{pt_BR.textMale}</MenuItem>
              <MenuItem value="female">{pt_BR.textFemale}</MenuItem>
            </Select>
          </Box>
        </div>

        <div className="select-age_gender_medication">
          <Box>
            <p>{pt_BR.textSelectMedication}</p>
            <Select
              value={selectedMedication}
              onChange={handleMedicationChange}
            >
              <MenuItem disabled value="">
                {pt_BR.textSelectMedication}
              </MenuItem>
              {medications.map((medication, index) => (
                <MenuItem key={index} value={index}>
                  {medication}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </div>

        <div className="questions-one">
          {questionsPart1.map((question) => (
            <Box key={question.number}>
              <p>{question.title}</p>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      questions[`question${question.number}`]?.value === 1
                    }
                    onChange={handleQuestionChange}
                    name={`question${question.number}`}
                    value="yes"
                  />
                }
                label={pt_BR.textYes}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      questions[`question${question.number}`]?.value === 0
                    }
                    onChange={handleQuestionChange}
                    name={`question${question.number}`}
                    value="no"
                  />
                }
                label={pt_BR.textNo}
              />
            </Box>
          ))}
        </div>

        <div className="questions-part-2">
          {questionsPart2.map((question) => (
            <Box key={question.number}>
              <p>{question.title}</p>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      questions[`question${question.number}`]?.value === 1
                    }
                    onChange={handleQuestionChange}
                    name={`question${question.number}`}
                    value="yes"
                  />
                }
                label={pt_BR.textYes}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={
                      questions[`question${question.number}`]?.value === 0
                    }
                    onChange={handleQuestionChange}
                    name={`question${question.number}`}
                    value="no"
                  />
                }
                label={pt_BR.textNo}
              />
            </Box>
          ))}
        </div>
        <div className="error-message">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
        <div className="container-buttons">
          <Box>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClearForm}
            >
              {pt_BR.textClearForm}
            </Button>
          </Box>
          <Button type="submit">{pt_BR.textSubmit}</Button>
        </div>
      </form>
    </div>
  );
}
