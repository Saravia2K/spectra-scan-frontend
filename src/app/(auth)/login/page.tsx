"use client";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Stack, Typography, useTheme } from "@mui/material";

import Logo from "@/components/Logo";
import MainCard from "@/components/MainCard";
import LoginForm from "@/forms/Login";
import Background from "./Background";

export default function LoginPage() {
  const theme = useTheme();

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Background />
      <Grid container direction="column" sx={{ minHeight: "100vh" }}>
        <Grid sx={{ px: 3, mt: 3 }} size={12}>
          <Logo />
        </Grid>
        <Grid size={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: {
                xs: "calc(100vh - 210px)",
                sm: "calc(100vh - 134px)",
                md: "calc(100vh - 132px)",
              },
            }}
          >
            <Grid>
              <MainCard
                sx={{
                  maxWidth: { xs: 400, sm: 475 },
                  margin: { xs: 2.5, md: 3 },
                  "& > *": { flexGrow: 1, flexBasis: "50%" },
                }}
                content={false}
                border={false}
                shadow={theme.shadows["1"]}
                boxShadow
              >
                <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>
                  <Grid container spacing={3}>
                    <Grid size={12}>
                      <Stack
                        direction="row"
                        sx={{
                          alignItems: "baseline",
                          justifyContent: "space-between",
                          mb: { xs: -0.5, sm: 0.5 },
                        }}
                      >
                        <Typography variant="h3">Inicia sesión</Typography>
                      </Stack>
                    </Grid>
                    <Grid size={12}>
                      <LoginForm />
                    </Grid>
                  </Grid>
                </Box>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
