import React, { useEffect, useState } from 'react'
import Spinner from '../components/UI/Spinner/Spinner';
import { addNewJob, getOne, updateCompany } from '../http/companyAPI';
import cl from '../styles/Company.module.css'
import Button from '../components/UI/Button/Button';
import AddJobModal from '../components/UI/modals/AddJobModal/AddJobModal';
import { useNavigate } from 'react-router-dom';
import EditCompany from '../components/UI/modals/EditCompany/EditCompany';
import { observer } from 'mobx-react-lite';

const MyCompany = observer(() => {
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getOne().then(data => {
      setCompany(data);
      setLoading(false);
    }).catch((err) => console.log(err))
  }, [])

  const edit = async (event, form) => {
    setLoading(true);
    event.preventDefault();
    await updateCompany(form).then(() => {
      setCompany({...company, companyName: form.companyName, address: form.address, description: form.description});
      setEditModalVisible(false);
      setLoading(false)
    })

  }

  const addJob = async(event, form) => {
    event.preventDefault();
      setLoading(true);
      addNewJob(form).then(data => {
        setModalVisible(false);
        getOne().then(data => {
          setCompany(data);
          setLoading(false);
        })
      })
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <AddJobModal create={addJob} title='Add new job' show={modalVisible} onHide={() => setModalVisible(false)}></AddJobModal>
      <EditCompany edit={edit} title="Edit company" show={editModalVisible} company={company} onHide={() => setEditModalVisible(false)}></EditCompany>
      <div className={cl.company}>
        <div className={cl.content}>
          <div className={cl.item}>
            <span>Name</span>
            <span>{company.companyName}</span>
          </div>
          <div className={cl.item}>
            <span>Address</span>
            <span>{company.address}</span>
          </div>
          <div className={cl.item}>
            <span>Description</span>
            <span>{company.description}</span>
          </div>
          <div className={cl.item} style={{marginBottom: 30}}>
            <span>Email</span>
            <span>{company.email}</span>
          </div>

          <Button onClick={() => setEditModalVisible(true)} style={{marginBottom: 20}}>Edit company</Button>

        <Button onClick={() => setModalVisible(true)} style={{marginBottom: 20}}>Add new job</Button>

          <h2>Jobs</h2>
          <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Tags</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {company.jobs.map((job) => (
            <tr key={job.jobId}>
              <td>{job.jobName}</td>
              <td>{job.description}</td>
              <td>{job.tags.map(({tagName}) => (tagName)).join(', ')}</td>
              <td><div className={cl.info} onClick={() => navigate('/company/job/' + job.jobId)}>Info</div></td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      </div>
    </div>
  )
});

export default MyCompany;