import { Box, Button, styled } from "@mui/material";
import { Link } from "react-router-dom";

export function Start() {
  return (
    <Root>
      <Button variant="contained">
        <StyledLink to="/intro">Start</StyledLink>
      </Button>
    </Root>
  );
}

const Root = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-olor: white;
  position: relative;
  z-index: 100;
  color: black;
  text-decoration: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
