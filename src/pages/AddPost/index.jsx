import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import axios from "../../axios";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRef } from "react";


export const AddPost = () => {
  const [imageUrl, setImageUrl] = useState("");
  // const isAuth = useSelector((state) => Boolean(state.auth.data));
  const {id} = useParams();
  const [processState, setProcessState] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const inputFileRef = useRef(null);
  const navigate = useNavigate();

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при загрузки файла");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const isEditing = Boolean(id);

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);
console.log({title, text, tags})
  const onSubmit = async () => {
    try { 
      setProcessState(true);
      const fields = {
        title,
        text,
        tags: tags.split(','),
        imageUrl,
      };
      const { data } = isEditing 
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);

      const idData = isEditing ? id : data._id;
      navigate(`/posts/${idData}`);
    } catch (error) {
      console.warn(error);
      alert("Ошибка при создавании статьи!");
    }
  };

  useEffect(() => {
    if(id) {
      axios.get(`/posts/${id}`).then(res => {
        setTitle(res.data.title)
        setText(res.data.text)
        setImageUrl(res.data.imageUrl)
        setTags(res.data.tags.join(','))
      })
    }
  }, [])
  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );
  console.log(title, tags);
  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
         {isEditing ? 'Сохранить' : 'Опубликовать'}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
