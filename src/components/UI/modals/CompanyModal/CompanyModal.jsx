import { observer } from 'mobx-react-lite';
import React from 'react'
import CheckBox from '../../CheckBox/CheckBox';
import cl from '../MyModal.module.css'
import classes from './CompanyModal.module.css'

const CompanyModal = observer(({ show, onHide, title, company, click}) => {
  if(company.jobs === undefined)
  return null;
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
          <div className={classes.company}>
            <div className={classes.block}>
              <span>User id</span>
              <span>{company.userId}</span>
            </div>
            <div className={classes.block}>
              <span>Name</span>
              <span>{company.companyName}</span>
            </div>
            <div className={classes.block}>
              <span>Email</span>
              <span>{company.email}</span>
            </div>
            <div className={classes.block}>
              <span>Address</span>
              <span>{company.address}</span>
            </div>
            <div className={classes.block}>
              <span>Description</span>
              <span>{company.description}</span>
            </div>
              <h4 style={{margin: '0 0 5px 5px'}}>Jobs</h4>
            <div className={classes.arrayBlock}>
                {
                  company.jobs.length ?
                  company.jobs.map(item => 
                    <div key={item.jobId} className={classes.arrayItem}>
                      <span>Name</span>
                      <span>{item.jobName}</span>
                    </div>)
                  :
                  <div>Nothing</div>
                }
            </div>
            <CheckBox style={{marginTop: 20}} check={(event) => click(event, company)} checked={company.isBanned} title='Block' />
          </div>
      </div>
    </div>
  </div>
  )
});

export default CompanyModal;