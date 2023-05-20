import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/UI/Button/Button'
import { ADMIN_COMPANIES_ROUTE, ADMIN_SKILLS_ROUTE, ADMIN_WORKERS_ROUTE } from '../utils/consts';

export default function Admin() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate(ADMIN_COMPANIES_ROUTE)} style={{marginBottom: 20}}>Companies</Button>
      <Button onClick={() => navigate(ADMIN_WORKERS_ROUTE)} style={{marginBottom: 20}}>Workers</Button>
      <Button onClick={() => navigate(ADMIN_SKILLS_ROUTE)}>Tags</Button>
    </div>
  )
}
