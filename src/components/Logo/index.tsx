import Link from "next/link";
import ButtonBase from "@mui/material/ButtonBase";
import { type SxProps } from "@mui/material";

import LogoMain from "./main";
import LogoIcon from "./icon";

export default function Logo({ isIcon, sx, to }: TProps) {
  return (
    <ButtonBase disableRipple component={Link} href={to || "/"} sx={sx}>
      {isIcon ? <LogoIcon /> : <LogoMain />}
    </ButtonBase>
  );
}

type TProps = {
  isIcon?: boolean;
  sx?: SxProps;
  to?: string;
};
