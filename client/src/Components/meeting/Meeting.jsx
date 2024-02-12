// Meeting.jsx

import React from 'react';
import { Layout, Typography } from 'antd'; 
import 'antd/dist/antd.css';
import { Routes, Route } from 'react-router-dom';
import SideMenu from './Components/SideMenu';
import routes from './Routes/routes';
const { Title } = Typography;
const { Header, Content, Footer } = Layout;
const titleStyle = {
  color: '#fff',
  textAlign: 'center',
  margin: '5px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
};

function Meeting() {

  const contentStyle = {
    background: 'linear-gradient(to right, #e0e0e0, #ffffff)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '24px',
    borderRadius: '8px',
    transition: 'background 0.3s, box-shadow 0.3s',
    
  };

  const headerStyle = {
    background: 'linear-gradient(45deg, #FFA07A 0%, #FFD700 25%, #FF8C00 50%, #FF4500 25%, #FF6347 25%)',
    borderBottom: '2px solid #fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px', // Add padding to the header
  };

  return (
    <Layout>
       <Layout style={{ height: '100vh' }}>
      <Header style={headerStyle}>
        <div >
         
            <img
              src={require('G:/Projects/SIH 2023/SIH1341_16581_Arogya_Squad/SIH1341_16581_Arogya_Squad/client/src/Components/meeting/features/myAppointments/Daco_4737920.png')}
              alt="Your Image Alt Text"
              style={{maxWidth: '100%',
              height: '50px',
              // Add a white border
              borderRadius: '4px', }}
            />
          
          
         
        </div>
        <Title style={titleStyle}>Welcome Student</Title>
      </Header>
      
      {/* Content */}
      <Content style={contentStyle}>
        <Routes>
          {routes.map((route, index) => (
            <Route 
              key={index}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </Content>
      
      {/* Footer */}

      </Layout>

      
      <SideMenu />

    </Layout>
    
  );
}

export default Meeting;
