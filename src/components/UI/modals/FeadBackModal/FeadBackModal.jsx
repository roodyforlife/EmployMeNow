import React, { useState } from 'react'
import { getCV } from '../../../../http/workerAPI';
import Button from '../../Button/Button';
import Select from '../../Select/Select'
import Spinner from '../../Spinner/Spinner';
import cl from '../MyModal.module.css'
import classes from './FeadBackModal.module.css'

export default function FeadBackModal({show, onHide, title, feadback, accept}) {
    const [status, setStatus] = useState(`true`);
    const [loading, setLoading] = useState(false);

    const download = () => {
      setLoading(true)
      getCV(feadback.worker.email).finally(() => setLoading(false))
    }

    if(feadback.worker === undefined) {
        return null;
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
         <div className={classes.feadback}>
            <div className={classes.item}>
                <span>Email</span>
                <span>{feadback.worker.email}</span>
            </div>
            <div className={classes.item}>
                <span>Surname</span>
                <span>{feadback.worker.surname}</span>
            </div>
            <div className={classes.item}>
                <span>Name</span>
                <span>{feadback.worker.name}</span>
            </div>
            <div className={classes.item}>
                <span>Comment</span>
                <span>{feadback.workerComment}</span>
            </div>
            <div className={classes.item}>
              <span>CV</span>
              <span><Button onClick={download}>Download CV</Button></span>
            </div>
            <div style={{marginBottom: 20}} className={classes.item}>
                <span>Status</span>
                <span>{feadback.accepted}</span>
            </div>
            <Select holder='Change status' onChange={(e) => setStatus(e.target.value)}>
                <option value="true">Accept</option>
                <option value="false">Denied</option>
            </Select>
            <Button onClick={(event) => accept(event, status)}>Save</Button>
         </div>
      </div>
    </div>
  </div>
  )
}
