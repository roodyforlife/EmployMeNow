import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/UI/Spinner/Spinner";
import { getOneJob, setFeadbackResult } from "../http/companyAPI";
import Filtration from "../components/UI/Filtration/Filtration";
import Input from "../components/UI/Input/Input";
import cl from "../styles/Table.module.css";
import FeadBackModal from "../components/UI/modals/FeadBackModal/FeadBackModal";

export default function Job() {
  const params = useParams();
  const [jobName, setJobName] = useState("");
  const [feadbacks, setFeadbacks] = useState([]);
  const [feadback, setFeadback] = useState({});
  const [loading, setLoading] = useState(true);
  const [filtration, setFiltration] = useState({
    email: "",
    name: ""
  });
  const [modalVisible, setModalVisible] = useState(false);

  const openFeadback = (event, feadback) => {
    event.preventDefault();
    setFeadback(feadback);
    setModalVisible(true);
  };

  const accept = async (event, status) => {
    event.preventDefault();
    setFeadbackResult(feadback.jobFeadbackId, status).then((data) => {
      setLoading(true);
      getOneJob(params.id)
        .then((data) => {
          setJobName(data.jobName);
          setFeadbacks(data.feadbacks);
        })
        .finally(() => setLoading(false));
    });
  };

  useEffect(() => {
    getOneJob(params.id)
      .then((data) => {
        setJobName(data.jobName);
        setFeadbacks(data.feadbacks);
      })
      .finally(() => setLoading(false));
  }, [params.id]);

  const sorted = useMemo(() => {
    return feadbacks.filter(
      (item) =>
        item.worker.email.includes(filtration.email) &&
        item.worker.surname.includes(filtration.name) &&
        item.worker.name.includes(filtration.name)
    );
  }, [filtration, feadbacks]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <FeadBackModal
        onHide={() => setModalVisible(false)}
        show={modalVisible}
        feadback={feadback}
        title="Feadback"
        accept={accept}
      ></FeadBackModal>
      <h1>Job: {jobName}</h1>
      <br />
      <h2>Feadbacks</h2>
      <div>
        <Filtration>
          <div style={{ display: "flex" }}>
            <Input
              type="text"
              value={filtration.email}
              onChange={(e) =>
                setFiltration({ ...filtration, email: e.target.value })
              }
              holder="Worker email"
              style={{ marginRight: 20 }}
            />
            <Input
              type="text"
              value={filtration.name}
              onChange={(e) =>
                setFiltration({ ...filtration, name: e.target.value })
              }
              holder="Surname and name"
              style={{ marginRight: 20 }}
            />
          </div>
        </Filtration>
        <table>
          <thead>
            <tr>
              <th>worker email</th>
              <th>Surname / name</th>
              <th>resume info</th>
              <th>main skill</th>
              <th>feadback comment</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((f) => (
              <tr key={f.jobFeadbackId}>
                <td>{f.worker.email}</td>
                <td>
                  {f.worker.surname} {f.worker.name}
                </td>
                <td>{f.worker.resumeInfo}</td>
                <td>{f.worker.tag.tagName}</td>
                <td>{f.workerComment}</td>
                {f.accepted ? (
                  <td>Accepted</td>
                ) : f.accepted === false ? (
                  <td>Denied</td>
                ) : (
                  <td>Not verified</td>
                )}
                <td>
                  <div
                    className={cl.info}
                    onClick={(event) => openFeadback(event, f)}
                  >
                    Info
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
