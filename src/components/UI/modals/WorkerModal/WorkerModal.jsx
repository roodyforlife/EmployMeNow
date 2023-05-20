import { observer } from 'mobx-react-lite';
import React from 'react'
import { useState } from 'react';
import { getCV } from '../../../../http/workerAPI';
import Button from '../../Button/Button';
import CheckBox from '../../CheckBox/CheckBox';
import Spinner from '../../Spinner/Spinner';
import cl from '../MyModal.module.css'
import classes from './WorkerModal.module.css'

const WorkerModal = observer(({ show, onHide, title, worker, click}) => {
const [loading, setLoading] = useState(false);
  const download = () => {
    setLoading(true)
    getCV(worker.email).finally(() => setLoading(false))
  }

  if(loading) {
    return <Spinner />
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
            <div className={classes.company}>
              <div className={classes.block}>
                <span>User id</span>
                <span>{worker.userId}</span>
              </div>
              <div className={classes.block}>
                <span>Name</span>
                <span>{worker.name}</span>
              </div>
              <div className={classes.block}>
                <span>Surtname</span>
                <span>{worker.surname}</span>
              </div>
              <div className={classes.block}>
                <span>Email</span>
                <span>{worker.email}</span>
              </div>
              <div className={classes.block}>
                <span>Resume information</span>
                <span>{worker.resumeInfo}</span>
              </div>
              <div className={classes.block}>
                <span>CV</span>
                <span><Button onClick={download}>Download CV</Button></span>
              </div>
              <CheckBox style={{marginTop: 20}} check={(event) => click(event, worker)} checked={worker.isBanned} title='Block' />
            </div>
        </div>
      </div>
    </div>
    )
});

export default WorkerModal;