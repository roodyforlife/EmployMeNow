import { observer } from "mobx-react-lite";
import React, { useEffect, useMemo, useState } from "react";
import Filtration from "../components/UI/Filtration/Filtration";
import Input from "../components/UI/Input/Input";
import MyModal from "../components/UI/modals/CompanyModal/CompanyModal";
import Spinner from "../components/UI/Spinner/Spinner";
import { ban, unBan } from "../http/adminActions";
import { getAll } from "../http/companyAPI";
import cl from "../styles//Table.module.css";

const AdminCompanies = observer(() => {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [filtration, setFiltration] = useState({
    name: "",
    email: "",
    address: "",
  });

  const openCompany = (company) => {
    setCompany(company);
    setModalVisible(true);
  };

  const click = async (event, comp) => {
    setLoading(true);
    comp.isBanned = event.target.checked;
    if (event.target.checked) {
      await ban(comp).then(() => setLoading(false));
    } else {
      await unBan(comp).then(() => setLoading(false));
    }
  };

  useEffect(() => {
    getAll()
      .then((data) => {
        setCompanies(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const sortedCompanies = useMemo(() => {
    return companies.filter(
            (item) =>
              item.email.includes(filtration.email) &&
              item.companyName.includes(filtration.name) &&
              item.address.includes(filtration.address)
          );
  }, [filtration, companies]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <MyModal
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        title="Information about company"
        company={company}
        click={click}
      ></MyModal>

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
            holder="Email"
            style={{ marginRight: 20 }}
            value={filtration.email}
            onChange={(e) =>
              setFiltration({ ...filtration, email: e.target.value })
            }
          />
          <Input
            type="text"
            holder="Address"
            value={filtration.address}
            onChange={(e) =>
              setFiltration({ ...filtration, address: e.target.value })
            }
          />
        </div>
      </Filtration>

      <table>
        <thead>
          <tr>
            <th>User id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>jobs count</th>
            <th>Description</th>
            <th>Is banned</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedCompanies.map((company) => (
            <tr key={company.email}>
              <td>{company.userId}</td>
              <td>{company.companyName}</td>
              <td>{company.email}</td>
              <td>{company.address}</td>
              <td>{company.jobs.length}</td>
              <td>{company.description}</td>
              <td>{`${company.isBanned}`}</td>
              <td>
                <div className={cl.info} onClick={() => openCompany(company)}>
                  Info
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default AdminCompanies;
