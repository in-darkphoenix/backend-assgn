import React from "react";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { loginWithGoogleApi } from "../../api/user";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

export default function GoogleSignin() {
  const url = window.location.search;
  const params = new URLSearchParams(url);
  const code = "4%2F" + params.get("code").substring(2);

  useEffect(() => {
    if (code) {
      loginWithGoogleApi(code)
        .then((response) => {
          const token = response.data.data.token;

          localStorage.setItem("auth-token", token);

          window.location = "/";
        })
        .catch((err) => {
          toast("Error while signing you in with Google", {
            type: "error",
          });
        });
    }
  }, [code]);

  return (
    <CardContent>
      <CircularProgress />
      <Typography>Signing you in with Google</Typography>
    </CardContent>
  );
}
