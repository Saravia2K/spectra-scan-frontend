"use client";

import { useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Grid,
  Stack,
  Button,
  IconButton,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import EyeOutlinedIcon from "@ant-design/icons/EyeOutlined";
import EyeInvisibleOutlinedIcon from "@ant-design/icons/EyeInvisibleOutlined";
import { zodResolver } from "@hookform/resolvers/zod";

import AnimateButton from "@/components/AnimateButton";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TFormFields>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<TFormFields> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel htmlFor="email-login">Correo electrónico</InputLabel>
            <OutlinedInput
              fullWidth
              id="email-login"
              placeholder="ejemplo@email.com"
              error={!!errors.email}
              {...register("email")}
            />
          </Stack>
          {errors.email && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {errors.email.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid size={12}>
          <Stack sx={{ gap: 1 }}>
            <InputLabel htmlFor="password-login">Password</InputLabel>
            <OutlinedInput
              fullWidth
              id="-password-login"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                    color="secondary"
                  >
                    {showPassword ? (
                      <EyeOutlinedIcon />
                    ) : (
                      <EyeInvisibleOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="********"
              {...register("password")}
            />
          </Stack>
          {errors.password && (
            <FormHelperText
              error
              id="standard-weight-helper-text-password-login"
            >
              {errors.password.message}
            </FormHelperText>
          )}
        </Grid>
        <Grid size={12}>
          <AnimateButton>
            <Button
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              type="submit"
            >
              Iniciar sesión
            </Button>
          </AnimateButton>
        </Grid>
      </Grid>
    </form>
  );
}

const Schema = z.object({
  email: z.string().email("Ingrese un correo electrónico válido"),
  password: z.string().nonempty("Campo requerido"),
});

type TFormFields = z.infer<typeof Schema>;
