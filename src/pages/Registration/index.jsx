import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Navigate } from "react-router";
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchRegister } from "../../slices/auth";

export const Registration = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      fullName: ""
    },
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => Boolean(state.auth.data));
  if (isAuth) {
    return <Navigate to="/"/>
  }
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      alert("Не удалось авторизоваться!");
    }
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      
      <TextField
        className={styles.field}
        label="Полное имя"
        fullWidth
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register("fullName", { required: "Укажите имя" })}
      />
      <TextField
        className={styles.field}
        label="E-Mail"
        fullWidth
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register("email", { required: "Укажите почту" })}
      />
      <TextField
        className={styles.field}
        label="Пароль"
        fullWidth
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        {...register("password", { required: "Укажите пароль" })}
      />
      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
