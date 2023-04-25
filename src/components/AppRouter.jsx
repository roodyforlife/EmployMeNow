import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import { Context } from '../index';
import { authRoutes, publicRoutes } from '../routes';

 const AppRouter = observer(() => {
    const {user} = useContext(Context);
  return (
    <div style={{paddingTop: 70, maxWidth: 1280, margin: '0 auto'}}>
        {
          <Routes>
          {user.isAuth && authRoutes.map(({path, component, role}) =>
            role.indexOf(user.user.role) !== -1 &&
               <Route path={path} element={component} key={path}/>
            
          )}
          
          {publicRoutes.map(({path, component}) => 
            <Route path={path} element={component} key={path}/>
          )}
        </Routes>
        
        }
    </div>
  )
});

export default AppRouter