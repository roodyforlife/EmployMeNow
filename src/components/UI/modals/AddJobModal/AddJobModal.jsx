import React, { useEffect, useState } from "react";
import { getSkills } from "../../../../http/skillAPI";
import Button from "../../Button/Button";
import Form from "../../Form/Form";
import Input from "../../Input/Input";
import MultipleSelect from "../../MultipleSelect/MultipleSelect";
import Select from "../../Select/Select";
import Spinner from "../../Spinner/Spinner";
import cl from "../MyModal.module.css";

export default function AddJobModal({ show, onHide, create, title }) {
  const [form, setForm] = useState({
    jobName: "",
    description: "",
    tagIdes: [],
  });
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills().then((data) => {
      setSkills([...data.map(({tagId, tagName}) => ({value: tagId, text: tagName}))]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div
      className={cl.modal}
      style={show ? { display: "flex" } : { display: "none" }}
      onClick={onHide}
    >
      <div className={cl.container} onClick={(e) => e.stopPropagation()}>
        <div className={cl.title}>
          <h3>{title}</h3>
          <span onClick={onHide} className={cl.close}>
            &times;
          </span>
        </div>
        <hr />
        <div className={cl.content}>
          <Form>
            <Input
              type="text"
              holder="Name"
              value={form.jobName}
              onChange={(e) => setForm({ ...form, jobName: e.target.value })}
            />
            <Input
              type="text"
              holder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <MultipleSelect title="Main tags" options={skills} callback={(tagIdes) => setForm({...form, tagIdes})} />
            <Button onClick={(event) => create(event, form)}>Create</Button>
          </Form>
        </div>
      </div>
    </div>
  );
}
