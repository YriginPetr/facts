import React from "react";
import {
  FormLayout,
  Textarea,
  Button,
  File,
  Div,
  FormStatus,
} from "@vkontakte/vkui";
import { withModalRootContext } from "@vkontakte/vkui";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";
import { useDispatch } from "react-redux";
import { FactLoading, Notification, OpenModal, Error } from "../store/actions";
import { APIURL } from "../store/const";
const Addmodal = ({ updateModalHeight }) => {
  const [text, setText] = React.useState("");
  const [file, setFile] = React.useState(null);
  const dispatch = useDispatch();

  const TextChange = (e) => {
    const currentText = e.target.value.replace(/ {1,}/g, " ");
    if (currentText.length <= 128) {
      setText(currentText);
      updateModalHeight();
    }
  };
  const FileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
    updateModalHeight();
  };
  const upload = async (e) => {
    try {
      e.preventDefault();
      dispatch(FactLoading(true));
      const formData = new FormData();
      formData.append("image", file);
      formData.append("text", text);
      await fetch(`${APIURL}/api/fact/addwithimage${window.location.search}`, {
        method: "POST",
        body: formData,
        mode: "no-cors",
        cache: "no-cache",
      });
      dispatch(FactLoading(false));
      dispatch(OpenModal(null));
      dispatch(Notification("Ваше предложение направлено на рассмотрение"));
    } catch (err) {
      console.log(err);
      dispatch(Error(true));
    }
  };
  return (
    <FormLayout>
      <FormStatus header="Все предложение проходят модерацию.">
        В случае несоответствия контента правилам(скоро), ваше предложение может
        быть отклонено. Для тестирования модерация выключена, т е факты сразу
        попадают в ленту
      </FormStatus>
      <Textarea
        value={text}
        onChange={TextChange}
        top="Интересный факт"
        bottom={`${text.length >= 8 ? "Осталось" : "Еще нужно"} ${
          (text.length < 8 ? 8 : 128) - text.length
        } символов`}
      />
      {file ? (
        <Div className="img_preview__cnt">
          <img
            className="img_preview"
            onLoad={() => updateModalHeight()}
            src={URL.createObjectURL(file)}
            alt="background"
          />
          <div
            className="img_preview__icon"
            onClick={() => {
              setFile(null);
              updateModalHeight();
            }}
          >
            <Icon24Dismiss />
          </div>
        </Div>
      ) : (
        <File
          accept="image/jpeg,image/png"
          top="Загрузите задний фон"
          controlSize="xl"
          mode="secondary"
          onChange={FileChange}
        />
      )}

      <Button
        type="submit"
        disabled={text.length < 8 || text.length > 128 || file === null}
        size="xl"
        onClick={upload}
      >
        Отправить
      </Button>
    </FormLayout>
  );
};
export default withModalRootContext(Addmodal);
