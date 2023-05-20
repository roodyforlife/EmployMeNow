import React, { useEffect, useMemo, useState } from 'react'
import Button from '../components/UI/Button/Button';
import Filtration from '../components/UI/Filtration/Filtration';
import Input from '../components/UI/Input/Input';
import WorkerModal from '../components/UI/modals/WorkerModal/WorkerModal';
import Spinner from '../components/UI/Spinner/Spinner';
import { ban, unBan } from '../http/adminActions';
import { getWorkers } from '../http/workerAPI';
import cl from "../styles//Table.module.css";

export default function AdminWorkers() {
  const [workers, setWorkers] = useState([]);
  const [worker, setWorker] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [filtration, setFiltration] = useState({ name: "", surname: "", email: "" });

  useEffect(() => {
    getWorkers()
      .then((data) => {
        setWorkers(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const openCompany = (worker) => {
    setWorker(worker);
    setModalVisible(true);
  };

  const sortedWorkers = useMemo(() => {
    return workers.filter(
            (item) =>
              item.email.includes(filtration.email) &&
              item.name.includes(filtration.name) &&
              item.surname.includes(filtration.surname)
          );
  }, [filtration, workers]);

  const click = async (event, workPersone) => {
    setLoading(true);
    workPersone.isBanned = event.target.checked;
    if (event.target.checked) {
      await ban(workPersone).then(() => setLoading(false));
    } else {
      await unBan(workPersone).then(() => setLoading(false));
    }
  };

  if(loading) {
    return <Spinner />
  }
  return (
    <div>
      <WorkerModal
      show={modalVisible}
      onHide={() => setModalVisible(false)}
      title="Information about company"
      worker={worker}
      click={click}
      />

<Filtration>
        <div style={{ display: "flex" }}>
          <Input
            type="text"
            holder="Name"
            style={{ marginRight: 20 }}
            value={filtration.name}
            onChange={(e) =>
              setFiltration({ ...filtration, name: e.target.value })
            }
          />
          <Input
            type="text"
            holder="Surname"
            style={{ marginRight: 20 }}
            value={filtration.surname}
            onChange={(e) =>
              setFiltration({ ...filtration, surname: e.target.value })
            }
          />
          <Input
            type="text"
            holder="Email"
            value={filtration.email}
            onChange={(e) =>
              setFiltration({ ...filtration, email: e.target.value })
            }
          />
        </div>
      </Filtration>

      <table>
        <thead>
          <tr>
            <th>User id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Resume info</th>
            <th>Is banned</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedWorkers.map((worker) => (
            <tr key={worker.email}>
              <td>{worker.userId}</td>
              <td>{worker.name}</td>
              <td>{worker.surname}</td>
              <td>{worker.email}</td>
              <td>{worker.resumeInfo}</td>
              <td>{`${worker.isBanned}`}</td>
              <td>
                <div className={cl.info} onClick={() => openCompany(worker)}>
                  Info
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
};