import type { PropsWithChildren, ReactNode } from "react";
import { type SxProps } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";

// header style
const headerSX: SxProps = {
  p: 2.5,
  "& .MuiCardHeader-action": { m: "0px auto", alignSelf: "center" },
};

export default function MainCard({
  border = true,
  boxShadow,
  children,
  subheader,
  content = true,
  contentSX = {},
  darkTitle,
  divider = true,
  elevation,
  secondary,
  shadow,
  sx = {},
  title,
  modal = false,
  ref,
}: TMainCardProps) {
  return (
    <Card
      elevation={elevation || 0}
      sx={{
        ...sx,
        position: "relative",
        border: border ? "1px solid" : "none",
        borderRadius: 1,
        borderColor: "grey.A800",
        boxShadow: boxShadow && !border ? shadow || "inherit" : "inherit",
        ":hover": {
          boxShadow: boxShadow ? shadow || "inherit" : "inherit",
        },
        ...(modal && {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: `calc(100% - 50px)`, sm: "auto" },
          maxWidth: 768,
          "& .MuiCardContent-root": {
            overflowY: "auto",
            minHeight: "auto",
            maxHeight: `calc(100vh - 200px)`,
          },
        }),
      }}
      ref={ref}
    >
      {/* card header and action */}
      {!darkTitle && title && (
        <CardHeader
          sx={headerSX}
          slotProps={{ title: { variant: "subtitle1" } }}
          title={title}
          action={secondary}
          subheader={subheader}
        />
      )}

      {/* content & header divider */}
      {title && divider && <Divider />}

      {/* card content */}
      {content && <CardContent sx={contentSX}>{children}</CardContent>}
      {!content && children}
    </Card>
  );
}

type TMainCardProps = PropsWithChildren<
  Partial<{
    border: boolean;
    boxShadow: boolean;
    subheader: ReactNode | string;
    content: boolean;
    contentSX: SxProps;
    darkTitle: boolean;
    divider: boolean;
    elevation: number;
    secondary: any;
    shadow: string;
    sx: SxProps;
    title: ReactNode | string;
    modal: boolean;
    ref: any;
    others: any;
  }>
>;
