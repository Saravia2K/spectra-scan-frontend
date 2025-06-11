"use client";

import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  LinearProgress,
  Card,
  CardContent,
  Alert,
  Chip,
} from "@mui/material";
import { ArrowBack, ArrowForward, CheckCircle } from "@mui/icons-material";

// Datos de ejemplo - reemplaza con tus 50 preguntas reales
const questions = [
  "¿Te sientes motivado/a al comenzar tu día de trabajo?",
  "¿Consideras que tu trabajo tiene un propósito claro?",
  "¿Te sientes valorado/a por tu equipo de trabajo?",
  "¿Tienes claridad sobre tus responsabilidades laborales?",
  "¿Sientes que puedes expresar tus ideas libremente?",
  "¿Te sientes satisfecho/a con tu equilibrio trabajo-vida personal?",
  "¿Consideras que tienes oportunidades de crecimiento profesional?",
  "¿Te sientes cómodo/a con la comunicación en tu equipo?",
  "¿Sientes que tu trabajo contribuye al éxito de la organización?",
  "¿Recomendarías tu lugar de trabajo a otros profesionales?",
];

// Completa el array hasta 50 preguntas
// while (questions.length < 5) {
//   questions.push(
//     `Pregunta de ejemplo ${
//       questions.length + 1
//     }: ¿Cómo evalúas este aspecto de tu experiencia laboral?`
//   );
// }

const answerOptions = [
  { value: "siempre", label: "Siempre" },
  { value: "a-veces", label: "A veces" },
  { value: "casi-nunca", label: "Casi nunca" },
  { value: "nunca", label: "Nunca" },
];

export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerChange = (questionIndex: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Aquí puedes procesar las respuestas
    console.log("Respuestas:", answers);
    setIsCompleted(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answeredQuestions = Object.keys(answers).length;
  const isCurrentQuestionAnswered = answers[currentQuestion] !== undefined;

  if (isCompleted) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card sx={{ textAlign: "center", p: 4 }}>
          <CheckCircle sx={{ fontSize: 80, color: "success.main", mb: 2 }} />
          <Typography variant="h4" gutterBottom color="success.main">
            ¡Cuestionario Completado!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Gracias por completar todas las {questions.length} preguntas. Tus respuestas han sido
            registradas exitosamente.
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setCurrentQuestion(0);
              setAnswers({});
              setIsCompleted(false);
            }}
          >
            Realizar Nuevo Cuestionario
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Header con progreso */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Cuestionario de Evaluación
          </Typography>
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Pregunta {currentQuestion + 1} de {questions.length}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ height: 8, borderRadius: 4, mb: 2 }}
          />

          <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
            <Chip
              label={`${answeredQuestions} respondidas`}
              color="primary"
              variant="outlined"
              size="small"
            />
            <Chip
              label={`${questions.length - answeredQuestions} pendientes`}
              color="default"
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>

        {/* Indicador de progreso visual simple */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", maxWidth: "100%" }}>
            {questions.slice(0, Math.min(20, questions.length)).map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor:
                    index === currentQuestion
                      ? "primary.main"
                      : answers[index]
                      ? "success.main"
                      : "grey.300",
                  border: index === currentQuestion ? "2px solid" : "none",
                  borderColor: "primary.dark",
                }}
              />
            ))}
            {questions.length > 20 && (
              <Typography variant="caption" sx={{ ml: 1, alignSelf: "center" }}>
                +{questions.length - 20} más
              </Typography>
            )}
          </Box>
        </Box>

        {/* Pregunta actual */}
        <Card sx={{ mb: 4 }} key={currentQuestion}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              {questions[currentQuestion]}
            </Typography>

            <RadioGroup
              value={answers[currentQuestion] || ""}
              onChange={(e) => handleAnswerChange(currentQuestion, e.target.value)}
            >
              {answerOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  sx={{
                    mb: 1,
                    p: 1,
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: "action.hover",
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Alerta si no ha respondido */}
        {!isCurrentQuestionAnswered && (
          <Alert severity="info" sx={{ mb: 3 }}>
            Por favor selecciona una respuesta para continuar.
          </Alert>
        )}

        {/* Navegación */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Anterior
          </Button>

          <Typography variant="body2" color="text.secondary">
            {currentQuestion + 1} / {questions.length}
          </Typography>

          {currentQuestion === questions.length - 1 ? (
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              disabled={answeredQuestions < questions.length}
              size="large"
            >
              Finalizar Cuestionario
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={handleNext}
              disabled={!isCurrentQuestionAnswered}
            >
              Siguiente
            </Button>
          )}
        </Box>

        {/* Resumen de progreso */}
        <Box sx={{ mt: 4, p: 2, backgroundColor: "grey.50", borderRadius: 2 }}>
          <Typography variant="body2" align="center">
            <strong>Progreso:</strong> {Math.round(progress)}% completado
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
